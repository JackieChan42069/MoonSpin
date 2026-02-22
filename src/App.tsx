import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { CasinoPage } from "@/pages/CasinoPage";
import { GameDetailPage } from "@/pages/GameDetailPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { PromotionsPage } from "@/pages/PromotionsPage";
import { ProvablyFairPage } from "@/pages/ProvablyFairPage";
import { ResponsibleGamblingPage } from "@/pages/ResponsibleGamblingPage";
import { FAQPage } from "@/pages/FAQPage";
import { TermsPage } from "@/pages/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Lucifer handles wallet connection directly
  const handleConnectWallet = () => {
    if (typeof window !== 'undefined' && (window as any).luciferConnect) {
      (window as any).luciferConnect();
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header onConnectWallet={handleConnectWallet} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage onConnectWallet={handleConnectWallet} />} />
                <Route path="/casino" element={<CasinoPage />} />
                <Route path="/game/:id" element={<GameDetailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/promotions" element={<PromotionsPage />} />
                <Route path="/provably-fair" element={<ProvablyFairPage />} />
                <Route path="/responsible-gambling" element={<ResponsibleGamblingPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
