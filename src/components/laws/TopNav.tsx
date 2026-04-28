import { Link, useLocation } from "react-router-dom";

const TopNav = () => {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/conversion", label: "Conversion" },
    { to: "/stack", label: "Stack" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-ink/10 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-acid" />
          <span className="font-grotesk text-xs font-bold uppercase tracking-wider">
            Ashok Singh
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-md px-2.5 py-1.5 font-grotesk text-[11px] font-bold uppercase tracking-wider transition-colors sm:text-xs ${
                  isActive
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-ink/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
