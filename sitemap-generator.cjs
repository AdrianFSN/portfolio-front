const { SitemapStream } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/development", changefreq: "daily", priority: 0.9 },
  { url: "/live-ops", changefreq: "daily", priority: 0.9 },
  { url: "/writing", changefreq: "daily", priority: 0.9 },
  { url: "/audio", changefreq: "daily", priority: 0.9 },
  { url: "/video", changefreq: "daily", priority: 0.9 },
  { url: "/design", changefreq: "daily", priority: 0.9 },
  { url: "/photography", changefreq: "daily", priority: 0.9 },
  { url: "/bio", changefreq: "weekly", priority: 0.8 },
  { url: "/contact", changefreq: "weekly", priority: 0.8 },
  { url: "/job", changefreq: "weekly", priority: 0.8 },
];

const sitemap = new SitemapStream({
  hostname: "https://www.aesedeveloper.com",
});

const writeStream = createWriteStream(
  resolve(__dirname, "public", "sitemap.xml")
);

sitemap.pipe(writeStream);

links.forEach((link) => sitemap.write(link));

sitemap.end();

writeStream.on("finish", () => {
  console.log("✅ Sitemap file created correctly");
});

writeStream.on("error", (err) => {
  console.error("❌ Error creating sitemap file:", err);
});
