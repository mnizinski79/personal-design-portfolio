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
    <div className="pt-20 pb-16" style={{ backgroundColor: bg }}>
      {/* Tab buttons */}
      <div className="flex gap-6 items-end px-6 md:px-[156px] mb-8">
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

      {/* Two independent column carousels — each clips to its own window, both slide on tab change */}
      <div className="px-6 md:px-[156px] flex gap-6 h-[640px]">

        {/* Left carousel — shows bottom of each portrait image */}
        <div className="flex-1 overflow-hidden rounded-small">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${items.length * 100}%`,
              transform: `translateX(-${(activeTab / items.length) * 100}%)`,
            }}
          >
            {items.map((tab) => (
              <div key={tab.label} className="relative h-full" style={{ width: `${100 / items.length}%` }}>
                <Image
                  src={tab.imageLeft ?? '/assets/tab-carousel-image.png'}
                  alt={`${tab.label} view 1`}
                  fill
                  loading="eager"
                  className="object-cover object-bottom"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right carousel — shows top of each portrait image */}
        <div className="flex-1 overflow-hidden rounded-small">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${items.length * 100}%`,
              transform: `translateX(-${(activeTab / items.length) * 100}%)`,
            }}
          >
            {items.map((tab) => (
              <div key={tab.label} className="relative h-full" style={{ width: `${100 / items.length}%` }}>
                <Image
                  src={tab.imageRight ?? '/assets/tab-carousel-image.png'}
                  alt={`${tab.label} view 2`}
                  fill
                  loading="eager"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
