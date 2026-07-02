import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Icon, {type IconName} from '@site/src/components/Icon';

type Feature = {
  icon: IconName;
  title: string;
  cmd: string;
  body: string;
  to: string;
};

const FEATURES: Feature[] = [
  {
    icon: 'read',
    title: 'Read & navigate',
    cmd: 'source get · code complete',
    body: 'Download source, browse packages, jump to definitions, find references, and get compiler-authoritative completions at any cursor position.',
    to: '/docs/guides/read-navigate',
  },
  {
    icon: 'write',
    title: 'Write safely',
    cmd: 'source put · push',
    body: 'The full lock → write → unlock → activate cycle, handled for you, so a failed write releases its lock instead of leaving the object stuck. Batch activation for RAP stacks.',
    to: '/docs/guides/edit-source',
  },
  {
    icon: 'check',
    title: 'Quality gates',
    cmd: 'check atc · unit · syntax',
    body: 'Syntax, ATC, ABAP Unit, and CDS-DDL checks with stable JSON and exit codes any CI/CD pipeline can gate on.',
    to: '/docs/guides/quality-checks',
  },
  {
    icon: 'transport',
    title: 'Transports',
    cmd: 'transport create · release',
    body: 'Create, inspect, release, and delete transport requests, with client-side validation and a recursive delete that clears stale locks.',
    to: '/docs/guides/transports',
  },
  {
    icon: 'clean-core',
    title: 'Clean Core',
    cmd: 'clean-core assess · apply',
    body: "Classify a package against SAP's A–D maturity model, prepare fix context for each object, and drive the remediation loop with an AI agent.",
    to: '/docs/guides/clean-core',
  },
  {
    icon: 'agent',
    title: 'Agent-ready',
    cmd: 'tools list --json',
    body: "Every command is safety-annotated (READ / DESTR / IDEMP), speaks --json, and previews writes with --dry-run. Drop the catalog into your agent's tool registry.",
    to: '/docs/guides/ai-agents',
  },
];

function Hero(): ReactNode {
  return (
    <header className="ac-hero">
      <div className="container ac-hero__inner">
        <div className="ac-hero__col">
          <p className="ac-status">
            <span className="ac-status__dot" aria-hidden="true" />
            Headless · agentic · JSON-first
          </p>
          <Heading as="h1" className="ac-hero__title">
            The ABAP engine
            <br />
            for AI agents.
          </Heading>
          <p className="ac-hero__lead">
            State your goal; your agent does the SAP work. <code>abapctl</code>{' '}
            is the deterministic CLI underneath, connecting your terminal,
            scripts, and AI agents to SAP's development interfaces over HTTPS.
          </p>
          <div className="ac-hero__cta">
            <Link
              className="ac-btn ac-btn--accent"
              to="/docs/getting-started/overview">
              Get started
            </Link>
            <Link className="ac-btn ac-btn--ghost" to="/docs/command-reference">
              Browse commands
            </Link>
          </div>
          <p className="ac-hero__note">
            Install for{' '}
            <Link
              className="ac-hero__noteLink"
              to="/docs/getting-started/install?os=linux">
              Linux
            </Link>
            {' · '}
            <Link
              className="ac-hero__noteLink"
              to="/docs/getting-started/install?os=macos-arm">
              macOS
            </Link>
            {' · '}
            <Link
              className="ac-hero__noteLink"
              to="/docs/getting-started/install?os=windows">
              Windows
            </Link>
          </p>
        </div>
        <IntentPanel />
      </div>
    </header>
  );
}

