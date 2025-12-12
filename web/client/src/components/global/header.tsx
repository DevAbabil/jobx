'use client';
import { Code2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-accent" />
            <span className="font-bold text-lg">JobX</span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/features"
              className="text-sm hover:text-accent transition"
            >
              Features
            </Link>
            <Link
              href="/installation"
              className="text-sm hover:text-accent transition"
            >
              Install
            </Link>
            <Link
              href="/structure"
              className="text-sm hover:text-accent transition"
            >
              Structure
            </Link>
            <Link
              href="/commands"
              className="text-sm hover:text-accent transition"
            >
              Commands
            </Link>
            <Link
              href="/config"
              className="text-sm hover:text-accent transition"
            >
              Config
            </Link>
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
            <Link
              href="/features"
              className="block text-sm hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/installation"
              className="block text-sm hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Install
            </Link>
            <Link
              href="/structure"
              className="block text-sm hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Structure
            </Link>
            <Link
              href="/commands"
              className="block text-sm hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Commands
            </Link>
            <Link
              href="/config"
              className="block text-sm hover:text-accent transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Config
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
