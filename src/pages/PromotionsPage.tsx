import { motion } from 'framer-motion';
import { Gift, Clock, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPromotions } from '@/data/mockData';

const promotionCategories = [
  { icon: Gift, label: 'Welcome Bonus', color: 'from-primary to-primary/60' },
  { icon: Clock, label: 'Weekly Cashback', color: 'from-accent to-accent/60' },
  { icon: Star, label: 'VIP Rewards', color: 'from-warning to-warning/60' },
  { icon: Zap, label: 'Daily Drops', color: 'from-success to-success/60' },
];

const allPromotions = [
  {
    id: '1',
    title: '25% Welcome Bonus up to 0.2 ETH',
    description: 'New players receive a 25% match on their first deposit, up to 0.2 ETH. Minimum deposit 0.02 ETH. Wagering requirement: 10× on the bonus amount.',
    category: 'Welcome Bonus',
    terms: '18+. New players only. Minimum deposit 0.05 ETH. Bonus applies to first deposit only. Wagering requirement is 10× the bonus amount. Terms apply.',
    cta: 'Claim Now',
  },
  {
    id: '2',
    title: '10% Weekly Cashback',
    description: 'Every Monday, receive 10% cashback on your net losses from the previous week. No wagering requirements!',
    category: 'Weekly Cashback',
    terms: 'Cashback credited every Monday. Min loss 0.1 ETH. Max cashback 2 ETH.',
    cta: 'Learn More',
  },
  {
    id: '3',
    title: 'VIP Platinum Perks',
    description: 'Reach Platinum status and enjoy 15% rakeback, personal account manager, and exclusive tournaments.',
    category: 'VIP Rewards',
    terms: 'VIP status based on wagering volume. Perks vary by level.',
    cta: 'Join VIP',
  },
  {
    id: '4',
    title: 'Daily Prize Drops',
    description: 'Random prizes awarded every day! Play any game for a chance to win bonus funds, free spins, or ETH.',
    category: 'Daily Drops',
    terms: 'Prizes awarded randomly during gameplay. No opt-in required.',
    cta: 'Start Playing',
  },
];

export function PromotionsPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="accent" className="mb-4">🎁 Exclusive Offers</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Promotions & Bonuses
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Boost your bankroll with our generous promotions. From welcome bonuses to VIP rewards, we've got you covered.
            </p>
          </motion.div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {promotionCategories.map((cat, index) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-hover rounded-xl p-4 text-center cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3`}>
                <cat.icon className="w-6 h-6 text-foreground" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">{cat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Promotions List */}
        <div className="space-y-6">
          {allPromotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass gradient-border rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <Badge variant="neon" className="mb-3">{promo.category}</Badge>
                  <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
                    {promo.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{promo.description}</p>
                  <p className="text-muted-foreground/60 text-sm">{promo.terms}</p>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="hero" size="lg">{promo.cta}</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
