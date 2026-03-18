<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<title>XML Sitemap | Explyra Ecosystem</title>
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
					max-width: 1000px;
				}
				p.expl {
					margin: 18px 0;
					line-height: 1.6em;
					color: #586070;
				}
				p.expl a {
					color: #1546C0;
					text-decoration: none;
					font-weight: 600;
				}
				p.expl a:hover {
					text-decoration: underline;
				}
				a {
					color: #0D1117;
					text-decoration: none;
					transition: color 0.2s;
				}
				a:visited {
					color: #586070;
				}
				a:hover {
					color: #1546C0;
				}
				table {
					border-collapse: collapse;
					width: 100%;
					background: #FFFFFF;
					border-radius: 12px;
					overflow: hidden;
					box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
					border: 1px solid #E4E1DB;
				}
				th {
					text-align: left;
					padding: 15px;
					font-size: 14px;
					background-color: #F1EFE9;
					border-bottom: 2px solid #E4E1DB;
					color: #2A3141;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}
				td {
					padding: 12px 15px;
					font-size: 14px;
					border-bottom: 1px solid #F1EFE9;
				}
				tr:last-child td {
					border-bottom: none;
				}
				tr:nth-child(even) {
					background-color: #FAFAFA;
				}
				tr:hover {
					background-color: #F5F7FF;
				}
				#header {
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
					height: 40px;
				}
				h1 {
					color: #0D1117;
					font-size: 28px;
					margin: 0;
					font-weight: 700;
				}
				.desc-box {
					background: #FFFFFF;
					padding: 25px;
					border-radius: 12px;
					border-left: 5px solid #1546C0;
					margin-bottom: 30px;
					box-shadow: 0 4px 12px rgba(0,0,0,0.04);
				}
				.count {
					display: inline-block;
					background: #1546C0;
					color: white;
					padding: 4px 12px;
					border-radius: 20px;
					font-size: 13px;
					font-weight: 600;
					margin-top: 5px;
				}
			</style>
		</head>
		<body>
			<div id="header">
				<div class="logo">
					<img src="/nobg.png" alt="Explyra" onerror="this.style.display='none'"/>
					<h1>Explyra XML Sitemap</h1>
				</div>
				<p class="count">
					<xsl:choose>
						<xsl:when test="sitemap:sitemapindex">
							<xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> Sitemaps
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="sitemap:urlset/sitemap:url/image:image">
									<xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs with <xsl:value-of select="count(sitemap:urlset/sitemap:url/image:image)"/> Images
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</p>
			</div>
			<div id="content">
				<div class="desc-box">
					<p class="expl">
						This is an XML Sitemap, meant for consumption by search engines like Google or Bing.<br/>
						It helps robots discover and index all the important pages of the <strong>Explyra Ecosystem</strong>.
					</p>
					<p class="expl">
						You can find more information about XML sitemaps on <a href="http://sitemaps.org">sitemaps.org</a>.
					</p>
				</div>
				
				<xsl:if test="sitemap:sitemapindex">
					<table>
						<thead>
							<tr>
								<th width="75%">Sitemap URL</th>
								<th width="25%">Last Modified</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
								<xsl:variable name="sitemapURL">
									<xsl:value-of select="sitemap:loc"/>
								</xsl:variable>
								<tr>
									<td>
										<a href="{$sitemapURL}"><xsl:value-of select="sitemap:loc"/></a>
									</td>
									<td>
										<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</xsl:if>
				
				<xsl:if test="sitemap:urlset">
					<table>
						<thead>
							<tr>
								<th width="60%">URL</th>
								<xsl:if test="sitemap:urlset/sitemap:url/image:image">
									<th width="10%">Images</th>
								</xsl:if>
								<th width="10%">Priority</th>
								<th width="20%">Last Modified</th>
							</tr>
						</thead>
						<tbody>
							<xsl:for-each select="sitemap:urlset/sitemap:url">
								<tr>
									<td>
										<xsl:variable name="itemURL">
											<xsl:value-of select="sitemap:loc"/>
										</xsl:variable>
										<a href="{$itemURL}">
											<xsl:value-of select="sitemap:loc"/>
										</a>
									</td>
									<xsl:if test="image:image">
										<td>
											<xsl:value-of select="count(image:image)"/>
										</td>
									</xsl:if>
									<td>
										<xsl:if test="sitemap:priority">
											<xsl:value-of select="concat(sitemap:priority*100,'%')"/>
										</xsl:if>
										<xsl:if test="not(sitemap:priority)">
											-
										</xsl:if>
									</td>
									<td>
										<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
									</td>
								</tr>
							</xsl:for-each>
						</tbody>
					</table>
				</xsl:if>
			</div>
			<div style="text-align:center; padding: 40px; color: #939BAC; font-size: 13px;">
				© 2026 Explyra. All Rights Reserved. Crafted with ❤️ for the Web.
			</div>
		</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
