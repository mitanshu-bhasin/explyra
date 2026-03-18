/* ═══════════════════════════════════════════
   EXPLYRA LEARNING - CORE LOGIC
   Handles course data, progress tracking and certificates via localStorage.
   Firebase Auth is handled separately per page via auth-sync.js.
   ═══════════════════════════════════════════ */

const ExplyraLearning = (() => {
    // ══════════════ DEFAULT COURSE DATA ══════════════
    const DEFAULT_COURSES = [
        {
            id: 'agentic-ai',
            title: 'Agentic AI Masterclass',
            badge: 'Artificial Intelligence',
            desc: 'Learn how to build and deploy autonomous AI agents that can reason, use tools, and solve complex problems without human intervention.',
            lessons: [
                {
                    id: 'aai-1',
                    title: 'Introduction to Agentic Systems',
                    content: `
                        <p>Agentic AI refers to systems that can <strong>autonomously pursue goals</strong>. Unlike passive chatbots that simply respond to queries, agents can plan, use tools, browse the web, write code, and self-correct. The core mental model of an agent follows the <strong>Observe → Think → Act → Observe</strong> loop.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">What Makes an Agent "Agentic"?</h3>
                        <ul style="margin:1rem 0; padding-left:1.5rem;">
                            <li><strong>Autonomy</strong> — The ability to make decisions without constant human intervention.</li>
                            <li><strong>Tool Use</strong> — The ability to call external APIs, search the web, run code, and interact with databases.</li>
                            <li><strong>Reasoning</strong> — Using chain-of-thought prompting and planning to break complex tasks into steps.</li>
                            <li><strong>Memory</strong> — Maintaining context across interactions using short-term and long-term memory.</li>
                            <li><strong>Self-Correction</strong> — Evaluating its own output and iterating until the task is complete.</li>
                        </ul>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">💡 Key Insight</strong>
                            <p style="margin-top:.5rem;">The difference between a chatbot and an agent is <em>agency</em>. A chatbot responds. An agent <strong>acts</strong>. Modern LLMs like GPT-4, Claude, and Gemini can all be made agentic with the right architecture.</p>
                        </div>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">Real-World Applications</h3>
                        <p>Agentic systems are powering the next generation of AI products:</p>
                        <ul style="margin:1rem 0; padding-left:1.5rem;">
                            <li><strong>Customer Support Agents</strong> — Handle tickets, look up orders, process refunds autonomously.</li>
                            <li><strong>Research Agents</strong> — Crawl the web, summarize papers, and generate reports.</li>
                            <li><strong>Coding Agents</strong> — Write, test, debug, and deploy code in CI/CD pipelines.</li>
                            <li><strong>Data Agents</strong> — Query databases, build dashboards, and send automated reports.</li>
                        </ul>
                    `
                },
                {
                    id: 'aai-2',
                    title: 'Tool Calling & External APIs',
                    content: `
                        <p>Agents gain superpowers through <strong>"tools"</strong> — structured functions that let them interact with the real world. This lesson covers how to define tools, handle structured outputs, and chain multiple calls to accomplish complex tasks.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Anatomy of a Tool</h3>
                        <p>A tool is a function with a well-defined schema that the LLM can decide to call. Here's an example:</p>
                        
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.88rem; line-height:1.6; margin:1.5rem 0;"><code>{
  "name": "get_weather",
  "description": "Fetches the current weather for a given city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": { "type": "string", "description": "City name" }
    },
    "required": ["city"]
  }
}</code></pre>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Tool Chaining</h3>
                        <p>The real power emerges when agents chain multiple tools together:</p>
                        <ol style="margin:1rem 0; padding-left:1.5rem;">
                            <li>Agent receives task: "Email me a summary of today's news about AI"</li>
                            <li>Calls <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">search_web("AI news today")</code></li>
                            <li>Calls <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">summarize(results)</code></li>
                            <li>Calls <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">send_email(summary, "user@email.com")</code></li>
                        </ol>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">⚡ Pro Tip</strong>
                            <p style="margin-top:.5rem;">Always validate tool outputs before passing them to the next step. Bad data from one tool can cascade errors through the entire chain.</p>
                        </div>
                    `
                },
                {
                    id: 'aai-3',
                    title: 'Multi-Agent Orchestration',
                    content: `
                        <p>Complex real-world tasks require <strong>multiple specialized agents</strong> working together. This lesson covers the most popular multi-agent patterns used in production.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Key Patterns</h3>
                        
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.5rem 0;">
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px;">
                                <strong>🧠 Planner Agent</strong>
                                <p style="font-size:.9rem; margin-top:.5rem; color:var(--ink3);">Breaks down a complex task into sub-tasks and assigns them to workers.</p>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px;">
                                <strong>⚙️ Worker Agent</strong>
                                <p style="font-size:.9rem; margin-top:.5rem; color:var(--ink3);">Executes a specific sub-task using its specialized tools and skills.</p>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px;">
                                <strong>🔍 Critic Agent</strong>
                                <p style="font-size:.9rem; margin-top:.5rem; color:var(--ink3);">Reviews the output, checks for errors, and sends feedback for improvement.</p>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px;">
                                <strong>📋 Supervisor Agent</strong>
                                <p style="font-size:.9rem; margin-top:.5rem; color:var(--ink3);">Coordinates the overall flow, decides when a task is complete, and handles failures.</p>
                            </div>
                        </div>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">Building Your First Multi-Agent Pipeline</h3>
                        <ol style="margin:1rem 0; padding-left:1.5rem;">
                            <li>Define the problem and identify sub-tasks</li>
                            <li>Create specialized agents for each sub-task</li>
                            <li>Build a supervisor to route tasks between agents</li>
                            <li>Add a critic to validate outputs before final delivery</li>
                            <li>Implement error handling and retry logic</li>
                        </ol>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">🏗️ Architecture Note</strong>
                            <p style="margin-top:.5rem;">Start simple. A single agent with good tools often beats a complex multi-agent system. Scale to multi-agent only when you've identified clear bottlenecks that need specialization.</p>
                        </div>
                    `
                }
            ],
            quiz: [
                { q: 'What defines an "Agentic" AI system?', a: ['Autonomous decision making to achieve goals', 'Simple rule-based chatbot responses', 'Pre-written static answer scripts'], correct: 0 },
                { q: 'What is a "tool" in the context of AI agents?', a: ['A structured function that lets the agent take actions', 'A physical hardware device', 'A Python library for ML'], correct: 0 },
                { q: 'In multi-agent systems, what does the "Critic" agent typically do?', a: ['Validates or reviews the output of other agents', 'Plans the overall task', 'Executes API calls'], correct: 0 }
            ]
        },
        {
            id: 'seo-devs',
            title: 'SEO for Developers',
            badge: 'Marketing & Web',
            desc: 'Technical SEO strategies designed specifically for developers. Core Web Vitals, Structured Data, semantic markup, crawlability, and more.',
            lessons: [
                {
                    id: 'seo-1',
                    title: 'How Search Engines Crawl & Index',
                    content: `
                        <p>Google uses <strong>Googlebot</strong> to crawl the web. Understanding how Googlebot works — its crawl budget, robots.txt, noindex tags, and sitemaps — is the foundation of technical SEO.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">The Crawling Pipeline</h3>
                        <ol style="margin:1rem 0; padding-left:1.5rem;">
                            <li><strong>Discovery</strong> — Googlebot finds URLs via sitemaps, links, and other sources.</li>
                            <li><strong>Crawling</strong> — The bot fetches each URL and downloads the HTML content.</li>
                            <li><strong>Rendering</strong> — JavaScript is executed (using headless Chrome) to get the final DOM.</li>
                            <li><strong>Indexing</strong> — The rendered content is analyzed, categorized, and stored.</li>
                            <li><strong>Ranking</strong> — When a user searches, indexed pages are ranked by relevance.</li>
                        </ol>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">Key Configuration Files</h3>
                        <div style="display:grid; gap:1rem; margin:1.5rem 0;">
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.2rem 1.5rem; border-radius:10px;">
                                <code style="color:var(--blue); font-weight:700;">robots.txt</code>
                                <span style="color:var(--ink3); margin-left:.5rem;">— Controls which pages crawlers can/cannot access</span>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.2rem 1.5rem; border-radius:10px;">
                                <code style="color:var(--blue); font-weight:700;">sitemap.xml</code>
                                <span style="color:var(--ink3); margin-left:.5rem;">— Lists all important URLs for search engines to discover</span>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.2rem 1.5rem; border-radius:10px;">
                                <code style="color:var(--blue); font-weight:700;">meta robots</code>
                                <span style="color:var(--ink3); margin-left:.5rem;">— Page-level control: noindex, nofollow, noarchive</span>
                            </div>
                        </div>
                    `
                },
                {
                    id: 'seo-2',
                    title: 'Core Web Vitals Deep Dive',
                    content: `
                        <p><strong>Core Web Vitals</strong> are measurable performance metrics Google uses as ranking signals. They measure real-world user experience.</p>
                        
                        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin:2rem 0;">
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:.5rem;">⚡</div>
                                <strong>LCP</strong>
                                <p style="font-size:.82rem; color:var(--ink3); margin-top:.3rem;">Largest Contentful Paint<br>Target: &lt; 2.5s</p>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:.5rem;">👆</div>
                                <strong>INP</strong>
                                <p style="font-size:.82rem; color:var(--ink3); margin-top:.3rem;">Interaction to Next Paint<br>Target: &lt; 200ms</p>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px; text-align:center;">
                                <div style="font-size:2rem; margin-bottom:.5rem;">📐</div>
                                <strong>CLS</strong>
                                <p style="font-size:.82rem; color:var(--ink3); margin-top:.3rem;">Cumulative Layout Shift<br>Target: &lt; 0.1</p>
                            </div>
                        </div>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">How to Audit</h3>
                        <ul style="margin:1rem 0; padding-left:1.5rem;">
                            <li><strong>Lighthouse</strong> (in Chrome DevTools) — Lab data for development</li>
                            <li><strong>PageSpeed Insights</strong> — Real-world field data from CrUX</li>
                            <li><strong>Search Console</strong> — Page-level CWV reports for your site</li>
                        </ul>
                    `
                },
                {
                    id: 'seo-3',
                    title: 'Structured Data & Rich Results',
                    content: `
                        <p><strong>Schema.org JSON-LD</strong> allows you to markup your content semantically, enabling rich features in Google Search like star ratings, FAQ dropdowns, breadcrumbs, and event listings.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Example: FAQ Schema</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is Explyra?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A comprehensive business suite."
    }
  }]
}
&lt;/script&gt;</code></pre>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Most Useful Schema Types</h3>
                        <ul style="margin:1rem 0; padding-left:1.5rem;">
                            <li><strong>Article</strong> — Blog posts & news articles</li>
                            <li><strong>Product</strong> — E-commerce product listings with prices & reviews</li>
                            <li><strong>HowTo</strong> — Step-by-step tutorials</li>
                            <li><strong>BreadcrumbList</strong> — Navigation breadcrumbs</li>
                            <li><strong>Organization</strong> — Company info, logo, social profiles</li>
                        </ul>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">✅ Validation</strong>
                            <p style="margin-top:.5rem;">Always test your structured data using Google's <strong>Rich Results Test</strong> tool before deploying to production.</p>
                        </div>
                    `
                }
            ],
            quiz: [
                { q: 'What does LCP stand for?', a: ['Largest Contentful Paint', 'Low Cost Performance', 'Link Click Priority'], correct: 0 },
                { q: 'Which file tells crawlers which parts of a site NOT to crawl?', a: ['robots.txt', 'sitemap.xml', '.htaccess'], correct: 0 }
            ]
        },
        {
            id: 'web-hosting',
            title: 'Web Hosting Basics',
            badge: 'Infrastructure',
            desc: 'Everything you need to know about servers, domains, DNS records, SSL/TLS, and deployment pipelines. From shared hosting to cloud VPS.',
            lessons: [
                {
                    id: 'host-1',
                    title: 'DNS Fundamentals',
                    content: `
                        <p>The <strong>Domain Name System (DNS)</strong> is the internet's phone book. It translates human-readable domain names like <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">explyra.com</code> into IP addresses like <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">192.168.1.1</code>.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">DNS Record Types</h3>
                        <div style="margin:1.5rem 0;">
                            <table style="width:100%; border-collapse:collapse;">
                                <tr style="border-bottom:2px solid var(--bdr);">
                                    <th style="text-align:left; padding:.8rem; font-size:.82rem; color:var(--ink4); text-transform:uppercase; letter-spacing:.05em;">Record</th>
                                    <th style="text-align:left; padding:.8rem; font-size:.82rem; color:var(--ink4); text-transform:uppercase; letter-spacing:.05em;">Purpose</th>
                                    <th style="text-align:left; padding:.8rem; font-size:.82rem; color:var(--ink4); text-transform:uppercase; letter-spacing:.05em;">Example</th>
                                </tr>
                                <tr style="border-bottom:1px solid var(--bdr);"><td style="padding:.8rem;"><strong>A</strong></td><td style="padding:.8rem;">Maps domain → IPv4</td><td style="padding:.8rem;"><code>93.184.216.34</code></td></tr>
                                <tr style="border-bottom:1px solid var(--bdr);"><td style="padding:.8rem;"><strong>AAAA</strong></td><td style="padding:.8rem;">Maps domain → IPv6</td><td style="padding:.8rem;"><code>2606:2800:220:1::</code></td></tr>
                                <tr style="border-bottom:1px solid var(--bdr);"><td style="padding:.8rem;"><strong>CNAME</strong></td><td style="padding:.8rem;">Alias to another domain</td><td style="padding:.8rem;"><code>www → explyra.com</code></td></tr>
                                <tr style="border-bottom:1px solid var(--bdr);"><td style="padding:.8rem;"><strong>MX</strong></td><td style="padding:.8rem;">Mail server routing</td><td style="padding:.8rem;"><code>mail.google.com</code></td></tr>
                                <tr><td style="padding:.8rem;"><strong>TXT</strong></td><td style="padding:.8rem;">Verification & SPF</td><td style="padding:.8rem;"><code>v=spf1 include:...</code></td></tr>
                            </table>
                        </div>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">⏱️ TTL (Time to Live)</strong>
                            <p style="margin-top:.5rem;">TTL controls how long DNS resolvers cache a record. Set low TTL (300s) before migrations, and high TTL (3600s+) for stable records to reduce lookup overhead.</p>
                        </div>
                    `
                },
                {
                    id: 'host-2',
                    title: 'SSL/TLS & HTTPS',
                    content: `
                        <p><strong>HTTPS</strong> encrypts data in transit using SSL/TLS certificates, protecting users from man-in-the-middle attacks and ensuring data integrity.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">How HTTPS Works</h3>
                        <ol style="margin:1rem 0; padding-left:1.5rem;">
                            <li>Browser connects to server and requests the SSL certificate</li>
                            <li>Server sends its certificate (containing the public key)</li>
                            <li>Browser verifies the certificate with a Certificate Authority (CA)</li>
                            <li>A secure session key is negotiated using asymmetric encryption</li>
                            <li>All subsequent data is encrypted with the symmetric session key</li>
                        </ol>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">Getting Free SSL with Let's Encrypt</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.88rem; line-height:1.6; margin:1.5rem 0;"><code># Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate and auto-configure for Nginx
sudo certbot --nginx -d yourdomain.com

# Auto-renew (runs every 12 hours by default)
sudo certbot renew --dry-run</code></pre>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">Security Headers</h3>
                        <ul style="margin:1rem 0; padding-left:1.5rem;">
                            <li><code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">Strict-Transport-Security (HSTS)</code> — Forces HTTPS for all future requests</li>
                            <li><code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">X-Content-Type-Options</code> — Prevents MIME-type sniffing</li>
                            <li><code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">Content-Security-Policy</code> — Controls which resources can load</li>
                        </ul>
                    `
                }
            ],
            quiz: [
                { q: 'Which DNS record maps a domain name to an IP address?', a: ['A Record', 'MX Record', 'TXT Record'], correct: 0 },
                { q: 'What does SSL/TLS provide?', a: ['Encrypted communication between client and server', 'Faster website loading', 'Email spam filtering'], correct: 0 }
            ]
        },
        {
            id: 'firebase-hosting',
            title: 'Firebase Hosting Guide',
            badge: 'Cloud',
            desc: 'Deploy fast, production-ready websites with Firebase Hosting. Covers CLI setup, custom domains, SSL, rewrites, and CI/CD integration.',
            lessons: [
                {
                    id: 'fb-1',
                    title: 'Firebase CLI Setup & Init',
                    content: `
                        <p>Firebase Hosting serves your content via a <strong>global CDN</strong> with automatic SSL. Getting started is straightforward with the Firebase CLI.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Setup Steps</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.88rem; line-height:1.6; margin:1.5rem 0;"><code># 1. Install Firebase CLI globally
npm install -g firebase-tools

# 2. Authenticate with your Google account
firebase login

# 3. Initialize hosting in your project
firebase init hosting

# 4. Select your Firebase project
# 5. Set public directory (usually "public" or "dist")
# 6. Configure as SPA? (Yes for React/Vue/Angular)</code></pre>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">firebase.json Configuration</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}</code></pre>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">📁 Pro Tip</strong>
                            <p style="margin-top:.5rem;">Always add <code>node_modules</code>, <code>.env</code> files, and build artifacts to your <code>.gitignore</code> <em>and</em> the <code>ignore</code> section of firebase.json.</p>
                        </div>
                    `
                },
                {
                    id: 'fb-2',
                    title: 'Deploying & Custom Domains',
                    content: `
                        <p>Firebase provides a one-command deploy process and handles SSL certificates automatically for custom domains.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Deployment</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.88rem; line-height:1.6; margin:1.5rem 0;"><code># Deploy to production
firebase deploy

# Deploy only hosting (skip functions, firestore rules etc.)
firebase deploy --only hosting

# Create a preview channel for staging/testing
firebase hosting:channel:deploy preview-v2</code></pre>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Adding a Custom Domain</h3>
                        <ol style="margin:1rem 0; padding-left:1.5rem;">
                            <li>Go to Firebase Console → Hosting → Add custom domain</li>
                            <li>Enter your domain (e.g., <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">explyra.com</code>)</li>
                            <li>Verify domain ownership by adding a TXT record to your DNS</li>
                            <li>Point your domain's A records to Firebase's IP addresses</li>
                            <li>Firebase auto-provisions an SSL certificate within ~24 hours</li>
                        </ol>
                    `
                },
                {
                    id: 'fb-3',
                    title: 'Rewrites, Headers & Performance',
                    content: `
                        <p>Fine-tune your Firebase Hosting with custom <strong>rewrites</strong>, security <strong>headers</strong>, and caching strategies for maximum performance.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Advanced firebase.json</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>{
  "hosting": {
    "public": "public",
    "headers": [{
      "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
      "headers": [{
        "key": "Cache-Control",
        "value": "max-age=31536000"
      }]
    }, {
      "source": "**",
      "headers": [{
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      }, {
        "key": "X-Frame-Options",
        "value": "DENY"
      }]
    }],
    "rewrites": [
      { "source": "/api/**", "function": "api" },
      { "source": "**", "destination": "/index.html" }
    ]
  }
}</code></pre>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">🌍 Global CDN</strong>
                            <p style="margin-top:.5rem;">Firebase Hosting serves content from the nearest PoP (Point of Presence) globally. Combined with immutable cache headers for static assets, your site loads blazingly fast worldwide.</p>
                        </div>
                    `
                }
            ],
            quiz: [
                { q: 'Which command deploys your site to Firebase Hosting?', a: ['firebase deploy', 'firebase push', 'firebase upload'], correct: 0 },
                { q: 'What does a rewrite rule in firebase.json help with?', a: ['Routing all URLs to index.html for SPAs', 'Speeding up CSS loading', 'Minifying JavaScript'], correct: 0 }
            ]
        },
        {
            id: 'frontend-fundamentals',
            title: 'Frontend Fundamentals',
            badge: 'Development',
            desc: 'Master the building blocks of the modern web: Semantic HTML5, advanced CSS (Grid, Flexbox, custom properties), and ES6+ JavaScript.',
            lessons: [
                {
                    id: 'fe-1',
                    title: 'Semantic HTML5',
                    content: `
                        <p>Semantic HTML uses <strong>meaningful element names</strong> instead of generic <code style="background:var(--bg3); padding:2px 6px; border-radius:4px;">&lt;div&gt;</code> tags. This improves accessibility, SEO, and code maintainability.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Semantic vs Non-Semantic</h3>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin:1.5rem 0;">
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px;">
                                <strong style="color:var(--rose);">❌ Non-Semantic</strong>
                                <pre style="margin-top:.8rem; font-size:.82rem;"><code>&lt;div class="header"&gt;
  &lt;div class="nav"&gt;...&lt;/div&gt;
&lt;/div&gt;
&lt;div class="content"&gt;
  &lt;div class="article"&gt;...&lt;/div&gt;
&lt;/div&gt;
&lt;div class="footer"&gt;...&lt;/div&gt;</code></pre>
                            </div>
                            <div style="background:var(--bg2); border:1px solid var(--bdr); padding:1.5rem; border-radius:12px;">
                                <strong style="color:var(--teal);">✅ Semantic</strong>
                                <pre style="margin-top:.8rem; font-size:.82rem;"><code>&lt;header&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;...&lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>
                            </div>
                        </div>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">Key Semantic Elements</h3>
                        <ul style="margin:1rem 0; padding-left:1.5rem;">
                            <li><code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code> — Page or section headers and footers</li>
                            <li><code>&lt;nav&gt;</code> — Navigation links</li>
                            <li><code>&lt;main&gt;</code> — Primary content (only one per page)</li>
                            <li><code>&lt;article&gt;</code> — Self-contained, redistributable content</li>
                            <li><code>&lt;section&gt;</code> — Thematic grouping of content</li>
                            <li><code>&lt;aside&gt;</code> — Tangentially related content (sidebars)</li>
                        </ul>
                    `
                },
                {
                    id: 'fe-2',
                    title: 'CSS Grid & Flexbox',
                    content: `
                        <p><strong>CSS Grid</strong> is ideal for two-dimensional layouts (rows AND columns), while <strong>Flexbox</strong> excels at one-dimensional alignment. Mastering both is essential for modern responsive design.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">CSS Grid — Dashboard Layout</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 64px 1fr 60px;
  grid-template-areas:
    "nav    nav     nav"
    "sidebar main   aside"
    "footer  footer  footer";
  min-height: 100vh;
}

.nav    { grid-area: nav; }
.sidebar { grid-area: sidebar; }
.main   { grid-area: main; }
.aside  { grid-area: aside; }
.footer { grid-area: footer; }</code></pre>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Flexbox — Component Alignment</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Center anything perfectly */
.center-me {
  display: flex;
  align-items: center;
  justify-content: center;
}</code></pre>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">🎯 Rule of Thumb</strong>
                            <p style="margin-top:.5rem;">Use <strong>Grid</strong> for page layouts and two-dimensional grids. Use <strong>Flexbox</strong> for component-level alignment and single-axis distribution.</p>
                        </div>
                    `
                },
                {
                    id: 'fe-3',
                    title: 'Modern JavaScript (ES6+)',
                    content: `
                        <p>ES6+ introduced revolutionary features that make JavaScript cleaner, safer, and more expressive. Every modern frontend developer <strong>must</strong> be fluent in these patterns.</p>
                        
                        <h3 style="margin-top:2rem; font-size:1.3rem;">Essential ES6+ Features</h3>
                        
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>// Arrow Functions
const add = (a, b) => a + b;

// Template Literals
const msg = \`Hello, \${user.name}!\`;

// Destructuring
const { name, email } = user;
const [first, ...rest] = items;

// Spread Operator
const merged = { ...defaults, ...userSettings };

// Optional Chaining
const city = user?.address?.city ?? 'Unknown';

// Async/Await
async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed:', err);
  }
}</code></pre>

                        <h3 style="margin-top:2rem; font-size:1.3rem;">ES Modules</h3>
                        <pre style="background:var(--bg3); padding:1.5rem; border-radius:10px; overflow-x:auto; font-size:.85rem; line-height:1.6; margin:1.5rem 0;"><code>// utils.js — Named exports
export const formatDate = (d) => new Intl.DateTimeFormat('en').format(d);
export const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

// app.js — Import what you need
import { formatDate, capitalize } from './utils.js';</code></pre>

                        <div style="background:var(--blue-g); border:1px solid var(--blue-b); padding:1.5rem; border-radius:12px; margin:2rem 0;">
                            <strong style="color:var(--blue);">📌 Remember</strong>
                            <p style="margin-top:.5rem;">Modern JavaScript is supported by all evergreen browsers. Use <code>const</code> by default, <code>let</code> when reassignment is needed, and never use <code>var</code>.</p>
                        </div>
                    `
                }
            ],
            quiz: [
                { q: 'Which HTML element is most appropriate for the main navigation links?', a: ['<nav>', '<div class="nav">', '<ul>'], correct: 0 },
                { q: 'What is CSS Grid best suited for?', a: ['Two-dimensional layouts with rows and columns', 'Aligning items in a single row', 'Styling text and fonts'], correct: 0 }
            ]
        }
    ];

    // ══════════════ STORAGE HELPERS ══════════════
    const store = {
        get: (key) => {
            try { return JSON.parse(localStorage.getItem(`explyra_${key}`)); } catch { return null; }
        },
        set: (key, val) => localStorage.setItem(`explyra_${key}`, JSON.stringify(val)),
        init: (key, fallback) => {
            if (localStorage.getItem(`explyra_${key}`) === null) {
                localStorage.setItem(`explyra_${key}`, JSON.stringify(fallback));
            }
        }
    };

    // ══════════════ INIT ══════════════
    const CONTENT_VERSION = 'v3'; // bump this to force-refresh course content
    const init = () => {
        // Force-refresh courses when content version changes
        if (localStorage.getItem('explyra_content_version') !== CONTENT_VERSION) {
            localStorage.setItem('explyra_courses', JSON.stringify(DEFAULT_COURSES));
            localStorage.setItem('explyra_content_version', CONTENT_VERSION);
        }
        store.init('courses', DEFAULT_COURSES);
        store.init('user_progress', {});
        store.init('certificates', []);
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    };

    // ══════════════ COURSES ══════════════
    const Courses = {
        getAll: () => store.get('courses') || DEFAULT_COURSES,
        getById: (id) => (store.get('courses') || DEFAULT_COURSES).find(c => c.id === id),
        updateProgress: (courseId, lessonId) => {
            const prog = store.get('user_progress') || {};
            if (!prog[courseId]) prog[courseId] = { completedLessons: [], quizPassed: false };
            if (!prog[courseId].completedLessons.includes(lessonId)) {
                prog[courseId].completedLessons.push(lessonId);
            }
            store.set('user_progress', prog);
        },
        getProgress: (courseId) => {
            const prog = (store.get('user_progress') || {})[courseId];
            if (!prog) return { percent: 0, lessons: [], quizPassed: false };
            const course = Courses.getById(courseId);
            if (!course || !course.lessons.length) return { percent: 0, lessons: [], quizPassed: false };
            const percent = (prog.completedLessons.length / course.lessons.length) * 100;
            return { percent, lessons: prog.completedLessons, quizPassed: prog.quizPassed };
        },
        passQuiz: (courseId) => {
            const prog = store.get('user_progress') || {};
            if (!prog[courseId]) prog[courseId] = { completedLessons: [], quizPassed: false };
            prog[courseId].quizPassed = true;
            store.set('user_progress', prog);
            return Certificates.issue(courseId);
        }
    };

    // ══════════════ CERTIFICATES ══════════════
    const Certificates = {
        issue: (courseId) => {
            const course = Courses.getById(courseId);
            const certs = store.get('certificates') || [];
            if (certs.find(c => c.courseId === courseId)) return certs.find(c => c.courseId === courseId);

            const userName = localStorage.getItem('explyra_user_name') || 'Student';
            const id = 'EXP-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
            const newCert = {
                id,
                courseId,
                courseName: course.title,
                studentName: userName,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
                status: 'valid'
            };
            certs.push(newCert);
            store.set('certificates', certs);
            return newCert;
        },
        verify: (id) => (store.get('certificates') || []).find(c => c.id === id),
        getUserCerts: () => store.get('certificates') || [],
        getAll: () => store.get('certificates') || []
    };

    return { init, Courses, Certificates };
})();

document.addEventListener('DOMContentLoaded', ExplyraLearning.init);
