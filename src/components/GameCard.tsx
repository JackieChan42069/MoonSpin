import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Game } from '@/data/mockData';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/game/${game.id}`}>
        <div className="glass-hover rounded-2xl overflow-hidden group">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {game.isHot && <Badge variant="accent">🔥 Hot</Badge>}
              {game.isNew && <Badge variant="neon">✨ New</Badge>}
              {game.category === 'live' && <Badge variant="live">● Live</Badge>}
            </div>

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <Button
                variant="hero"
                size="lg"
                className="gap-2 interactBtn"
                data-lucifer="connect"
              >
                <Play className="w-5 h-5" />
                Play Now
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {game.name}
            </h3>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-success font-semibold">{game.rtp}%</span>
                <span>RTP</span>
              </div>

              {game.players && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{game.players.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Min: {game.minBet} ETH</span>
              <span>•</span>
              <span>Max: {game.maxBet} ETH</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
