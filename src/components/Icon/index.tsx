import type {ReactNode} from 'react';

/**
 * A small monochrome line-icon set drawn in a single visual language:
 * 24x24 viewBox, 2px round strokes, `currentColor` so each icon takes the
 * color of its context. Used by the landing feature cards and the swizzled
 * DocCard, so the site has one icon system instead of OS-dependent emoji.
 */

export type IconName =
  | 'read'
  | 'write'
  | 'check'
  | 'transport'
  | 'clean-core'
  | 'agent'
  | 'doc'
  | 'category'
  | 'external';

type Props = {
  name: IconName;
  className?: string;
  size?: number;
};

const PATHS: Record<IconName, ReactNode> = {
  // magnifier over a page: read & navigate
  read: (
    <>
      <path d="M5 3h9l5 5v7" />
      <path d="M14 3v5h5" />
      <circle cx="9" cy="15" r="3.2" />
      <path d="M11.4 17.4 14 20" />
    </>
  ),
  // pencil: write
  write: (
    <>
      <path d="M4 20h4L19 9a2 2 0 0 0-3-3L5 17v3z" />
      <path d="M14.5 7.5 17 10" />
    </>
  ),
  // check in circle: quality gates
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5 11 15l5-5.5" />
    </>
  ),
  // box with arrow: transports
  transport: (
    <>
      <path d="M3.5 7.5 12 4l8.5 3.5v9L12 20l-8.5-3.5v-9z" />
      <path d="M3.5 7.5 12 11l8.5-3.5" />
      <path d="M12 11v9" />
    </>
  ),
  // sparkle: clean core
  'clean-core': (
    <>
      <path d="M12 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5z" />
      <path d="M18.5 15.5c.2 1.5 1 2.3 2.5 2.5-1.5.2-2.3 1-2.5 2.5-.2-1.5-1-2.3-2.5-2.5 1.5-.2 2.3-1 2.5-2.5z" />
    </>
  ),
  // terminal prompt: agent-ready / CLI
  agent: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M7.5 9.5 10 12l-2.5 2.5" />
      <path d="M12.5 14.5H16" />
    </>
  ),
  // document: doc-link fallback
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  // stacked layers: category fallback
  category: (
    <>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16 8.5 4.5 8.5-4.5" />
    </>
  ),
  // arrow out of box: external link
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
};

export default function Icon({name, className, size = 24}: Props): ReactNode {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false">
      {PATHS[name]}
    </svg>
  );
}
