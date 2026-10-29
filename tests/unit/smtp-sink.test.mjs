import assert from "node:assert/strict";
import test from "node:test";
import nodemailer from "nodemailer";
import { startSmtpSink } from "../helpers/smtp-sink.mjs";

test("loopback SMTP fixture receives a real mail transport and consumes codes once", async () => {
  const smtp = await startSmtpSink();
  try {
    await nodemailer.createTransport(smtp.url).sendMail({
      from: "BondCircle Test <no-reply@example.test>",
      to: "otp@example.test",
      subject: "Your BondCircle verification code",
      text: "Your BondCircle verification code is 123456.",
    });
    assert.throws(() => smtp.takeCode("another@example.test"), /not delivered/);
    assert.equal(smtp.takeCode("otp@example.test"), "123456");
    assert.throws(() => smtp.takeCode("otp@example.test"), /not delivered/);
  } finally {
    await smtp.close();
  }
});
