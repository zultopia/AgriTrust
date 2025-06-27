import { Sheet, SheetContent, SheetTrigger } from "@/core/components/ui/sheet";
import { Outlet, useNavigate } from "react-router";
import { Button } from "@/core/components/ui/button";
import { useAuth } from "@/core/providers/auth-provider";
import { UserProfileHeader } from "../user-profile";
import { useState } from "react";
import { convertE8sToToken } from "@/core/lib/canisterUtils";
import { Menu, Leaf, Wallet, User, X, ChevronDown, Zap, Droplets, Recycle, TreePine, Sparkles, LogOut, CreditCard, FileText } from "lucide-react";


export default function HomeLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, login, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isHomePage = window.location.pathname === "/";
  const isAssistantPage = window.location.pathname === "/assistant";

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isAssistantPage ? "bg-black" : ""}`}>
      {(
        <>
          <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-3 border border-white/20">
              <div className="hidden md:flex items-center space-x-8 text-xl font-medium">
                <a 
                  href="#" 
                  onClick={() => navigate("/")}
                  className="text-white hover:text-green-400 transition-colors"
                >
                  Home
                </a>
                <a 
                  href="" 
                  onClick={() => navigate("/dashboard")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Dashboard
                </a>
                <a 
                  onClick={() => navigate("/aiscan")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  AIScan
                </a>
                <a 
                  onClick={() => navigate("/nfts")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  NFTs
                </a>
                <a 
                  onClick={() => navigate("/community")}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-1"
                >
                  Community
                </a>
              </div>
              
              {/* Mobile menu button for floating nav */}
              <div className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20"
                  onClick={handleMobileMenuToggle}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </nav>

          {/* User Profile Badge */}
          <div className="fixed top-6 right-6 z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20 flex items-center space-x-2">
              {isLoading ? (
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />
              ) : isAuthenticated ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {convertE8sToToken(user?.balance)} LUM
                  </div>
                </>
              ) : (
                <Button 
                  className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full"
                  onClick={login}
                >
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </>
      )}

    

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0 bg-gray-900 text-white border-gray-700">
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="border-b border-gray-700 p-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 font-bold text-xl">
                <Leaf className="h-6 w-6 text-emerald-500" />
                AgriTrust
              </a>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info & Balance - Mobile */}
            {isAuthenticated && user?.id ? (
              <div className="border-b border-gray-700 p-4">
                <div className="flex flex-col gap-3">
                  {/* User Profile */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <p className="truncate max-w-[150px]">{user.id}</p>
                        <button onClick={() => navigator.clipboard.writeText(user.id)} className="hover:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Balance */}
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 cursor-pointer hover:bg-gray-700"
                    onClick={() => {
                      if (user.role === "community") {
                        navigate("/community?tab=balance");
                      } else {
                        navigate("/balance");
                      }
                      setIsMobileMenuOpen(false);
                    }}>
                    <Wallet className="h-6 w-6 text-emerald-500" />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">LUM Balance</span>
                      <span className="text-base font-medium">{convertE8sToToken(user?.balance)} LUM</span>
                    </div>
                  </div>

                  {/* User Specific Actions */}
                  {user.role === "community" ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-gray-800"
                      onClick={() => {
                        navigate("/community");
                        setIsMobileMenuOpen(false);
                      }}>
                      <User className="h-4 w-4 mr-2" />
                      Community
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-gray-800"
                        onClick={() => {
                          navigate("/nfts");
                          setIsMobileMenuOpen(false);
                        }}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        NFTs
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-gray-800"
                        onClick={() => {
                          navigate("/my-projects");
                          setIsMobileMenuOpen(false);
                        }}>
                        <FileText className="h-4 w-4 mr-2" />
                        My Projects
                      </Button>
                    </>
                  )}

                  {/* Logout Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-b border-gray-700 p-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    login();
                    setIsMobileMenuOpen(false);
                  }}>
                  <User className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="flex-1 overflow-auto py-4">
              <nav className="flex flex-col px-4 gap-1">
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    navigate("/");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-white">
                  <span className="font-medium">Home</span>
                </a>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    navigate("/projects");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-white">
                  <span className="font-medium">Projects</span>
                </a>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    navigate("/resources");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-white">
                  <span className="font-medium">Resources</span>
                </a>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    navigate("/nfts");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-white">
                  <span className="font-medium">NFTs</span>
                </a>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    navigate("/assistant");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-white">
                  <Sparkles className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="font-medium">Assistant</span>
                </a>
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Outlet/>

      <footer className={`${isAssistantPage ? "bg-black" : "bg-card"} border-t border-border/40 py-6`}>
        <div className="container">
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-500" />
            <span className="text-muted-foreground">© {new Date().getFullYear()} AgriTrust</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
