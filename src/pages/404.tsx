import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const LINKS = [
  {to: '/docs/getting-started/overview', label: 'Getting started'},
  {to: '/docs/guides', label: 'Guides'},
  {to: '/docs/command-reference', label: 'Command reference'},
  {to: '/docs/use-cases', label: 'Agentic use cases'},
];

export default function NotFound(): ReactNode {
  return (
    <Layout title="Page not found" description="This page could not be found.">
      <main className="ac-notfound">
        <div className="container ac-notfound__inner">
          <p className="ac-notfound__code">404</p>
          <Heading as="h1" className="ac-notfound__title">
            No object at that path.
          </Heading>
          <p className="ac-notfound__lead">
            The page you asked for does not exist, or it moved. Try the search
            box in the top bar, or head to one of these:
          </p>
          <div className="ac-notfound__links">
            {LINKS.map((l) => (
              <Link key={l.to} className="ac-btn ac-btn--ghost" to={l.to}>
                {l.label}
              </Link>
            ))}
          </div>
          <p className="ac-notfound__note">
            Looking for the Workshop? It is now the{' '}
            <Link to="/docs/use-cases">Agentic use cases</Link>.
          </p>
        </div>
      </main>
    </Layout>
  );
}
