# Developer Diary — mikenizinski.com Rebuild

---

## 2026-03-24 — Phase 5 Continued: CMS Schema Polish & Studio UX

### Accomplished
- **Highlight decorator — visual feedback** — renamed `homePage.ts` → `.tsx`; added `component` prop to `highlight` decorator so selected text shows a pink background tint in the Studio editor
- **About page schema** — renamed to `.tsx`; converted `headline` → portable text with `highlight` decorator; converted `introBio`, `personalBio`, `moreAboutMe` → rich text arrays with full default toolbar (bold, italic, underline, bullets, etc.)
- **About page** — now server component fetching from Sanity; wired `clientLogos` (renders real logo images via `urlFor`); wired `skills` (maps 0–10 Sanity level → 0–100 bar width); wired `zoneLabels`; `SkillBars` updated to accept optional `skills` + `zoneLabels` props with hardcoded fallbacks
- **Resume download buttons** — wired to `resumeFile`/`bigResumeFile` Sanity assets; added `/api/download` proxy route that forces browser download (bypasses cross-origin `Content-Disposition` issue with Sanity CDN); buttons hidden until files are uploaded
- **Contact page schema** — renamed to `.tsx`; `headline` → portable text with `highlight` decorator; `introParagraph` → rich text with full toolbar
- **Contact page** — server component fetching from Sanity with PortableText renderers; fallback content preserved
- **Color picker** — installed `@sanity/color-input` + `styled-components`; registered `colorInput()` plugin; changed `featuredBackground` on project to `type: 'color'`; updated `featuredProjectsQuery` + `projectBySlugQuery` to extract `.hex` via GROQ
- **Block background colors** — all `backgroundColor` fields in `sharedBlockFields` and `imageBlock`, plus `accentColor` in `noteBlock`, changed to `type: 'color'`; `BlockRenderer` updated with `toHexColor()` normalizer (handles both legacy strings and new color objects)
- **Design palette swatches** — added `SITE_COLORS` constant (`{ hex }` format) to project schema; applied as `colorList` option to all color picker fields so brand colors are one-click swatches

### Next Steps
1. **Enter real content in Sanity Studio** — projects, images, copy at `/studio`
2. **Contact form** — wire submission handler (SendGrid env vars in `.env.local`)
3. **SEO / metadata** — `generateMetadata` per page, OG images
4. **Performance pass** — image optimization audit, Lighthouse run
5. **Deploy** — Vercel deploy with env vars

---

## 2026-03-24 — Phase 5: Sanity CMS Integration

### Accomplished
- **Studio route** — `app/studio/[[...tool]]/page.tsx` with `NextStudio` (accessible at `/studio`)
- **Home page** — fetches `featuredProjectsQuery` from Sanity; falls back to placeholder if no data; renders real `featuredImage` via `urlFor()`
- **Projects page** — fetches `projectsQuery`; maps `thumbnail` → `urlFor().width(980).height(490).url()`; passes `thumbnailUrl` to `ProjectCard`
- **Project detail page** — fetches `projectBySlugQuery` by slug; `generateStaticParams` for SSG; maps `headerBackgroundImage` + `mastheadFields`; falls back to full placeholder preview for `slug === 'placeholder'`
- **ProjectCard / ProjectGrid** — added `thumbnailUrl?` prop; falls back to placeholder asset
- **ProjectMasthead** — added `backgroundImageUrl?` and `logoImageUrl?` props; falls back to placeholder assets
- **ImageBlock** — added `imageUrl?` prop for real Sanity image passthrough
- **ClientLogosBlock** — `LogoItem` extended with `logoUrl?`; uses real logo if provided
- **BlockRenderer** — added `toImageUrl()` helper; handles `imageBlock` Sanity type (alongside `image`); transforms `leftImage`/`rightImage` refs for TabbedGallery tabs; transforms `logo` refs for ClientLogos; maps `basicContainer.content` field
- **next.config.ts** — `cdn.sanity.io` already whitelisted (was set up in Phase 1)

