import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PactProvider } from "@/store/PactContext";
import MobileShell from "@/components/MobileShell";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
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
              <Route path="/onboarding/identity" element={<Identity />} />
              <Route path="/onboarding/categories" element={<Categories />} />
              <Route path="/onboarding/notifications" element={<Notifications />} />
              <Route path="/home" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/pact/:id" element={<PactDetail />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/check-in" element={<CheckIn />} />
              <Route path="/gps" element={<GpsVerify />} />
              <Route path="/failure" element={<Failure />} />
              <Route path="/completion" element={<Completion />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MobileShell>
        </BrowserRouter>
      </TooltipProvider>
    </PactProvider>
  </QueryClientProvider>
);

export default App;
