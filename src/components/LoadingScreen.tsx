"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

const TITLE = 'AI IS COMING'
const VIDEO_SRC = '/videos/ai-is-coming.mp4'
const READY_AT_MS = 5000
const REDUCED_READY_AT_MS = 300
const FADE_MS = 800
const STORAGE_KEY = 'wa-intro-played'

type Phase = 'playing' | 'ready' | 'fading' | 'done'

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('playing')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoOn, setVideoOn] = useState(false)
  const [instant, setInstant] = useState(false)
  const timers = useRef<number[]>([])

  const letters = useMemo(() => TITLE.split(''), [])

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setPhase('done')
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(reduced)
    const readyAt = reduced ? REDUCED_READY_AT_MS : READY_AT_MS

    timers.current.push(window.setTimeout(() => setPhase('ready'), readyAt))

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id))
      timers.current = []
    }
  }, [])

  const skipToReady = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    setInstant(true)
    setPhase('ready')
  }

  const enter = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setPhase('fading')
    timers.current.push(window.setTimeout(() => setPhase('done'), FADE_MS))
  }

  const advance = () => {
    if (phase === 'playing') {
      skipToReady()
    } else if (phase === 'ready') {
      enter()
    }
  }

  useEffect(() => {
    if (phase !== 'playing' && phase !== 'ready') {
      return
    }

    const onKey = () => advance()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (phase === 'done') {
    return null
  }

  return (
    <div
      className={`wa-ls${phase === 'fading' ? ' wa-ls--fading' : ''}${videoOn ? ' wa-ls--cinema' : ''}${instant ? ' wa-ls--instant' : ''}`}
      onClick={advance}
      role="status"
      aria-label="Winter Advisory intro"
    >
      <style>{loadingScreenCss}</style>

      <div className="wa-ls__fog wa-ls__fog--a" aria-hidden="true" />
      <div className="wa-ls__fog wa-ls__fog--b" aria-hidden="true" />
      <div className="wa-ls__snow wa-ls__snow--far" aria-hidden="true" />
      <div className="wa-ls__snow wa-ls__snow--near" aria-hidden="true" />
      <div className="wa-ls__flash" aria-hidden="true" />

      <div className="wa-ls__figure" aria-hidden="true">
        <SentinelSvg />
      </div>

      {!reducedMotion ? (
        <video
          className="wa-ls__video"
          src={VIDEO_SRC}
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setVideoOn(true)}
          onError={() => setVideoOn(false)}
        />
      ) : null}
      <div className="wa-ls__veil" aria-hidden="true" />

      <div className="wa-ls__caption">
        <div className="wa-ls__title" aria-label={TITLE}>
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{ animationDelay: `${3.3 + index * 0.09}s` }}
            >
              {letter === ' ' ? ' ' : letter}
            </span>
          ))}
        </div>
        <div className="wa-ls__subtitle">winter advisory // intake terminal</div>
        <div className="wa-ls__bar"><span /></div>
        {phase === 'playing' ? (
          <div className="wa-ls__skip">press any key to skip</div>
        ) : (
          <button
            type="button"
            className="wa-ls__newgame"
            autoFocus
            onClick={(event) => {
              event.stopPropagation()
              enter()
            }}
          >
            New Game
          </button>
        )}
      </div>
    </div>
  )
}

