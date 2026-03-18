<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:os="http://a9.com/-/spec/opensearch/1.1/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>OpenSearch Description | Explyra Ecosystem</title>
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
					max-width: 800px;
				}
				.header {
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
				.desc-box {
					background: #FFFFFF;
					padding: 30px;
					border-radius: 12px;
					border-left: 5px solid #1546C0;
					margin-bottom: 30px;
					box-shadow: 0 4px 12px rgba(0,0,0,0.04);
				}
				.info-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 20px;
				}
				.info-item {
					background: #FFFFFF;
					padding: 20px;
					border-radius: 12px;
					border: 1px solid #E4E1DB;
				}
				.info-label {
					font-size: 13px;
					color: #939BAC;
					text-transform: uppercase;
					letter-spacing: 0.5px;
					margin-bottom: 8px;
				}
				.info-value {
					font-size: 16px;
					color: #2A3141;
					word-break: break-all;
				}
				.url-template {
					background: #F1EFE9;
					padding: 10px 15px;
					border-radius: 6px;
					font-family: monospace;
					font-size: 13px;
					margin-top: 10px;
					border: 1px solid #E4E1DB;
					color: #1546C0;
				}
			</style>
		</head>
		<body>
			<div class="header">
				<div class="logo">
					<img src="/nobg.png" alt="Explyra" onerror="this.style.display='none'"/>
					<h1>Explyra Search</h1>
				</div>
				<div style="color: #586070; font-size: 15px; margin-top: 5px;">
					OpenSearch Configuration
				</div>
			</div>
			
			<div id="content">
				<div class="desc-box">
					<h3 style="margin-top:0; color:#1546C0;"><xsl:value-of select="/os:OpenSearchDescription/os:ShortName"/></h3>
					<p style="color:#586070; line-height:1.6;">
						<xsl:value-of select="/os:OpenSearchDescription/os:Description"/>
					</p>
					<p style="font-size:14px; color:#939BAC; margin-bottom:0;">
						This file allows your browser to integrate Explyra search directly into its address bar or search engine list.
					</p>
				</div>

				<div class="info-grid">
					<div class="info-item">
						<div class="info-label">Developer</div>
						<div class="info-value"><xsl:value-of select="/os:OpenSearchDescription/os:Developer"/></div>
					</div>
					<div class="info-item">
						<div class="info-label">Contact</div>
						<div class="info-value"><xsl:value-of select="/os:OpenSearchDescription/os:Contact"/></div>
					</div>
					<xsl:for-each select="/os:OpenSearchDescription/os:Url">
						<div class="info-item" style="grid-column: span 2;">
							<div class="info-label">Search Provider URL (<xsl:value-of select="@type"/>)</div>
							<div class="url-template"><xsl:value-of select="@template"/></div>
						</div>
					</xsl:for-each>
					<div class="info-item">
						<div class="info-label">Input Encoding</div>
						<div class="info-value"><xsl:value-of select="/os:OpenSearchDescription/os:InputEncoding"/></div>
					</div>
					<div class="info-item">
						<div class="info-label">Output Encoding</div>
						<div class="info-value"><xsl:value-of select="/os:OpenSearchDescription/os:OutputEncoding"/></div>
					</div>
				</div>
			</div>

			<div style="text-align:center; padding: 40px; color: #939BAC; font-size: 13px;">
				© 2026 Explyra. All Rights Reserved. Smart Search Enabled.
			</div>
		</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
