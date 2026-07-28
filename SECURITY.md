# Security policy

## Current status

BondCircle is in active pre-launch development. The `main` branch is the supported line, but production deployment and post-launch verification are not complete until Milestones 17 and 18 pass.

## Reporting a vulnerability

Do not open a public issue for a suspected security vulnerability.

Use GitHub’s private vulnerability reporting feature for this repository and include:

- the affected screen, route, or workflow
- steps to reproduce
- the expected and observed behavior
- potential impact
- any safe proof-of-concept material

Do not include real OTPs, session cookies, Firebase credentials, private keys, raw invitation tokens, payment evidence, or another person’s personal information.

## Security expectations

- Never commit environment files or service-account credentials.
- Never log raw OTPs in production.
- Never persist raw invitation tokens.
- Authenticate and authorize every server mutation.
- Preserve immutable audit history when membership or circle state changes.
- Treat payment details and uploaded evidence as sensitive information.
- Run the full automated verification suite before merging or deploying.

The project owner will assess valid reports, coordinate remediation, and disclose fixes when it is safe to do so.
