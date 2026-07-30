import type { MetadataRoute } from "next";

// Convenção do Next (app/robots.ts). O robots.txt anterior vivia em public/ e
// dava 404 em produção, apontando para um sitemap que também não existia.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // O formulário de contato não tem por que ser rastreado.
      disallow: "/api/",
    },
    sitemap: "https://www.iacortextech.com.br/sitemap.xml",
  };
}
