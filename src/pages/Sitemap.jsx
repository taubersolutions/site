import React, { useEffect } from 'react';

export default function Sitemap() {
  useEffect(() => {
    const baseUrl = window.location.origin;
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/uk', priority: '0.9', changefreq: 'weekly' },
      { url: '/services', priority: '0.9', changefreq: 'monthly' },
      { url: '/coaches', priority: '0.8', changefreq: 'monthly' },
      { url: '/ukcoaches', priority: '0.8', changefreq: 'monthly' },
      { url: '/schedule', priority: '0.9', changefreq: 'weekly' },
      { url: '/tools', priority: '0.7', changefreq: 'monthly' },
      { url: '/testimonials', priority: '0.6', changefreq: 'monthly' },
      { url: '/community', priority: '0.6', changefreq: 'monthly' },
      { url: '/affiliates', priority: '0.5', changefreq: 'monthly' }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    console.log('Sitemap XML:', sitemap);
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="text-4xl font-bold text-[#1a2b4b] mb-8">Sitemap</h1>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-[#1a2b4b] mb-6">Main Pages</h2>
            <ul className="space-y-3">
              <li><a href="/" className="text-[#c5a059] hover:underline">Home</a></li>
              <li><a href="/uk" className="text-[#c5a059] hover:underline">UK Home</a></li>
              <li><a href="/services" className="text-[#c5a059] hover:underline">Services</a></li>
              <li><a href="/coaches" className="text-[#c5a059] hover:underline">Our Coaches</a></li>
              <li><a href="/ukcoaches" className="text-[#c5a059] hover:underline">UK Coaches</a></li>
              <li><a href="/schedule" className="text-[#c5a059] hover:underline">Schedule</a></li>
              <li><a href="/tools" className="text-[#c5a059] hover:underline">Free Tools</a></li>
              <li><a href="/testimonials" className="text-[#c5a059] hover:underline">Testimonials</a></li>
              <li><a href="/community" className="text-[#c5a059] hover:underline">Community</a></li>
              <li><a href="/affiliates" className="text-[#c5a059] hover:underline">Affiliates</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}