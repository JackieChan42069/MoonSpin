import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { mockTransactions } from '@/data/mockData';
import { EthereumIcon } from '@/components/icons';

interface Win {
  id: string;
  playerName: string;
  amount: number;
  game: string;
  multiplier: number;
}

// Generate demo win data
const generateWins = (): Win[] => {
  const games = ['Moon Crash', 'Neon Nights', 'Lucky Dice', 'Diamond Rush', 'Crypto Blackjack'];
  const playerNames = ['0x742d...', '0x9f3a...', '0x1e2b...', '0x5c4d...', '0x8e7f...'];
  
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i),
    playerName: playerNames[Math.floor(Math.random() * playerNames.length)],
    amount: parseFloat((Math.random() * 2 + 0.01).toFixed(4)),
    game: games[Math.floor(Math.random() * games.length)],
    multiplier: parseFloat((Math.random() * 5 + 1.5).toFixed(2)),
  }));
};

export function RecentWins() {
  const [wins, setWins] = useState<Win[]>(generateWins());
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setWins(prev => [...prev.slice(1), prev[0]]);
    }, 5000);

    return () => clearInterval(rotationTimer);
  }, []);

  const currentWin = wins[0];

  return (
    <div className="relative overflow-hidden rounded-2xl glass border border-primary/20 p-6">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 animate-pulse" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg animate-pulse" />
          <div className="relative bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg p-2">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-foreground">Recent Wins</h3>
          <p className="text-xs text-muted-foreground">Live updates from players</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentWin.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {/* Main Win Display */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Player {currentWin.playerName}</p>
                <p className="font-display font-bold text-foreground">{currentWin.game}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-success font-semibold mb-1">
                  +{currentWin.multiplier.toFixed(2)}x
                </div>
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <EthereumIcon className="w-5 h-5 text-primary" />
              <span className="font-display font-bold text-2xl text-primary">
                {currentWin.amount.toFixed(4)}
              </span>
              <span className="text-sm text-muted-foreground">ETH</span>
            </div>
          </div>

          {/* Win History */}
          <div className="space-y-2">
            {wins.slice(1, 4).map((win, idx) => (
              <motion.div
                key={win.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{win.game}</p>
                  <p className="text-sm font-medium text-foreground">{win.playerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">+{win.amount.toFixed(4)} ETH</p>
                  <p className="text-xs text-muted-foreground">{win.multiplier.toFixed(2)}x</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll Indicator */}
      <div className="mt-4 flex justify-center gap-1">
        {wins.map((_, idx) => (
          <motion.div
            key={idx}
            className="h-1 rounded-full bg-muted/30"
            animate={{
              width: displayIndex === idx ? 24 : 6,
              backgroundColor: displayIndex === idx ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
