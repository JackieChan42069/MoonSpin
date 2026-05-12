import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useSchemaScript } from '@/hooks/use-schema-script';
import { formatDistanceToNow } from 'date-fns';
import { mockMatches, sportsCategories, SportsMatch } from '@/data/mockData';

const statusLabel = {
  scheduled: 'Scheduled',
  in_progress: 'Live',
  finished: 'Final',
};

export function SportsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<SportsMatch[]>(mockMatches);

  useSchemaScript(
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://moonspin.space',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sports Betting',
          item: 'https://moonspin.space/sports',
        },
      ],
    },
    'breadcrumb',
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMatches((currentMatches) =>
        currentMatches.map((match) => {
          if (match.status !== 'in_progress') {
            return match;
          }

          const homeDelta = Math.random() > 0.7 ? 1 : 0;
          const awayDelta = Math.random() > 0.75 ? 1 : 0;

          return {
            ...match,
            homeScore: match.homeScore + homeDelta,
            awayScore: match.awayScore + awayDelta,
            updatedAt: new Date(),
          };
        }),
      );
    }, 15000);

    return () => window.clearInterval(interval);
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const categoryMatch =
        activeCategory === 'all' ||
        (activeCategory === 'live' && match.status === 'in_progress') ||
        match.sport === activeCategory;

      const searchMatch =
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.league.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, matches]);

  const liveCount = matches.filter((match) => match.status === 'in_progress').length;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">Sports Betting</span>
          </nav>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Live Sports Betting & Updated Match Odds
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Bet on live matches and upcoming fixtures with updated lines and real-time odds. Browse the latest events, track live scores, and open chat support instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex flex-wrap gap-2">
                {sportsCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'glass'}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span>{liveCount} live match{liveCount === 1 ? '' : 'es'}</span>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-muted/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Updating every 15 seconds
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 flex-col sm:flex-row">
              <Input
                placeholder="Search teams, leagues, or markets..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="max-w-xl"
              />
              <Button variant="outline" asChild>
                <Link to="/casino" className="flex items-center gap-2">
                  View Casino
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <motion.div layout className="space-y-4">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="glass rounded-3xl border border-border/50 p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <Badge variant={match.status === 'in_progress' ? 'success' : 'secondary'} className="mb-3">
                          {statusLabel[match.status]}
                        </Badge>
                        <div className="text-sm text-muted-foreground uppercase tracking-[0.2em] mb-2">
                          {match.league}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
                          <div className="text-left">
                            <p className="text-lg font-semibold text-foreground">{match.homeTeam}</p>
                            <p className="text-sm text-muted-foreground">Home</p>
                          </div>
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">{match.homeScore} - {match.awayScore}</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              {formatDistanceToNow(match.startTime, { addSuffix: true })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-foreground">{match.awayTeam}</p>
                            <p className="text-sm text-muted-foreground">Away</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 min-w-[180px]">
                        <div className="glass rounded-3xl p-4">
                          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Odds</div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="font-semibold text-foreground">{match.odds.home.toFixed(2)}</p>
                              <p className="text-[11px] text-muted-foreground uppercase">Home</p>
                            </div>
                            {match.odds.draw !== undefined ? (
                              <div>
                                <p className="font-semibold text-foreground">{match.odds.draw.toFixed(2)}</p>
                                <p className="text-[11px] text-muted-foreground uppercase">Draw</p>
                              </div>
                            ) : (
                              <div />
                            )}
                            <div>
                              <p className="font-semibold text-foreground">{match.odds.away.toFixed(2)}</p>
                              <p className="text-[11px] text-muted-foreground uppercase">Away</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl bg-slate-950/70 p-4 text-sm text-muted-foreground">
                          Updated {formatDistanceToNow(match.updatedAt, { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16 glass rounded-3xl">
                  <div className="text-4xl mb-4">⚽</div>
                  <h2 className="font-display font-semibold text-2xl text-foreground mb-2">No matches found</h2>
                  <p className="text-muted-foreground mb-4">Update your search or switch categories to browse more events.</p>
                  <Button asChild>
                    <Link to="/sports" className="flex items-center gap-2">
                      Refresh matches
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          <aside className="space-y-6">
            <div className="glass rounded-3xl border border-border/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">Quick Bet</p>
                  <h2 className="font-display font-bold text-2xl text-foreground">Live action ready</h2>
                </div>
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Place instant bets on live matches and stay ahead with refreshed odds, updated scorelines, and direct support access via chat.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <div className="rounded-3xl bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">Best live bet</p>
                  <p className="font-semibold text-foreground">Galactic FC vs Astro United</p>
                </div>
                <div className="rounded-3xl bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">Next scheduled</p>
                  <p className="font-semibold text-foreground">Meteor FC vs Astro Rovers</p>
                </div>
                <Button variant="accent" asChild>
                  <Link to="/sports" className="flex items-center justify-center gap-2">
                    Open sports lobby
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="glass rounded-3xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Live chat</p>
                  <p className="text-foreground font-semibold">Support is here instantly</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Click the chat icon any time to ask about odds, wager limits, or account support while you browse live matches.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
