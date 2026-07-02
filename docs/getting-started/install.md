---
title: Install
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install

Download the binary for your platform and put it on your `PATH`. Each binary is self-contained: it bundles the runtime, so there is nothing else to install.

<Tabs groupId="os" queryString>
  <TabItem value="linux" label="Linux (x64)" default>

```bash
curl -fsSLo abapctl https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL/releases/latest/download/abapctl-linux-x64
chmod +x abapctl
sudo mv abapctl /usr/local/bin/
abapctl --version
```

  </TabItem>
  <TabItem value="macos-arm" label="macOS (Apple Silicon)">

```bash
curl -fsSLo abapctl https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL/releases/latest/download/abapctl-macos-arm64
chmod +x abapctl
xattr -d com.apple.quarantine abapctl 2>/dev/null || true
sudo mv abapctl /usr/local/bin/
abapctl --version
```

  </TabItem>
  <TabItem value="macos-intel" label="macOS (Intel)">

```bash
curl -fsSLo abapctl https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL/releases/latest/download/abapctl-macos-x64
chmod +x abapctl
xattr -d com.apple.quarantine abapctl 2>/dev/null || true
sudo mv abapctl /usr/local/bin/
abapctl --version
```

  </TabItem>
  <TabItem value="windows" label="Windows (x64)">

```powershell
Invoke-WebRequest -Uri https://github.com/aws-for-sap/Automate-SAP-development-workflows-using-ABAP-CTL/releases/latest/download/abapctl-windows-x64.exe -OutFile abapctl.exe
.\abapctl.exe --version
```

Move `abapctl.exe` somewhere on your `PATH`.

  </TabItem>
</Tabs>

## Tab completion (one-time)

abapctl ships shell completion for bash, zsh, and fish. Set it up once:

<Tabs groupId="shell">
  <TabItem value="bash" label="bash" default>

```bash
echo 'source <(abapctl completion bash)' >> ~/.bashrc
```

  </TabItem>
  <TabItem value="zsh" label="zsh">

```bash
echo 'source <(abapctl completion zsh)' >> ~/.zshrc
```

  </TabItem>
  <TabItem value="fish" label="fish">

```bash
abapctl completion fish > ~/.config/fish/completions/abapctl.fish
```

  </TabItem>
</Tabs>

Reopen your terminal. Tab now completes commands, subcommands, and flag values.

## Next step

Once `abapctl --version` prints a version, [configure a connection](./configure) to point it at a development SAP system.
