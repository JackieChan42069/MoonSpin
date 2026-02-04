import neonNightsImg from '@/assets/games/neon-nights.jpg';
import cryptoBlackjackImg from '@/assets/games/crypto-blackjack.jpg';
import moonCrashImg from '@/assets/games/moon-crash.jpg';
import luckyDiceImg from '@/assets/games/lucky-dice.jpg';
import liveRouletteVipImg from '@/assets/games/live-roulette-vip.jpg';
import diamondRushImg from '@/assets/games/diamond-rush.jpg';

export interface Game {
  id: string;
  name: string;
  category: 'slots' | 'table' | 'crash' | 'dice' | 'live';
  rtp: number;
  minBet: number;
  maxBet: number;
  image: string;
  isHot?: boolean;
  isNew?: boolean;
  players?: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'win' | 'bet';
  amount: number;
  currency: string;
  game?: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  endDate?: Date;
}

export const mockGames: Game[] = [
  {
    id: '1',
    name: 'Neon Nights',
    category: 'slots',
    rtp: 96.5,
    minBet: 0.001,
    maxBet: 100,
    image: neonNightsImg,
    isHot: true,
    players: 1247,
  },
  {
    id: '2',
    name: 'Crypto Blackjack',
    category: 'table',
    rtp: 99.5,
    minBet: 0.01,
    maxBet: 500,
    image: cryptoBlackjackImg,
    players: 892,
  },
  {
    id: '3',
    name: 'Moon Crash',
    category: 'crash',
    rtp: 97.0,
    minBet: 0.001,
    maxBet: 1000,
    image: moonCrashImg,
    isHot: true,
    isNew: true,
    players: 3421,
  },
  {
    id: '4',
    name: 'Lucky Dice',
    category: 'dice',
    rtp: 98.5,
    minBet: 0.0001,
    maxBet: 50,
    image: luckyDiceImg,
    players: 567,
  },
  {
    id: '5',
    name: 'Live Roulette VIP',
    category: 'live',
    rtp: 97.3,
    minBet: 0.1,
    maxBet: 5000,
    image: liveRouletteVipImg,
    players: 234,
  },
  {
    id: '6',
    name: 'Diamond Rush',
    category: 'slots',
    rtp: 95.8,
    minBet: 0.005,
    maxBet: 200,
    image: diamondRushImg,
    isNew: true,
    players: 1089,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'win',
    amount: 0.0523,
    currency: 'ETH',
    game: 'Moon Crash',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'completed',
  },
  {
    id: '2',
    type: 'bet',
    amount: 0.01,
    currency: 'ETH',
    game: 'Neon Nights',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    status: 'completed',
  },
  {
    id: '3',
    type: 'deposit',
    amount: 0.5,
    currency: 'ETH',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: 'completed',
  },
  {
    id: '4',
    type: 'withdraw',
    amount: 0.25,
    currency: 'ETH',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'pending',
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: '25% Welcome Bonus',
    description: 'New players receive a 25% match on their first deposit. Min deposit 0.02 ETH. T&Cs apply.',
    image: '/placeholder.svg',
    cta: 'Claim Now',
  },
  {
    id: '2',
    title: 'Weekly Cashback',
    description: '10% cashback every Monday on all losses. No wagering required.',
    image: '/placeholder.svg',
    cta: 'Learn More',
  },
  {
    id: '3',
    title: 'VIP Rewards Program',
    description: 'Exclusive perks, higher limits, and personal account manager.',
    image: '/placeholder.svg',
    cta: 'Join VIP',
  },
];

export const mockUserBalance = {
  eth: 1.2345,
  btc: 0.0234,
  usdt: 5420.50,
};

export const categories = [
  { id: 'all', label: 'All Games', icon: '🎮' },
  { id: 'slots', label: 'Slots', icon: '🎰' },
  { id: 'table', label: 'Table', icon: '🃏' },
  { id: 'crash', label: 'Crash', icon: '🚀' },
  { id: 'dice', label: 'Dice', icon: '🎲' },
  { id: 'live', label: 'Live', icon: '🔴' },
];
