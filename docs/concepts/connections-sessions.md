---
title: Connections & sessions
sidebar_position: 2
---

# Connections & sessions

A *connection* tells abapctl which SAP system to talk to and how to authenticate. A *session* lets abapctl reuse one login across many calls.

## Connections

Connections live in `.abapctl.json` under the `connections` key. Each entry carries the host, SID, port, client, security flag, username, language, and a *reference* to the password, never the password itself:

```jsonc
{
  "connections": {
    "dev": {
      "host": "sap.example.com",
      "port": 443,
      "sid": "S4H",
      "client": "100",
      "secure": true,
      "username": "DEVELOPER",
      "password_env": "SAP_PASSWORD",
      "language": "EN"
    }
  },
  "defaults": { "connection": "dev" }
}
```

`defaults.connection` names the active connection. See [Configure](/docs/getting-started/configure) for the full schema and password sources.

### Switching connections

Switch the default, or override per call:

```bash
abapctl config set-connection sandbox     # change the default
abapctl object info ZCL_FOO -c sandbox    # override for one call
```

`-c <name>` wins over the configured default, the safe way to juggle several systems. Workspaces are also SID-aware, so a workspace initialized against `S4H` refuses to push against another SID.

## Sessions

Every SAP call needs an authenticated session. Without persistence, each invocation logs in from scratch: fine for a one-off command, costly when an agent or a loop makes dozens of calls.

### The CSRF flow

For any write, SAP requires a CSRF token. abapctl handles this automatically:

1. Request a token (`x-csrf-token: fetch`) and capture it.
2. Include the token on every write request.
3. If SAP rejects a write with a stale-token error (HTTP 403), refresh the token and retry.

You never manage tokens by hand.

### Persisting a session with `--session-file`

Pass `--session-file <path>` to persist the CSRF token and cookies as JSON. On the next invocation, abapctl restores that state and **skips the login entirely**:

```bash
SESSION=$(mktemp)
abapctl object info ZCL_FOO   --json --session-file $SESSION
abapctl check atc  ZCL_FOO    --json --session-file $SESSION
abapctl source get ZCL_FOO          --session-file $SESSION
```

This saves roughly **8 seconds per call** on slow-login systems: the difference between a snappy agent loop and one that spends most of its time re-authenticating.

Instead of passing the flag each time, set `defaults.session_file` in `.abapctl.json` (default `.abapctl/.session.json`).

### Stale-session auto-recovery

A persisted session can go stale (token expired, cookies invalidated server-side). abapctl recovers transparently: on a 403/CSRF failure it refreshes the token, and if that still fails it falls back to a full re-login. No need to delete the session file or intervene.

## Related concepts

- [Configure](/docs/getting-started/configure): connection schema and password resolution.
- [Architecture](./architecture): where the SAP client sits in the stack.
- [JSON & safety](./json-and-safety): the agent loop that benefits most from `--session-file`.
