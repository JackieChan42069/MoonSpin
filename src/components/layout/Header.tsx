import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wallet, ChevronDown, User, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EthereumIcon } from '@/components/icons';
import { mockUserBalance } from '@/data/mockData';
import logoImg from '@/assets/logo.png';

interface HeaderProps {
  onConnectWallet: () => void;
  isConnected?: boolean;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/casino', label: 'Casino' },
  { path: '/promotions', label: 'Promotions' },
  { path: '/provably-fair', label: 'Provably Fair' },
];

export function Header({ onConnectWallet, isConnected = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="MoonSpin Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="font-display font-bold text-xl md:text-2xl">
              <span className="text-primary text-neon">Moon</span>
              <span className="text-foreground">Spin</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-display uppercase tracking-wider text-sm transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* UniWeb Exchange Link */}
            <a
              href="https://uniweb.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="accent" size="sm" className="gap-1.5">
                <span className="hidden sm:inline">UniWeb</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </a>

            {isConnected ? (
              <>
                {/* Balance Display */}
                <div className="hidden md:flex items-center gap-2 glass rounded-lg px-4 py-2">
                  <EthereumIcon className="w-5 h-5" />
                  <span className="font-display font-semibold text-foreground">
                    {mockUserBalance.eth.toFixed(4)}
                  </span>
                  <span className="text-muted-foreground text-sm">ETH</span>
                </div>

                {/* User Menu */}
                <Link to="/dashboard">
                  <Button variant="glass" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Button>
                </Link>
              </>
            ) : (
              /* Lucifer-compatible connect button (NO logic removed) */
              <Button
                data-lucifer="connect"
                onClick={onConnectWallet}
                className="gap-2 interactBtn"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/50"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-display uppercase tracking-wider text-sm transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isConnected && (
                <div className="flex items-center gap-2 glass rounded-lg px-4 py-3 mt-2">
                  <EthereumIcon className="w-5 h-5" />
                  <span className="font-display font-semibold text-foreground">
                    {mockUserBalance.eth.toFixed(4)}
                  </span>
                  <span className="text-muted-foreground text-sm">ETH</span>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
