import Image from 'next/image'
import Link from 'next/link'
import type { Service, Media } from '@/payload/payload-types'

/**
 * ServiceBlocks — server-rendered renderer for Payload Service `blocks`
 * discriminated union. Cream editorial design system, no client hooks.
 *
 * Style cadence cloned from src/components/services/lp/N8nAutomationLP.tsx:
 *  - cream / cream-2 / cream-3 ground
 *  - Fraunces display + Onest body + IBM Plex Mono eyebrows
 *  - terracotta CTAs + accent italics
 *  - sepia(0.06) + 1px ink border + slight rotation on photos
 *
 * Every block destructure handles optional/null fields defensively.
 */

type Blocks = NonNullable<Service['blocks']>
type Block = Blocks[number]
type HeroBlock = Extract<Block, { blockType: 'hero' }>
type PainCardsBlock = Extract<Block, { blockType: 'painCards' }>
type ProofNumeralBlock = Extract<Block, { blockType: 'proofNumeral' }>
type TestimonialBlock = Extract<Block, { blockType: 'testimonial' }>
type BeforeAfterBlock = Extract<Block, { blockType: 'beforeAfter' }>
type FinalCtaBlock = Extract<Block, { blockType: 'finalCta' }>

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

/**
 * Convert `Stop *renting Zapier*. Own your *automation*.` into JSX where
 * `*wrapped*` spans become italic terracotta. Splits on `*…*` and rebuilds.
 */
function renderHeadline(text: string): React.ReactNode {
  if (!text) return null
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      const inner = part.slice(1, -1)
      return (
        <em
          key={i}
          style={{
            fontStyle: 'italic',
            color: 'var(--terracotta)',
            fontWeight: 500,
          }}
        >
          {inner}
        </em>
      )
    }
    return <span key={i}>{part}</span>
  })
}

/**
 * Extract a usable image URL from a Payload Media relation.
 * The field arrives as either a populated Media doc, a numeric id, or null.
 */
function mediaUrl(m: number | null | Media | undefined): string {
  if (!m || typeof m === 'number') return ''
  return m.url ?? ''
}

function mediaAlt(m: number | null | Media | undefined): string {
  if (!m || typeof m === 'number') return ''
  return m.alt ?? ''
}

function mediaDims(m: number | null | Media | undefined): {
  width: number
  height: number
} {
  if (!m || typeof m === 'number') return { width: 800, height: 1000 }
  return {
    width: m.width ?? 800,
    height: m.height ?? 1000,
  }
}

// ──────────────────────────────────────────────────────────────
// Root
// ──────────────────────────────────────────────────────────────

export default function ServiceBlocks({ blocks }: { blocks: Blocks }) {
  if (!blocks || blocks.length === 0) return null
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={block.id ?? i} block={block} />
          case 'painCards':
            return <PainCardsSection key={block.id ?? i} block={block} />
          case 'proofNumeral':
            return <ProofNumeralSection key={block.id ?? i} block={block} />
          case 'testimonial':
            return <TestimonialSection key={block.id ?? i} block={block} />
          case 'beforeAfter':
            return <BeforeAfterSection key={block.id ?? i} block={block} />
          case 'finalCta':
            return <FinalCtaSection key={block.id ?? i} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}

// ──────────────────────────────────────────────────────────────
// HeroSection
// ──────────────────────────────────────────────────────────────

