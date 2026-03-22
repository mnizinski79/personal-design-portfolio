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
export const homePageQuery = groq`*[_type == "homePage"][0]`

// ── Featured Projects (for home page) ───────────────────────────────────────
export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(order asc) {
  title,
  slug,
  featuredImage,
  featuredTitle,
  featuredDescription,
  featuredButtonLabel,
  featuredBackground,
  featuredTextColorInverse
}`

// ── Projects Grid ────────────────────────────────────────────────────────────
export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  title,
  slug,
  thumbnail,
  gridLabel,
  featured,
  order
}`

// ── Single Project (detail page) ─────────────────────────────────────────────
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  title,
  slug,
  thumbnail,
  gridLabel,
  mastheadFields,
  headerBackgroundImage,
  mastheadTextColorInverse,
  featured,
  featuredImage,
  featuredTitle,
  featuredDescription,
  featuredButtonLabel,
  featuredBackground,
  featuredTextColorInverse,
  contentBlocks[],
  order
}`

// ── All project slugs (for generateStaticParams) ─────────────────────────────
export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)] {
  "slug": slug.current
}`

// ── About Page ───────────────────────────────────────────────────────────────
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]`

// ── Contact Page ─────────────────────────────────────────────────────────────
export const contactPageQuery = groq`*[_type == "contactPage"][0]`
