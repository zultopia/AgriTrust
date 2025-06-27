import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./core/style/global.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Bounce, Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NFTPage from "./pages/nft/nft-page";
import CommunityPage from "./pages/community/community-page";
import Dashboard from "./pages/dashboard/dashboard-page";
import { BrowserRouter, Route, Routes, useLocation, useNavigationType } from "react-router";
import HomePage from "./pages/home-page.jsx";
import HomeLayout from "@/core/components/layouts/home-layout.jsx";
import { AuthProvider } from "@/core/providers/auth-provider";
import ScrollToTop from "@/core/components/scroll-to-top";
import { Toaster } from "@/core/components/ui/toaster";
import NotFoundPage from "./pages/SEO/not-found-page";
import AuthGuard from "@/core/components/auth/auth-guard";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

const customStyles = `
  #nprogress .bar {
    background: #10b981 !important;
    height: 3px !important;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #10b981, 0 0 5px #10b981 !important;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = customStyles;
document.head.appendChild(styleSheet);

function NProgressRouter() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    return () => {
      clearTimeout(timer);
      NProgress.remove();
    };
  }, [location, navigationType]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NProgressRouter />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/nfts" element={<NFTPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <Toaster />
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
