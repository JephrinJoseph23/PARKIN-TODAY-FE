import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MapView from "./pages/MapView";
import SlotSelection from "./pages/SlotSelection";
import InitialPayment from "./pages/InitialPayment";
import ParkingSession from "./pages/ParkingSession";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/slot-selection/:lotId" element={<SlotSelection />} />
          <Route path="/initial-payment/:lotId/:slotId" element={<InitialPayment />} />
          <Route path="/parking-session/:lotId/:slotId" element={<ParkingSession />} />
          <Route path="/billing/:lotId/:slotId" element={<Billing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
