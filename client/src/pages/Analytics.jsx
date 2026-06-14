import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, BarChart3, Globe, ShieldAlert, 
  Calendar, Monitor, Smartphone, Layout 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`/api/urls/${id}/analytics`);
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-slate-400 mb-6">{error || 'Could not fetch analytics data'}</p>
        <Link to="/dashboard" className="bg-slate-900 border border-slate-800 px-6 py-2.5 rounded-xl text-sm">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { url, analytics } = data;

  // Extract User Agent Categories
  const getDeviceIcon = (ua) => {
    const lUa = ua.toLowerCase();
    if (lUa.includes('mobile') || lUa.includes('android') || lUa.includes('iphone')) {
      return <Smartphone className="w-4 h-4 text-emerald-400" />;
    }
    if (lUa.includes('tablet') || lUa.includes('ipad')) {
      return <Layout className="w-4 h-4 text-blue-400" />;
    }
    return <Monitor className="w-4 h-4 text-accent-400" />;
  };

  const getDeviceLabel = (ua) => {
    const lUa = ua.toLowerCase();
    if (lUa.includes('mobile') || lUa.includes('android') || lUa.includes('iphone')) {
      return 'Mobile';
    }
    if (lUa.includes('tablet') || lUa.includes('ipad')) {
      return 'Tablet';
    }
    return 'Desktop';
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Back Button */}
      <Link 
        to="/dashboard" 
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 inline-flex"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* URL Meta Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl border border-slate-900 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-semibold text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Short Link Meta
            </span>
            <h2 className="text-2xl font-bold mt-3 text-white font-mono break-all">
              localhost:5000/{url.shortCode}
            </h2>
            <p className="text-slate-400 text-sm mt-1 truncate max-w-xl">
              Original: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-300">{url.originalUrl}</a>
            </p>
          </div>
          
          <div className="flex gap-8 border-l border-slate-800 pl-0 md:pl-8">
            <div>
              <span className="text-slate-500 text-xs uppercase font-medium">Total Clicks</span>
              <div className="text-4xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                {url.clicks}
                <BarChart3 className="w-5 h-5 text-accent-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analytics Lists */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Click Logs */}
        <div className="md:col-span-2 glass-panel rounded-3xl border border-slate-900 overflow-hidden shadow-xl">
          <div className="px-8 py-5 border-b border-slate-900 bg-slate-900/30">
            <h3 className="text-lg font-bold">Recent Clicks</h3>
          </div>
          
          {analytics.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No click details available yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-900/50">
              {analytics.map((log) => (
                <div key={log._id} className="px-8 py-4 hover:bg-slate-900/10 transition-colors flex items-center justify-between text-sm">
                  <div>
                    <div className="font-mono text-slate-300 font-semibold">{log.ipAddress}</div>
                    <div className="text-xs text-slate-500 mt-1 truncate max-w-xs md:max-w-md" title={log.userAgent}>
                      {log.userAgent}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(log.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-slate-600 text-xs mt-1">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Browser Demographics / Devices */}
        <div className="glass-panel rounded-3xl border border-slate-900 overflow-hidden shadow-xl p-8">
          <h3 className="text-lg font-bold mb-6">Device Split</h3>

          {analytics.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              No device data yet.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Calculate browser percentage */}
              {['Desktop', 'Mobile', 'Tablet'].map((device) => {
                const count = analytics.filter(a => getDeviceLabel(a.userAgent) === device).length;
                const percentage = analytics.length > 0 ? Math.round((count / analytics.length) * 100) : 0;
                
                return (
                  <div key={device}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <div className="flex items-center gap-2">
                        {device === 'Desktop' ? <Monitor className="w-4 h-4 text-accent-400" /> : 
                         device === 'Mobile' ? <Smartphone className="w-4 h-4 text-emerald-400" /> : 
                         <Layout className="w-4 h-4 text-blue-400" />}
                        <span className="font-medium text-slate-300">{device}</span>
                      </div>
                      <span className="font-mono font-semibold text-white">{percentage}% ({count})</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          device === 'Desktop' ? 'bg-accent-500' : 
                          device === 'Mobile' ? 'bg-emerald-500' : 
                          'bg-blue-500'
                        }`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
