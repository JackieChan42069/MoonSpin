import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockPromotions } from '@/data/mockData';

export function PromotionCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockPromotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mockPromotions.length) % mockPromotions.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockPromotions.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative aspect-[21/9] md:aspect-[3/1] glass gradient-border rounded-2xl overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-xl">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display font-bold text-2xl md:text-4xl lg:text-5xl mb-3 text-neon"
                  >
                    {mockPromotions[currentIndex].title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground text-sm md:text-lg mb-6"
                  >
                    {mockPromotions[currentIndex].description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button variant="hero" size="lg">
                      {mockPromotions[currentIndex].cta}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:neon-glow transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:text-primary hover:neon-glow transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {mockPromotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 bg-primary neon-glow'
                : 'bg-muted-foreground/50 hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
