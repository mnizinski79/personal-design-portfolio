'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryTab {
  label: string
  // Two portrait images shown side-by-side per tab — both swap on tab change
  imageLeft?: string
  imageRight?: string
}

interface TabbedGalleryProps {
  tabs?: GalleryTab[]
  backgroundColor?: string
  textColorInverse?: boolean
}

const PLACEHOLDER_TABS: GalleryTab[] = [
  { label: 'Overview', imageLeft: '/assets/tab-carousel-img-1.jpg', imageRight: '/assets/tab-carousel-img-2.jpg' },
  { label: 'Detail',   imageLeft: '/assets/tab-carousel-img-3.jpg', imageRight: '/assets/tab-carousel-img-4.jpg' },
  { label: 'Final',    imageLeft: '/assets/tab-carousel-img-5.jpg', imageRight: '/assets/tab-carousel-img-6.jpg' },
]

export default function TabbedGallery({
  tabs,
  backgroundColor,
  textColorInverse = true,
}: TabbedGalleryProps) {
  const items = tabs ?? PLACEHOLDER_TABS
  const [activeTab, setActiveTab] = useState(0)

  const bg = backgroundColor ?? '#2E2E2E'
  const active = items[activeTab]

  return (
    <div className="relative" style={{ backgroundColor: bg }}>
      {/* Tab buttons
          Mobile:  in normal flow, with top/bottom padding
          Desktop: absolutely positioned overlaying the images */}
      <div className="content-grid flex gap-6 items-end pt-10 pb-6 relative md:absolute md:top-20 md:z-10 md:left-0 md:right-0 md:mx-auto md:pt-0 md:pb-0">
        {items.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className="flex flex-col gap-[10px] items-start shrink-0"
          >
            <div className={`h-[5px] w-full bg-accent-pink transition-opacity duration-200 ${i === activeTab ? 'opacity-100' : 'opacity-0'}`} />
            <p className={`tracking-[1.5px] uppercase whitespace-nowrap text-text-inverse ${i === activeTab ? 'h6-semibold-upper' : 'h6-upper'}`}>
              {tab.label}
            </p>
          </button>
        ))}
      </div>

      {/* Carousels
          Mobile:  stacked vertically, full width, bottom padding
          Desktop: side-by-side, left offset 178px */}
      <div className="content-grid flex flex-col md:flex-row gap-0 md:gap-6 items-start pb-10 md:pb-0">

        {/* Left carousel — mobile: no offset; desktop: offset down 178px */}
        <div className="w-full md:flex-1 overflow-hidden rounded-small md:mt-[178px]">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${items.length * 100}%`,
              transform: `translateX(-${(activeTab / items.length) * 100}%)`,
            }}
          >
            {items.map((tab) => (
              <div key={tab.label} style={{ width: `${100 / items.length}%` }}>
                <Image
                  src={tab.imageLeft ?? '/assets/tab-carousel-image.png'}
                  alt={`${tab.label} view 1`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right carousel */}
        <div className="w-full md:flex-1 overflow-hidden rounded-small">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${items.length * 100}%`,
              transform: `translateX(-${(activeTab / items.length) * 100}%)`,
            }}
          >
            {items.map((tab) => (
              <div key={tab.label} style={{ width: `${100 / items.length}%` }}>
                <Image
                  src={tab.imageRight ?? '/assets/tab-carousel-image.png'}
                  alt={`${tab.label} view 2`}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
