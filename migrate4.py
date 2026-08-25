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
    
    # 1. Imports
    content = re.sub(r'import\s+\{\s*readSession\s*\}\s+from\s+[\'"]@/server/auth[\'"];?', 'import { authenticatePrincipal } from "@/server/auth";', content)
    content = re.sub(r'(import\s+\{.*?)\breadSession\b(.*?\}\s+from\s+[\'"]@/server/auth[\'"];?)', r'\1authenticatePrincipal\2', content)
    
    # We will process function blocks by function blocks to make sure we don't mix up GET and POST
    # But a simpler way:
    # 1. Remove `await assertTrustedMutation(request);` and remember if we did it inside this region.
    # Actually, the block we care about usually spans a few lines.
    
    # Let's find all occurrences of:
    # (Optional: await assertTrustedMutation(request);)
    # const session = await readSession();
    # (Optional: if (!session) { ... })
    
    # Pattern to match the whole sequence
    pattern = re.compile(
        r'(\s*await\s+assertTrustedMutation\(\s*request\s*\)\s*;)?'
        r'(\s*const\s+session\s*=\s*await\s+readSession\(\)\s*;)'
        r'(\s*if\s*\(!session\)\s*\{.*?\n(?:\s*)\})?',
        re.DOTALL
    )
    
    def repl(m):
        has_assert = bool(m.group(1))
        # Replacement for readSession
        session_decl = m.group(2).replace('readSession()', 'authenticatePrincipal(request)')
        if_block = m.group(3) if m.group(3) else ''
        
        result = session_decl + if_block
        if has_assert:
            # We need to figure out the indentation for `await assertTrustedMutation`
            # Look at session_decl's indentation
            indent_match = re.search(r'\n(\s*)const', session_decl)
            indent = indent_match.group(1) if indent_match else '    '
            result += f'\n{indent}await assertTrustedMutation(request, session);'
            
        return result

    content = pattern.sub(repl, content)

    # Note: What if `assertTrustedMutation` was called somewhere else entirely? 
    # Usually it's right before `readSession()`. Let's assume it is.
    # Wait, what if there's `const session = await readSession();` without `if(!session)`?
    # Our regex handles it because `if_block` is optional!

    # Also, some files might use `requirePrincipal`. 
    # We'll leave `requirePrincipal` alone unless they didn't have an `if (!session)` block,
    # but the instructions say "If requirePrincipal is used as a guard, replace if (!session) { ... } with const principal = requirePrincipal(session)".
    # Let's check if any file uses `requirePrincipal`.

    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
        
    if content != original:
        modified_files.append(f)
        
print("Modified files:")
for f in modified_files:
    print(f)
