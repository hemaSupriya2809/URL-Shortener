import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      {/* Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-accent-400 mb-8"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Powering short links with rich analytics</span>
      </motion.div>

      {/* Hero Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
      >
        Shorten links. <br className="hidden md:block"/>
        <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-indigo-400 bg-clip-text text-transparent">
          Analyze reach in real-time.
        </span>
      </motion.h1>

      {/* Hero Description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
      >
        TrimURL turns long, messy links into powerful short codes. Track every click, discover user demographics, and manage links in a modern dashboard.
      </motion.p>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-24"
      >
        <Link
          to="/signup"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-medium px-8 py-4 rounded-2xl transition-all shadow-xl shadow-accent-500/20 hover:scale-[1.02]"
        >
          Get Started For Free
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white px-8 py-4 rounded-2xl transition-all"
        >
          View Dashboard
        </Link>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-8 w-full"
      >
        {/* Feature 1 */}
        <div className="glass-panel p-8 rounded-3xl text-left border border-slate-900 hover:border-slate-800/80 transition-colors">
          <div className="bg-brand-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-brand-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Instant redirection with zero delay. Our server processes short codes immediately and routes users to their destination.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="glass-panel p-8 rounded-3xl text-left border border-slate-900 hover:border-slate-800/80 transition-colors">
          <div className="bg-accent-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <BarChart3 className="w-6 h-6 text-accent-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Rich Analytics</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Monitor click counts, timestamps, locations (IPs), and browser engines (User-Agents) in a clean analytics hub.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="glass-panel p-8 rounded-3xl text-left border border-slate-900 hover:border-slate-800/80 transition-colors">
          <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            All user authentication uses secure JWT standard and bcrypt hashing. Manage and delete your short links at any time.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
