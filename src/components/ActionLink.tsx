import React from "react";
import Link from "@docusaurus/Link";

interface ActionLinkProps {
  to: string;
  variant?: "primary" | "secondary" | "plain";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function ActionLink({ to, variant = "secondary", icon, children }: ActionLinkProps) {
  return (
    <Link
      to={to}
      className={`button site-action-link site-action-link--${variant}`}>
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </Link>
  );
}
