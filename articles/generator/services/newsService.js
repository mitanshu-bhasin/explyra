import axios from 'axios';
import config from '../config.js';

// GNews API (primary, key "n2")
const GNEWS_URL = 'https://gnews.io/api/v4/top-headlines';
// NewsData.io (fallback)
const NEWSDATA_URL = 'https://newsdata.io/api/1/latest';

export const fetchLatestTechNews = async () => {
    // ── ATTEMPT 1: GNews (n2 key) ──
    const gnewsKey = config.gnewsKey;
    if (gnewsKey) {
        try {
            console.log('[NewsService] Trying GNews API (primary)...');
            const res = await axios.get(GNEWS_URL, {
                params: { token: gnewsKey, topic: 'technology', lang: 'en', max: 10 },
                timeout: 10000
            });
            if (res.data && res.data.articles && res.data.articles.length > 0) {
                console.log(`[NewsService] ✅ GNews returned ${res.data.articles.length} headlines.`);
                return res.data.articles.slice(0, 10).map(a => ({
                    title: a.title || 'Untitled Tech Report',
                    description: a.description || a.content || 'Latest technology developments',
                    url: a.url,
                    source: a.source?.name || 'GNews',
                    image: a.image || null,
                    publishedAt: a.publishedAt
                }));
            }
        } catch (err) {
            console.warn('[NewsService] GNews failed:', err.message);
        }
    }

    // ── ATTEMPT 2: NewsData.io (fallback) ──
    const newsDataKey = config.newsKey;
    if (newsDataKey) {
        try {
            console.log('[NewsService] Trying NewsData.io (fallback)...');
            const res = await axios.get(NEWSDATA_URL, {
                params: { apikey: newsDataKey, category: 'technology', language: 'en' },
                timeout: 10000
            });
            if (res.data && res.data.results && res.data.results.length > 0) {
                console.log(`[NewsService] ✅ NewsData returned ${res.data.results.length} headlines.`);
                return res.data.results.slice(0, 10).map(a => ({
                    title: a.title || 'Untitled Tech Report',
                    description: a.description || a.content || 'Latest technology developments',
                    url: a.link,
                    source: a.source_id || 'NewsData',
                    image: a.image_url || null,
                    publishedAt: a.pubDate
                }));
            }
        } catch (err) {
            console.warn('[NewsService] NewsData.io failed:', err.message);
        }
    }

    // ── ATTEMPT 3: Diverse mock headlines (offline mode) ──
    console.warn('[NewsService] ⚠️ All APIs failed. Using 10 diverse mock headlines.');
    const mockTopics = [
        { title: "OpenAI Unveils GPT-5 with Autonomous Reasoning Capabilities", description: "OpenAI has announced GPT-5, featuring advanced chain-of-thought reasoning and the ability to execute multi-step tasks autonomously across integrated platforms." },
        { title: "Google DeepMind Achieves Breakthrough in Protein Folding for Drug Discovery", description: "DeepMind's latest AlphaFold 3 model can now predict protein-ligand binding interactions, accelerating pharmaceutical research timelines by years." },
        { title: "TSMC Begins Mass Production of 2nm Chips, Outpacing Intel and Samsung", description: "Taiwan Semiconductor Manufacturing Company has commenced volume production of its N2 process node, delivering 25% speed improvement over the previous generation." },
        { title: "The EU AI Act Takes Full Effect: What It Means for Global Tech Companies", description: "The European Union's landmark AI regulation is now enforceable, with strict transparency requirements for foundation model providers and high-risk AI applications." },
        { title: "SpaceX Starlink V3 Satellites Promise 500Mbps Speeds Globally", description: "SpaceX has begun deploying its third-generation Starlink constellation, featuring direct-to-cell capability and significantly higher bandwidth for underserved regions." },
        { title: "Apple M5 Ultra Chip Redefines Desktop-Class AI Processing", description: "Apple's newest silicon features a 40-core Neural Engine capable of running 100B-parameter language models locally, challenging cloud-dependent AI workflows." },
        { title: "Rust Programming Language Adoption Surges in Enterprise Systems", description: "Major financial institutions and cloud providers are migrating critical infrastructure from C++ to Rust, citing memory safety guarantees and zero-cost abstractions." },
        { title: "Quantum Computing Milestone: IBM Achieves 10,000-Qubit Processor", description: "IBM's Condor 2 quantum processor has surpassed the 10,000-qubit barrier, opening new possibilities for cryptography, materials science, and logistics optimization." },
        { title: "Meta Launches Next-Gen AR Glasses with Full Holographic Display", description: "Meta's Orion consumer AR glasses feature a lightweight waveguide display with 70-degree field of view, hand tracking, and seamless integration with AI assistants." },
        { title: "Global Cybersecurity Spending to Exceed $300 Billion Amid Rising AI-Powered Threats", description: "Analysts predict record cybersecurity investments as AI-generated phishing, deepfake fraud, and automated vulnerability exploitation become mainstream attack vectors." }
    ];
    return mockTopics.map(m => ({ ...m, source: 'Explyra Intelligence', image: null, publishedAt: new Date().toISOString() }));
};
