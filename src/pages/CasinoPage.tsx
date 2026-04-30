import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameCard } from '@/components/GameCard';
import { mockGames, categories } from '@/data/mockData';
import { useSchemaScript } from '@/hooks/use-schema-script';

export function CasinoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // BreadcrumbList schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://moonspin.space"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Casino",
        "item": "https://moonspin.space/casino"
      }
    ]
  };

  useSchemaScript(breadcrumbSchema, 'breadcrumb');

  const filteredGames = mockGames.filter((game) => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header with breadcrumb context */}
        <div className="mb-8">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span>/</span>
            <span className="text-foreground">Casino</span>
          </nav>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
            Provably Fair Casino Lobby
          </h1>
          <p className="text-muted-foreground">
            Choose from our selection of verified-fair crypto games. All games are provably fair and have been audited for transparency.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl glass border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:neon-glow transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'glass'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap gap-2"
              >
                <span>{category.icon}</span>
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              No games found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
