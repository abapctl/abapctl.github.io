---
title: Configure
sidebar_position: 3
---

# Configure

abapctl reads connection details from a `.abapctl.json` file in your project root. The password is never stored in the file, only a *reference* to where it lives.

## Create the config

```bash
abapctl init
```

This writes a `.abapctl.json` template. Edit it to point at your development or sandbox system:

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

### Port defaults

`port` is optional. It defaults to:

- `443` when `secure: true`
- `8000` when `secure: false`

Set it explicitly if your SAP system listens on a non-standard ADT port (common for on-prem instances on the 8000–8099 or 50000-range).

## Password source

There are two password sources, and **`password_aws_secret` takes precedence over `password_env`**.

### AWS Secrets Manager (recommended)

Add `password_aws_secret` to the connection. abapctl fetches the password at run time via the `aws` CLI, inheriting your AWS region, profile, and SSO settings, with no AWS SDK dependency:

```jsonc
"dev": { "host": "...", "sid": "S4H", "client": "100", "username": "DEVELOPER",
         "password_aws_secret": "sap/dev" }
```

For a multi-entry (JSON key/value) secret, also set `"password_aws_key": "<entry-name>"` to pick which value is the password. For a plain-string or single-entry secret, omit it and abapctl auto-detects the value.

The secret value is fetched into memory only. It is never written to disk, logged, or placed in an error message.

### Environment variable

Set `password_env` to the variable name (default `ABAPCTL_PASSWORD`) and export it:

```bash
export SAP_PASSWORD=$(aws secretsmanager get-secret-value --secret-id sap/dev --query SecretString --output text)
```

### Precedence

If you set `password_aws_secret`, the `password_env` variable is **ignored**. abapctl warns when both a secret and a non-default env var are configured. `abapctl init` and `abapctl config add-connection` prompt you to choose a source interactively.

## Verify the connection

```bash
abapctl system-check
abapctl object info ZCL_FOO       # first read confirms it works
```

## Multiple connections

Set up multiple systems under `connections` and switch the active default:

```bash
abapctl config show                       # show active + all connections
abapctl config set-connection sandbox     # switch the default
```

Most commands also accept `-c <connection-name>` to override the default for a single call:

```bash
abapctl object info ZCL_FOO -c sandbox
```

Configuration resolution follows the order: **CLI flags → project `.abapctl.json` → built-in defaults.**

## Next step

[Run your first commands](./quickstart).
