import React from "react";
import { Globe, Star, Github, History, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

interface NavbarProps {
  language: "en" | "ar";
  onLanguageToggle: () => void;
}

const Navbar = ({ language, onLanguageToggle }: NavbarProps) => {
  const location = useLocation();

  const handleGitHubClick = () => {
    window.open(
      "https://github.com/your-username/saas-idea-analyzer",
      "_blank",
      "noopener noreferrer"
    );
  };

  const isHistoryPage = location.pathname === "/history";

  // Determine text direction dynamically for RTL support
  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <nav
      dir={"ltr"}
      className="bg-[hsl(var(--navbar-bg))]/80 backdrop-blur-md shadow-sm border-b border-[hsl(var(--navbar-border))] sticky top-0 z-50"
      aria-label={t("mainNavigation") || "Main Navigation"}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left side: Logo */}
          <div className="flex items-center gap-3">
            <Logo />
          </div>

          {/* Right side: Buttons */}
          <div className="flex items-center gap-3">
            <Link to={isHistoryPage ? "/" : "/history"}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={isHistoryPage ? t("backHome") : t("showHistory")}
              >
                {isHistoryPage ? (
                  <>
                    <Home className="w-4 h-4" aria-hidden="true" />
                    {t("backHome") || "Back Home"}
                  </>
                ) : (
                  <>
                    <History className="w-4 h-4" aria-hidden="true" />
                    {t("showHistory") || "Show History"}
                  </>
                )}
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={onLanguageToggle}
              className="flex items-center gap-2 hover:bg-[hsl(var(--accent))] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={t("toggleLanguage") || "Toggle Language"}
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              {/* Dynamic text: e.g. show “English” if current is Arabic */}
              {language === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
