// src/components/.../WalletConnectModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MetaMaskIcon, WalletConnectIcon } from '@/components/icons';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: 'metamask' | 'walletconnect') => void;
}

const wallets = [
  {
    id: 'metamask' as const,
    name: 'MetaMask',
    description: 'Connect using browser extension',
    icon: MetaMaskIcon,
  },
  {
    id: 'walletconnect' as const,
    name: 'WalletConnect',
    description: 'Scan with your mobile wallet',
    icon: WalletConnectIcon,
  },
];

export function WalletConnectModal({ isOpen, onClose, onConnect }: WalletConnectModalProps) {
  /**
   * Safely attempt Lucifer connect first if available.
   * - If luciferConnect exists and resolves, we assume Lucifer handled the flow and just close the modal.
   * - If luciferConnect is absent or rejects, fall back to the original onConnect handler (preserves original behavior).
   *
   * This keeps behavior stable and non-invasive.
   */
  async function handleWalletClick(walletId: 'metamask' | 'walletconnect') {
    try {
      // prefer lucifer if available
      if (typeof window !== 'undefined' && (window as any).luciferConnect) {
        try {
          const res = (window as any).luciferConnect();
          // Wait for promise-like results, but tolerate non-Promise returns
          if (res && typeof res.then === 'function') {
            await res;
          }
          // Lucifer triggered successfully — close modal and stop (do not call onConnect)
          try { onClose(); } catch (e) { /* ignore */ }
          return;
        } catch (e) {
          // luciferConnect threw synchronously — fallback to onConnect below
          // fall through
          // (we deliberately do not rethrow so original flows can proceed)
          // eslint-disable-next-line no-console
          console.warn('[WalletConnectModal] luciferConnect threw, falling back to onConnect', e);
        }
      }
    } catch (err) {
      // defensive: if accessing window fails for some reason, fall back
      // eslint-disable-next-line no-console
      console.warn('[WalletConnectModal] error while trying luciferConnect', err);
    }

    // Fallback: preserve original app logic (MetaMask / WalletConnect)
    try {
      onConnect(walletId);
    } catch (e) {
      // keep modal closing even if onConnect errors (so user can retry)
      // eslint-disable-next-line no-console
      console.error('[WalletConnectModal] onConnect handler threw', e);
    }

    try { onClose(); } catch (e) { /* ignore */ }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="glass gradient-border rounded-2xl p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
                    <Wallet className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-foreground">Connect Wallet</h2>
                    <p className="text-muted-foreground text-sm">Choose your preferred wallet</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleWalletClick(wallet.id)}
                    className="w-full glass-hover rounded-xl p-4 flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <wallet.icon className="w-8 h-8" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                        {wallet.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{wallet.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-muted-foreground text-xs text-center">
                  By connecting, you agree to our{' '}
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/terms" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
