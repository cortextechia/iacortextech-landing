import type { MetadataRoute } from "next";

// Convenção do Next (app/sitemap.ts). O arquivo estático anterior estava em
// public/ e dava 404 — o robots aponta para /sitemap.xml, que só existe se a
// rota vier daqui.
//
// Gerado por código de propósito: o lastmod escrito à mão no XML envelhecia no
// disco (estava travado em 2026-05-26 mesmo com a página mudando).
const BASE = "https://www.iacortextech.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  // Só a home: é a única rota pública do site. Acrescentar URL que responde 404
  // é pior que não ter sitemap.
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
