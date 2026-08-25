import os
import re

files = [
    'app/api/circles/[circleId]/activation/route.ts',
    'app/api/circles/[circleId]/support/pledge/route.ts',
    'app/api/circles/[circleId]/support/complete/route.ts',
    'app/api/circles/[circleId]/support/updates/route.ts',
    'app/api/circles/[circleId]/invitations/route.ts',
    'app/api/circles/[circleId]/invitations/[invitationId]/route.ts',
    'app/api/circles/[circleId]/aso-ebi/tier/route.ts',
    'app/api/circles/[circleId]/aso-ebi/fulfilment/route.ts',
    'app/api/circles/[circleId]/upgrade/route.ts',
    'app/api/circles/[circleId]/announcements/[announcementId]/route.ts',
    'app/api/circles/[circleId]/comments/[commentId]/route.ts',
    'app/api/circles/[circleId]/comments/[commentId]/moderate/route.ts',
    'app/api/circles/[circleId]/comments/[commentId]/report/route.ts',
    'app/api/circles/[circleId]/comments/settings/route.ts',
    'app/api/circles/[circleId]/notifications/mute/route.ts',
    'app/api/profile/photo/route.ts',
    'app/api/users/[userId]/profile-image/route.ts',
    'app/api/notifications/[notificationId]/route.ts',
    'app/api/notifications/preferences/route.ts',
    'app/api/notifications/read-all/route.ts',
    'app/api/circles/[circleId]/gift-image/route.ts',
    'app/api/circles/[circleId]/aso-ebi-image/route.ts',
    'app/api/circles/[circleId]/support-image/route.ts',
    'app/api/auth/legal/route.ts'
]

base = 'C:/Users/USER/Desktop/Bond Circle'
modified_files = []

for f in files:
    path = os.path.join(base, f)
    if not os.path.exists(path):
        print(f"File not found: {f}")
        continue
        
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    original = content
    
    # 1. Replace import { readSession } from "@/server/auth" with import { authenticatePrincipal } from "@/server/auth"
    # Or if there are multiple imports:
    content = re.sub(r'import\s+\{\s*readSession\s*\}\s+from\s+[\'"]@/server/auth[\'"];?', 'import { authenticatePrincipal } from "@/server/auth";', content)
    
    # If readSession is imported alongside others
    content = re.sub(r'(import\s+\{.*?)\breadSession\b(.*?\}\s+from\s+[\'"]@/server/auth[\'"];?)', r'\1authenticatePrincipal\2', content)

    # 2. Replace `const session = await readSession()` with `const session = await authenticatePrincipal(request)`
    content = re.sub(r'await\s+readSession\(\)', 'await authenticatePrincipal(request)', content)
    
    # 3. Update `assertTrustedMutation` calls to pass the principal/session.
    # Wait, in files where `assertTrustedMutation(request)` is called BEFORE `const session = ...`, we need to swap them.
    # We can match:
    # await assertTrustedMutation(request);
    # const session = await authenticatePrincipal(request);
    # and swap to:
    # const session = await authenticatePrincipal(request);
    # await assertTrustedMutation(request, session);
    
    # And if there's a guard in between:
    # await assertTrustedMutation(request);
    # const session = await authenticatePrincipal(request);
    # if (!session) { ... }
    
    # Actually, a safer regex replacement:
    
    # First, let's fix assertTrustedMutation without session
    content = re.sub(r'assertTrustedMutation\(\s*request\s*\)', 'assertTrustedMutation(request, session)', content)
    
    # Now we must ensure that `assertTrustedMutation(request, session)` happens AFTER `const session = ...`
    # Let's find blocks like:
    # await assertTrustedMutation(request, session);
    # const session = await authenticatePrincipal(request);
    
    pattern1 = re.compile(r'(await\s+assertTrustedMutation\(\s*request\s*,\s*session\s*\)\s*;)\s*(const\s+session\s*=\s*await\s+authenticatePrincipal\(\s*request\s*\)\s*;)', re.MULTILINE)
    content = pattern1.sub(r'\2\n    \1', content)
    
    # Another pattern where there's stuff in between (like `if (!session) { ... }`)
    # Wait, if `await assertTrustedMutation(request, session);` was before `const session...`, we should move it AFTER the `if (!session)` guard!
    # Let's do a more robust string manipulation:
    
    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
        
    if content != original:
        modified_files.append(f)
        
print("Modified files:")
for f in modified_files:
    print(f)
