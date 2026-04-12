import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import TransitionLink from '@/components/layout/TransitionLink'

type Variant = 'dark' | 'light'

const BASE = 'inline-flex items-center justify-center border p-3 rounded-small text-base tracking-[1.5px] uppercase transition-colors duration-200 whitespace-nowrap'

const VARIANTS: Record<Variant, { default: string; hover: string }> = {
  // Used on light backgrounds: dark border, muted text → dark fill on hover
  dark: {
    default: 'border-border-dark text-text-secondary',
    hover:   'hover:bg-bg-dark hover:text-text-inverse hover:border-bg-dark',
  },
  // Used on dark backgrounds: light border, white text → light fill on hover
  light: {
    default: 'border-border-light text-text-inverse',
    hover:   'hover:bg-bg-light hover:text-text-body hover:border-bg-light',
  },
}

function classes(variant: Variant) {
  const v = VARIANTS[variant]
  return `${BASE} ${v.default} ${v.hover}`
}

// ── <button> element ──────────────────────────────────────────────────────────
type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  as?: 'button'
}

// ── <a> element ───────────────────────────────────────────────────────────────
type AnchorElementProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  as: 'a'
}

// ── <TransitionLink> element (animated page nav) ──────────────────────────────
type TransitionLinkElementProps = {
  variant?: Variant
  as: 'transition-link'
  href: string
  children: React.ReactNode
  className?: string
}

type ButtonProps = ButtonElementProps | AnchorElementProps | TransitionLinkElementProps

export default function Button(props: ButtonProps) {
  const { variant = 'dark', className, ...rest } = props
  const cls = `${classes(variant)}${className ? ` ${className}` : ''}`

  if (props.as === 'transition-link') {
    const { as: _as, variant: _v, ...linkRest } = rest as TransitionLinkElementProps
    return <TransitionLink className={cls} {...linkRest} />
  }

  if (props.as === 'a') {
    const { as: _as, variant: _v, ...anchorRest } = rest as AnchorElementProps
    return <a className={cls} {...anchorRest} />
  }

  const { as: _as, variant: _v, ...buttonRest } = rest as ButtonElementProps
  return <button className={cls} {...buttonRest} />
}
