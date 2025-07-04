import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Pages
import Welcome from "@/pages/welcome";
import Auth from "@/pages/auth";
import Settings from "@/pages/settings";
import Sessions from "@/pages/sessions";
import About from "@/pages/about";
import PrivacyPolicy from "@/pages/privacy-policy";
import ProtocolSelection from "@/pages/protocol-selection";
import ActivationSequence from "@/pages/activation-sequence";
import BreathingSession from "@/pages/breathing-session";
import Subscription from "@/pages/subscription";
import SubscriptionDemo from "@/pages/subscription-demo";
import DataStorageInfo from "@/pages/data-storage-info";
import UpgradePrompt from "@/pages/upgrade-prompt";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/auth" component={Auth} />
      <Route path="/settings" component={Settings} />
      <Route path="/sessions" component={Sessions} />
      <Route path="/about" component={About} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/protocol-selection" component={ProtocolSelection} />
      <Route path="/activation-sequence" component={ActivationSequence} />
      <Route path="/breathing-session" component={BreathingSession} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/subscription-demo" component={SubscriptionDemo} />
      <Route path="/data-storage" component={DataStorageInfo} />
      <Route path="/upgrade" component={UpgradePrompt} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:from-gray-900 dark:via-black dark:to-gray-900 light:from-blue-50 light:via-white light:to-blue-100">
            <div className="w-full max-w-md mx-auto min-h-screen bg-black/20 dark:bg-black/20 light:bg-white/95 light:shadow-lg backdrop-blur-sm">
              <Toaster />
              <Router />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
