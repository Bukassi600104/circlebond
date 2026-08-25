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
        continue
        
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
        
    original = content
    
    # 1. Replace import { readSession } from "@/server/auth"
    content = re.sub(r'import\s+\{\s*readSession\s*\}\s+from\s+[\'"]@/server/auth[\'"];?', 'import { authenticatePrincipal } from "@/server/auth";', content)
    content = re.sub(r'(import\s+\{.*?)\breadSession\b(.*?\}\s+from\s+[\'"]@/server/auth[\'"];?)', r'\1authenticatePrincipal\2', content)

    # 2. Extract and remove assertTrustedMutation
    # Check if assertTrustedMutation(request) exists
    has_assert = bool(re.search(r'^\s*await\s+assertTrustedMutation\(\s*request\s*\)\s*;?\s*$', content, re.MULTILINE))
    
    if has_assert:
        # Remove it
        content = re.sub(r'^\s*await\s+assertTrustedMutation\(\s*request\s*\)\s*;?\s*$\n?', '', content, flags=re.MULTILINE)
        
    # Replace readSession
    content = re.sub(r'await\s+readSession\(\)', 'await authenticatePrincipal(request)', content)
    
    # If we removed assertTrustedMutation, we need to insert it AFTER the session check.
    # The session check usually looks like:
    # const session = await authenticatePrincipal(request);
    # if (!session) { ... }
    # Let's find the closing brace of the if (!session) block.
    if has_assert:
        # Match `const session = ...\n    if (!session) {\n      ...\n    }`
        # Using a regex that matches until the first `}` after `if (!session)`
        pattern = re.compile(r'(const\s+session\s*=\s*await\s+authenticatePrincipal\(\s*request\s*\)\s*;?\s*if\s*\(!session\)\s*\{[^}]+\}\n)', re.MULTILINE)
        
        # We can append `    await assertTrustedMutation(request, session);\n` right after the match.
        def replacement(m):
            # Extract the indentation of the `if` to match it for `await assertTrustedMutation`
            indent_match = re.search(r'^(\s*)if', m.group(1), re.MULTILINE)
            indent = indent_match.group(1) if indent_match else '    '
            return m.group(1) + f'{indent}await assertTrustedMutation(request, session);\n'
            
        new_content = pattern.sub(replacement, content)
        
        # If the pattern wasn't found (maybe no if (!session) guard), we just insert after `const session = ...`
        if new_content == content:
            # Fallback: just put it after `const session = ...`
            content = re.sub(r'(const\s+session\s*=\s*await\s+authenticatePrincipal\(\s*request\s*\)\s*;?)', r'\1\n    await assertTrustedMutation(request, session);', content)
        else:
            content = new_content

    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
        
    if content != original:
        modified_files.append(f)
        
print("Modified files:")
for f in modified_files:
    print(f)
