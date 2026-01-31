import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Simply connect your crypto wallet (MetaMask or WalletConnect) and you\'re ready to play! No email or password required.',
      },
      {
        q: 'What cryptocurrencies are supported?',
        a: 'We currently support ETH, BTC, and USDT. More currencies will be added soon.',
      },
      {
        q: 'Is there a minimum deposit?',
        a: 'The minimum deposit is 0.001 ETH (or equivalent). There\'s no maximum deposit limit.',
      },
    ],
  },
  {
    category: 'Games & Betting',
    questions: [
      {
        q: 'What is RTP?',
        a: 'RTP (Return to Player) is the percentage of wagered money a game returns to players over time. Higher RTP means better odds for players.',
      },
      {
        q: 'How do I know the games are fair?',
        a: 'All games use provably fair algorithms. You can verify any bet result using our verification tool or check the blockchain directly.',
      },
      {
        q: 'What are the betting limits?',
        a: 'Limits vary by game. Generally, minimum bets start at 0.001 ETH and maximums can go up to 1000 ETH for high rollers.',
      },
    ],
  },
  {
    category: 'Withdrawals & Deposits',
    questions: [
      {
        q: 'How long do withdrawals take?',
        a: 'Crypto withdrawals are processed instantly. You\'ll see your funds in your wallet within minutes, depending on network congestion.',
      },
      {
        q: 'Are there any fees?',
        a: 'We don\'t charge deposit fees. Withdrawal fees cover only the blockchain network fees (gas).',
      },
      {
        q: 'Why is my withdrawal pending?',
        a: 'Large withdrawals may require additional KYC verification. Check your dashboard for any pending verification requests.',
      },
    ],
  },
  {
    category: 'Security',
    questions: [
      {
        q: 'Is my wallet safe?',
        a: 'We never have access to your private keys. All transactions are signed locally in your wallet. We use industry-standard security practices.',
      },
      {
        q: 'What is KYC and why is it required?',
        a: 'KYC (Know Your Customer) is required for withdrawals above certain thresholds to comply with anti-money laundering regulations.',
      },
    ],
  },
];

export function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="neon" className="mb-4">❓ Help Center</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Find answers to common questions about NeonWager.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl glass border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-8">
          {filteredCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-4">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, index) => {
                  const itemId = `${catIndex}-${index}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div key={itemId} className="glass rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
                      >
                        <span className="font-display font-semibold text-foreground pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4 text-muted-foreground">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass gradient-border rounded-2xl p-8 text-center"
        >
          <h3 className="font-display font-bold text-xl text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our support team is available 24/7 to help you.
          </p>
          <a
            href="mailto:support@neonwager.com"
            className="text-primary hover:underline font-semibold"
          >
            support@neonwager.com
          </a>
        </motion.div>
      </div>
    </div>
  );
}
