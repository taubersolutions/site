
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "Tauber Solutions",
  "description": "Professional financial coaching and advisory services",
  "url": "https://taubersolutions.com",
  "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69529b452690abb118ee83b9/599a3e2b6_WhatsApp_Image_2025-12-29_at_100900_AM-removebg-preview.png",
  "email": "office@taubersolutions.com",
  "telephone": "+1-845-322-6500",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "67 North Airmont Rd",
    "addressLocality": "Suffern",
    "addressRegion": "NY",
    "postalCode": "10901",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.youtube.com/@taubersolutions",
    "https://www.instagram.com/taubersolutions",
    "https://www.facebook.com/taubersolutions",
    "https://www.linkedin.com/company/tauber-solutions"
  ]
};

export const createCoachSchema = (coach) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": coach.name,
  "jobTitle": coach.title,
  "email": coach.email,
  "telephone": coach.phone,
  "description": coach.bio,
  "worksFor": {
    "@type": "Organization",
    "name": "Tauber Solutions"
  }
});

export const createServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "Tauber Solutions"
  },
  "areaServed": {
    "@type": "Country",
    "name": ["United States", "United Kingdom"]
  }
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