function SentinelSvg() {
  return (
    <svg viewBox="0 0 800 1000" className="wa-ls__svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="waSkullGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d4c5c" />
          <stop offset="0.45" stopColor="#28333f" />
          <stop offset="1" stopColor="#161d26" />
        </linearGradient>
        <linearGradient id="waPlateGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46586a" />
          <stop offset="1" stopColor="#1c2530" />
        </linearGradient>
        <linearGradient id="waFinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c3947" />
          <stop offset="1" stopColor="#141b23" />
        </linearGradient>
        <linearGradient id="waTorsoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#232e3a" />
          <stop offset="1" stopColor="#0b1016" />
        </linearGradient>
        <linearGradient id="waCollarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#333f4d" />
          <stop offset="1" stopColor="#10161d" />
        </linearGradient>
        <radialGradient id="waEyeGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.25" stopColor="#bdf3ff" />
          <stop offset="0.6" stopColor="#38c6f4" />
          <stop offset="1" stopColor="#0a5f8f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="waBloomGrad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fe4ff" stopOpacity="0.85" />
          <stop offset="0.4" stopColor="#2fa8dd" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0a5f8f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="waCoreGrad" cx="0.5" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#aef0ff" />
          <stop offset="0.5" stopColor="#2fa8dd" />
          <stop offset="1" stopColor="#0c3550" />
        </radialGradient>
        <pattern id="waMesh" width="14" height="12" patternUnits="userSpaceOnUse">
          <rect width="14" height="12" fill="#151d26" />
          <circle cx="3.5" cy="3" r="2.4" fill="#222d39" />
          <circle cx="10.5" cy="9" r="2.4" fill="#222d39" />
          <circle cx="3.5" cy="3" r="1" fill="#0d1319" />
          <circle cx="10.5" cy="9" r="1" fill="#0d1319" />
        </pattern>
        <filter id="waBlurS"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id="waBlurM"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id="waFrost">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.62  0 0 0 0 0.75  0 0 0 0 0.82  0 0 0 0.05 0"
          />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* torso */}
      <g>
        <path d="M400 545 L520 560 L610 600 L660 660 L690 760 L700 1000 L100 1000 L110 760 L140 660 L190 600 L280 560 Z" fill="url(#waTorsoGrad)" />
        <path d="M255 640 L400 615 L545 640 L575 1000 L225 1000 Z" fill="url(#waMesh)" stroke="#0a0f14" strokeWidth="2" />
        <path d="M258 668 L400 641 L542 668 L546 706 L400 678 L254 706 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2" />
        <path d="M252 738 L400 710 L548 738 L552 776 L400 748 L248 776 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2" opacity="0.92" />
        <path d="M246 808 L400 780 L554 808 L558 846 L400 818 L242 846 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2" opacity="0.85" />
        <path d="M240 878 L400 850 L560 878 L564 916 L400 888 L236 916 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2" opacity="0.78" />
        <path d="M234 948 L400 920 L566 948 L568 1000 L232 1000 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2" opacity="0.7" />

        <g>
          <path d="M150 690 L165 620 L215 585 L295 565 L300 610 L245 640 L205 690 L195 780 L155 780 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2.5" />
          <path d="M175 640 L225 605 L292 588 L295 608 L242 636 L210 678 Z" fill="#3c4c5d" opacity="0.55" />
          <path d="M650 690 L635 620 L585 585 L505 565 L500 610 L555 640 L595 690 L605 780 L645 780 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2.5" />
          <path d="M625 640 L575 605 L508 588 L505 608 L558 636 L590 678 Z" fill="#3c4c5d" opacity="0.55" />
          <circle cx="185" cy="655" r="4" fill="#0d141b" /><circle cx="212" cy="622" r="4" fill="#0d141b" /><circle cx="255" cy="600" r="4" fill="#0d141b" />
          <circle cx="615" cy="655" r="4" fill="#0d141b" /><circle cx="588" cy="622" r="4" fill="#0d141b" /><circle cx="545" cy="600" r="4" fill="#0d141b" />
        </g>

        <path d="M280 560 L385 545 L385 585 L330 600 L292 594 Z" fill="url(#waCollarGrad)" stroke="#0a0f14" strokeWidth="2" />
        <path d="M520 560 L415 545 L415 585 L470 600 L508 594 Z" fill="url(#waCollarGrad)" stroke="#0a0f14" strokeWidth="2" />

        <g>
          <path d="M400 620 L432 668 L400 780 L368 668 Z" fill="#0e1621" stroke="#0a0f14" strokeWidth="3" />
          <path className="wa-core" d="M400 632 L424 670 L400 762 L376 670 Z" fill="url(#waCoreGrad)" opacity="0.25" />
          <path d="M400 632 L424 670 L400 762 L376 670 Z" fill="none" stroke="#233240" strokeWidth="1.5" />
          <path d="M400 632 L400 762" stroke="#233240" strokeWidth="1.5" />
          <ellipse className="wa-coreGlow" cx="400" cy="695" rx="52" ry="80" fill="url(#waBloomGrad)" opacity="0" />
        </g>

        <ellipse cx="400" cy="590" rx="120" ry="42" fill="#05080c" opacity="0.55" filter="url(#waBlurM)" />
      </g>

      {/* neck */}
      <g>
        <path d="M356 470 L444 470 L452 575 L348 575 Z" fill="#10161d" />
        <path d="M362 480 C356 515 352 545 350 572" stroke="#2b3945" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M438 480 C444 515 448 545 450 572" stroke="#2b3945" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M380 486 C377 518 375 548 374 572" stroke="#1f2a34" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M420 486 C423 518 425 548 426 572" stroke="#1f2a34" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M400 488 L400 572" stroke="#28343f" strokeWidth="12" strokeLinecap="round" />
        <rect x="346" y="520" width="108" height="12" rx="6" fill="#222e39" stroke="#0a0f14" strokeWidth="1.5" />
        <rect x="342" y="544" width="116" height="12" rx="6" fill="#1d2833" stroke="#0a0f14" strokeWidth="1.5" />
      </g>

      {/* crown fin array */}
      <g stroke="#0a0f14" strokeWidth="2.5">
        <path d="M388 175 L400 52 L412 175 Z" fill="url(#waFinGrad)" />
        <path d="M346 185 L352 84 L376 178 Z" fill="url(#waFinGrad)" />
        <path d="M454 185 L448 84 L424 178 Z" fill="url(#waFinGrad)" />
        <path d="M310 210 L302 118 L338 196 Z" fill="url(#waFinGrad)" />
        <path d="M490 210 L498 118 L462 196 Z" fill="url(#waFinGrad)" />
        <path d="M282 246 L262 165 L306 226 Z" fill="url(#waFinGrad)" />
        <path d="M518 246 L538 165 L494 226 Z" fill="url(#waFinGrad)" />
      </g>

      {/* head */}
      <g>
        <path
          d="M400 148 L448 162 L486 196 L508 244 L514 306 L500 384 L462 448 L428 486 L400 498 L372 486 L338 448 L300 384 L286 306 L292 244 L314 196 L352 162 Z"
          fill="url(#waSkullGrad)"
          stroke="#0a0f14"
          strokeWidth="3"
        />
        <path d="M400 150 L400 252" stroke="#141c25" strokeWidth="2.5" />
        <path d="M330 180 L356 248 M470 180 L444 248" stroke="#141c25" strokeWidth="2" />
        <path d="M296 268 L342 258 L400 252 L458 258 L504 268" stroke="#141c25" strokeWidth="2.5" fill="none" />
        <circle cx="400" cy="196" r="3.5" fill="#10161d" />
        <circle cx="356" cy="212" r="3" fill="#10161d" />
        <circle cx="444" cy="212" r="3" fill="#10161d" />

        <g fill="#10161d">
          <rect x="296" y="290" width="20" height="4" rx="2" transform="rotate(12 306 292)" />
          <rect x="298" y="302" width="20" height="4" rx="2" transform="rotate(12 308 304)" />
          <rect x="484" y="290" width="20" height="4" rx="2" transform="rotate(-12 494 292)" />
          <rect x="482" y="302" width="20" height="4" rx="2" transform="rotate(-12 492 304)" />
        </g>

        <path
          d="M306 282 L360 272 L400 278 L440 272 L494 282 L502 316 L452 306 L400 314 L348 306 L298 316 Z"
          fill="url(#waPlateGrad)"
          stroke="#0a0f14"
          strokeWidth="3"
        />
        <path d="M312 288 L360 279 L400 285 L440 279 L488 288" stroke="#54697c" strokeWidth="2" fill="none" opacity="0.8" />

        <path d="M316 314 L356 306 L384 316 L382 348 L352 358 L322 344 Z" fill="#060a0e" />
        <path d="M484 314 L444 306 L416 316 L418 348 L448 358 L478 344 Z" fill="#060a0e" />

        <path d="M300 356 L340 366 L358 412 L344 440 L312 400 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2.5" />
        <path d="M500 356 L460 366 L442 412 L456 440 L488 400 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2.5" />

        <path d="M390 320 L410 320 L416 396 L400 406 L384 396 Z" fill="#1a232d" stroke="#0a0f14" strokeWidth="2.5" />
        <g fill="#0b1117">
          <rect x="391" y="352" width="18" height="4" rx="2" />
          <rect x="390" y="364" width="20" height="4" rx="2" />
          <rect x="389" y="376" width="22" height="4" rx="2" />
        </g>

        <path d="M354 424 L446 424 L440 462 L400 474 L360 462 Z" fill="#10171e" stroke="#0a0f14" strokeWidth="3" />
        <g stroke="#2b3945" strokeWidth="4" strokeLinecap="round">
          <path d="M370 432 L372 456" />
          <path d="M385 430 L386 462" />
          <path d="M400 430 L400 464" />
          <path d="M415 430 L414 462" />
          <path d="M430 432 L428 456" />
        </g>

        <path d="M366 468 L400 480 L434 468 L426 490 L400 498 L374 490 Z" fill="url(#waPlateGrad)" stroke="#0a0f14" strokeWidth="2.5" />
        <path d="M338 448 L372 486 L400 498 L428 486 L462 448 L448 470 L400 488 L352 470 Z" fill="#05080c" opacity="0.5" filter="url(#waBlurS)" />
        <path
          d="M400 148 L448 162 L486 196 L508 244 L514 306 L500 384 L462 448 L428 486 L400 498 L372 486 L338 448 L300 384 L286 306 L292 244 L314 196 L352 162 Z"
          filter="url(#waFrost)"
        />
      </g>

      {/* eyes: dark until ignition */}
      <g className="wa-eyes">
        <ellipse cx="352" cy="330" rx="46" ry="30" fill="url(#waBloomGrad)" />
        <ellipse cx="448" cy="330" rx="46" ry="30" fill="url(#waBloomGrad)" />
        <ellipse cx="352" cy="330" rx="17" ry="9" fill="url(#waEyeGrad)" />
        <ellipse cx="448" cy="330" rx="17" ry="9" fill="url(#waEyeGrad)" />
        <circle cx="352" cy="330" r="3.2" fill="#ffffff" />
        <circle cx="448" cy="330" r="3.2" fill="#ffffff" />
        <ellipse cx="352" cy="330" rx="60" ry="2.2" fill="#9feaff" opacity="0.7" filter="url(#waBlurS)" />
        <ellipse cx="448" cy="330" rx="60" ry="2.2" fill="#9feaff" opacity="0.7" filter="url(#waBlurS)" />
        {/* light cast from the eyes onto the face */}
        <ellipse cx="340" cy="378" rx="36" ry="16" fill="#4dc3e8" opacity="0.12" filter="url(#waBlurM)" />
        <ellipse cx="460" cy="378" rx="36" ry="16" fill="#4dc3e8" opacity="0.12" filter="url(#waBlurM)" />
        <ellipse cx="352" cy="310" rx="30" ry="7" fill="#6fd8f5" opacity="0.18" filter="url(#waBlurS)" />
        <ellipse cx="448" cy="310" rx="30" ry="7" fill="#6fd8f5" opacity="0.18" filter="url(#waBlurS)" />
      </g>

      {/* cold rim light after ignition */}
      <g className="wa-rim">
        <path d="M292 244 L314 196 L352 162 L400 148 L448 162 L486 196 L508 244" stroke="#8fd8ef" strokeWidth="3" fill="none" filter="url(#waBlurS)" />
        <path d="M150 690 L165 620 L215 585 L295 565" stroke="#6fb9d4" strokeWidth="3" fill="none" filter="url(#waBlurS)" opacity="0.6" />
        <path d="M650 690 L635 620 L585 585 L505 565" stroke="#6fb9d4" strokeWidth="3" fill="none" filter="url(#waBlurS)" opacity="0.6" />
      </g>
    </svg>
  )
}

