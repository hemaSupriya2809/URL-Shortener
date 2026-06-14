import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Scissors, LogOut, LayoutDashboard, Link2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-panel border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-brand-500 to-accent-500 p-2 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
            <Scissors className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Trim<span className="text-accent-400 font-extrabold">URL</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-all relative py-1 group/item"
              >
                <LayoutDashboard className="w-4 h-4 text-brand-400 group-hover/item:rotate-6 transition-transform" />
                <span>Dashboard</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-400 to-accent-400 group-hover/item:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-slate-800">|</span>
              <span className="text-sm text-slate-400">
                Hi, <span className="text-white font-semibold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-950/20 hover:bg-red-900/30 border border-red-900/30 hover:border-red-900/50 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-300 hover:text-white transition-colors relative py-1 group/login"
              >
                <span>Login</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-400 group-hover/login:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-brand-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