### Next Steps
1. **Enter real content in Sanity Studio** — add projects, images, copy at `/studio`
2. **Contact form** — wire submission handler (SendGrid env vars already in `.env.local`)
3. **SEO / metadata** — `generateMetadata` per page, OG images
4. **Performance pass** — image optimization audit, Lighthouse run
5. **Deploy** — Vercel deploy with env vars

---

## 2026-03-24 — Phase 4 Polish: Block Layout Refinements & Mobile QA

### Accomplished
- **TabbedGallery mobile** — tabs in normal flow above stacked carousels; desktop layout (absolute tabs, side-by-side staggered carousels) preserved; `gap-0 md:gap-6` so carousels touch on mobile
- **TabbedGallery images** — auto-height (`w-full h-auto`), right carousel starts at y=0, left staggered 178px down on desktop; `sizes` updated for responsive loading
- **content-grid utility** — `.content-grid` CSS class: `max-width: 1280px`, centered, `px-6` mobile / `px-[156px]` desktop; applied to all full-width blocks (ImageBlock, BasicContainer, ClientLogosBlock, Columns, Note)
- **Featured project (home page)** — bg div stays full-width; inner content-grid capped at 1280px; `.featured-text-inset` recalibrated to 6-col width (242px inset at 1280px+)
- **Columns twoColumn mobile** — gradient replaced with plain `#ffffff` via `.two-col-bg` CSS class (gradient only at `md+`)
- **RichTextBlock** — already complete: `@portabletext/react` with H2, H3, normal, link renderers
- **SkillBarsBlock** — already complete: wraps About page IntersectionObserver animation
- **Mobile QA pass** — all blocks verified at 375px: masthead, hamburger, rich text, tabbed gallery, columns, note, image, client logos, basic container ✓

### Next Steps
1. **Sanity CMS integration** — connect schemas, wire GROQ queries to pages/blocks
2. **Real project content** — populate actual case studies, images, copy
3. **Contact form** — wire up submission handler (email or form service)
4. **SEO / metadata** — `generateMetadata` per page, OG images
5. **Performance pass** — image optimization audit, Lighthouse run

---

## 2026-03-23 — Phase 4: Projects Grid, Detail Page & Block Components

### Accomplished
- **Projects grid page** — dark bg, 2-col layout, `next/image` thumbnails, H6 uppercase card labels
- **Project detail page** — removed left offset so blocks are full-width; sidebar floats on top (fixed position)
- **ProjectMasthead** — 560px desktop / 360px mobile, background image, colored client logo, vertically centered content, fields stacked vertically using the `masthead-content` CSS column (mirrors `page-content` centering logic)
- **BlockRenderer** — dispatches all 8 block types; added pink `BlockLabel` debug banners to each block for easier visual debugging
- **TabbedGallery** — pink indicator tab nav (semibold active / regular inactive), dual independent sliding column carousels (left: `object-bottom` crop, right: `object-top` crop), `loading="eager"` to preload all images, 500ms ease-in-out slide transition — verified working across all 3 tabs
- **ProjectCard** — `next/image` with `aspect-[980/490]` container
- **ImageBlock** — full-width (`aspect-[1440/560]`) and container-width (`aspect-[2360/1060]`) variants
- **ClientLogosBlock** — CSS grid, ruled borders between cells, color/knockout logo toggle via `textColorInverse`
- **Sidebar** — replaced text fallback with actual `site-logo.svg`
- **globals.css** — added `masthead-content` to the responsive column rule, set `p` base color to `text-secondary` (#666666)
- **Dummy assets** — added placeholder images for all block types so every component renders visually in dev

### Next Steps
1. **TabbedGallery tab labels** — double-check casing and spacing against Figma spec once more
2. **RichTextBlock** — wire up `@portabletext/react` with custom renderers for H2, H3, links
3. **Columns block** — implement `twoColumn`, `multiColumn`, and `tiles` variants; mobile stacking behavior
4. **Note block** — accent bar/rule above Portable Text; `accentColor` prop
5. **SkillBars block** — IntersectionObserver scroll-triggered fill animation (reuse About page logic)
6. **BasicContainer block** — mixed Portable Text + image content
7. **Mobile QA pass** — test all blocks at 375px: sidebar hamburger, masthead sizing, gallery, columns stack

---