// The signature visual: intent in plain language on top, the deterministic
// abapctl commands it resolves into below, then the result. This is the
// two-layer model made concrete. Decorative, so hidden from assistive tech
// (the same story is in the prose).
function IntentPanel(): ReactNode {
  return (
    <div className="ac-panel" aria-hidden="true">
      <div className="ac-panel__bar">
        <span className="ac-panel__name">abapctl</span>
        <span className="ac-panel__conn">
          <span className="ac-panel__live" /> S4H · connected
        </span>
      </div>
      <div className="ac-panel__body">
        <p className="ac-panel__intent">
          <span className="ac-panel__caret">❯</span> Assess ZFINANCE for Clean
          Core and remediate the blockers under a transport, dry-run first
        </p>
        <p className="ac-panel__label">the agent runs</p>
        <ul className="ac-panel__cmds">
          <li>
            <span className="ac-panel__cmd">clean-core assess ZFINANCE</span>
            <span className="ac-ipill ac-ipill--read">READ</span>
          </li>
          <li>
            <span className="ac-panel__cmd">clean-core prep S4H/ZFINANCE</span>
          </li>
          <li>
            <span className="ac-panel__cmd">clean-core apply S4H/ZFINANCE</span>
            <span className="ac-ipill ac-ipill--destr">DESTR</span>
            <span className="ac-panel__flag">--dry-run</span>
          </li>
          <li>
            <span className="ac-panel__cmd">check atc ZCL_FIN_POSTING</span>
            <span className="ac-ipill ac-ipill--read">READ</span>
          </li>
        </ul>
        <p className="ac-panel__result">
          <span className="ac-panel__ok">✓</span> 24 objects · D:2 → 0 · gated
          on ATC, one transport
        </p>
      </div>
    </div>
  );
}

function Features(): ReactNode {
  return (
    <section className="ac-section">
      <div className="container">
        <div className="ac-section__head">
          <p className="ac-eyebrow">// what it covers</p>
          <Heading as="h2">Headless and scriptable, by design.</Heading>
          <p>
            A broad command set spanning source, checks, transports, DDIC, CDS,
            RAP, OData, and Clean Core. Every action is a direct, audited call
            to your SAP system, and every result is machine-readable.
          </p>
        </div>
        <div className="ac-grid">
          {FEATURES.map((f) => (
            <Link className="ac-card" to={f.to} key={f.title}>
              <span className="ac-card__icon">
                <Icon name={f.icon} size={24} />
              </span>
              <Heading as="h3">{f.title}</Heading>
              <p className="ac-card__cmd">{f.cmd}</p>
              <p>{f.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Architecture(): ReactNode {
  return (
    <section className="ac-section ac-section--divided">
      <div className="container">
        <div className="ac-section__head">
          <p className="ac-eyebrow">// how it fits</p>
          <Heading as="h2">A deterministic primitive. Agents on top.</Heading>
          <p>
            <code>abapctl</code> does the mechanical work (connect, read, write,
            check, activate) with no reasoning of its own. An AI agent adds the
            reasoning and orchestration on top. Use the CLI directly in
            pipelines, or let an agent drive it.
          </p>
        </div>
        <div className="ac-stack">
          <div className="ac-stack__layer ac-stack__layer--agent">
            <p className="ac-stack__label">AI agent: reasoning &amp; orchestration</p>
            <p>Reasoning, multi-step planning, released-API research, remediation.</p>
          </div>
          <div className="ac-stack__arrow" aria-hidden="true">↓</div>
          <div className="ac-stack__layer ac-stack__layer--cli">
            <p className="ac-stack__label">abapctl: deterministic primitive</p>
            <p>Direct SAP calls over HTTPS. No reasoning. --json, --dry-run, safety flags.</p>
          </div>
          <div className="ac-stack__arrow" aria-hidden="true">↓</div>
          <div className="ac-stack__layer ac-stack__layer--sap">
            <p className="ac-stack__label">SAP system: ADT &amp; OData over HTTPS</p>
            <p>Every call captured in your SAP audit trail and a local log.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing(): ReactNode {
  return (
    <section className="ac-closing">
      <div className="container ac-closing__inner">
        <Heading as="h2">Point it at a SAP system and go.</Heading>
        <p>
          Install the binary, add a connection, and run your first command in
          minutes. Or hand the command catalog to an agent and let it drive.
        </p>
        <div className="ac-hero__cta">
          <Link
            className="ac-btn ac-btn--accent"
            to="/docs/getting-started/overview">
            Get started
          </Link>
          <Link className="ac-btn ac-btn--ghost" to="/docs/use-cases">
            See the use cases
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="The ABAP engine for AI agents"
      description="abapctl is a standalone CLI for SAP ADT: read, navigate, refactor, and write ABAP; run ATC and unit checks; manage transports; assess Clean Core; query OData. Headless, JSON-first, agent-ready.">
      <Hero />
      <main>
        <Features />
        <Architecture />
        <Closing />
      </main>
    </Layout>
  );
}
