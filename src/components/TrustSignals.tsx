import { motion } from 'framer-motion';
import { Lock, Zap, Award, Shield } from 'lucide-react';
import { ShieldCheckIcon, ProvablyFairIcon } from '@/components/icons';

const trustSignals = [
  {
    icon: ProvablyFairIcon,
    title: 'Provably Fair',
    description: 'Verify every bet with blockchain transparency',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Lock,
    title: 'SSL Secured',
    description: 'Bank-grade encryption & security',
    color: 'from-accent/20 to-accent/5',
  },
  {
    icon: Award,
    title: 'Licensed',
    description: 'Regulated & fully compliant',
    color: 'from-success/20 to-success/5',
  },
  {
    icon: Zap,
    title: 'Instant Payouts',
    description: 'Withdraw to your wallet in seconds',
    color: 'from-warning/20 to-warning/5',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function TrustSignals() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
            Why Players Trust Us
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We prioritize security, fairness, and transparency in every transaction
          </p>
        </motion.div>

        {/* Trust Signals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${signal.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Card */}
                <div className="relative glass rounded-2xl p-6 border border-border/50 group-hover:border-primary/30 transition-all duration-300">
                  {/* Icon Container */}
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                    {signal.description}
                  </p>

                  {/* Hover Badge */}
                  <div className="mt-4 h-1 w-0 group-hover:w-8 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Compliance Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 border border-border/50">
            <ShieldCheckIcon className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-foreground">
              18+ • Full KYC Compliance • Licensed & Regulated
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
