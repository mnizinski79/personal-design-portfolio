import { groq } from 'next-sanity'

// ── Global Settings ──────────────────────────────────────────────────────────
export const globalSettingsQuery = groq`*[_type == "globalSettings"][0] {
  siteTitle,
  logo,
  navLinks,
  footerLinks,
  contactEmail,
  gtmId,
  colorPalette
}`

// ── Home Page ────────────────────────────────────────────────────────────────
export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroText,
  bioText,
  featuredProjects[]-> {
    title,
    slug,
    gridLabel,
    featuredImage,
    featuredTitle,
    featuredDescription,
    featuredButtonLabel,
    "featuredBackground": featuredBackground.hex,
    featuredTextColorInverse
  }
}`

// ── Projects Grid ────────────────────────────────────────────────────────────
export const projectsQuery = groq`*[_type == "project"] | order(orderRank asc) {
  title,
  slug,
  thumbnail,
  gridLabel,
  featured,
  orderRank
}`

// ── Single Project (detail page) ─────────────────────────────────────────────
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title,
  slug,
  thumbnail,
  gridLabel,
  mastheadFields,
  headerBackgroundImage,
  mastheadLogo,
  mastheadTextColorInverse,
  featured,
  featuredImage,
  featuredTitle,
  featuredDescription,
  featuredButtonLabel,
  "featuredBackground": featuredBackground.hex,
  featuredTextColorInverse,
  contentBlocks[]
}`

// ── All project slugs (for generateStaticParams) ─────────────────────────────
export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)] {
  "slug": slug.current
}`

// ── About Page ───────────────────────────────────────────────────────────────
export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  ...,
  "resumeFileUrl": resumeFile.asset->url,
  "bigResumeFileUrl": bigResumeFile.asset->url
}`

// ── Contact Page ─────────────────────────────────────────────────────────────
export const contactPageQuery = groq`*[_type == "contactPage"][0]`
