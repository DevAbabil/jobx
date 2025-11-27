import { GithubIcon, Heart, Cpu as Npm } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">JobX</h3>
            <p className="text-sm text-muted-foreground">
              Automate your job hunt with AI-powered automation and tracking
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/DevAbabil/jobx"
                  className="text-muted-foreground hover:text-accent transition"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/jobx"
                  className="text-muted-foreground hover:text-accent transition"
                >
                  NPM Package
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://github.com/DevAbabil/jobx/blob/master/CONTRIBUTING.md"
                  className="text-muted-foreground hover:text-accent transition"
                >
                  Contributing
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/DevAbabil/jobx/issues"
                  className="text-muted-foreground hover:text-accent transition"
                >
                  Report Issues
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Connect</h4>
            <div className="flex gap-4">
              <Link
                href="https://github.com/DevAbabil/jobx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition"
              >
                <GithubIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.npmjs.com/package/jobx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition"
              >
                <Npm className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2 mb-2">
            Made with <Heart className="w-4 h-4 text-accent" /> by{' '}
            <Link
              href={'https://devababil.com'}
              className="font-semibold underline"
            >
              Ababil Hossain
            </Link>
          </p>
          <p>License: MIT • Built with TypeScript • Open Source</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
