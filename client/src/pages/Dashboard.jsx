import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { 
  Link2, Copy, Check, Trash2, BarChart2, Plus, 
  ExternalLink, Calendar, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shortening, setShortening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState('');

  const { logout } = useContext(AuthContext);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/urls');
      setUrls(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      }
      setError('Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    setShortening(true);
    setError('');

    try {
      const response = await axios.post('/api/urls/shorten', { originalUrl });
      setUrls([response.data, ...urls]);
      setOriginalUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setShortening(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    try {
      await axios.delete(`/api/urls/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
    } catch (err) {
      setError('Failed to delete URL');
    }
  };

  const handleCopy = (code, id) => {
    const fullUrl = `http://localhost:5000/${code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Shorten Box */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl border border-slate-900 mb-10 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Shorten a new URL
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Paste your long URL below to shrink it and enable detailed tracking.
        </p>

        {error && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-200 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Link2 className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              required
              placeholder="Paste your long link here (e.g. https://example.com/very/long/path)"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full glass-input rounded-2xl py-4 pl-12 pr-4 text-white text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={shortening}
            className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-medium px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-accent-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {shortening ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Shorten
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* URL List */}
      <div className="glass-panel rounded-3xl border border-slate-900 overflow-hidden shadow-xl">
        <div className="px-8 py-6 border-b border-slate-900 flex justify-between items-center bg-slate-900/30">
          <h3 className="text-xl font-bold">Your Shortened Links</h3>
          <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            {urls.length} Total
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-500"></div>
            <span className="text-slate-400 text-sm">Loading your links...</span>
          </div>
        ) : urls.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Link2 className="w-12 h-12 mx-auto mb-4 opacity-20 text-accent-400" />
            <p className="text-base mb-2">No shortened links found</p>
            <p className="text-sm text-slate-600">Create one above to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-900/10">
                  <th className="px-8 py-4">Original URL</th>
                  <th className="px-8 py-4">Short URL</th>
                  <th className="px-8 py-4">Clicks</th>
                  <th className="px-8 py-4">Created At</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/50">
                <AnimatePresence>
                  {urls.map((url) => (
                    <motion.tr 
                      key={url._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-900/20 transition-colors text-sm"
                    >
                      {/* Original URL */}
                      <td className="px-8 py-4 max-w-xs md:max-w-sm truncate">
                        <a 
                          href={url.originalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline text-slate-300 hover:text-white flex items-center gap-1.5 inline-flex"
                        >
                          {url.originalUrl}
                          <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                        </a>
                      </td>

                      {/* Short URL */}
                      <td className="px-8 py-4 font-mono font-medium text-accent-400">
                        <a 
                          href={`http://localhost:5000/${url.shortCode}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          localhost:5000/{url.shortCode}
                        </a>
                      </td>

                      {/* Clicks */}
                      <td className="px-8 py-4">
                        <Link 
                          to={`/analytics/${url._id}`} 
                          className="flex items-center gap-1.5 hover:text-accent-400 font-semibold text-slate-300 transition-colors"
                        >
                          <BarChart2 className="w-4 h-4 text-slate-500" />
                          {url.clicks}
                        </Link>
                      </td>

                      {/* Created At */}
                      <td className="px-8 py-4 text-slate-400 flex items-center gap-1.5 pt-5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleCopy(url.shortCode, url._id)}
                            className={`p-2 rounded-xl border transition-all ${
                              copiedId === url._id 
                                ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-300' 
                                : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                            title="Copy to clipboard"
                          >
                            {copiedId === url._id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          
                          <Link
                            to={`/analytics/${url._id}`}
                            className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
                            title="View Analytics"
                          >
                            <BarChart2 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(url._id)}
                            className="p-2 rounded-xl bg-red-950/20 border border-red-950/80 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all"
                            title="Delete link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
