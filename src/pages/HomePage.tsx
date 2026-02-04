import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Zap, Gift, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GameCard } from '@/components/GameCard';
import { PromotionCarousel } from '@/components/PromotionCarousel';
import { ShieldCheckIcon, ProvablyFairIcon } from '@/components/icons';
import { mockGames } from '@/data/mockData';

interface HomePageProps {
  onConnectWallet: () => void;
}

const trustFeatures = [
  {
    icon: ProvablyFairIcon,
    title: 'Provably Fair',
    description: 'Verify every bet with on-chain transparency',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Withdraw winnings directly to your wallet',
  },
  {
    icon: Shield,
    title: 'Secure & Licensed',
    description: 'Bank-grade encryption & regulatory compliance',
  },
  {
    icon: Gift,
    title: 'Generous Bonuses',
    description: 'Up to 20% welcome bonus on first deposit',
  },
];

const stats = [
  { value: '$50M+', label: 'Total Wagered' },
  { value: '100K+', label: 'Active Players' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<1min', label: 'Avg Payout' },
];

export function HomePage({ onConnectWallet }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="neon" className="mb-6 px-4 py-2">
                🎰 The Future of Crypto Gaming
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
            >
              <span className="text-foreground">Play.</span>{' '}
              <span className="text-primary text-neon">Win.</span>{' '}
              <span className="text-accent text-neon-accent">Withdraw.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Experience provably fair gaming with instant crypto payouts. 
              Connect your wallet and start playing in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="hero" size="xl" onClick={onConnectWallet} className="gap-2">
                <Play className="w-5 h-5" />
                Start Playing
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/provably-fair" className="gap-2">
                  How It Works
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="glass rounded-xl p-4 md:p-6 text-center">
                <div className="font-display font-bold text-2xl md:text-4xl text-primary text-neon mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Promotions Carousel */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <PromotionCarousel />
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
                Featured Games
              </h2>
              <p className="text-muted-foreground">Most popular games right now</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/casino" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGames.slice(0, 6).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Why Choose NeonWager?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for transparency, designed for winners. Every feature crafted to give you the best gaming experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-hover rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="glass gradient-border rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            
            <div className="relative">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground mb-4">
                Ready to Start Winning?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Join thousands of players and experience the thrill of provably fair crypto gaming.
              </p>
              <Button variant="hero" size="xl" onClick={onConnectWallet} className="gap-2">
                Connect Wallet & Play
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
