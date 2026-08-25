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
    
    # Replace import
    content = re.sub(r'import\s+\{\s*readSession\s*\}\s+from\s+[\'"]@/server/auth[\'"];?', 'import { authenticatePrincipal } from "@/server/auth";', content)
    content = re.sub(r'(import\s+\{.*?)\breadSession\b(.*?\}\s+from\s+[\'"]@/server/auth[\'"];?)', r'\1authenticatePrincipal\2', content)

    # Replace readSession
    content = re.sub(r'await\s+readSession\(\)', 'await authenticatePrincipal(request)', content)

    # Now, find all occurrences of assertTrustedMutation(request) and replace them with NOTHING,
    # but we will remember to insert it after the session check.
    # We will do a generic replacement of `await assertTrustedMutation(request);` -> empty string
    
    has_assert = bool(re.search(r'^\s*await\s+assertTrustedMutation\(\s*request\s*\)\s*;?\s*$', content, re.MULTILINE))
    
    if has_assert:
        content = re.sub(r'^\s*await\s+assertTrustedMutation\(\s*request\s*\)\s*;?\s*$\n?', '', content, flags=re.MULTILINE)
        
        # Now we need to insert `await assertTrustedMutation(request, session);`
        # We find `if (!session) { ... return ... }`
        # We can use a regex that matches `if (!session) {` and then matches until `\n    }`
        
        # A simpler way: split by `if (!session) {`
        parts = content.split('if (!session) {')
        if len(parts) > 1:
            # Reconstruct the string
            # Find the closing brace of the `if` block. Since it usually contains exactly one statement with potentially an inner object:
            # We can just match the block by finding `\n    }` or `\n      }` depending on indentation.
            
            # Let's match `if (!session) { ... }` non-greedily until `}` that is on a line by itself or matches indentation.
            # Actually, `return NextResponse.json(..., { status: 401 });\n    }`
            # The closing brace is `\n    }`
            
            pattern = re.compile(r'(if\s*\(!session\)\s*\{.*?\n(\s*)\})', re.DOTALL)
            
            def repl(m):
                # m.group(1) is the whole if block
                # m.group(2) is the indentation of the closing brace
                indent = m.group(2)
                return m.group(1) + f'\n{indent}await assertTrustedMutation(request, session);'
                
            new_content = pattern.sub(repl, content)
            if new_content == content:
                # Fallback if the if(!session) block didn't match the regex
                content = re.sub(r'(const\s+session\s*=\s*await\s+authenticatePrincipal\(\s*request\s*\)\s*;?)', r'\1\n    await assertTrustedMutation(request, session);', content)
            else:
                content = new_content
        else:
            # No `if (!session)` block found
            content = re.sub(r'(const\s+session\s*=\s*await\s+authenticatePrincipal\(\s*request\s*\)\s*;?)', r'\1\n    await assertTrustedMutation(request, session);', content)

    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
        
    if content != original:
        modified_files.append(f)
        
print("Modified files:")
for f in modified_files:
    print(f)
