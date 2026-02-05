import Link from "next/link";
import React from "react";

type GameShellAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type GameShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: GameShellAction[];
};

const GameShell = ({ title, subtitle, children, actions }: GameShellProps) => {
  const shellActions =
    actions && actions.length > 0
      ? actions
      : [
          {
            label: "Back to Portfolio",
            href: "/",
            variant: "primary" as const,
          },
        ];

  return (
    <section className="game-shell">
      <header className="game-shell__header">
        <p className="game-shell__eyebrow">Games</p>
        <h1 className="game-shell__title">{title}</h1>
        {subtitle ? <p className="game-shell__subtitle">{subtitle}</p> : null}
      </header>
      <div className="game-shell__panel">
        {children}
        <div className="game-shell__actions">
          {shellActions.map((action) => (
            <Link
              key={action.href}
              className={action.variant === "secondary" ? "btn-secondary" : "btn-primary"}
              href={action.href}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameShell;
