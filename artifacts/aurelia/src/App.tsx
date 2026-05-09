import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { ScrollToTop } from "@/components/scroll-to-top";
import { PageTitle } from "@/components/page-title";
import { SiteSettingsProvider } from "@/lib/SiteSettingsContext";
import {
  AtelierAuthContext,
  type AtelierAuthContextValue,
  getToken,
  saveToken,
  clearToken,
  atelierFetch,
} from "@/lib/atelierAuth";
import { AtelierLayout } from "@/components/atelier/layout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Weddings from "@/pages/weddings";
import Corporate from "@/pages/corporate";
import PrivateEvents from "@/pages/private-events";
import Destinations from "@/pages/destinations";
import DestinationDetail from "@/pages/destination-detail";
import Europe from "@/pages/europe";
import Portfolio from "@/pages/portfolio";
import PortfolioDetail from "@/pages/portfolio-detail";
import Journal from "@/pages/journal";
import JournalDetail from "@/pages/journal-detail";
import Press from "@/pages/press";
import Inquiry from "@/pages/inquiry";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Vendor from "@/pages/vendor";
import Internships from "@/pages/internships";
import Careers from "@/pages/careers";
import NotFound from "@/pages/not-found";

import AtelierLogin from "@/pages/atelier/login";
import AtelierDashboard from "@/pages/atelier/dashboard";
import AtelierInquiries from "@/pages/atelier/inquiries";
import AtelierNewsletter from "@/pages/atelier/newsletter";
import AtelierVendors from "@/pages/atelier/vendors";
import AtelierInstagram from "@/pages/atelier/instagram-settings";
import AtelierTelegram from "@/pages/atelier/telegram-settings";
import AtelierSiteSettings from "@/pages/atelier/site-settings";

const queryClient = new QueryClient();

// ── Public site ───────────────────────────────────────────────────────────────
function PublicRouter() {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const fadeDuration = prefersReducedMotion ? 0 : 0.28;

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <PageTitle />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
          >
            <Switch location={location}>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/weddings" component={Weddings} />
              <Route path="/corporate" component={Corporate} />
              <Route path="/private-events" component={PrivateEvents} />
              <Route path="/destinations" component={Destinations} />
              <Route path="/destinations/:slug" component={DestinationDetail} />
              <Route path="/europe" component={Europe} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/portfolio/:slug" component={PortfolioDetail} />
              <Route path="/journal" component={Journal} />
              <Route path="/journal/:slug" component={JournalDetail} />
              <Route path="/press" component={Press} />
              <Route path="/inquiry" component={Inquiry} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/vendor" component={Vendor} />
              <Route path="/internships" component={Internships} />
              <Route path="/careers" component={Careers} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <NewsletterPopup />
    </div>
  );
}

// ── Protected admin route ─────────────────────────────────────────────────────
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const token = getToken();
  if (!token) return <Redirect to="/atelier" />;
  return (
    <AtelierLayout>
      <Component />
    </AtelierLayout>
  );
}

// ── Admin portal ──────────────────────────────────────────────────────────────
function AtelierRouter() {
  const [location] = useLocation();
  const token = getToken();

  if (location === "/atelier" && token) {
    return <Redirect to="/atelier/dashboard" />;
  }

  return (
    <Switch location={location}>
      <Route path="/atelier" component={AtelierLogin} />
      <Route path="/atelier/dashboard">
        <ProtectedRoute component={AtelierDashboard} />
      </Route>
      <Route path="/atelier/inquiries">
        <ProtectedRoute component={AtelierInquiries} />
      </Route>
      <Route path="/atelier/newsletter">
        <ProtectedRoute component={AtelierNewsletter} />
      </Route>
      <Route path="/atelier/vendors">
        <ProtectedRoute component={AtelierVendors} />
      </Route>
      <Route path="/atelier/instagram">
        <ProtectedRoute component={AtelierInstagram} />
      </Route>
      <Route path="/atelier/telegram">
        <ProtectedRoute component={AtelierTelegram} />
      </Route>
      <Route path="/atelier/settings">
        <ProtectedRoute component={AtelierSiteSettings} />
      </Route>
      <Route><Redirect to="/atelier" /></Route>
    </Switch>
  );
}

// ── Root router ───────────────────────────────────────────────────────────────
function RootRouter() {
  const [location] = useLocation();
  const isAtelier = location === "/atelier" || location.startsWith("/atelier/");
  return isAtelier ? <AtelierRouter /> : <PublicRouter />;
}

// ── Auth provider ─────────────────────────────────────────────────────────────
function AtelierAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getToken);

  const login = useCallback(async (email: string, password: string) => {
    const data = await atelierFetch<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    saveToken(data.token);
    setToken(data.token);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    window.location.href =
      `${import.meta.env.BASE_URL}atelier`.replace(/\/\//g, "/");
  }, []);

  const value: AtelierAuthContextValue = { token, login, logout };

  return (
    <AtelierAuthContext.Provider value={value}>
      {children}
    </AtelierAuthContext.Provider>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SiteSettingsProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AtelierAuthProvider>
              <RootRouter />
            </AtelierAuthProvider>
          </WouterRouter>
          <Toaster />
        </SiteSettingsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
