// Browser-test fixture only. Never import this module from application code.
export const LOCAL_AUTH_ORIGIN = "http://127.0.0.1:9099";

export function localAuthCsp(policy, documentOrigin) {
  const url = new URL(documentOrigin);
  if (
    url.protocol !== "http:" ||
    !["127.0.0.1", "localhost"].includes(url.hostname) ||
    url.username ||
    url.password ||
    url.origin !== documentOrigin
  )
    throw new Error(
      "Local Auth CSP fixture requires an explicit loopback document origin.",
    );
  if (typeof policy !== "string" || !policy.trim())
    throw new Error("Original production CSP is required.");
  let count = 0;
  const adjusted = policy.split(";").map((directive) => {
    if (!/^\s*connect-src(?:\s|$)/.test(directive)) return directive;
    count++;
    const sources = directive.trim().split(/\s+/).slice(1);
    if (!sources.length || sources.includes("'none'"))
      throw new Error(
        "Refusing to replace an empty or deny-all connect policy.",
      );
    return sources.includes(LOCAL_AUTH_ORIGIN)
      ? directive
      : `${directive} ${LOCAL_AUTH_ORIGIN}`;
  });
  if (count !== 1)
    throw new Error("Expected one explicit original connect-src directive.");
  return adjusted.join(";");
}
