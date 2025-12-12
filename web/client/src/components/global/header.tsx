'use client';
import { Code2, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { authApi, useAppDispatch, userApi } from '@/redux';
import { extractError } from '@/utils';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

const Header = () => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = userApi.useMyProfileQuery();
  const [signout] = authApi.useSignoutMutation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname.startsWith('/dashboard');
    }
    return pathname === path || pathname.startsWith(path);
  };

  const getLinkClassName = (path: string, isMobile = false) => {
    const baseClasses = isMobile
      ? 'block text-sm transition py-2 relative'
      : 'text-sm transition relative';

    const activeClasses = isActive(path)
      ? 'text-accent border-b-2 border-accent'
      : 'hover:text-accent';

    return `${baseClasses} ${activeClasses}`;
  };

  const handleSignOut = async () => {
    try {
      await signout().unwrap();
      dispatch(userApi.util.resetApiState());
      toast.success('Signed out successfully');
      router.push('/login');
    } catch (error) {
      toast.error(extractError(error) || 'Failed to sign out');
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-accent" />
            <span className="font-bold text-lg">JobX</span>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/features" className={getLinkClassName('/features')}>
              Features
            </Link>
            <Link
              href="/installation"
              className={getLinkClassName('/installation')}
            >
              Install
            </Link>
            <Link href="/structure" className={getLinkClassName('/structure')}>
              Structure
            </Link>
            <Link href="/commands" className={getLinkClassName('/commands')}>
              Commands
            </Link>
            <Link href="/config" className={getLinkClassName('/config')}>
              Config
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={getLinkClassName('/dashboard')}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <Link
                href={'/'}
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className="block text-sm hover:text-accent transition py-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

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
              className={getLinkClassName('/features', true)}
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/installation"
              className={getLinkClassName('/installation', true)}
              onClick={() => setMenuOpen(false)}
            >
              Install
            </Link>
            <Link
              href="/structure"
              className={getLinkClassName('/structure', true)}
              onClick={() => setMenuOpen(false)}
            >
              Structure
            </Link>
            <Link
              href="/commands"
              className={getLinkClassName('/commands', true)}
              onClick={() => setMenuOpen(false)}
            >
              Commands
            </Link>
            <Link
              href="/config"
              className={getLinkClassName('/config', true)}
              onClick={() => setMenuOpen(false)}
            >
              Config
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={getLinkClassName('/dashboard', true)}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <Link
                href={'/'}
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className="block text-sm hover:text-accent transition py-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