function HeroSection({ block }: { block: HeroBlock }) {
  const {
    eyebrow,
    headline,
    lede,
    ctaLabel,
    ctaHref,
    heroImage,
    heroImageRotation,
  } = block

  const imgUrl = mediaUrl(heroImage)
  const imgAlt = mediaAlt(heroImage) || headline
  const dims = mediaDims(heroImage)
  const rotation = typeof heroImageRotation === 'number' ? heroImageRotation : -1.2

  return (
    <section
      style={{
        background: 'var(--cream)',
        padding: '96px 24px',
        borderBottom: '1px solid rgba(26,26,26,0.10)',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* LEFT — copy */}
        <div>
          {eyebrow && (
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--terracotta)',
                marginBottom: 24,
              }}
            >
              {eyebrow}
            </div>
          )}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 6vw, 56px)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              margin: '0 0 24px',
            }}
          >
            {renderHeadline(headline)}
          </h1>
          {lede && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 18,
                lineHeight: 1.55,
                color: 'var(--ink-2)',
                maxWidth: '52ch',
                margin: '0 0 28px',
              }}
            >
              {lede}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              style={{
                background: 'var(--terracotta)',
                color: 'var(--cream-3)',
                padding: '14px 24px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 2,
                display: 'inline-block',
                textDecoration: 'none',
              }}
            >
              {ctaLabel}
            </Link>
          )}
        </div>

        {/* RIGHT — polaroid */}
        {imgUrl && (
          <div>
            <figure
              style={{
                margin: 0,
                transform: `rotate(${rotation}deg)`,
                background: 'var(--cream-3)',
                padding: 10,
                border: '1px solid rgba(26,26,26,0.12)',
                boxShadow: '0 18px 48px rgba(26,37,64,0.18)',
                maxWidth: 460,
                marginLeft: 'auto',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={imgUrl}
                  alt={imgAlt}
                  width={dims.width}
                  height={dims.height}
                  priority
                  sizes="(min-width: 900px) 460px, 90vw"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'sepia(0.06) saturate(0.95)',
                  }}
                />
              </div>
            </figure>
          </div>
        )}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// PainCardsSection
// ──────────────────────────────────────────────────────────────

