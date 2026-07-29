# BondCircle deployment guide

BondCircle uses Vercel for the Next.js application and Firebase for Authentication, Data Connect, and Storage. Production release remains gated by Milestones 17 and 18.

## 1. Firebase production resources

1. Select the intended production Firebase project.
2. Enable Email/Password, Phone, and Google authentication providers.
3. Configure the Google OAuth consent screen and production support details.
4. Deploy the Data Connect schema and connector:

   ```bash
   npm run firebase:migrate
   npm run firebase:deploy:data
   ```

5. Create the production Cloud Storage bucket and deploy `storage.rules`.
6. Confirm that no emulator host variables are present in production.

## 2. Vercel environment variables

Configure the values from `.env.production.example` for Production. Use separate values for Preview where appropriate.

Required groups:

- `NEXT_PUBLIC_FIREBASE_*`: Firebase web application configuration
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: server-side Firebase Admin access
- `FIREBASE_SQL_CONNECT_*`: Data Connect service topology
- `AUTH_CHALLENGE_SECRET`: at least 32 cryptographically random bytes
- `AUTH_EMAIL_OTP_MODE=production`
- `AUTH_EMAIL_SMTP_URL` and `AUTH_EMAIL_FROM`: transactional email delivery
- `NEXT_PUBLIC_APP_URL`: canonical HTTPS origin used in notification email links
- `CRON_SECRET`: required only when enabling the optional external deadline scheduler

When entering `FIREBASE_PRIVATE_KEY` in Vercel, preserve newline characters using the escaped `\n` form expected by the application.

## 3. Domain and authentication

After Vercel provides the deployment domain:

1. Add it to Firebase Authentication’s authorized domains.
2. Add it to the Google OAuth client’s authorized JavaScript origins.
3. Confirm HTTPS and secure session cookies.
4. If a custom domain is attached, repeat the Firebase and Google authorization steps for it.

## 4. Release verification

Run locally before deployment:

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
```

Verify on the deployed domain:

- `/api/health` returns a healthy response.
- Email, phone, and Google sign-in complete successfully.
- New-user invitation registration returns to the intended invitation.
- Named, open, expiring, approval-required, and revoked invitation flows work.
- Gift, Aso-Ebi, and Support Circles persist correctly.
- Private Support Circle data remains redacted.
- Images upload and can be read only by authorized users.
- Production OTP messages are delivered and development codes are never displayed.
- Notification deep links open the correct circle and never expose receipt details in email previews.
- Upcoming deadlines appear when an authenticated member opens the application.
- If the optional external deadline scheduler is enabled, its job succeeds only with the configured `CRON_SECRET`.
- Failed notification email deliveries are retained as delivery records.
- Server logs contain no credentials, raw invitation tokens, OTP secrets, or personal payment evidence.

## 5. Rollback

- Keep the previous successful Vercel deployment available for instant rollback.
- Treat Data Connect schema changes as forward migrations; do not destructively roll back production data.
- Revoke compromised Firebase credentials immediately and rotate the corresponding Vercel secrets.
- Pause new invitations or uploads at the application layer if an incident affects those subsystems.
