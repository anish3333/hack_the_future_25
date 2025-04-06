
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import ResumeEditor from "./pages/ResumeEditor";
import MatchResults from "./pages/MatchResults";
import Schedule from "./pages/Schedule";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { LoadingState } from "./components/LoadingState";
import DiscussionWorld from "./components/DiscussionWorld";
import GroupDiscussion from "./pages/GroupDiscussion";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<"resume" | "matching" | "analysis" | "default">("default");
  const [prevPath, setPrevPath] = useState("");

  useEffect(() => {
    // Don't show loading on first load or when navigating to index
    if (prevPath === "" || location.pathname === "/") {
      setPrevPath(location.pathname);
      return;
    }

    // Determine loading type based on the target route
    if (location.pathname.includes("resume-editor")) {
      setLoadingType("resume");
    } else if (location.pathname.includes("match-results")) {
      setLoadingType("matching");
    } else if (location.pathname.includes("analysis")) {
      setLoadingType("analysis");
    } else {
      setLoadingType("default");
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setPrevPath(location.pathname);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingState type={loadingType} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/resume-editor" element={<ResumeEditor />} />
      <Route path="/match-results" element={<MatchResults />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/group-discussion" element={<GroupDiscussion />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
