import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Clock, User, FileText, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const responsibleGamblingTools = [
  {
    icon: Clock,
    title: 'Session Limits',
    description: 'Set daily, weekly, or monthly time limits for your gaming sessions.',
  },
  {
    icon: AlertTriangle,
    title: 'Deposit Limits',
    description: 'Control your spending by setting deposit limits that suit your budget.',
  },
  {
    icon: Shield,
    title: 'Self-Exclusion',
    description: 'Take a break from gambling for a period of your choice.',
  },
  {
    icon: HelpCircle,
    title: 'Support Resources',
    description: 'Access links to professional gambling addiction resources.',
  },
];

const kycSteps = [
  {
    step: 1,
    title: 'Identity Verification',
    description: 'Upload a valid government-issued ID (passport, driver\'s license, or national ID).',
  },
  {
    step: 2,
    title: 'Proof of Address',
    description: 'Provide a recent utility bill or bank statement (within 3 months).',
  },
  {
    step: 3,
    title: 'Wallet Verification',
    description: 'Confirm ownership of your connected wallet address.',
  },
];

export function ResponsibleGamblingPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="warning" className="mb-4">🛡️ Play Responsibly</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Responsible Gambling & KYC
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to providing a safe gaming environment. Gambling should be entertainment, not a financial strategy.
            </p>
          </motion.div>
        </div>

        {/* Responsible Gambling Section */}
        <section className="mb-16">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-8">
            Responsible Gambling Tools
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {responsibleGamblingTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-hover rounded-2xl p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <tool.icon className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 p-6 glass rounded-2xl border border-warning/30">
            <p className="text-warning font-semibold mb-2">Need Help?</p>
            <p className="text-muted-foreground text-sm mb-4">
              If you or someone you know has a gambling problem, please contact one of these resources:
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">Gamblers Anonymous</Button>
              <Button variant="outline" size="sm">BeGambleAware</Button>
              <Button variant="outline" size="sm">NCPG Helpline</Button>
            </div>
          </div>
        </section>

        {/* KYC Section */}
        <section className="mb-16">
          <div className="glass gradient-border rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-primary" />
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                KYC Verification
              </h2>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              To comply with anti-money laundering regulations and ensure a safe platform, we require identity verification for withdrawals above certain thresholds.
            </p>

            <div className="space-y-6">
              {kycSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 font-display font-bold text-primary-foreground">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="default" size="lg" className="mt-8 gap-2">
              <FileText className="w-4 h-4" />
              Start KYC Verification
            </Button>
          </div>
        </section>

        {/* Age Restriction */}
        <section>
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
              <span className="font-display font-bold text-2xl text-destructive">18+</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              Age Restriction
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              NeonWager is strictly for users 18 years or older. We verify age during KYC and may request additional verification at any time. Underage gambling is illegal.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
