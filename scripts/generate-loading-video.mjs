#!/usr/bin/env node
/**
 * Generates the cinematic loading-screen video at public/videos/ai-is-coming.mp4.
 *
 * Pipeline (one key, Google AI Studio: https://aistudio.google.com/apikey):
 *   1. Nano banana (Gemini image model) renders a photoreal keyframe still
 *      of the frozen robot sentinel with dark, unlit eyes.
 *   2. Veo animates that keyframe: eyes flicker and ignite ice-blue.
 *   3. If ffmpeg is installed, the result is compressed + audio-stripped.
 *
 * Usage:
 *   GEMINI_API_KEY=... npm run generate:intro
 *   GEMINI_API_KEY=... node scripts/generate-loading-video.mjs --skip-image
 *
 * Flags:
 *   --skip-image        reuse existing public/videos/ai-is-coming-keyframe.png
 *   --image-model=...   default: gemini-2.5-flash-image  (nano banana)
 *   --video-model=...   default: veo-3.1-generate-preview
 *   --duration=...      seconds, default 8 (Veo 3.1 supports 1080p only at 8s)
 *
 * Prefer Higgsfield / Seedance / Kling instead? Generate there with the same
 * prompts (printed by `node scripts/generate-loading-video.mjs --prompts`)
 * and drop the file at public/videos/ai-is-coming.mp4 — the loading screen
 * picks it up automatically and falls back to the built-in SVG sequence
 * whenever the file is missing or still buffering.
 */

