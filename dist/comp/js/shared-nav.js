/* Explyra Shared Nav + Footer Component
   Include on any page: <script src="js/shared-nav.js"></script>
   This injects the synced navbar + mobile menu and footer from index.html.
   Requires: Font Awesome 6.4+, Google Fonts (Playfair Display, Outfit).
*/
(function () {
    /* ─── NAV CSS ─── */
    const navCSS = `
    .main-nav{position:sticky;top:0;z-index:2000;height:64px;display:flex;align-items:center;padding:0 5vw;background:rgba(248,247,244,.9);backdrop-filter:blur(20px) saturate(160%);border-bottom:1px solid var(--bdr);transition:background .4s,border-color .4s;gap:2rem}
    [data-theme="dark"] .main-nav{background:rgba(8,11,20,.88)}
    .nav-logo{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none;color:inherit}
    .nav-logo-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
    .nav-logo-icon img{width:100%;height:100%;object-fit:contain}
    .nav-logo-text{font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;letter-spacing:.03em;color:var(--ink)}
    .nav-links{display:flex;align-items:center;justify-content:center;gap:2.2rem;list-style:none;flex:1}
    .nav-links a{font-size:.82rem;font-weight:500;color:var(--ink3);letter-spacing:.02em;transition:color .25s;white-space:nowrap;position:relative;text-decoration:none}
    .nav-links a:hover{color:var(--ink)}
    .nav-item-dropdown{position:static;display:flex;align-items:center;height:100%}
    .dropdown-trigger{cursor:pointer;display:flex;align-items:center;gap:.4rem;height:100%;padding:0 .5rem;font-size:.82rem;font-weight:500;color:var(--ink3);text-decoration:none}
    .dropdown-trigger i{font-size:.65rem;transition:transform .3s}
    .nav-item-dropdown:hover .dropdown-trigger i{transform:rotate(180deg)}
    .dropdown-content{position:absolute;top:100%;left:50%;transform:translateX(-50%) translateY(8px);opacity:0;visibility:hidden;pointer-events:none;transition:all .3s;background:var(--bg2);border:1px solid var(--bdr);border-radius:16px;box-shadow:0 40px 80px rgba(0,0,0,.08);min-width:540px;overflow:hidden;display:flex;flex-direction:column;z-index:3000}
    [data-theme="dark"] .dropdown-content{background:rgba(18,22,38,.98);border-color:rgba(255,255,255,.08);box-shadow:0 40px 80px rgba(0,0,0,.4)}
    .nav-item-dropdown:hover .dropdown-content{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);pointer-events:all;transition-delay:.15s}
    .dropdown-hero{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid var(--bdr);background:var(--bg3)}
    .hero-main{display:flex;align-items:center;gap:.8rem}
    .hero-logo{width:36px;height:36px;overflow:hidden;border-radius:8px}
    .hero-logo img{width:100%;height:100%;object-fit:contain}
    .hero-text h4{font-size:.85rem;font-weight:700;margin:0;color:var(--ink)}
    .hero-text p{font-size:.72rem;color:var(--ink3);margin:2px 0 0}
    .hero-side-items{display:flex;gap:.6rem}
    .side-link{display:flex;align-items:center;gap:.4rem;font-size:.7rem;font-weight:600;color:var(--ink3);padding:.35rem .65rem;border-radius:8px;border:1px solid var(--bdr);transition:.2s;text-decoration:none}
    .side-link:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-g)}
    .dropdown-main-zone{display:flex;flex-direction:column}
    .dropdown-body{display:grid;grid-template-columns:1fr 1fr;padding:1.5rem;gap:.75rem;flex:1}
    .dropdown-footer{border-top:1px solid var(--bdr);padding:1rem 1.5rem;display:flex;justify-content:space-between;background:rgba(var(--bg3-rgb),.5)}
    .footer-action{display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink);text-decoration:none;transition:.2s;font-weight:500}
    .footer-action:hover{color:var(--blue)}
    .footer-action span{color:var(--blue);font-weight:700}
    .mega-column{display:flex;flex-direction:column;gap:1.25rem}
    .mega-column-h{font-size:.62rem;font-weight:800;color:var(--ink3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.4rem;display:block;padding-left:.75rem;opacity:.7}
    .mega-items{display:flex;flex-direction:column;gap:.15rem}
    .mega-item{display:flex;align-items:center;gap:.75rem;padding:.45rem .75rem;border-radius:8px;transition:background .2s;text-decoration:none;color:inherit}
    .mega-item:hover{background:var(--blue-g)}
    .mega-item-icon{font-size:1.1rem;width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border-radius:8px;flex-shrink:0;transition:all .3s}
    .mega-item:hover .mega-item-icon{background:var(--bg2);transform:scale(1.1)}
    .mega-item-info{display:flex;flex-direction:column;gap:2px}
    .mega-item-title{font-size:.95rem;font-weight:700;color:var(--ink);line-height:1.2}
    .mega-item-desc{font-size:.78rem;color:var(--ink3);line-height:1.4}
    .dropdown-content::before{content:'';position:absolute;top:-10px;left:50%;transform:translateX(-50%);border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:10px solid var(--bg2);filter:drop-shadow(0 -1px 1px var(--bdr))}
    [data-theme="dark"] .dropdown-content::before{border-bottom-color:rgba(15,20,35,.98)}
    .nav-item-dropdown:nth-of-type(1) .dropdown-content{left:42%}
    .nav-item-dropdown:nth-of-type(1) .dropdown-content::before{left:31%}
    .nav-item-dropdown:nth-of-type(2) .dropdown-content{left:48%}
    .nav-item-dropdown:nth-of-type(2) .dropdown-content::before{left:36%}
    .nav-item-dropdown:nth-of-type(3) .dropdown-content{left:55%}
    .nav-item-dropdown:nth-of-type(3) .dropdown-content::before{left:45%}
    .nav-right{display:flex;align-items:center;gap:.9rem;flex-shrink:0}
    .theme-pill{display:flex;align-items:center;gap:.5rem;padding:.35rem .6rem;background:var(--bg3);border:1px solid var(--bdr);border-radius:100px;cursor:pointer;transition:all .25s;user-select:none}
    .theme-pill:hover{border-color:var(--blue)}
    .theme-pill-label{font-size:.72rem;font-weight:700;color:var(--ink3);letter-spacing:.04em}
    .theme-pill-toggle{width:18px;height:18px;border-radius:50%;background:var(--ink);transition:all .3s}
    [data-theme="dark"] .theme-pill-toggle{background:var(--blue2)}
    .btn-try{font-size:.78rem;font-weight:700;color:#fff;background:var(--blue);padding:.55rem 1.25rem;border-radius:100px;transition:all .25s;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;border:none;cursor:pointer}
    .btn-try:hover{filter:brightness(1.1);transform:translateY(-1px);box-shadow:0 8px 20px rgba(21,70,192,.25)}
    .menu-btn{display:none;color:var(--ink);background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:.6rem;align-items:center;justify-content:center;transition:all .3s;box-shadow:0 4px 12px rgba(0,0,0,.05);cursor:pointer}
    [data-theme="dark"] .menu-btn{background:var(--bg3);border-color:rgba(255,255,255,.1)}
    .mobile-menu{position:fixed;inset:0;width:100%;height:100vh;background:rgba(248,247,244,.85);backdrop-filter:blur(25px) saturate(180%);z-index:5000;padding:2rem 1.5rem;display:flex;flex-direction:column;gap:2rem;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .4s,visibility .4s}
    [data-theme="dark"] .mobile-menu{background:rgba(8,11,20,.85);border-left:1px solid rgba(255,255,255,.05)}
    .mobile-menu.open{opacity:1;visibility:visible;pointer-events:all}
    .mobile-menu-header{display:flex;align-items:center;justify-content:space-between;padding-bottom:1rem;border-bottom:1px solid var(--bdr)}
    .close-menu-btn{width:44px;height:44px;border-radius:50%;background:var(--bg3);color:var(--ink);display:flex;align-items:center;justify-content:center;font-size:1.5rem;transition:all .3s;border:1px solid var(--bdr2);cursor:pointer}
    .mobile-nav-links{list-style:none;display:flex;flex-direction:column;gap:.75rem;flex:1;overflow-y:auto;padding:1rem 0;scrollbar-width:none}
    .mobile-nav-links::-webkit-scrollbar{display:none}
    .mobile-nav-links li{opacity:0;transform:translateY(20px);transition:all .4s cubic-bezier(.165,.84,.44,1)}
    .mobile-menu.open .mobile-nav-links li{opacity:1;transform:translateY(0)}
    .mobile-menu.open .mobile-nav-links li:nth-child(1){transition-delay:.1s}
    .mobile-menu.open .mobile-nav-links li:nth-child(2){transition-delay:.15s}
    .mobile-menu.open .mobile-nav-links li:nth-child(3){transition-delay:.2s}
    .mobile-menu.open .mobile-nav-links li:nth-child(4){transition-delay:.25s}
    .mobile-menu.open .mobile-nav-links li:nth-child(5){transition-delay:.3s}
    .mobile-menu.open .mobile-nav-links li:nth-child(6){transition-delay:.35s}
    .mobile-nav-links a{display:block;font-size:1.5rem;font-weight:700;color:var(--ink);padding:.75rem 0;transition:all .3s;font-family:'Playfair Display',serif;text-decoration:none}
    .mobile-has-submenu{display:flex;flex-direction:column}
    .mobile-submenu-trigger{display:flex;align-items:center;justify-content:space-between;width:100%;cursor:pointer}
    .mobile-submenu-trigger a{font-size:1.5rem}
    .mobile-submenu-trigger i{font-size:1rem;transition:transform .3s;color:var(--ink3)}
    .mobile-has-submenu.open .mobile-submenu-trigger i{transform:rotate(180deg);color:var(--blue)}
    .mobile-submenu{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.4,0,.2,1);padding-left:1rem;display:flex;flex-direction:column;gap:.1rem;border-left:2px solid var(--bdr);margin-left:.5rem}
    .mobile-has-submenu.open .mobile-submenu{max-height:800px;margin-top:.5rem;margin-bottom:1rem}
    .mobile-submenu a{font-family:'Outfit',sans-serif;font-size:1rem;font-weight:500;color:var(--ink3);padding:.5rem 0}
    .mobile-menu-footer{margin-top:auto;padding-top:2rem;border-top:1px solid var(--bdr)}
    .mobile-socials{display:flex;gap:1.5rem;justify-content:center;margin-top:1.5rem}
    .mobile-socials a{width:40px;height:40px;border-radius:10px;background:var(--bg3);display:flex;align-items:center;justify-content:center;color:var(--ink2);font-size:1.2rem;transition:all .3s;border:1px solid var(--bdr);text-decoration:none}
    @media(max-width:1024px){.nav-links{display:none}.menu-btn{display:flex}}
    @media(max-width:768px){.main-nav{padding:0 1.25rem;height:60px;gap:1rem}.btn-try{display:none}}
    @media(max-width:480px){.main-nav{padding:0 1rem;height:56px;gap:.625rem}.nav-logo-text{font-size:1.05rem}.nav-logo-icon{width:30px;height:30px}.theme-pill-label{display:none}.theme-pill{padding:.28rem .4rem}}
    @media(max-width:375px){.main-nav{padding:0 .875rem}}
    @media(max-width:320px){.main-nav{padding:0 .75rem}.nav-logo-text{font-size:.95rem}}

    /* FOOTER */
    footer#sharedFooter{background:linear-gradient(to bottom,rgba(13,17,23,.92),rgba(13,17,23,.98)),url('assets/images/footer_bg.png') center/cover no-repeat;color:#fff;padding:4rem 5vw 3rem;border-top:1px solid var(--bdr);position:relative}
    [data-theme="dark"] footer#sharedFooter{background:linear-gradient(to bottom,rgba(8,11,20,.95),rgba(8,11,20,.98)),url('assets/images/footer_bg.png') center/cover no-repeat}
    .foot-container{max-width:1250px;margin:0 auto;display:grid;grid-template-columns:1.5fr repeat(6,1fr);gap:2rem}
    .foot-col-brand{display:flex;flex-direction:column;gap:1.2rem}
    .foot-logo{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#fff;letter-spacing:.03em}
    .foot-tagline{font-size:.85rem;color:rgba(255,255,255,.5);line-height:1.6}
    .foot-col h4{font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:1.5rem;color:#fff;display:flex;align-items:center;justify-content:space-between}
    .foot-col h4 i{display:none}
    .foot-col ul{list-style:none;display:flex;flex-direction:column;gap:.8rem}
    .foot-col a{font-size:.85rem;color:rgba(255,255,255,.5);transition:all .2s;display:inline-block;text-decoration:none}
    .foot-col a:hover{color:var(--blue2);transform:translateX(3px)}
    .foot-compliance{margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:.8rem}
    .comp-badge{display:flex;align-items:center;gap:.5rem;padding:.4rem .8rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:6px;font-size:.62rem;font-weight:700;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;text-decoration:none}
    .comp-badge i{font-size:.8rem;color:var(--blue2)}
    .foot-bottom{margin-top:4rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,.05);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1.5rem}
    .foot-copy{font-size:.8rem;color:rgba(255,255,255,.4)}
    .foot-socials{display:flex;gap:1.2rem}
    .foot-socials a{color:rgba(255,255,255,.4);font-size:1.1rem;transition:all .2s;text-decoration:none}
    .foot-socials a:hover{color:#fff;transform:translateY(-2px)}
    @media(max-width:992px){.foot-container{grid-template-columns:1fr 1fr}}
    @media(max-width:640px){.foot-container{grid-template-columns:1fr;gap:0}.foot-col-brand{margin-bottom:2rem}.foot-col{border-bottom:1px solid rgba(255,255,255,.05)}.foot-col h4{margin-bottom:0;padding:1.2rem 0;cursor:pointer}.foot-col h4 i{display:block;transition:transform .3s;font-size:.7rem;opacity:.5}.foot-col.active h4 i{transform:rotate(180deg)}.foot-col ul{height:0;overflow:hidden;transition:all .3s ease-out}.foot-col.active ul{height:auto;padding-bottom:1.5rem}.foot-bottom{flex-direction:column;text-align:center;gap:1.5rem;margin-top:2rem}}
    `;

    /* ─── INJECT CSS ─── */
    const style = document.createElement('style');
    style.textContent = navCSS;
    document.head.appendChild(style);

    /* ─── NAV HTML ─── */
    const navHTML = `
    <header>
        <nav class="main-nav" aria-label="Main Navigation">
            <a href="index.html" class="nav-logo">
                <div class="nav-logo-icon"><img src="nobg.png" alt="Explyra"></div>
                <span class="nav-logo-text">Explyra</span>
            </a>
            <ul class="nav-links">
                <li class="nav-item-dropdown">
                    <a href="#" class="dropdown-trigger">Products <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="dropdown-content mega-menu">
                        <div class="dropdown-hero">
                            <div class="hero-main"><div class="hero-logo"><img src="nobg.png" alt="Explyra Logo"></div><div class="hero-text"><h4>Explyra Suite</h4><p>The operating system for modern teams and creators.</p></div></div>
                            <div class="hero-side-items">
                                <a href="dns/index.html" class="side-link"><i class="fa-solid fa-globe"></i> DNS Manager</a>
                                <a href="email-app/src/index.html" class="side-link"><i class="fa-solid fa-envelope"></i> MailBox</a>
                                <a href="manufacturing/index.html" class="side-link"><i class="fa-solid fa-industry"></i> Explyra ERP</a>
                            </div>
                        </div>
                        <div class="dropdown-main-zone"><div class="dropdown-body">
                            <div class="mega-column"><span class="mega-column-h">Business</span><div class="mega-items">
                                <a href="emp.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1);color:var(--blue)">💼</span><div class="mega-item-info"><span class="mega-item-title">Expense</span><span class="mega-item-desc">Smart tracking</span></div></a>
                                <a href="crm/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1);color:var(--blue)">📈</span><div class="mega-item-info"><span class="mega-item-title">CRM</span><span class="mega-item-desc">Pipeline tool</span></div></a>
                                <a href="Ino software/ino.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1);color:var(--blue)">📄</span><div class="mega-item-info"><span class="mega-item-title">Invoice</span><span class="mega-item-desc">Billing v2</span></div></a>
                                <a href="attendance/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1);color:var(--blue)">✅</span><div class="mega-item-info"><span class="mega-item-title">Attendance</span><span class="mega-item-desc">Geofenced check-in</span></div></a>
                            </div></div>
                            <div class="mega-column"><span class="mega-column-h">Utilities</span><div class="mega-items">
                                <a href="health-manager/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(0,128,128,.1);color:var(--teal)">🏃</span><div class="mega-item-info"><span class="mega-item-title">Health</span><span class="mega-item-desc">AI companion</span></div></a>
                                <a href="https://book.explyra.me" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1);color:var(--blue)">📅</span><div class="mega-item-info"><span class="mega-item-title">Booking</span><span class="mega-item-desc">Auto-scheduling</span></div></a>
                                <a href="explyra-learning/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(255,191,0,.1);color:var(--amber)">📚</span><div class="mega-item-info"><span class="mega-item-title">Learning</span><span class="mega-item-desc">Master future skills</span></div></a>
                                <a href="developers/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(128,0,128,.1);color:var(--purp)">⚡</span><div class="mega-item-info"><span class="mega-item-title">Developers</span><span class="mega-item-desc">Utils & APIs</span></div></a>
                            </div></div>
                        </div>
                        <div class="dropdown-footer">
                            <a href="updates/index.html" class="footer-action"><span>New:</span> Explyra AI meeting v1.0 &rarr;</a>
                            <a href="admin.html" class="footer-action"><i class="fa-solid fa-shield-halved"></i> Admin Portal</a>
                        </div></div>
                    </div>
                </li>
                <li class="nav-item-dropdown">
                    <a href="solutions/index.html" class="dropdown-trigger">Solutions <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="dropdown-content mega-menu">
                        <div class="dropdown-hero">
                            <div class="hero-main"><div class="hero-logo"><img src="nobg.png" alt="Explyra Logo"></div><div class="hero-text"><h4>Solutions</h4><p>Bespoke digital transformation for scaling organizations.</p></div></div>
                            <div class="hero-side-items">
                                <a href="solutions/suite.html" class="side-link"><i class="fa-solid fa-layer-group"></i> Full Suite</a>
                                <a href="solutions/custom.html" class="side-link"><i class="fa-solid fa-code-merge"></i> Custom</a>
                                <a href="solutions/utilities.html" class="side-link"><i class="fa-solid fa-wrench"></i> Infra Utils</a>
                            </div>
                        </div>
                        <div class="dropdown-main-zone"><div class="dropdown-body">
                            <div class="mega-column"><span class="mega-column-h">Internal Systems</span><div class="mega-items">
                                <a href="solutions/expense-manager.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">💼</span><div class="mega-item-info"><span class="mega-item-title">Expense Admin</span><span class="mega-item-desc">Finance operations</span></div></a>
                                <a href="solutions/attendance-system.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">✅</span><div class="mega-item-info"><span class="mega-item-title">Attendance Hub</span><span class="mega-item-desc">HR & Security</span></div></a>
                                <a href="solutions/manufacturing.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">🏭</span><div class="mega-item-info"><span class="mega-item-title">Manufacturing</span><span class="mega-item-desc">Supply chain ERP</span></div></a>
                                <a href="solutions/health.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(0,128,128,.1)">🏃</span><div class="mega-item-info"><span class="mega-item-title">Corporate Health</span><span class="mega-item-desc">Wellness suite</span></div></a>
                            </div></div>
                            <div class="mega-column"><span class="mega-column-h">Infrastructure</span><div class="mega-items">
                                <a href="solutions/crm.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">📈</span><div class="mega-item-info"><span class="mega-item-title">Enterprise CRM</span><span class="mega-item-desc">Sales & Ops v2</span></div></a>
                                <a href="solutions/booking-system.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">📅</span><div class="mega-item-info"><span class="mega-item-title">Booking Hub</span><span class="mega-item-desc">Service providers</span></div></a>
                                <a href="solutions/dns.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">🌐</span><div class="mega-item-info"><span class="mega-item-title">Global DNS</span><span class="mega-item-desc">Edge infrastructure</span></div></a>
                                <a href="solutions/developers.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(128,0,128,.1)">⚡</span><div class="mega-item-info"><span class="mega-item-title">Dev Cloud</span><span class="mega-item-desc">Custom APIs</span></div></a>
                            </div></div>
                        </div>
                        <div class="dropdown-footer">
                            <a href="contact.html" class="footer-action"><span>Talk to Sales:</span> Scaling with Explyra &rarr;</a>
                            <a href="solutions/learning.html" class="footer-action"><i class="fa-solid fa-graduation-cap"></i> Training Portal</a>
                        </div></div>
                    </div>
                </li>
                <li class="nav-item-dropdown">
                    <a href="#" class="dropdown-trigger">Resources <i class="fa-solid fa-chevron-down"></i></a>
                    <div class="dropdown-content mega-menu">
                        <div class="dropdown-hero">
                            <div class="hero-main"><div class="hero-logo"><img src="nobg.png" alt="Explyra Logo"></div><div class="hero-text"><h4>Explyra Hub</h4><p>Deep dives, community events, and technical support.</p></div></div>
                            <div class="hero-side-items">
                                <a href="docs/index.html" class="side-link"><i class="fa-solid fa-book"></i> Docs</a>
                                <a href="compare/index.html" class="side-link"><i class="fa-solid fa-scale-balanced"></i> Compare</a>
                                <a href="status/index.html" class="side-link"><i class="fa-solid fa-signal"></i> Status</a>
                            </div>
                        </div>
                        <div class="dropdown-main-zone"><div class="dropdown-body">
                            <div class="mega-column"><span class="mega-column-h">Ecosystem</span><div class="mega-items">
                                <a href="events/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">📅</span><div class="mega-item-info"><span class="mega-item-title">Events</span><span class="mega-item-desc">Community meetups</span></div></a>
                                <a href="updates/index.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">📢</span><div class="mega-item-info"><span class="mega-item-title">Updates</span><span class="mega-item-desc">What's new in Explyra</span></div></a>
                            </div></div>
                            <div class="mega-column"><span class="mega-column-h">Company</span><div class="mega-items">
                                <a href="pricing.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">💰</span><div class="mega-item-info"><span class="mega-item-title">Pricing</span><span class="mega-item-desc">Flexible plans for teams</span></div></a>
                                <a href="support.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">🎧</span><div class="mega-item-info"><span class="mega-item-title">Help Desk</span><span class="mega-item-desc">24/7 technical support</span></div></a>
                                <a href="team.html" class="mega-item"><span class="mega-item-icon" style="background:rgba(21,70,192,.1)">🤝</span><div class="mega-item-info"><span class="mega-item-title">Our Team</span><span class="mega-item-desc">Meet the engineers</span></div></a>
                            </div></div>
                        </div>
                        <div class="dropdown-footer">
                            <a href="community-hub/index.html" class="footer-action"><span>Join Discord:</span> Explyra Dev Community &rarr;</a>
                            <a href="careers.html" class="footer-action"><i class="fa-solid fa-briefcase"></i> Careers</a>
                        </div></div>
                    </div>
                </li>
                <li><a href="donation.html" style="color:var(--teal);font-weight:700">💚 Donate</a></li>
                <li><a href="contact.html" style="color:var(--blue);font-weight:700">✉️ Contact</a></li>
            </ul>
            <div class="nav-right">
                <div class="theme-pill" id="themePill" role="button" tabindex="0" aria-label="Toggle theme">
                    <span class="theme-pill-label" id="themeLabel">Light</span>
                    <div class="theme-pill-toggle"></div>
                </div>
                <a href="company.html" class="btn-try">Request Access</a>
                <button class="menu-btn" id="menuBtn" aria-label="Open mobile menu">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="8" x2="20" y2="8"></line><line x1="4" y1="16" x2="20" y2="16"></line></svg>
                </button>
            </div>
        </nav>
        <div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile Navigation">
            <div class="mobile-menu-header">
                <div class="nav-logo" style="gap:.6rem"><div class="nav-logo-icon" style="width:24px;height:24px"><img src="nobg.png" alt="Explyra"></div><span class="nav-logo-text">Explyra</span></div>
                <button class="close-menu-btn" id="closeMenuBtn" aria-label="Close mobile menu">&times;</button>
            </div>
            <ul class="mobile-nav-links">
                <li class="mobile-has-submenu"><div class="mobile-submenu-trigger"><a href="#">Products</a><i class="fa-solid fa-chevron-down"></i></div>
                    <div class="mobile-submenu">
                        <a href="emp.html">💼 Expense</a><a href="dns/index.html">🌐 DNS Manager</a><a href="crm/index.html">📈 CRM</a>
                        <a href="health-manager/index.html">🏃 Health</a><a href="explyra-learning/index.html">📚 Learning</a>
                        <a href="Ino software/ino.html">📄 Invoice</a><a href="developers/index.html">⚡ Developers</a>
                        <a href="Utilites/index.html">🔗 Utility</a><a href="attendance/index.html">✅ Attendance</a>
                        <a href="https://book.explyra.me">📅 Booking</a><a href="manufacturing/index.html">🏭 ERP</a>
                    </div>
                </li>
                <li class="mobile-has-submenu"><div class="mobile-submenu-trigger"><a href="solutions/index.html">Solutions</a><i class="fa-solid fa-chevron-down"></i></div>
                    <div class="mobile-submenu">
                        <a href="solutions/expense-manager.html">💼 Expense Manager</a><a href="solutions/invoice-software.html">📄 Invoice</a>
                        <a href="solutions/booking-system.html">📅 Booking</a><a href="solutions/attendance-system.html">✅ Attendance</a>
                        <a href="solutions/crm.html">📈 CRM</a><a href="solutions/health.html">🏃 Health</a>
                        <a href="solutions/developers.html">⚡ Developers</a><a href="solutions/learning.html">📚 Learning</a>
                        <a href="solutions/utilities.html">🔗 Utilities</a><a href="solutions/manufacturing.html">🏭 Manufacturing</a>
                        <a href="solutions/suite.html">🌐 Suite</a>
                    </div>
                </li>
                <li><a href="pricing.html">Pricing</a></li>
                <li class="mobile-has-submenu"><div class="mobile-submenu-trigger"><a href="#">Resources</a><i class="fa-solid fa-chevron-down"></i></div>
                    <div class="mobile-submenu">
                        <a href="events/index.html">📅 Events</a><a href="updates/index.html">📢 Updates</a>
                        <a href="support.html">🎧 Help Desk</a><a href="team.html">🤝 Our Team</a>
                        <a href="docs/index.html">📚 Documentation</a><a href="status/index.html">📊 Status</a>
                    </div>
                </li>
                <li><a href="donation.html" style="color:var(--teal)">💚 Donate</a></li>
                <li><a href="contact.html" style="color:var(--blue)">✉️ Contact</a></li>
            </ul>
            <div class="mobile-menu-footer">
                <a href="company.html" class="btn-try" style="width:100%;justify-content:center;text-decoration:none">Request Access</a>
                <div class="mobile-socials">
                    <a href="https://github.com/mitanshu-bhasin" target="_blank"><i class="fab fa-github"></i></a>
                    <a href="https://x.com/explyra" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="https://instagram.com/explyra" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="mailto:explyra@gmail.com"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        </div>
    </header>`;

    /* ─── FOOTER HTML ─── */
    const footerHTML = `
    <footer id="sharedFooter">
        <div class="foot-container">
            <div class="foot-col-brand">
                <span class="foot-logo">Explyra</span>
                <p class="foot-tagline">One Platform. Everything. The ultimate SaaS ecosystem for developers, teams, and enterprises.</p>
                <div class="foot-compliance">
                    <a href="hippa.html" class="comp-badge"><i class="fas fa-shield-alt"></i> HIPAA READY Compliant</a>
                    <a href="gdpr.html" class="comp-badge"><i class="fas fa-user-lock"></i> GDPR Compliant</a>
                    <a href="ssl.html" class="comp-badge"><i class="fas fa-lock"></i> SSL Secured</a>
                </div>
            </div>
            <div class="foot-col"><h4>Solutions <i class="fas fa-chevron-down"></i></h4><ul>
                <li><a href="emp.html">Expense Tracker</a></li><li><a href="dns/index.html">Explyra DNS</a></li>
                <li><a href="crm/index.html">Explyra CRM</a></li><li><a href="health-manager/index.html">Health Companion</a></li>
                <li><a href="explyra-learning/index.html">AI Learning</a></li><li><a href="developers/index.html">Developer Tools</a></li>
                <li><a href="attendance/index.html">Attendance Portal</a></li><li><a href="https://book.explyra.me">Service Booking</a></li>
                <li><a href="manufacturing/index.html">Explyra ERP</a></li><li><a href="Ino software/ino.html">Invoice Software</a></li>
                <li><a href="skill/index.html">Skill Marketplace</a></li>
            </ul></div>
            <div class="foot-col"><h4>Compare <i class="fas fa-chevron-down"></i></h4><ul>
                <li><a href="compare/explyra-vs-zoho.html">vs Zoho</a></li><li><a href="compare/explyra-vs-hubspot.html">vs HubSpot</a></li>
                <li><a href="compare/explyra-vs-notion.html">vs Notion</a></li><li><a href="compare/explyra-vs-clickup.html">vs ClickUp</a></li>
                <li><a href="compare/explyra-vs-google-workspace.html">vs Google</a></li><li><a href="compare/explyra-vs-odoo.html">vs Odoo</a></li>
            </ul></div>
            <div class="foot-col"><h4>Resources <i class="fas fa-chevron-down"></i></h4><ul>
                <li><a href="docs/index.html">Documentation</a></li><li><a href="support.html">Help Desk</a></li>
                <li><a href="events/index.html">Events Portal</a></li><li><a href="integrations/index.html">Integrations</a></li>
                <li><a href="status/index.html">System Status</a></li><li><a href="compare/index.html">Compare Explyra</a></li>
                <li><a href="community-hub/index.html">Community Forum</a></li>
            </ul></div>
            <div class="foot-col"><h4>Company <i class="fas fa-chevron-down"></i></h4><ul>
                <li><a href="team.html">Our Team</a></li><li><a href="pricing.html">Pricing Plans</a></li>
                <li><a href="directories/submit.html" style="color:var(--purp);font-weight:700">Submit Business (₹29)</a></li>
                <li><a href="contact.html">Contact Us</a></li><li><a href="careers.html">Careers</a></li>
            </ul></div>
            <div class="foot-col"><h4>Legal <i class="fas fa-chevron-down"></i></h4><ul>
                <li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms of Service</a></li>
                <li><a href="license.html">License</a></li><li><a href="refund.html">Refund Policy</a></li>
            </ul></div>
            <div class="foot-col"><h4>Download <i class="fas fa-chevron-down"></i></h4><ul>
                <li><a href="android.html"><i class="fab fa-android"></i> Android</a></li>
                <li><a href="ios.html"><i class="fab fa-apple"></i> iOS</a></li>
            </ul></div>
        </div>
        <div class="foot-bottom">
            <p class="foot-copy">© 2026 Explyra · Built with ♥ by Mitanshu Bhasin · All rights reserved.</p>
            <p style="font-size:.7rem;opacity:.7;margin-top:.4rem;letter-spacing:.02em">Software and Design Patented (No: US-2026-EX-0081-A1, US-2026-EX-0092-B2). Unauthorized copying or redistribution is strictly prohibited.</p>
            <div class="foot-socials">
                <a href="https://github.com/Explyra" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://x.com/explyras" target="_blank" title="X"><i class="fab fa-twitter"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61584891033070" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/explyras" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com/@explyras" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="https://www.linkedin.com/company/explyra/" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://www.threads.com/@explyras" target="_blank" title="Threads"><i class="fab fa-threads"></i></a>
            </div>
        </div>
    </footer>`;

    /* ─── INJECT ─── */
    // Remove any existing nav/footer that the page had
    const existingNav = document.querySelector('.nav-bar');
    const existingFooter = document.querySelector('.footer');
    if (existingNav) existingNav.remove();
    if (existingFooter) existingFooter.remove();

    // Insert nav at start of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    // Insert footer at end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    /* ─── THEME ─── */
    const pill = document.getElementById('themePill');
    const lbl = document.getElementById('themeLabel');
    const savedTheme = localStorage.getItem('explyra-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (lbl) lbl.textContent = savedTheme === 'dark' ? 'Dark' : 'Light';
    if (pill) {
        pill.addEventListener('click', () => {
            const cur = document.documentElement.getAttribute('data-theme');
            const nxt = cur === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', nxt);
            if (lbl) lbl.textContent = nxt === 'dark' ? 'Dark' : 'Light';
            localStorage.setItem('explyra-theme', nxt);
        });
    }

    /* ─── MOBILE MENU ─── */
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    function toggleMenu() {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        if (!link.closest('.mobile-has-submenu')) link.addEventListener('click', toggleMenu);
    });
    document.querySelectorAll('.mobile-submenu-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            trigger.closest('.mobile-has-submenu').classList.toggle('open');
        });
    });

    /* ─── FOOTER ACCORDION (mobile) ─── */
    document.querySelectorAll('#sharedFooter .foot-col h4').forEach(header => {
        header.addEventListener('click', () => {
            const col = header.parentElement;
            if (window.innerWidth <= 640) {
                col.classList.toggle('active');
                document.querySelectorAll('#sharedFooter .foot-col').forEach(o => { if (o !== col) o.classList.remove('active'); });
            }
        });
    });
})();
