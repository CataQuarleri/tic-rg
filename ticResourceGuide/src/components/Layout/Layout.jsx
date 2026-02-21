import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ResourceContext } from '../../context/ResourceContext';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Heart, Settings, PlusCircle } from 'lucide-react';
import ContributionModal from '../Contribution/ContributionModal';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { clearFilters } = useContext(ResourceContext);
  const { user, isAdmin, logout } = useAuth();
  const [isContributionOpen, setIsContributionOpen] = useState(false);

  const handleGoHome = () => {
    clearFilters();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sage-100 selection:text-sage-900">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              onClick={handleGoHome}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="bg-sage-500 p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                TIC <span className="text-sage-500 underline decoration-sage-200 decoration-4 underline-offset-4">Guide</span>
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              {/* Public Contribution Button */}
              <button 
                onClick={() => setIsContributionOpen(true)}
                className="hidden md:flex items-center gap-2 text-sage-600 hover:text-sage-700 font-bold text-sm transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Propose Resource
              </button>

              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors border-r border-slate-200 pr-4"
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              )}

              {user ? (
                <div className="flex items-center gap-3 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-dusk-500 flex items-center justify-center text-white">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 hidden sm:block">
                    {user.email?.split('@')[0]}
                  </span>
                  <button 
                    onClick={logout}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-sage-500 transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
         {children}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-slate-400 text-sm font-medium">
            &copy; 2026 Trauma-Informed Care Resource Guide.
          </p>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Providing stressed healthcare workers with mindful, evidence-based resources to support their growth and safety.
          </p>
        </div>
      </footer>

      <ContributionModal 
        isOpen={isContributionOpen} 
        onClose={() => setIsContributionOpen(false)} 
      />
    </div>
  );
};

export default Layout;