import { execFileSync } from 'node:child_process'
import { mkdirSync, renameSync, rmSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta'
const OUT_DIR = path.join(process.cwd(), 'public', 'videos')
const KEYFRAME_PATH = path.join(OUT_DIR, 'ai-is-coming-keyframe.png')
const RAW_VIDEO_PATH = path.join(OUT_DIR, 'ai-is-coming-raw.mp4')
const FINAL_VIDEO_PATH = path.join(OUT_DIR, 'ai-is-coming.mp4')
const LOOP_VIDEO_PATH = path.join(OUT_DIR, 'ai-is-coming-loop.mp4')
// Tail of the take that ping-pongs forever after the intro plays once.
// Reversed-then-forward, so the loop's first frame == the main video's last
// frame and its last frame == its own first frame: seamless at both joints.
const LOOP_TAIL_START_S = 4.5

// Original character design (mirrors the site's SVG sentinel). Keep the eyes
// DARK in the keyframe — the video model performs the ignition.
const KEYFRAME_PROMPT = [
  'Cinematic film still, frozen battlefield at dusk. A menacing sci-fi',
  'android war machine stands motionless, centered, facing the camera,',
  'framed from the waist up with generous headroom — full head and armored',
  'torso visible, NOT a close-up. Design: unmistakably a robot, not a knight —',
  'a gaunt, angular metallic android head with visible panel seams, bolted',
  'plating, articulated jaw servos, and hydraulic pistons and bundled cables',
  'at the neck; a crown of long jagged metal sensor-fin spikes sweeping up',
  'and back from its skull; two large deep-set mechanical lens eyes, clearly',
  'visible but completely dark and unpowered — dead glass camera lenses,',
  'no glow. Its torso is engineered sci-fi armor: segmented alloy chest',
  'plating with exposed actuators at the shoulder joints and flexible metal',
  'mesh between the plates, all rimed with frost, dusted with snow, and hung',
  'with thin icicles.',
  'Dense freezing fog, gently falling snow, strong volumetric rim light from',
  'behind, desaturated steel-blue color grade, anamorphic lens,',
  'photorealistic, extreme detail, subtle film grain.',
  'Full-bleed image with no border, no vignette, no letterboxing.',
].join(' ')

const VIDEO_PROMPT = [
  'Locked-off static camera. No camera movement, no push-in, no zoom, no pan.',
  'The armored, frost-covered android war machine stands perfectly still,',
  'framed waist-up with headroom. Snow falls gently, fog drifts slowly, and',
  'frost vapor breathes off its shoulder plating. For the first 2 seconds its',
  'deep-set lens eyes stay completely dark. Then both lenses flicker and',
  'ignite into piercing ice-blue points of light — the glow stays contained',
  'within the eye sockets,',
  'casting only a soft cold blue sheen onto the icy cheekbones. No light',
  'beams, no lens flare streaks. It remains otherwise perfectly motionless —',
  'menacing, patient, ambient loopable motion only. Ominous cinematic tone,',
  'photorealistic, desaturated steel-blue grade, volumetric lighting, subtle',
  'film grain. No text, no captions, no watermarks.',
].join(' ')

const args = process.argv.slice(2)
const flag = (name) => args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`))
const flagValue = (name, fallback) => {
  const hit = flag(name)
  return hit?.includes('=') ? hit.split('=').slice(1).join('=') : fallback
}

if (flag('prompts')) {
  console.log('--- keyframe (image) prompt ---\n')
  console.log(KEYFRAME_PROMPT)
  console.log('\n--- video (image-to-video) prompt ---\n')
  console.log(VIDEO_PROMPT)
  process.exit(0)
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
if (!apiKey) {
  console.error('Set GEMINI_API_KEY (https://aistudio.google.com/apikey) and re-run.')
  console.error('Or run with --prompts to print prompts for Higgsfield/Seedance/Kling.')
  process.exit(1)
}

const imageModel = flagValue('image-model', 'gemini-2.5-flash-image')
const videoModel = flagValue('video-model', 'veo-3.1-generate-preview')
const durationSeconds = Number(flagValue('duration', '8'))

async function api(pathname, init = {}) {
  const response = await fetch(`${API_BASE}/${pathname}`, {
    ...init,
    headers: {
      'x-goog-api-key': apiKey,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { raw: text }
  }
  if (!response.ok) {
    throw new Error(`${pathname} -> HTTP ${response.status}\n${JSON.stringify(data, null, 2)}`)
  }
  return data
}

async function generateKeyframe() {
  console.log(`[1/3] Generating keyframe with ${imageModel}...`)
  const data = await api(`models/${imageModel}:generateContent`, {
    method: 'POST',
    body: JSON.stringify({
      contents: [{ parts: [{ text: KEYFRAME_PROMPT }] }],
      generationConfig: { imageConfig: { aspectRatio: '16:9' } },
    }),
  })

  const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)
  if (!part) {
    throw new Error(`No image in response:\n${JSON.stringify(data, null, 2).slice(0, 2000)}`)
  }

  writeFileSync(KEYFRAME_PATH, Buffer.from(part.inlineData.data, 'base64'))
  console.log(`      Saved ${path.relative(process.cwd(), KEYFRAME_PATH)}`)
}

async function generateVideo() {
  console.log(`[2/3] Animating with ${videoModel} (this takes a few minutes)...`)
  const imageBase64 = readFileSync(KEYFRAME_PATH).toString('base64')

  const operation = await api(`models/${videoModel}:predictLongRunning`, {
    method: 'POST',
    body: JSON.stringify({
      instances: [
        {
          prompt: VIDEO_PROMPT,
          image: { bytesBase64Encoded: imageBase64, mimeType: 'image/png' },
        },
      ],
      parameters: {
        aspectRatio: '16:9',
        resolution: '1080p',
        durationSeconds,
      },
    }),
  })

  let op = operation
  while (!op.done) {
    await new Promise((resolve) => setTimeout(resolve, 10_000))
    op = await api(op.name)
    process.stdout.write('.')
  }
  process.stdout.write('\n')

  if (op.error) {
    throw new Error(`Video generation failed:\n${JSON.stringify(op.error, null, 2)}`)
  }

  const uri =
    op.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri ||
    op.response?.generatedVideos?.[0]?.video?.uri ||
    op.response?.videos?.[0]?.uri
  if (!uri) {
    throw new Error(`No video URI in response:\n${JSON.stringify(op.response, null, 2).slice(0, 2000)}`)
  }

  const download = await fetch(uri, { headers: { 'x-goog-api-key': apiKey } })
  if (!download.ok) {
    throw new Error(`Video download failed: HTTP ${download.status}`)
  }

  writeFileSync(RAW_VIDEO_PATH, Buffer.from(await download.arrayBuffer()))
  console.log(`      Saved ${path.relative(process.cwd(), RAW_VIDEO_PATH)}`)
}

async function resolveFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'pipe' })
    return 'ffmpeg'
  } catch {
    try {
      const { default: staticPath } = await import('ffmpeg-static')
      return staticPath
    } catch {
      return null
    }
  }
}

async function compressVideo() {
  console.log('[3/3] Compressing for web delivery...')
  const ffmpeg = await resolveFfmpeg()

  if (!ffmpeg) {
    console.log('      No ffmpeg found (PATH or ffmpeg-static) — using the raw file as-is.')
    renameSync(RAW_VIDEO_PATH, FINAL_VIDEO_PATH)
    return
  }

  execFileSync(ffmpeg, [
    '-y',
    '-i', RAW_VIDEO_PATH,
    '-an',
    '-vcodec', 'libx264',
    '-crf', '29',
    '-preset', 'slow',
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    // crop trims the film-border vignette the image model bakes into edges
    '-vf', 'crop=iw*0.92:ih*0.92:(iw-iw*0.92)/2:(ih-ih*0.92)/2,scale=-2:1080',
    FINAL_VIDEO_PATH,
  ], { stdio: 'pipe' })

  execFileSync(ffmpeg, [
    '-y',
    '-i', RAW_VIDEO_PATH,
    '-an',
    '-filter_complex',
    `[0:v]trim=start=${LOOP_TAIL_START_S},setpts=PTS-STARTPTS,crop=iw*0.92:ih*0.92:(iw-iw*0.92)/2:(ih-ih*0.92)/2,scale=-2:1080,split[fwd][tmp];[tmp]reverse[rev];[rev][fwd]concat=n=2:v=1:a=0[out]`,
    '-map', '[out]',
    '-vcodec', 'libx264',
    '-crf', '29',
    '-preset', 'slow',
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    LOOP_VIDEO_PATH,
  ], { stdio: 'pipe' })

  rmSync(RAW_VIDEO_PATH) // don't ship the 13MB raw take in public/
  console.log(`      Saved ${path.relative(process.cwd(), FINAL_VIDEO_PATH)}`)
  console.log(`      Saved ${path.relative(process.cwd(), LOOP_VIDEO_PATH)} (seamless ping-pong loop)`)
}

mkdirSync(OUT_DIR, { recursive: true })

if (flag('skip-image')) {
  if (!existsSync(KEYFRAME_PATH)) {
    console.error(`--skip-image set but ${KEYFRAME_PATH} does not exist.`)
    process.exit(1)
  }
  console.log('[1/3] Reusing existing keyframe.')
} else {
  await generateKeyframe()
}

await generateVideo()
await compressVideo()

console.log('\nDone. The loading screen will now fade the video in over the SVG fallback.')
console.log('Review the keyframe + video, and re-run to roll a new take.')
