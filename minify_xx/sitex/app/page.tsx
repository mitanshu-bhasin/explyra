"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Rocket, ArrowRight, ShieldCheck } from "lucide-react";
import { ProgressRing } from "@/components/ProgressRing";
import { StatsBar } from "@/components/StatsBar";
import { LiveConsole } from "@/components/LiveConsole";
import { useIndexingSession } from "@/hooks/useIndexingSession";
import { extractLocsFromXml, fetchSitemap } from "@/lib/sitemapParser";
import { cn } from "@/lib/utils";

export default function SitexEntryPoint() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { status, loadUrls, urls, currentIndex, updateUrlStatus, addConsoleLog, setStatus, stats } = useIndexingSession();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        addConsoleLog('info', `Authenticated as ${u.email}`);
      }
    });
  }, [addConsoleLog]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Retrieve the access token with indexing scope
      const credential: any = (result as any)._tokenResponse;
      setAccessToken(credential.oauthAccessToken);
      addConsoleLog('success', 'Successfully logged in with Google Indexing permissions');
    } catch (err: any) {
      addConsoleLog('error', `Login failed: ${err.message}`);
    }
  };

  const parseAndLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sitemapUrl || !user) return;

    setProcessing(true);
    addConsoleLog('info', `Loading sitemap from ${sitemapUrl}...`);
    
    try {
      const xml = await fetchSitemap(sitemapUrl);
      const locs = extractLocsFromXml(xml);
      loadUrls(locs);
      addConsoleLog('success', `Found ${locs.length} unique URLs in sitemap`);
    } catch (err: any) {
      addConsoleLog('error', `Sitemap error: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const startIndexing = async () => {
    if (status === 'running') return;
    
    setStatus('running');
    addConsoleLog('info', 'Initialising indexing engine...');

    for (let i = currentIndex; i < urls.length; i++) {
      if (status === 'paused') break;

      const urlToProcess = urls[i].url;
      addConsoleLog('info', `Indexing (${i+1}/${urls.length}): ${urlToProcess}`);

      try {
        // GOOGLE INDEXING API CALL
        const response = await fetch(`https://indexing.googleapis.com/v3/urlNotifications:publish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            url: urlToProcess,
            type: 'URL_UPDATED'
          })
        });

        if (response.status === 429) {
          addConsoleLog('warning', "Rate limit exceeded (429). Pause for 10 minutes or check quota.");
          updateUrlStatus(i, 'failed', 'Rate Limit Exceeded');
          setStatus('paused');
          break;
        }

        if (response.status === 403) {
          addConsoleLog('error', "Access Denied (403). Ensure you are the verified Search Console owner.");
          updateUrlStatus(i, 'failed', 'Permission Denied');
          setStatus('paused');
          break;
        }

        if (response.ok) {
          updateUrlStatus(i, 'success');
          addConsoleLog('success', `Indexed successfully`);
        } else {
          const errData = await response.json();
          const errMsg = errData?.error?.message || response.statusText;
          updateUrlStatus(i, 'failed', errMsg);
          addConsoleLog('error', `Status ${response.status}: ${errMsg}`);
        }
      } catch (err: any) {
        updateUrlStatus(i, 'failed', err.message);
        addConsoleLog('error', `Request failed: ${err.message}`);
      }

      // Mandatory 1.5s delay
      await new Promise(r => setTimeout(r, 1500));
    }

    if (urls.length > 0 && stats.remaining === 0) {
      setStatus('done');
      addConsoleLog('success', 'Full sitemap processed. All tasks finished.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 justify-between border-b border-slate-900 pb-8">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-blue-500/20 shadow-2xl">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-outfit tracking-tight text-white flex items-center gap-2">
              Sitex <span className="text-blue-500">v1.0</span>
            </h1>
            <p className="text-slate-400 font-medium">Real-time Sitemap Indexer for Explyra Suite</p>
          </div>
        </div>

        {!user ? (
          <button 
            onClick={handleLogin}
            className="group flex items-center gap-2 px-6 py-3 bg-white text-slate-950 rounded-xl font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sign in with Google <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-slate-900/50 p-2 pl-4 rounded-2xl border border-slate-800">
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-white leading-none">{user.displayName}</span>
              <span className="text-[11px] text-emerald-500 flex items-center justify-end gap-1">
                <ShieldCheck className="w-2.5 h-2.5" /> Authenticated
              </span>
            </div>
            <img src={user.photoURL || ""} className="w-10 h-10 rounded-xl border-2 border-slate-800 shadow-lg" alt="Avatar" />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-3xl"
          >
            <ShieldCheck className="w-16 h-16 text-slate-700 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
            <p className="text-slate-400 text-center max-w-sm mb-8 font-medium">
              You must authenticate with your Google Search Console account to access the Indexing API features.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              {/* Sitemap Input */}
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-500" /> Indexing Context
                </h3>
                <form onSubmit={parseAndLoad} className="flex gap-4">
                  <input 
                    type="url" 
                    value={sitemapUrl}
                    onChange={(e) => setSitemapUrl(e.target.value)}
                    placeholder="Enter sitemap URL (e.g. https://yourdomain.com/sitemap.xml)" 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 outline-none focus:border-blue-500 transition-colors font-medium"
                    required
                  />
                  <button 
                    disabled={processing || status === 'running'}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all"
                  >
                    {processing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Load"}
                  </button>
                </form>
              </div>

              {/* Console */}
              <LiveConsole />
            </div>

            <div className="space-y-8">
              {/* Progress Panel */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col items-center">
                <ProgressRing percentage={stats.percentage} />
                <div className="mt-8 grid grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-white">{stats.total}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Total</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-slate-800">
                    <span className="text-xl font-black text-emerald-500">{stats.done}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Done</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-red-500">{stats.failed}</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Failed</span>
                  </div>
                </div>

                <button 
                  onClick={startIndexing}
                  disabled={urls.length === 0 || status === 'running'}
                  className={cn(
                    "w-full mt-10 py-4 rounded-2xl font-black tracking-wider uppercase transition-all shadow-2xl",
                    (urls.length === 0 || status === 'running')
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : "bg-white text-slate-950 hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {status === 'running' ? "Running Loop..." : "Execute Indexing"}
                </button>
              </div>

              {/* Quick Info */}
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                <h4 className="text-xs font-black text-slate-500 uppercase mb-4 tracking-widest">Indexing Intelligence</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="p-1 rounded bg-blue-500/10"><ShieldCheck className="w-3.5 h-3.5 text-blue-500" /></div>
                    <p className="text-[13px] text-slate-400 font-medium leading-tight">
                      Automatic 1.5s sequential delay to maintain perfect GCP quota healthy.
                    </p>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="p-1 rounded bg-emerald-500/10"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></div>
                    <p className="text-[13px] text-slate-400 font-medium leading-tight">
                      URL_UPDATED notifications are sent for instant crawling priority.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
