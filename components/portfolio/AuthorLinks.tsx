import { author, getAuthorLinks } from "@/lib/site/author";

type AuthorLinksProps = {
  labels: {
    website: string;
    email: string;
    linkedin: string;
    github: string;
    telegram: string;
    phone: string;
  };
  variant?: "inline" | "stack";
  className?: string;
};

export function AuthorLinks({
  labels,
  variant = "inline",
  className = "",
}: AuthorLinksProps) {
  const links = getAuthorLinks(labels);

  if (variant === "stack") {
    return (
      <ul className={`space-y-3 text-sm ${className}`}>
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(link.id === "phone" ? { dir: "ltr" } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          {...(link.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...(link.id === "phone" ? { dir: "ltr" } : {})}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function AuthorCredit({ builtByLabel }: { builtByLabel: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      {builtByLabel}{" "}
      <a
        href={author.website}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary transition-colors hover:text-primary-hover"
      >
        {author.name}
      </a>
    </p>
  );
}
