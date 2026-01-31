import { motion } from 'framer-motion';
import { Shield, Lock, CheckCircle, Hash, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProvablyFairIcon } from '@/components/icons';

const steps = [
  {
    icon: Hash,
    title: 'Server Seed Generated',
    description: 'Before each game, our server generates a cryptographic seed. The hash is shown to you.',
  },
  {
    icon: Lock,
    title: 'Client Seed Provided',
    description: 'You provide your own random seed (or we generate one). This ensures you influence the outcome.',
  },
  {
    icon: RefreshCw,
    title: 'Result Calculated',
    description: 'The game result is calculated by combining both seeds using SHA-256 hashing.',
  },
  {
    icon: Eye,
    title: 'Verify Anytime',
    description: 'After the game, the server seed is revealed. You can verify the result independently.',
  },
];

const benefits = [
  'Cryptographically secure randomness',
  'No manipulation possible by house',
  'Verify every bet on blockchain',
  'Open-source verification tools',
  'Instant result auditing',
  'Third-party verified RNG',
];

export function ProvablyFairPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-success to-primary flex items-center justify-center mx-auto mb-6 neon-glow-success">
              <ProvablyFairIcon className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Provably Fair Gaming
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every game outcome can be verified independently. We use cryptographic proofs to ensure complete transparency.
            </p>
          </motion.div>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="glass gradient-border rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="success" className="mb-4">Verified Fair</Badge>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
                  Why Trust Provably Fair?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Unlike traditional casinos where you must trust the house, provably fair systems provide mathematical proof that games aren't rigged.
                </p>
                <Button variant="default" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Verify Your Bets
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Verification Tool */}
        <section>
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              Verify a Bet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Enter your bet details to independently verify the result was fair.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Server Seed"
                className="w-full h-12 px-4 rounded-lg glass border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Client Seed"
                className="w-full h-12 px-4 rounded-lg glass border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Nonce"
                className="w-full h-12 px-4 rounded-lg glass border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              <Button variant="default" className="w-full">Verify Result</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
