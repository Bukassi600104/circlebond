# Contributing to BondCircle

BondCircle is implemented in the order defined by the approved 18-milestone plan. Changes must stay within the active milestone unless the product owner explicitly changes scope.

## Development workflow

1. Create a focused branch from the latest `main`.
2. Read the relevant product, UX, architecture, design-system, and milestone documents.
3. Add or update tests before considering the change complete.
4. Keep Firebase as the sole active application backend.
5. Run:

   ```bash
   npm run format:check
   npm run lint
   npm run typecheck
   npm test
   ```

6. Explain the user impact, security impact, and verification in the pull request.

## Product constraints

- Do not introduce money custody or imply that BondCircle processes contributions.
- Do not bypass circle tier limits.
- Do not expose private Support Circle or contribution data.
- Do not manufacture screens, fields, or workflows outside the approved documents.
- Do not redesign the official BondCircle logo assets.
- Keep desktop and mobile behavior accessible and responsive.

## Commit guidance

Use concise, outcome-oriented commit messages. Never commit generated secrets, local emulator data, build output, debug logs, or `.env.local`.
