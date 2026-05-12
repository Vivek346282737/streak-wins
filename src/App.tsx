import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PactProvider } from "@/store/PactContext";
import { AuthProvider } from "@/store/AuthContext";
import MobileShell from "@/components/MobileShell";
import ProtectedRoute from "@/components/ProtectedRoute";

import Splash from "./pages/Splash";
import Auth from "./pages/Auth";
import OtpScreen from "./pages/OtpScreen";
import Identity from "./pages/onboarding/Identity";
import Categories from "./pages/onboarding/Categories";
import Notifications from "./pages/onboarding/Notifications";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import PactDetail from "./pages/PactDetail";
import Tracking from "./pages/Tracking";
import CheckIn from "./pages/CheckIn";
import GpsVerify from "./pages/GpsVerify";
import Failure from "./pages/Failure";
import Completion from "./pages/Completion";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const protect = (el: React.ReactNode) => <ProtectedRoute>{el}</ProtectedRoute>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PactProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <MobileShell>
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/otp" element={<OtpScreen />} />
                <Route path="/onboarding/identity" element={protect(<Identity />)} />
                <Route path="/onboarding/categories" element={protect(<Categories />)} />
                <Route path="/onboarding/notifications" element={protect(<Notifications />)} />
                <Route path="/home" element={protect(<Home />)} />
                <Route path="/browse" element={protect(<Browse />)} />
                <Route path="/pact/:id" element={protect(<PactDetail />)} />
                <Route path="/tracking" element={protect(<Tracking />)} />
                <Route path="/check-in" element={protect(<CheckIn />)} />
                <Route path="/gps" element={protect(<GpsVerify />)} />
                <Route path="/failure" element={protect(<Failure />)} />
                <Route path="/completion" element={protect(<Completion />)} />
                <Route path="/wallet" element={protect(<Wallet />)} />
                <Route path="/profile" element={protect(<Profile />)} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MobileShell>
          </BrowserRouter>
        </TooltipProvider>
      </PactProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
