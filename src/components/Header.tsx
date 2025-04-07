"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, Home, FileEdit, Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false); // Close menu on route change
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12",
        scrolled ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group" aria-label="Home">
          <div className="relative w-8 h-8 overflow-hidden bg-primary rounded-md flex items-center justify-center">
            <FileText className="w-5 h-5 text-white transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span className="font-medium text-lg tracking-tight">TextToPaper</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/" exact>
            <Home className="w-4 h-4 mr-2" />
            <span>Home</span>
          </NavLink>
          <NavLink href="/lawyer/documents">
            <FileText className="w-4 h-4 mr-2" />
            <span>Templates</span>
          </NavLink>
          <NavLink href="/create">
            <FileEdit className="w-4 h-4 mr-2" />
            <span>AI Chat</span>
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-20 px-6 py-8 md:hidden flex flex-col",
          "transition-transform duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-1 items-center">
          <MobileNavLink href="/" exact onClick={() => setMobileMenuOpen(false)}>
            <Home className="w-5 h-5 mr-3" />
            <span>Home</span>
          </MobileNavLink>
          <MobileNavLink href="/templates" onClick={() => setMobileMenuOpen(false)}>
            <FileText className="w-5 h-5 mr-3" />
            <span>Templates</span>
          </MobileNavLink>
          <MobileNavLink href="/create" onClick={() => setMobileMenuOpen(false)}>
            <FileEdit className="w-5 h-5 mr-3" />
            <span>Create</span>
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, exact = false, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ href, exact = false, children, onClick }: NavLinkProps & { onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center w-full px-5 py-3 rounded-md text-base font-medium transition-all duration-200",
        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
