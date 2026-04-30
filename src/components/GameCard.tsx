import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Users, ArrowRight, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { type Game } from '@/data/mockData';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="h-full"
    >
      <Link to={`/game/${game.id}`} className="h-full block">
        <div className="glass-hover rounded-2xl overflow-hidden group h-full border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <motion.img
              src={game.image}
              alt={`${game.name} - ${game.category} game with ${game.rtp}% RTP on MoonSpin`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Badges with stagger animation */}
            <motion.div
              className="absolute top-3 left-3 flex gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {game.isHot && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Badge variant="accent">🔥 Hot</Badge>
                </motion.div>
              )}
              {game.isNew && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                >
                  <Badge variant="neon">✨ New</Badge>
                </motion.div>
              )}
              {game.category === 'live' && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
                >
                  <Badge variant="live">● Live</Badge>
                </motion.div>
              )}
            </motion.div>

            {/* Play Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-background/70 to-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.8, y: 10 }}
                whileHover={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2 interactBtn shadow-lg shadow-primary/50"
                  data-lucifer="connect"
                >
                  <Play className="w-5 h-5" />
                  Play Now
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {game.name}
              </h3>
            </div>

            <motion.div
              className="flex items-center justify-between text-sm"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors duration-300 cursor-help">
                  <span className="text-success font-semibold text-base">{game.rtp}%</span>
                  <span>RTP</span>
                  <HelpCircle className="w-3 h-3 opacity-50" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  Return to Player (RTP) - Percentage of wagers the game returns over time
                </TooltipContent>
              </Tooltip>

              {game.players && (
                <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Users className="w-4 h-4 text-primary" />
                  </motion.div>
                  <span className="font-semibold">{game.players.toLocaleString()}</span>
                </div>
              )}
            </motion.div>

            <motion.div
              className="mt-3 flex items-center gap-2 text-xs text-muted-foreground border-t border-border/30 pt-3"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-medium">Min: {game.minBet} ETH</span>
              <span>•</span>
              <span className="font-medium">Max: {game.maxBet} ETH</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
