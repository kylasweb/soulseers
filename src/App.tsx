
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ReaderSignup from "./pages/ReaderSignup";
import Dashboard from "./pages/Dashboard";
import ReaderDashboard from "./pages/ReaderDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Community from "./pages/Community";
import Readings from "./pages/Readings";
import Services from "./pages/Services";
import Sessions from "./pages/Sessions";
import Shop from "./pages/Shop";
import ConsultationBooking from "./pages/ConsultationBooking";
import ConsultationSession from "./pages/ConsultationSession";
import ConsultationCompleted from "./pages/ConsultationCompleted";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reader/signup" element={<ReaderSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reader/dashboard" element={<ReaderDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/readings" element={<Readings />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/shop" element={<Shop />} />
            
            {/* Consultation Routes */}
            <Route path="/consultations/booking" element={<ConsultationBooking />} />
            <Route path="/consultations/session" element={<ConsultationSession />} />
            <Route path="/consultations/completed" element={<ConsultationCompleted />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
