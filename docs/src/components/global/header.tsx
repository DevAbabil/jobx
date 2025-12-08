'use client';
import { Code2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({}, '', '/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={handleLogoClick}
          >
            <Code2 className="w-6 h-6 text-accent" />
            <span className="font-bold text-lg">JobX</span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <a
              href="#features"
              className="text-sm hover:text-accent transition"
            >
              Features
            </a>
            <a
              href="#installation"
              className="text-sm hover:text-accent transition"
            >
              Install
            </a>
            <a
              href="#structure"
              className="text-sm hover:text-accent transition"
            >
              Structure
            </a>
            <a
              href="#commands"
              className="text-sm hover:text-accent transition"
            >
              Commands
            </a>
            <a href="#config" className="text-sm hover:text-accent transition">
              Config
            </a>
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#features"
              className="block text-sm hover:text-accent transition py-2"
            >
              Features
            </a>
            <a
              href="#installation"
              className="block text-sm hover:text-accent transition py-2"
            >
              Install
            </a>
            <a
              href="#structure"
              className="block text-sm hover:text-accent transition py-2"
            >
              Structure
            </a>
            <a
              href="#commands"
              className="block text-sm hover:text-accent transition py-2"
            >
              Commands
            </a>
            <a
              href="#config"
              className="block text-sm hover:text-accent transition py-2"
            >
              Config
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