const loadingScreenCss = `
.wa-ls {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  overflow: hidden;
  cursor: pointer;
  background: radial-gradient(circle at 50% 26%, #0b141c 0%, #05070a 62%);
  transition: opacity 0.8s ease;
}
.wa-ls--fading { opacity: 0; pointer-events: none; }

.wa-ls__fog {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0;
  animation: wa-fogin 2.4s ease 0.3s forwards, wa-fogdrift 16s ease-in-out 0.3s infinite alternate;
}
.wa-ls__fog--a {
  width: 95vmax; height: 42vmax; top: 4%; left: -28%;
  background: radial-gradient(closest-side, rgba(105, 176, 201, 0.14), transparent);
}
.wa-ls__fog--b {
  width: 85vmax; height: 38vmax; bottom: -6%; right: -24%;
  background: radial-gradient(closest-side, rgba(72, 126, 152, 0.12), transparent);
  animation-duration: 2.4s, 20s;
  animation-direction: normal, alternate-reverse;
}

.wa-ls__snow {
  position: absolute;
  inset: -180px 0 0 0;
  pointer-events: none;
  opacity: 0;
  background-image:
    radial-gradient(2px 2px at 22px 34px, rgba(215, 238, 248, 0.55) 50%, transparent 51%),
    radial-gradient(1.6px 1.6px at 92px 110px, rgba(215, 238, 248, 0.4) 50%, transparent 51%),
    radial-gradient(2.4px 2.4px at 150px 62px, rgba(215, 238, 248, 0.5) 50%, transparent 51%),
    radial-gradient(1.4px 1.4px at 56px 148px, rgba(215, 238, 248, 0.35) 50%, transparent 51%);
  background-size: 180px 180px;
  animation: wa-snowin 2s ease 0.8s forwards, wa-snowfall 11s linear infinite;
}
.wa-ls__snow--near {
  background-size: 260px 260px;
  filter: blur(0.6px);
  animation-duration: 2s, 7s;
}

.wa-ls__flash {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle at 50% 34%, rgba(127, 228, 255, 0.5), rgba(47, 168, 221, 0.14) 34%, transparent 68%);
  animation: wa-flash 0.7s ease-out 2.85s;
}

.wa-ls__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 32%;
  opacity: 0;
  transform: scale(1.045);
  transition: opacity 1.6s ease, transform 7s ease-out;
  pointer-events: none;
}
.wa-ls--cinema .wa-ls__video { opacity: 1; transform: scale(1); }

/* fog veil that swells to mask the SVG -> video handoff */
.wa-ls__veil {
  position: absolute;
  inset: -12%;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle at 50% 38%, rgba(190, 230, 245, 0.34), rgba(110, 170, 195, 0.16) 46%, transparent 76%);
  filter: blur(30px);
}
.wa-ls--cinema .wa-ls__veil { animation: wa-veil 2.2s ease forwards; }
.wa-ls--cinema .wa-ls__figure { animation: wa-handoff 1.5s ease 0.15s forwards; }
.wa-ls--cinema .wa-ls__fog--a,
.wa-ls--cinema .wa-ls__fog--b,
.wa-ls--cinema .wa-ls__snow { animation: wa-handoff 1.9s ease forwards; }

.wa-ls__figure {
  width: min(64vw, 42vh, 330px);
  opacity: 0;
  filter: brightness(0.3);
  animation:
    wa-emerge 2s ease-out 0.4s forwards,
    wa-lighten 1.2s ease 2.7s forwards;
}
.wa-ls__svg { display: block; width: 100%; height: auto; }

.wa-eyes {
  opacity: 0;
  animation: wa-ignite 1.1s linear 2.4s forwards, wa-eyepulse 3s ease-in-out 3.8s infinite;
}
.wa-rim { opacity: 0; animation: wa-fadein 1.2s ease 2.95s forwards; }
.wa-core { animation: wa-corein 1.4s ease 3.1s forwards; }
.wa-coreGlow { animation: wa-coreglow 1.4s ease 3.1s forwards; }

.wa-ls__caption {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  text-align: center;
  padding: 0 1.25rem;
}
.wa-ls__title {
  font-family: var(--font-microgramma), system-ui, sans-serif;
  font-size: clamp(1.35rem, 5.4vw, 2.6rem);
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  color: #d9f6ff;
  text-shadow: 0 0 18px rgba(77, 195, 232, 0.55), 0 0 46px rgba(47, 168, 221, 0.3);
  white-space: nowrap;
}
.wa-ls__title span { opacity: 0; animation: wa-letter 0.4s ease forwards; }
.wa-ls__subtitle {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(148, 190, 205, 0.75);
  opacity: 0;
  animation: wa-fadein 1s ease 4.5s forwards;
}
.wa-ls__bar {
  width: min(52vw, 260px);
  height: 1px;
  background: rgba(148, 190, 205, 0.18);
  overflow: hidden;
}
.wa-ls__bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, rgba(77, 195, 232, 0.2), #7fe4ff);
  transform-origin: left;
  transform: scaleX(0);
  animation: wa-bar 4.4s linear 0.4s forwards;
}
.wa-ls__skip {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(120, 150, 165, 0.45);
  opacity: 0;
  animation: wa-fadein 1s ease 2.5s forwards;
}

.wa-ls__newgame {
  margin-top: 0.4rem;
  font-family: var(--font-microgramma), system-ui, sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.32em;
  text-indent: 0.32em;
  text-transform: uppercase;
  color: #d9f6ff;
  background: rgba(77, 195, 232, 0.06);
  border: 1px solid rgba(127, 228, 255, 0.45);
  padding: 0.95rem 2.6rem;
  cursor: pointer;
  text-shadow: 0 0 14px rgba(77, 195, 232, 0.6);
  opacity: 0;
  animation: wa-newgame-in 0.7s ease forwards, wa-newgame-pulse 2.6s ease-in-out 0.7s infinite;
  transition: background 0.25s ease, color 0.25s ease, text-shadow 0.25s ease;
}
.wa-ls__newgame:hover {
  background: #9feaff;
  color: #05070a;
  text-shadow: none;
}
.wa-ls__newgame:focus-visible {
  outline: 2px solid #9feaff;
  outline-offset: 3px;
}

@keyframes wa-fadein { to { opacity: 1; } }
@keyframes wa-fogin { to { opacity: 1; } }
@keyframes wa-snowin { to { opacity: 1; } }
@keyframes wa-fogdrift {
  from { transform: translateX(-4%) translateY(0); }
  to { transform: translateX(6%) translateY(-3%); }
}
@keyframes wa-snowfall {
  from { background-position: 0 0; }
  to { background-position: -40px 260px; }
}
@keyframes wa-emerge {
  from { opacity: 0; filter: brightness(0.18); transform: translateY(12px) scale(0.985); }
  to { opacity: 1; filter: brightness(0.55); transform: translateY(0) scale(1); }
}
@keyframes wa-lighten {
  from { filter: brightness(0.55); }
  to { filter: brightness(1); }
}
@keyframes wa-ignite {
  0% { opacity: 0; }
  8% { opacity: 0.5; }
  14% { opacity: 0.06; }
  26% { opacity: 0.72; }
  34% { opacity: 0.12; }
  48% { opacity: 1; }
  100% { opacity: 1; }
}
@keyframes wa-eyepulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}
@keyframes wa-flash {
  0% { opacity: 0; }
  22% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes wa-corein { to { opacity: 0.8; } }
@keyframes wa-coreglow { to { opacity: 0.5; } }
@keyframes wa-handoff {
  from { opacity: 1; filter: brightness(1); }
  to { opacity: 0; filter: brightness(1); }
}
@keyframes wa-veil {
  0% { opacity: 0; }
  28% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes wa-letter {
  from { opacity: 0; transform: translateY(6px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes wa-bar { to { transform: scaleX(1); } }
@keyframes wa-newgame-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes wa-newgame-pulse {
  0%, 100% { box-shadow: 0 0 18px rgba(77, 195, 232, 0.22), inset 0 0 12px rgba(77, 195, 232, 0.08); }
  50% { box-shadow: 0 0 34px rgba(77, 195, 232, 0.45), inset 0 0 18px rgba(77, 195, 232, 0.16); }
}

/* user fast-forwarded: jump every layer to its settled state */
.wa-ls--instant .wa-ls__fog,
.wa-ls--instant .wa-ls__snow,
.wa-ls--instant .wa-ls__figure,
.wa-ls--instant .wa-eyes,
.wa-ls--instant .wa-rim,
.wa-ls--instant .wa-ls__subtitle,
.wa-ls--instant .wa-ls__title span,
.wa-ls--instant .wa-ls__bar span,
.wa-ls--instant .wa-ls__flash {
  animation: none !important;
}
.wa-ls--instant .wa-ls__fog { opacity: 1; }
.wa-ls--instant .wa-ls__snow { opacity: 1; }
.wa-ls--instant .wa-ls__figure { opacity: 1; filter: brightness(1); }
.wa-ls--instant .wa-eyes,
.wa-ls--instant .wa-rim,
.wa-ls--instant .wa-ls__subtitle,
.wa-ls--instant .wa-ls__title span { opacity: 1; }
.wa-ls--instant .wa-core { opacity: 0.8; }
.wa-ls--instant .wa-coreGlow { opacity: 0.5; }
.wa-ls--instant .wa-ls__bar span { transform: scaleX(1); }
/* cinema handoff must still win over the instant state */
.wa-ls--instant.wa-ls--cinema .wa-ls__figure,
.wa-ls--instant.wa-ls--cinema .wa-ls__fog,
.wa-ls--instant.wa-ls--cinema .wa-ls__snow {
  opacity: 0;
  transition: opacity 1.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .wa-ls * { animation: none !important; }
  .wa-ls__figure { opacity: 1; filter: brightness(1); }
  .wa-eyes, .wa-rim, .wa-ls__subtitle, .wa-ls__title span, .wa-ls__newgame { opacity: 1; }
  .wa-ls__fog, .wa-ls__snow { opacity: 0.6; }
  .wa-ls__bar span { transform: scaleX(1); }
}
`
