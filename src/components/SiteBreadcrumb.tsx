import React from "react";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";

interface SiteBreadcrumbItem {
  title: React.ReactNode;
  to?: string;
}

interface SiteBreadcrumbProps {
  items: SiteBreadcrumbItem[];
  style?: React.CSSProperties;
}

export function SiteBreadcrumb({ items, style }: SiteBreadcrumbProps) {
  return (
    <nav
      aria-label={translate({ id: "aria.breadcrumb", message: "面包屑导航" })}
      className="site-breadcrumb"
      style={style}>
      <ol className="site-breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <li className="site-breadcrumb-sep" aria-hidden="true">
                  /
                </li>
              )}
              <li className="site-breadcrumb-item">
                {!isLast && item.to ? (
                  <Link to={item.to} className="site-breadcrumb-link">
                    {item.title}
                  </Link>
                ) : (
                  <span className={isLast ? "site-breadcrumb-current" : undefined} aria-current={isLast ? "page" : undefined}>
                    {item.title}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
