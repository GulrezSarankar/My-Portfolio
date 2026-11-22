import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://gulrezsarankar.info";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;
const DEFAULT_TITLE = "Gulrez Sarankar | Software Engineer | Java Backend Developer";
const DEFAULT_DESC =
  "Portfolio of Gulrez Sarankar, Software Engineer at ISEES Technologies LLP specializing in Java 17/21, Spring Boot microservices, PostgreSQL, Redis caching, and resilient RESTful API engineering.";

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = "Gulrez Sarankar — Software Engineer | Java Backend Developer",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  ogImageType = "image/jpeg",
  twitterCard = "summary_large_image",
  breadcrumbs,
  jsonLd,
}) {
  const location = useLocation();
  const canonicalUrl = canonicalPath
    ? `${BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`
    : `${BASE_URL}${location.pathname === "/" ? "/" : location.pathname}`;

  // Assemble JSON-LD graph if breadcrumbs or custom schema are provided
  const schemas = [];
  if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    schemas.push({
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "item": b.url.startsWith("http") ? b.url : `${BASE_URL}${b.url.startsWith("/") ? b.url : `/${b.url}`}`,
      })),
    });
  }
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      schemas.push(...jsonLd);
    } else {
      schemas.push(jsonLd);
    }
  }

  const effectiveJsonLd =
    schemas.length > 1
      ? { "@context": "https://schema.org", "@graph": schemas }
      : schemas.length === 1
      ? { "@context": "https://schema.org", ...schemas[0] }
      : null;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set/create meta tag
    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 3. Helper to set/create canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Update Meta Description & Open Graph / Twitter Tags
    updateMetaTag("meta[name='description']", "name", "description", description);
    updateMetaTag("meta[property='og:title']", "property", "og:title", title);
    updateMetaTag("meta[property='og:description']", "property", "og:description", description);
    updateMetaTag("meta[property='og:url']", "property", "og:url", canonicalUrl);
    updateMetaTag("meta[property='og:type']", "property", "og:type", ogType);
    updateMetaTag("meta[property='og:image']", "property", "og:image", ogImage);
    updateMetaTag("meta[property='og:image:width']", "property", "og:image:width", ogImageWidth);
    updateMetaTag("meta[property='og:image:height']", "property", "og:image:height", ogImageHeight);
    updateMetaTag("meta[property='og:image:type']", "property", "og:image:type", ogImageType);
    updateMetaTag("meta[property='og:image:alt']", "property", "og:image:alt", ogImageAlt);
    updateMetaTag("meta[property='og:site_name']", "property", "og:site_name", "Gulrez Sarankar Portfolio");

    updateMetaTag("meta[name='twitter:card']", "name", "twitter:card", twitterCard);
    updateMetaTag("meta[name='twitter:title']", "name", "twitter:title", title);
    updateMetaTag("meta[name='twitter:description']", "name", "twitter:description", description);
    updateMetaTag("meta[name='twitter:url']", "name", "twitter:url", canonicalUrl);
    updateMetaTag("meta[name='twitter:image']", "name", "twitter:image", ogImage);
    updateMetaTag("meta[name='twitter:image:alt']", "name", "twitter:image:alt", ogImageAlt);

    // 5. Dynamic JSON-LD Structured Data
    let scriptTag = document.getElementById("dynamic-seo-jsonld");
    if (effectiveJsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-seo-jsonld";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(effectiveJsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup custom JSON-LD when unmounting route
      const dynamicScript = document.getElementById("dynamic-seo-jsonld");
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [
    title,
    description,
    canonicalUrl,
    ogType,
    ogImage,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    ogImageType,
    twitterCard,
    effectiveJsonLd,
  ]);

  return null;
}