function PainCardsSection({ block }: { block: PainCardsBlock }) {
  const { sectionEyebrow, cards } = block
  if (!cards || cards.length === 0) return null

  return (
    <section
      style={{
        background: 'var(--cream-2)',
        padding: '96px 24px',
        borderBottom: '1px solid rgba(26,26,26,0.10)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        {sectionEyebrow && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--terracotta)',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            {sectionEyebrow}
          </div>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--ink)',
            margin: '0 0 48px',
            textAlign: 'center',
          }}
        >
          Where it leaks
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {cards.map((card, i) => {
            const rotation = i % 2 === 0 ? '0.3deg' : '-0.3deg'
            return (
              <div
                key={card.id ?? i}
                style={{
                  background: 'var(--cream-3)',
                  border: '1px solid rgba(26,26,26,0.10)',
                  padding: 32,
                  transform: `rotate(${rotation})`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: 'var(--terracotta)',
                    marginBottom: 12,
                  }}
                >
                  {card.eyebrow}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    fontWeight: 500,
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                    margin: '0 0 12px',
                  }}
                >
                  {card.headline}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: 'var(--ink-2)',
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// ProofNumeralSection
// ──────────────────────────────────────────────────────────────

function ProofNumeralSection({ block }: { block: ProofNumeralBlock }) {
  const { numeral, subLine } = block
  if (!numeral) return null

  return (
    <section
      style={{
        background: 'var(--cream)',
        padding: '96px 24px',
        borderBottom: '1px solid rgba(26,26,26,0.10)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(96px, 16vw, 160px)',
            fontWeight: 500,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            color: 'var(--terracotta)',
            marginBottom: 24,
          }}
        >
          {numeral}
        </div>
        {subLine && (
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 22,
              lineHeight: 1.4,
              color: 'var(--ink-2)',
              maxWidth: 600,
              margin: '0 auto',
            }}
          >
            {subLine}
          </p>
        )}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// TestimonialSection
// ──────────────────────────────────────────────────────────────

function TestimonialSection({ block }: { block: TestimonialBlock }) {
  const {
    quote,
    attribution,
    attributionTitle,
    attributionLocation,
    photo,
  } = block

  const imgUrl = mediaUrl(photo)
  const imgAlt = mediaAlt(photo) || attribution

  return (
    <section
      style={{
        background: 'var(--cream-3)',
        padding: '96px 24px',
        borderBottom: '1px solid rgba(26,26,26,0.10)',
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: imgUrl
            ? 'repeat(auto-fit, minmax(280px, 1fr))'
            : '1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {imgUrl && (
          <figure
            style={{
              margin: 0,
              transform: 'rotate(1.2deg)',
              background: 'var(--cream-3)',
              padding: 10,
              border: '1px solid rgba(26,26,26,0.12)',
              boxShadow: '0 18px 48px rgba(26,37,64,0.18)',
              maxWidth: 280,
              width: '100%',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
              }}
            >
              <Image
                src={imgUrl}
                alt={imgAlt}
                width={280}
                height={280}
                sizes="280px"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'sepia(0.08) saturate(0.95)',
                }}
              />
            </div>
          </figure>
        )}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 24,
              lineHeight: 1.4,
              color: 'var(--ink)',
              margin: '0 0 20px',
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: 'var(--terracotta)' }}>— {attribution}</span>
            {attributionTitle && (
              <span style={{ color: 'var(--ink-faint)' }}>
                {' · '}
                {attributionTitle}
              </span>
            )}
            {attributionLocation && (
              <span style={{ color: 'var(--ink-faint)' }}>
                {' · '}
                {attributionLocation}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// BeforeAfterSection
// ──────────────────────────────────────────────────────────────

function BeforeAfterSection({ block }: { block: BeforeAfterBlock }) {
  const { beforeTitle, afterTitle, beforeBullets, afterBullets } = block
  const before = beforeBullets ?? []
  const after = afterBullets ?? []
  if (before.length === 0 && after.length === 0) return null

  return (
    <section
      style={{
        background: 'var(--cream-2)',
        padding: '96px 24px',
        borderBottom: '1px solid rgba(26,26,26,0.10)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {/* BEFORE */}
          <div
            style={{
              background: 'var(--cream-3)',
              border: '1px solid rgba(26,26,26,0.10)',
              borderLeft: '4px solid var(--oxblood)',
              padding: 40,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--oxblood)',
                marginBottom: 14,
              }}
            >
              — Before
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                margin: '0 0 20px',
              }}
            >
              {beforeTitle}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {before.map((b, i) => (
                <li
                  key={b.id ?? i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '18px 1fr',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(26,26,26,0.06)',
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: 'var(--ink-2)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      color: 'var(--oxblood)',
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.4,
                    }}
                  >
                    ✗
                  </span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div
            style={{
              background: 'var(--cream-3)',
              border: '1px solid rgba(26,26,26,0.10)',
              borderLeft: '4px solid var(--sage)',
              padding: 40,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: 'var(--sage)',
                marginBottom: 14,
              }}
            >
              — After
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                margin: '0 0 20px',
              }}
            >
              {afterTitle}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {after.map((a, i) => (
                <li
                  key={a.id ?? i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '18px 1fr',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(26,26,26,0.06)',
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: 'var(--ink-2)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      color: 'var(--sage)',
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.4,
                    }}
                  >
                    ✓
                  </span>
                  <span>{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
// FinalCtaSection
// ──────────────────────────────────────────────────────────────

function FinalCtaSection({ block }: { block: FinalCtaBlock }) {
  const { eyebrow, headline, ctaLabel, ctaHref, scarcityLine } = block

  return (
    <section
      style={{
        background: 'var(--cream)',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {eyebrow && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'var(--terracotta)',
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            color: 'var(--ink)',
            margin: '0 0 32px',
          }}
        >
          {renderHeadline(headline)}
        </h2>
        <Link
          href={ctaHref}
          style={{
            background: 'var(--terracotta)',
            color: 'var(--cream-3)',
            padding: '16px 32px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 2,
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          {ctaLabel}
        </Link>
        {scarcityLine && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--ink-faint)',
              marginTop: 22,
            }}
          >
            — {scarcityLine}
          </div>
        )}
      </div>
    </section>
  )
}
