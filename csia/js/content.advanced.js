/* ============================================================
   Cyber Aware - content.advanced.js
   Advanced track: for IT, engineering and technical staff.
   ============================================================ */
(function (CY) {
  'use strict';

  CY.track({
    id: 'advanced', name: 'Advanced / Technical', icon: '&#129520;', color: '#a855f7', audience: 'advanced',
    blurb: 'Deeper modules for IT, engineering and security-minded staff.',
    modules: [

      {
        id: 'crypto', title: 'Cryptography essentials', minutes: 5,
        lesson: {
          hook: 'Encryption hides data; hashing fingerprints it. Mixing them up causes real breaches.',
          blocks: [
            ['p', 'Two primitives do most of the work in security: **encryption** (reversible with a key) and **hashing** (one-way).'],
            ['viz', 'cryptodemo'],
            ['table', { head: ['Primitive', 'Reversible?', 'Use it for'], rows: [
              ['Symmetric encryption (AES)', 'Yes, with a shared key', 'Data at rest, files, disk'],
              ['Asymmetric encryption (RSA/EC)', 'Yes, with the private key', 'Key exchange, signatures'],
              ['Hashing (SHA-256, bcrypt)', 'No &mdash; one way', 'Passwords, integrity, signatures'],
              ['HMAC', 'No &mdash; hash + key', 'Message authenticity']
            ] }],
            ['p', '**TLS** (the padlock) combines all of these so you get confidentiality and integrity on the wire, plus proof you are talking to the real server.'],
            ['do', ['Store passwords with a slow, salted hash (**bcrypt/argon2**), never plain or MD5/SHA-1.', 'Use AES or a modern library for data at rest &mdash; never roll your own crypto.', 'Manage keys and secrets properly (a vault / KMS), and rotate them.']],
            ['dont', ['Do not encrypt passwords &mdash; hash them.', 'Do not use MD5/SHA-1 for security (they are broken for this).', 'Do not invent your own cipher or "encryption" scheme.']]
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'Passwords should be stored as…', options: ['Plain text', 'Encrypted (reversible)', 'A slow salted hash such as bcrypt/argon2', 'Base64'], a: 2, why: 'Hashing is one-way and salting defeats pre-computation and rainbow tables.' },
            { q: 'Encryption differs from hashing because it is…', options: ['Faster', 'Reversible with the right key', 'One-way', 'Only for passwords'], a: 1, why: 'Encryption is designed to be reversed by the key holder.' },
            { q: 'TLS provides…', options: ['Only speed', 'Confidentiality, integrity and server authentication', 'Hashing of passwords', 'Storage'], a: 1, why: 'The padlock means encrypted, tamper-evident, and identity-verified.' }
          ]
        }
      },

      {
        id: 'iam', title: 'Identity, access &amp; zero trust', minutes: 5,
        lesson: {
          hook: '"Never trust, always verify" replaces the old idea of a trusted internal network.',
          blocks: [
            ['p', '**Zero Trust** assumes the network is already hostile. Every request is authenticated and authorised, whether it comes from the office or a café.'],
            ['list', ['**Least privilege** &mdash; give accounts only the access they need, for only as long as needed.', '**Role-Based Access Control (RBAC)** &mdash; permissions attach to roles, not people.', '**Just-in-time access** &mdash; elevate temporarily, then it expires.', '**Segmentation** &mdash; do not let one compromised machine reach everything.']],
            ['p', '**Identity is the new perimeter.** Attackers target identities (credentials, tokens, sessions) because that is now the easiest way in.'],
            ['do', ['Enforce MFA everywhere, especially for admins.', 'Use unique, non-shared accounts &mdash; no shared logins.', 'Review access regularly and revoke it promptly when people change roles.', 'Use SSO and short-lived tokens instead of long-lived keys.']],
            ['warn', 'Shared or leftover accounts are an audit nightmare: you cannot tell who did what. **Every action should map to one person.**']
          ]
        },
        activity: {
          kind: 'match', pass: 100,
          prompt: 'Match each concept to its meaning.',
          pairs: [
            ['Least privilege', 'Only the access needed, only as long as needed'],
            ['Zero trust', 'Verify every request; trust no network by default'],
            ['RBAC', 'Permissions granted to roles, not individuals'],
            ['Segmentation', 'Limiting how far a compromised host can reach'],
            ['SSO', 'One identity used across many applications']
          ]
        }
      },

      {
        id: 'cloud', title: 'Cloud &amp; container security', minutes: 5,
        lesson: {
          hook: 'In the cloud you do not own the building, but you still own your configuration &mdash; and misconfiguration is the top cause of cloud breaches.',
          blocks: [
            ['p', 'The **shared responsibility model**: the provider secures the cloud (the platform); you secure what is **in** the cloud (your config, data, identities, code).'],
            ['list', ['**Public storage buckets** &mdash; the classic leak. Check who can read every bucket and object.', '**Over-permissive roles** &mdash; wildcard permissions like `*:*` on a service identity.', '**Secrets in code or CI** &mdash; keys committed to a repository. Use a secret manager.', '**Container escape** &mdash; running containers as root, or with the host socket mounted.']],
            ['do', ['Encrypt at rest and in transit by default.', 'Scope identities and permissions narrowly; prefer short-lived credentials.', 'Scan container images for vulnerabilities and never bake in secrets.', 'Turn on logging and alerting for your cloud account.']],
            ['dont', ['Do not make a bucket public "temporarily" and forget it.', 'Do not run containers as root or mount the Docker socket.', 'Do not store cloud keys in environment files committed to Git.']]
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'Under the shared responsibility model, the customer is responsible for…', options: ['The physical data centre', 'Their own configuration, data, identities and code', 'Nothing', 'Only the network cable'], a: 1, why: 'The provider secures the platform; you secure what you put in it.' },
            { q: 'Running a container as root is risky because…', options: ['It is slower', 'A container escape could grant root on the host', 'It needs more memory', 'It is not risky'], a: 1, why: 'Least privilege applies inside containers too.' },
            { q: 'The safest place for a cloud API key used by CI is…', options: ['In the repository', 'In the CI secret store / a vault with short-lived credentials', 'In a comment', 'In an email'], a: 1, why: 'Never commit secrets; use managed secrets and short-lived identity.' }
          ]
        }
      },

      {
        id: 'appsec', title: 'Secure development &amp; OWASP basics', minutes: 6,
        lesson: {
          hook: 'Most application breaches exploit a short list of well-known mistakes. Learn the list and you prevent most of them.',
          blocks: [
            ['p', 'The **OWASP Top 10** is the industry list of the most critical web application risks. The recurring theme: **never trust input.**'],
            ['viz', 'sqlinject'],
            ['p', 'Classic vulnerabilities:'],
            ['list', ['**Injection** (SQL, command) &mdash; untrusted input interpreted as code. Fix: parameterise.', '**Broken access control** &mdash; users reaching data or functions they should not. Fix: check authorisation on the server, every request.', '**Cross-site scripting (XSS)** &mdash; attacker script runs in a victim&#8217;s browser. Fix: encode output, use a framework&#8217;s escaping.', '**Security misconfiguration** &mdash; default credentials, debug on in production, verbose errors.', '**Vulnerable components** &mdash; using a library with a known CVE. Fix: patch and scan dependencies.', '**SSRF** &mdash; making the server fetch an attacker-chosen URL.']],
            ['do', ['Validate input; encode output.', 'Parameterise every database query &mdash; no string concatenation.', 'Check authorisation on the server for every action.', 'Scan dependencies and run security checks in CI (SAST/DAST).', 'Fail securely: deny by default.']],
            ['tip', 'Security is a design property, not a coat of paint. Threat-model the feature **before** you build it: what could go wrong, and who could abuse it?']
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'The correct fix for SQL injection is…', options: ['Filtering out quote characters', 'Using parameterised queries / prepared statements', 'Making the query shorter', 'Hiding error messages'], a: 1, why: 'Separating code from data, not blacklisting characters.' },
            { q: 'Broken access control is best prevented by…', options: ['Hiding the button in the UI', 'Enforcing authorisation on the server for every request', 'Using HTTPS', 'Obfuscating the URL'], a: 1, why: 'Client-side checks can be bypassed; the server must decide.' },
            { q: 'Cross-site scripting (XSS) is mitigated by…', options: ['Encoding output and using safe templating', 'Longer passwords', 'Using a CDN', 'Encrypting the database'], a: 0, why: 'Proper output encoding stops attacker script from executing.' }
          ]
        }
      },

      {
        id: 'vuln', title: 'Vulnerabilities, patching &amp; threat intel', minutes: 5,
        lesson: {
          hook: '"Patch or be breached." Attackers weaponise known vulnerabilities fast &mdash; often within hours.',
          blocks: [
            ['p', 'Understanding vocabulary makes triage manageable:'],
            ['list', ['**CVE** &mdash; a public identifier for a specific vulnerability.', '**CVSS** &mdash; a 0&ndash;10 severity score (rough guide, not the whole story).', '**Exploit** &mdash; working code that abuses the flaw.', '**Patch / mitigation** &mdash; the fix or stopgap.']],
            ['p', 'Attackers follow a chain of tactics. Break any link and the attack fails.'],
            ['viz', 'attackmatrix'],
            ['do', ['Patch promptly based on **risk**: exposed + critical + actively exploited = now.', 'Prioritise by exploitability, not just the CVSS number.', 'Watch threat intel for active exploitation of your vendors.', 'Verify the patch did not break anything (that is what staging is for).']],
            ['table', { head: ['Risk factor', 'Why it raises priority'], rows: [
              ['Internet-facing system', 'Directly reachable by attackers'],
              ['Actively exploited in the wild', 'Weaponised &mdash; no time to lose'],
              ['High privilege', 'Compromise is far worse'],
              ['Regulated data', 'Legal and reporting impact']
            ] }]
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'A CVE is…', options: ['A type of malware', 'A public identifier for a specific vulnerability', 'A patch', 'A firewall rule'], a: 1, why: 'CVE = Common Vulnerabilities and Exposures identifier.' },
            { q: 'The highest patching priority is usually…', options: ['The oldest server', 'An internet-facing system with an actively exploited flaw', 'Any optional update', 'The newest hardware'], a: 1, why: 'Exposure plus active exploitation means immediate action.' },
            { q: 'Breaking the attack chain means…', options: ['Removing all software', 'Stopping any one step so the attack cannot complete', 'Paying the ransom', 'Turning off logging'], a: 1, why: 'Defence in depth: blocking a single link breaks the chain.' }
          ]
        }
      },

      {
        id: 'detection', title: 'Detection &amp; response', minutes: 5,
        lesson: {
          hook: 'You cannot stop everything, so you must detect quickly and respond calmly.',
          blocks: [
            ['p', '**Detection** depends on **logging**: if it is not logged, it did not happen. **Response** depends on a playbook: knowing who to call and what to do.'],
            ['list', ['**Logging & SIEM** &mdash; centralise logs and alert on suspicious patterns.', '**Triage** &mdash; is this a real incident? How severe? What is affected?', '**Containment** &mdash; isolate the host or account to stop the spread.', '**Eradication & recovery** &mdash; remove the cause, restore from clean backups.', '**Post-incident review** &mdash; learn without blame.']],
            ['p', 'A practical phishing-triage routine for technical staff: check the real sender, the real link, the authentication results (SPF/DKIM/DMARC), and whether others received it.'],
            ['do', ['Log authentication, privilege changes, and admin actions.', 'Alert on the patterns attackers repeat: impossible travel, mass file access, new inbox rules.', 'Keep a tested, offline backup &mdash; ransomware hunts backups.', 'Run a blameless post-incident review every time.']],
            ['tip', 'The time from **first signal to first response** is the metric that matters. Design your on-call and reporting so it is minutes, not days.']
          ]
        },
        activity: {
          kind: 'order', pass: 100,
          prompt: 'Order the incident response lifecycle.',
          steps: [
            'Prepare (playbooks, contacts, backups, logging)',
            'Detect & identify what happened',
            'Contain the spread',
            'Eradicate the cause',
            'Recover and verify systems',
            'Learn from a blameless review'
          ],
          why: 'Prepare first, then detect, contain, eradicate, recover, and improve. Skipping preparation is why incidents feel chaotic.'
        }
      }
    ]
  });
})(window.CY);
