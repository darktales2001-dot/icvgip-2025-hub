import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VisionIndia from "./pages/VisionIndia";
import OralSessions from "./pages/OralSessions";
import PosterSessions from "./pages/PosterSessions";
import TinyPapers from "./pages/TinyPapers";
import AcceptedPapers from "./pages/AcceptedPapers";
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
          <Route path="/vision-india" element={<VisionIndia />} />
          <Route path="/oral-sessions" element={<OralSessions />} />
          <Route path="/poster-sessions" element={<PosterSessions />} />
          <Route path="/tiny-papers" element={<TinyPapers />} />
          <Route path="/accept" element={<AcceptedPapers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
