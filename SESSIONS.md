# Developer Diary — mikenizinski.com Rebuild

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
