# Self-hosted fork

Based on upstream v5.0.0. Passwords require only four characters; this applies to
registration, first-login changes, password reset, account changes and admin
user management. Existing passwords and password hashing are unchanged.

The shared policy and frontend checklist use the same rule. Length messages
have been updated across locales. Unused upstream translation keys are retained
for compatibility, but their complexity rules are no longer displayed or enforced.

Build with:

```sh
docker build -f Dockerfile.self-hosted -t trek-selfhost:5.0.0-1 .
```

This runs policy and UI tests, rebuilds shared contracts and frontend, and layers
them onto the digest-pinned v5.0.0 runtime. The unchanged server imports its policy
from the rebuilt shared package. Use upstream's full Dockerfile if changing server
code in future; this layered build only rebuilds shared and client code.
