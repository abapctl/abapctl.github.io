import type {ReactNode} from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {useDocCardDescriptionCategoryItemsPlural} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Layout from '@theme/DocCard/Layout';
import type {Props} from '@theme/DocCard';
import Icon, {type IconName} from '@site/src/components/Icon';

// Replace Docusaurus's emoji fallbacks (📄 doc, 🗃 category, 🔗 link) with our
// monochrome SVG icon set, so auto-generated category pages match the site's
// icon language. Any leading emoji an author puts in a label is ignored here;
// we key purely off the item type.
function iconFor(item: Props['item']): ReactNode {
  let name: IconName = 'doc';
  if (item.type === 'category') {
    name = 'category';
  } else if (item.type === 'link' && !isInternalUrl(item.href)) {
    name = 'external';
  }
  return <Icon name={name} size={20} />;
}

function CardCategory({item}: {item: Props['item'] & {type: 'category'}}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  if (!href) {
    return null;
  }
  return (
    <Layout
      item={item}
      className={item.className}
      href={href}
      icon={iconFor(item)}
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({item}: {item: Props['item'] & {type: 'link'}}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <Layout
      item={item}
      className={item.className}
      href={item.href}
      icon={iconFor(item)}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
