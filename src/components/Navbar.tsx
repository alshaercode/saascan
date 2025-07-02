import React from "react";
import { Home, History, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const location = useLocation();
  const isHistoryPage = location.pathname === "/history";

  return (
    <nav
      dir="ltr"
      className="bg-[hsl(var(--navbar-bg))]/80 backdrop-blur-md shadow-sm border-b border-[hsl(var(--navbar-border))] sticky top-0 z-50"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          {/* Right: Buttons */}
          <div className="flex items-center gap-3">
            <Link to={isHistoryPage ? "/" : "/history"}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={isHistoryPage ? "Back Home" : "Show History"}
              >
                {isHistoryPage ? (
                  <>
                    <Home className="w-4 h-4" aria-hidden="true" />
                    Back Home
                  </>
                ) : (
                  <>
                    <History className="w-4 h-4" aria-hidden="true" />
                    Show History
                  </>
                )}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                window.open(
                  "https://github.com/your-username/saas-idea-analyzer",
                  "_blank",
                  "noopener noreferrer"
                )
              }
              className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
