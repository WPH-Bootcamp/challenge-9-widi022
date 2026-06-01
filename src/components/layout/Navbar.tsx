import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/feature/Logo";

export interface NavbarProps {
  className?: string;
}

function useScrollY() {
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}

export function Navbar({ className }: NavbarProps) {
  const y = useScrollY();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isScrolled = y > 8;

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={
        "sticky top-0 z-50 border-b transition-colors " +
        (isScrolled
          ? "border-white/10 bg-black/50 backdrop-blur"
          : "border-transparent bg-black/0 backdrop-blur") +
        (className ? ` ${className}` : "")
      }
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Desktop */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              className="flex items-center"
              onClick={() => {
                setMenuOpen(false);
              }}
              aria-label="Home"
            >
              <Logo className="h-8 w-auto" />
            </button>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <button
              type="button"
              className="flex items-center"
              aria-label="Home"
            >
              <Logo className="h-8 w-auto" />
            </button>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <a href="#" className="hover:text-primary">
                Home
              </a>
              <a href="#" className="hover:text-primary">
                Favorite
              </a>
            </nav>
          </div>

          {/* Search (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="relative w-80 max-w-[40vw]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search"
                className="h-10 w-full rounded-md border border-input bg-background/60 pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Search"
              />
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
              }}
              aria-label="Search"
            >
              {/* <Search className="h-5 w-5" /> */}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background/95 backdrop-blur border-l"
            >
              <div className="flex items-center justify-between gap-3 border-b p-4">
                <Logo className="h-8 w-auto" />

                {/* menu */}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-4">
                <div className="mb-4 rounded-lg border bg-card/50 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Search className="h-4 w-4" />
                    <span>Search (placeholder)</span>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    Favorite
                  </a>
                </nav>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
