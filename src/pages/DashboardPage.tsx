import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, History, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUserBalance, mockTransactions, mockGames } from '@/data/mockData';
import { EthereumIcon, BitcoinIcon } from '@/components/icons';

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const transactionIcons = {
  deposit: ArrowDownLeft,
  withdraw: ArrowUpRight,
  win: TrendingUp,
  bet: Wallet,
};

const transactionColors = {
  deposit: 'text-success',
  withdraw: 'text-warning',
  win: 'text-success',
  bet: 'text-muted-foreground',
};

export function DashboardPage() {
  const totalBalance = mockUserBalance.eth * 3500 + mockUserBalance.btc * 65000 + mockUserBalance.usdt;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your account overview.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Disconnect
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balance Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass gradient-border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Total Balance</span>
                <Badge variant="success">+12.5% this week</Badge>
              </div>
              <div className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
                ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <EthereumIcon className="w-5 h-5" />
                    <span className="text-muted-foreground text-sm">ETH</span>
                  </div>
                  <div className="font-display font-bold text-xl text-foreground">
                    {mockUserBalance.eth.toFixed(4)}
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BitcoinIcon className="w-5 h-5" />
                    <span className="text-muted-foreground text-sm">BTC</span>
                  </div>
                  <div className="font-display font-bold text-xl text-foreground">
                    {mockUserBalance.btc.toFixed(4)}
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💵</span>
                    <span className="text-muted-foreground text-sm">USDT</span>
                  </div>
                  <div className="font-display font-bold text-xl text-foreground">
                    {mockUserBalance.usdt.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button variant="default" className="flex-1 gap-2">
                  <ArrowDownLeft className="w-4 h-4" />
                  Deposit
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  Withdraw
                </Button>
              </div>
            </motion.div>

            {/* Recent Games */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl text-foreground">Recent Games</h2>
                <Link to="/casino" className="text-primary text-sm hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockGames.slice(0, 3).map((game) => (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="glass-hover rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                      {game.category === 'slots' ? '🎰' : game.category === 'crash' ? '🚀' : '🎲'}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-foreground text-sm">{game.name}</div>
                      <div className="text-muted-foreground text-xs">Played 2h ago</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-foreground flex items-center gap-2">
                <History className="w-5 h-5" />
                Transactions
              </h2>
            </div>

            <div className="space-y-4">
              {mockTransactions.map((tx) => {
                const Icon = transactionIcons[tx.type];
                return (
                  <div key={tx.id} className="flex items-center gap-4 p-3 glass rounded-xl">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${transactionColors[tx.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-semibold text-foreground capitalize">
                          {tx.type}
                        </span>
                        <span className={`font-display font-bold ${tx.type === 'win' || tx.type === 'deposit' ? 'text-success' : 'text-foreground'}`}>
                          {tx.type === 'win' || tx.type === 'deposit' ? '+' : '-'}{tx.amount} {tx.currency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{tx.game || 'Wallet'}</span>
                        <span className="text-muted-foreground">{formatTimeAgo(tx.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="glass" className="w-full mt-6">
              View All Transactions
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
