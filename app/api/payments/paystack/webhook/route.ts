import { NextResponse } from "next/server";
import { getActivationPaymentProvider } from "@/server/pricing/provider";
import {
  PaystackTestProvider,
  paystackTestConfiguration,
  validPaystackSignature,
} from "@/server/pricing/paystack";
import { settlePaystackActivation } from "@/server/pricing/settlement";
import { recordPricingOutcome } from "@/server/repositories/operational-events";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const provider = getActivationPaymentProvider();
  const secret = paystackTestConfiguration(process.env);
  if (!(provider instanceof PaystackTestProvider) || !secret) {
    return NextResponse.json(
      { error: "Payment provider unavailable." },
      { status: 503 },
    );
  }
  if (Number(request.headers.get("content-length")) > 65_536) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }
  const reader = request.body?.getReader();
  if (!reader)
    return NextResponse.json({ error: "Invalid webhook." }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 65_536) {
      await reader.cancel();
      return NextResponse.json(
        { error: "Payload too large." },
        { status: 413 },
      );
    }
    chunks.push(value);
  }
  const raw = Buffer.concat(chunks);
  if (
    !validPaystackSignature(
      raw,
      request.headers.get("x-paystack-signature"),
      secret,
    )
  ) {
    return NextResponse.json(
      { error: "Invalid webhook signature." },
      { status: 401 },
    );
  }
  try {
    const event = JSON.parse(raw.toString("utf8"));
    if (event.event !== "charge.success") {
      if (
        typeof event.event === "string" &&
        /^(refund\.|charge\.dispute\.)/.test(event.event)
      ) {
        const recorded = await recordPricingOutcome({
          eventType: "payment_reconciliation",
          outcome: "blocked",
          reasonCode: "provider_refund_or_dispute",
        });
        if (!recorded) throw new Error("Reconciliation signal unavailable.");
      }
      return NextResponse.json({ received: true });
    }
    const reference = event.data?.reference;
    if (
      typeof reference !== "string" ||
      !/^bc-[a-f0-9-]{36}$/i.test(reference)
    ) {
      return NextResponse.json(
        { error: "Invalid activation reference." },
        { status: 400 },
      );
    }
    await settlePaystackActivation(provider, reference.slice(3));
    return NextResponse.json({ received: true });
  } catch {
    // Do not acknowledge failed settlement: Paystack retries signed deliveries.
    return NextResponse.json(
      { error: "Payment settlement requires retry." },
      { status: 503 },
    );
  }
}
