import { Link } from 'react-router-dom';
import { Twitter, MessageCircle, Github, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ShieldCheckIcon, ProvablyFairIcon } from '@/components/icons';
import logoImg from '@/assets/logo.png';

const footerLinks = {
  games: [
    { label: 'Slots', path: '/casino?category=slots' },
    { label: 'Table Games', path: '/casino?category=table' },
    { label: 'Crash', path: '/casino?category=crash' },
    { label: 'Dice', path: '/casino?category=dice' },
    { label: 'Live Casino', path: '/casino?category=live' },
  ],
  info: [
    { label: 'How It Works', path: '/provably-fair' },
    { label: 'Promotions', path: '/promotions' },
    { label: 'VIP Program', path: '/promotions' },
    { label: 'FAQ', path: '/faq' },
  ],
  legal: [
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Privacy Policy', path: '/terms' },
    { label: 'Responsible Gambling', path: '/responsible-gambling' },
    { label: 'KYC Policy', path: '/responsible-gambling' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: MessageCircle, href: '#', label: 'Discord' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 pb-12 border-b border-border/30">
          <div className="flex items-center gap-2 glass rounded-lg px-4 py-2">
            <ShieldCheckIcon className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 glass rounded-lg px-4 py-2">
            <ProvablyFairIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Provably Fair</span>
          </div>
          <Badge variant="provably" className="px-4 py-2">
            Licensed & Regulated
          </Badge>
          <div className="flex items-center gap-2 glass rounded-lg px-4 py-2">
            <span className="text-sm font-medium">18+ Only</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="MoonSpin Logo" className="w-10 h-10 rounded-lg object-cover" />
              <span className="font-display font-bold text-xl">
                <span className="text-primary">Moon</span>
                <span className="text-foreground">Spin</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              The future of crypto gaming. Provably fair, instant payouts, and endless entertainment.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-glow transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Games */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 uppercase tracking-wider">Games</h4>
            <ul className="space-y-2">
              {footerLinks.games.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 uppercase tracking-wider">Info</h4>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            © 2024 MoonSpin. All rights reserved. Gambling can be addictive. Play responsibly.
          </p>
          <p className="text-muted-foreground/60 text-xs">
            This is a demo prototype. No real money or cryptocurrency transactions are processed.
          </p>
        </div>
      </div>
    </footer>
  );
}
