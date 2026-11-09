import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigateTo } from '@/utils/router';

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

export default function SiteLink({ to, onClick, ...rest }: SiteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || modified || event.button !== 0) return;
    event.preventDefault();
    navigateTo(to);
  };

  return <a href={to} {...rest} onClick={handleClick} />;
}
