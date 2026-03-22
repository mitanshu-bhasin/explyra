<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:rss="http://purl.org/rss/1.0/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>XML Feed | Explyra Ecosystem</title>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<style type="text/css">
				body {
					font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
					color: #0D1117;
					background-color: #F8F7F4;
					margin: 0;
					padding: 0;
				}
				#content {
					margin: 0 auto;
					padding: 40px 20px;
					max-width: 900px;
				}
				.feed-header {
					background-color: #FFFFFF;
					padding: 30px 0;
					border-bottom: 1px solid #E4E1DB;
					text-align: center;
					box-shadow: 0 2px 8px rgba(0,0,0,0.05);
				}
				.logo {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 12px;
					margin-bottom: 10px;
				}
				.logo img {
					height: 45px;
				}
				h1 {
					color: #0D1117;
					font-size: 28px;
					margin: 0;
					font-weight: 700;
				}
				.subtitle {
					color: #586070;
					font-size: 16px;
					margin-top: 5px;
				}
				.entry {
					background: #FFFFFF;
					padding: 25px;
					border-radius: 12px;
					border: 1px solid #E4E1DB;
					margin-bottom: 20px;
					box-shadow: 0 4px 12px rgba(0,0,0,0.04);
					transition: transform 0.2s, box-shadow 0.2s;
				}
				.entry:hover {
					transform: translateY(-2px);
					box-shadow: 0 8px 24px rgba(0,0,0,0.08);
					border-color: #1546C0;
				}
				.entry h2 {
					margin: 0 0 10px 0;
					font-size: 20px;
					color: #1546C0;
				}
				.entry h2 a {
					color: inherit;
					text-decoration: none;
				}
				.entry .meta {
					font-size: 13px;
					color: #939BAC;
					margin-bottom: 15px;
					display: flex;
					gap: 15px;
				}
				.entry .summary {
					color: #2A3141;
					line-height: 1.6;
				}
				.desc-box {
					background: #E9E6E0;
					padding: 20px;
					border-radius: 12px;
					margin-bottom: 30px;
					font-size: 14px;
					color: #586070;
					border-left: 5px solid #1546C0;
				}
				.desc-box a {
					color: #1546C0;
					font-weight: 600;
					text-decoration: none;
				}
			</style>
		</head>
		<body>
			<div class="feed-header">
				<div class="logo">
					<img src="/nobg.png" alt="Explyra" onerror="this.style.display='none'"/>
					<h1>Explyra Updates</h1>
				</div>
				<p class="subtitle">
					<xsl:value-of select="/atom:feed/atom:subtitle | /rss/channel/description"/>
				</p>
			</div>
			
			<div id="content">
				<div class="desc-box">
					This is an XML <xsl:choose><xsl:when test="atom:feed">Atom</xsl:when><xsl:otherwise>RSS</xsl:otherwise></xsl:choose> feed. 
					It is intended for use in news aggregators like <a href="https://feedly.com">Feedly</a> or <a href="https://www.inoreader.com">Inoreader</a>.
					Subscribing to this feed will keep you updated with the latest from Explyra automatically.
				</div>

				<!-- Atom Support -->
				<xsl:for-each select="atom:feed/atom:entry">
					<div class="entry">
						<h2><a href="{atom:link/@href}"><xsl:value-of select="atom:title"/></a></h2>
						<div class="meta">
							<span>📅 <xsl:value-of select="substring(atom:updated, 1, 10)"/></span>
							<span>🔗 <xsl:value-of select="atom:link/@href"/></span>
						</div>
						<div class="summary">
							<xsl:value-of select="atom:summary" disable-output-escaping="yes"/>
						</div>
					</div>
				</xsl:for-each>

				<!-- RSS Support -->
				<xsl:for-each select="rss/channel/item">
					<div class="entry">
						<h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
						<div class="meta">
							<span>📅 <xsl:value-of select="pubDate"/></span>
						</div>
						<div class="summary">
							<xsl:value-of select="description" disable-output-escaping="yes"/>
						</div>
					</div>
				</xsl:for-each>
			</div>

			<div style="text-align:center; padding: 40px; color: #939BAC; font-size: 13px;">
				© 2026 Explyra. All Rights Reserved. Stay updated.
			</div>
		</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
