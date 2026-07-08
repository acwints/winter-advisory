"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

const TITLE = 'AI IS COMING'
const VIDEO_SRC = '/videos/ai-is-coming.mp4'
// Ping-pong tail of the main take; its first frame matches the main video's
// last frame, so the handoff and every cycle after it are seamless.
const LOOP_SRC = '/videos/ai-is-coming-loop.mp4'
const READY_AT_MS = 5000
const REDUCED_READY_AT_MS = 300
const FADE_MS = 800
// v2: earlier builds auto-dismissed and wrote the old key; bumping the name
// guarantees the New Game gate shows even for tabs that saw those builds.
const STORAGE_KEY = 'wa-intro-played-v2'

type Phase = 'playing' | 'ready' | 'fading' | 'done'

export function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>('playing')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoOn, setVideoOn] = useState(false)
  const [loopOn, setLoopOn] = useState(false)
  const [instant, setInstant] = useState(false)
  const timers = useRef<number[]>([])
  const loopRef = useRef<HTMLVideoElement>(null)

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

      {!reducedMotion ? (
        <>
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
            onEnded={() => {
              void loopRef.current?.play().catch(() => {})
            }}
          />
          <video
            ref={loopRef}
            className={`wa-ls__video wa-ls__video--loop${loopOn ? ' wa-ls__video--loop-on' : ''}`}
            src={LOOP_SRC}
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden="true"
            onPlaying={() => setLoopOn(true)}
          />
        </>
      ) : null}
      <div className="wa-ls__scrim" aria-hidden="true" />

      <div className="wa-ls__caption">
        <div className="wa-ls__title" aria-label={TITLE}>
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{ animationDelay: `${3.3 + index * 0.09}s` }}
            >
              {letter === ' ' ? ' ' : letter}
            </span>
          ))}
        </div>
        <div className="wa-ls__subtitle">winter advisory</div>
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

const loadingScreenCss = `
.wa-ls {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 1.75rem;
  padding-bottom: clamp(2.5rem, 9vh, 6rem);
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
  animation: wa-fadein 2.4s ease 0.3s forwards, wa-fogdrift 16s ease-in-out 0.3s infinite alternate;
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
  animation: wa-fadein 2s ease 0.8s forwards, wa-snowfall 11s linear infinite;
}
.wa-ls__snow--near {
  background-size: 260px 260px;
  filter: blur(0.6px);
  animation-duration: 2s, 7s;
}

.wa-ls__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
  opacity: 0;
  transition: opacity 1.6s ease;
  pointer-events: none;
}
.wa-ls--cinema .wa-ls__video { opacity: 1; }

/* loop layer sits above the main take and reveals only once it is playing */
.wa-ls__video--loop { opacity: 0; transition: opacity 0.25s ease; }
.wa-ls--cinema .wa-ls__video--loop { opacity: 0; }
.wa-ls--cinema .wa-ls__video--loop.wa-ls__video--loop-on { opacity: 1; }

/* legibility scrim under the caption once the bright video is up */
.wa-ls__scrim {
  position: absolute;
  inset: 46% 0 0 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(to bottom, transparent, rgba(3, 6, 9, 0.62) 42%, rgba(3, 6, 9, 0.88));
  transition: opacity 1.4s ease;
}
.wa-ls--cinema .wa-ls__scrim { opacity: 1; }

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
@keyframes wa-fogdrift {
  from { transform: translateX(-4%) translateY(0); }
  to { transform: translateX(6%) translateY(-3%); }
}
@keyframes wa-snowfall {
  from { background-position: 0 0; }
  to { background-position: -40px 260px; }
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
.wa-ls--instant .wa-ls__subtitle,
.wa-ls--instant .wa-ls__title span,
.wa-ls--instant .wa-ls__bar span {
  animation: none !important;
}
.wa-ls--instant .wa-ls__fog { opacity: 1; }
.wa-ls--instant .wa-ls__snow { opacity: 1; }
.wa-ls--instant .wa-ls__subtitle,
.wa-ls--instant .wa-ls__title span { opacity: 1; }
.wa-ls--instant .wa-ls__bar span { transform: scaleX(1); }

@media (prefers-reduced-motion: reduce) {
  .wa-ls * { animation: none !important; }
  .wa-ls__subtitle, .wa-ls__title span, .wa-ls__newgame { opacity: 1; }
  .wa-ls__fog, .wa-ls__snow { opacity: 0.6; }
  .wa-ls__bar span { transform: scaleX(1); }
}
`
