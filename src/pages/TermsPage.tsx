import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, Shield, User, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const sections = [
  {
    id: 'acceptance',
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: `By accessing or using NeonWager, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.

These terms constitute a legally binding agreement between you and NeonWager. We reserve the right to modify these terms at any time, with changes becoming effective upon posting.`,
  },
  {
    id: 'eligibility',
    icon: User,
    title: '2. Eligibility',
    content: `You must be at least 18 years old (or the legal gambling age in your jurisdiction) to use NeonWager. By using our services, you represent and warrant that:

• You meet the minimum age requirement
• You are not located in a restricted jurisdiction
• You have the legal capacity to enter into binding contracts
• You are not self-excluded from gambling services`,
  },
  {
    id: 'jurisdiction',
    icon: Globe,
    title: '3. Jurisdictional Restrictions',
    content: `NeonWager services are not available in jurisdictions where online gambling is prohibited. It is your responsibility to ensure that your use of our platform complies with local laws.

Restricted territories include but are not limited to: United States, United Kingdom (without proper licensing), and other jurisdictions where online crypto gambling is prohibited.`,
  },
  {
    id: 'account',
    icon: Shield,
    title: '4. Account Security',
    content: `You are responsible for maintaining the security of your connected wallet and any credentials associated with your NeonWager account.

• Never share your private keys or seed phrases
• Enable all available security features
• Report any unauthorized access immediately
• You are liable for all activity on your account`,
  },
  {
    id: 'gambling',
    icon: AlertCircle,
    title: '5. Responsible Gambling',
    content: `We are committed to promoting responsible gambling. By using our platform, you acknowledge that:

• Gambling can be addictive
• You should only gamble with money you can afford to lose
• We provide tools for self-exclusion and limit-setting
• You can contact support at any time for assistance

If you believe you have a gambling problem, please seek help from professional organizations.`,
  },
  {
    id: 'disputes',
    icon: Scale,
    title: '6. Dispute Resolution',
    content: `Any disputes arising from the use of NeonWager will be resolved through binding arbitration in accordance with international arbitration rules.

For game-related disputes, our support team will investigate using blockchain records and provably fair verification. Decisions made by our team are final.`,
  },
];

export function TermsPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="secondary" className="mb-4">📜 Legal</Badge>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Last updated: January 2024
            </p>
            <p className="text-muted-foreground">
              Please read these terms carefully before using NeonWager.
            </p>
          </motion.div>
        </div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mb-12"
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Contents</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {section.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display font-bold text-xl text-foreground">
                  {section.title}
                </h2>
              </div>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 glass rounded-2xl border border-warning/30"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-2">Disclaimer</h3>
              <p className="text-muted-foreground text-sm">
                This is a demo prototype. NeonWager is a fictional platform for demonstration purposes only. No real gambling or cryptocurrency transactions are processed. The terms above are illustrative examples of what real gambling platform terms might include.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
