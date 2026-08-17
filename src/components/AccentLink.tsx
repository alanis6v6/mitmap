import { Link, type LinkProps } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type AccentRouterLinkProps = LinkProps & { children: ReactNode };
type AccentAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/** 站內導覽用（react-router） */
export function AccentLink({
  children,
  className = "",
  ...props
}: AccentRouterLinkProps) {
  return (
    <Link className={`accent-link ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** 站外連結用（例如品牌官網、公開來源） */
export function AccentAnchor({
  children,
  className = "",
  ...props
}: AccentAnchorProps) {
  return (
    <a className={`accent-link ${className}`} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}
