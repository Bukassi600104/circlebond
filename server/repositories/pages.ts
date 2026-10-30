import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";

// These server-only operations declare limit: 200 and an offset variable.
export async function readAllRows<Row>(
  operation: string,
  variables: Record<string, unknown>,
  field: string,
): Promise<Row[]> {
  const rows: Row[] = [];
  for (;;) {
    const response = await getBondCircleDataConnect().executeQuery<
      Record<string, Row[]>,
      Record<string, unknown>
    >(operation, { ...variables, offset: rows.length });
    const page = response.data[field];
    if (!Array.isArray(page) || page.length > 200) {
      throw new Error("The requested records could not be loaded.");
    }
    rows.push(...page);
    if (page.length < 200) return rows;
  }
}
