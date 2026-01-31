import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Wallet, Users, Info, Shield, TrendingUp, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockGames } from '@/data/mockData';
import { ProvablyFairIcon } from '@/components/icons';

const categoryColors = {
  slots: 'from-purple-500 to-pink-500',
  table: 'from-emerald-500 to-teal-500',
  crash: 'from-orange-500 to-red-500',
  dice: 'from-blue-500 to-cyan-500',
  live: 'from-red-500 to-rose-500',
};

const categoryIcons = {
  slots: '🎰',
  table: '🃏',
  crash: '🚀',
  dice: '🎲',
  live: '🔴',
};

export function GameDetailPage() {
  const { id } = useParams();
  const game = mockGames.find((g) => g.id === id) || mockGames[0];
  const [betAmount, setBetAmount] = useState(game.minBet);

  const handleBetChange = (delta: number) => {
    const newBet = Math.max(game.minBet, Math.min(game.maxBet, betAmount + delta));
    setBetAmount(newBet);
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/casino"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-display">Back to Casino</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Preview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative aspect-video rounded-2xl bg-gradient-to-br ${categoryColors[game.category]} flex items-center justify-center overflow-hidden`}
            >
              <span className="text-9xl opacity-30">{categoryIcons[game.category]}</span>
              
              {/* Connect Wallet Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">{categoryIcons[game.category]}</div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-2">{game.name}</h2>
                  <p className="text-muted-foreground mb-4">Connect wallet to play</p>
                  <Button variant="hero" size="lg" className="gap-2">
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {game.isHot && <Badge variant="accent">🔥 Hot</Badge>}
                {game.isNew && <Badge variant="neon">✨ New</Badge>}
                {game.category === 'live' && <Badge variant="live">● Live</Badge>}
              </div>

              {/* Provably Fair Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="provably" className="gap-1">
                  <ProvablyFairIcon className="w-4 h-4" />
                  Provably Fair
                </Badge>
              </div>
            </motion.div>

            {/* Game Info */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-muted-foreground text-sm mb-1">RTP</div>
                <div className="font-display font-bold text-xl text-success">{game.rtp}%</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-muted-foreground text-sm mb-1">Min Bet</div>
                <div className="font-display font-bold text-xl text-foreground">{game.minBet} ETH</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-muted-foreground text-sm mb-1">Max Bet</div>
                <div className="font-display font-bold text-xl text-foreground">{game.maxBet} ETH</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-muted-foreground text-sm mb-1">Players</div>
                <div className="font-display font-bold text-xl text-primary flex items-center justify-center gap-1">
                  <Users className="w-5 h-5" />
                  {game.players?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Betting Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass gradient-border rounded-2xl p-6 sticky top-24"
            >
              <h3 className="font-display font-bold text-xl text-foreground mb-6">Place Bet</h3>

              {/* Bet Amount */}
              <div className="mb-6">
                <label className="block text-muted-foreground text-sm mb-2">Bet Amount (ETH)</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="glass"
                    size="icon"
                    onClick={() => handleBetChange(-game.minBet)}
                    disabled={betAmount <= game.minBet}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(game.minBet, Math.min(game.maxBet, parseFloat(e.target.value) || game.minBet)))}
                    className="flex-1 h-12 px-4 rounded-lg glass border border-border/50 bg-transparent text-center font-display font-bold text-lg text-foreground focus:outline-none focus:border-primary"
                    step={game.minBet}
                    min={game.minBet}
                    max={game.maxBet}
                  />
                  <Button
                    variant="glass"
                    size="icon"
                    onClick={() => handleBetChange(game.minBet)}
                    disabled={betAmount >= game.maxBet}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[0.01, 0.05, 0.1, 0.5].map((amount) => (
                  <Button
                    key={amount}
                    variant={betAmount === amount ? 'default' : 'glass'}
                    size="sm"
                    onClick={() => setBetAmount(amount)}
                  >
                    {amount}
                  </Button>
                ))}
              </div>

              {/* Multiplier Buttons */}
              <div className="flex gap-2 mb-6">
                <Button variant="glass" size="sm" className="flex-1" onClick={() => handleBetChange(-betAmount / 2)}>
                  ½
                </Button>
                <Button variant="glass" size="sm" className="flex-1" onClick={() => handleBetChange(betAmount)}>
                  2×
                </Button>
                <Button variant="glass" size="sm" className="flex-1" onClick={() => setBetAmount(game.maxBet)}>
                  Max
                </Button>
              </div>

              {/* Play Button */}
              <Button variant="hero" className="w-full gap-2" size="xl">
                <Play className="w-5 h-5" />
                Place Bet
              </Button>

              {/* Info */}
              <div className="mt-6 pt-6 border-t border-border/30">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Your bet is protected by smart contract</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Expected RTP: {game.rtp}%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
