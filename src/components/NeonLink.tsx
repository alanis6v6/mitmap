import { Link, type LinkProps } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type NeonRouterLinkProps = LinkProps & { children: ReactNode };
type NeonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/** 站內導覽用（react-router） */
export function NeonLink({ children, className = "", ...props }: NeonRouterLinkProps) {
  return (
    <Link className={`neon-link ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** 站外連結用（例如品牌官網、公開來源） */
export function NeonAnchor({ children, className = "", ...props }: NeonAnchorProps) {
  return (
    <a className={`neon-link ${className}`} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}
