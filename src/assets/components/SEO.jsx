import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://gulrezsarankar.info";
const DEFAULT_IMAGE = `${BASE_URL}/Gulrez.png`;

export default function SEO({
  title = "Gulrez Sarankar | Java Backend Developer | Spring Boot Developer",
  description = "Portfolio of Gulrez Sarankar, a Java Backend Developer and Associate Software Engineer specializing in Java, Spring Boot, REST APIs, PostgreSQL, MySQL and backend development.",
  canonicalPath,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  jsonLd,
}) {
  const location = useLocation();
  const canonicalUrl = canonicalPath
    ? `${BASE_URL}${canonicalPath}`
    : `${BASE_URL}${location.pathname === "/" ? "/" : location.pathname}`;

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

    updateMetaTag("meta[name='twitter:title']", "name", "twitter:title", title);
    updateMetaTag("meta[name='twitter:description']", "name", "twitter:description", description);
    updateMetaTag("meta[name='twitter:url']", "name", "twitter:url", canonicalUrl);
    updateMetaTag("meta[name='twitter:image']", "name", "twitter:image", ogImage);

    // 5. Dynamic JSON-LD Structured Data
    if (jsonLd) {
      let scriptTag = document.getElementById("dynamic-seo-jsonld");
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "dynamic-seo-jsonld";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      // Cleanup custom JSON-LD when unmounting route
      const scriptTag = document.getElementById("dynamic-seo-jsonld");
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogImage, jsonLd]);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Gulrez Sarankar Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
