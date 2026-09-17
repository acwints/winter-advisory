import test from 'node:test'
import assert from 'node:assert/strict'
import { inquiryDecision, parseInquiry, readInquiry, submitInquiry, winterOsConfig } from '../src/server/inquiry.ts'

const companyId = '76bfa510-6dce-4970-9302-d521eb5d8b18'
const env = { WINTER_OS_URL: 'https://os.example.com', WINTER_OS_COMPANY_ID: companyId, WINTER_OS_INTAKE_TOKEN: 'test-only-token' }
const input = { name: ' Test Visitor ', email: 'test@example.com', company: 'Test Co', message: 'Review our workflow.' }
const inquiry = parseInquiry(input)
const ok = () => Response.json({ issue: { id: 'private-id', companyId, originId: inquiryDecision(inquiry).originId }, created: true })

test('bounds request body before parsing and rejects malformed or missing JSON', async () => {
  const request = (body) => new Request('https://public.example/api/contact', { method: 'POST', body })
  assert.deepEqual(await readInquiry(request(JSON.stringify(input))), inquiry)
  await assert.rejects(readInquiry(request('x'.repeat(40001))), { status: 413 })
  await assert.rejects(readInquiry(request('{invalid')), { status: 400 })
  await assert.rejects(readInquiry(request(null)), { status: 400 })
})

test('validates required fields, types and limits; ignores visitor routing and approval controls', () => {
  for (const bad of [{ ...input, email: 'bad' }, { ...input, name: 1 }, { ...input, message: 'a'.repeat(10001) }, { ...input, submissionId: 'fake' }]) {
    assert.throws(() => parseInquiry(bad), { status: 400 })
  }
  const clean = parseInquiry({ ...input, companyId: 'other', token: 'evil', url: 'http://evil', originId: 'evil', status: 'todo', assigneeAgentId: 'evil' })
  assert.deepEqual(clean, inquiry)
  const decision = inquiryDecision(clean)
  assert.equal(decision.brief.actionScope, 'Review and qualify inquiry')
  assert.equal(decision.status, undefined)
  assert.equal(decision.assigneeAgentId, undefined)
  assert.ok(decision.brief.artifactMarkdown.includes('    name: Test Visitor'))
})

test('same normalized content retries use the same digest; changed content gets a new origin', () => {
  assert.equal(inquiryDecision(inquiry).originId, inquiryDecision(parseInquiry({ ...input, name: 'Test Visitor' })).originId)
  assert.notEqual(inquiryDecision(inquiry).originId, inquiryDecision(parseInquiry({ ...input, message: 'Different workflow' })).originId)
  const submissionId = '9bcbbd5b-22ef-4a1c-a8f2-5591128e9f21'
  const first = inquiryDecision(parseInquiry({ ...input, submissionId })).originId
  assert.match(first, new RegExp(`^public-intake:${submissionId}:[a-f0-9]{64}$`))
  assert.equal(first, inquiryDecision(parseInquiry({ ...input, submissionId })).originId)
  assert.notEqual(first, inquiryDecision(parseInquiry({ ...input, submissionId, message: 'Changed content with same UUID' })).originId)
  assert.ok(first.length <= 500)
})

test('requires complete server config, HTTPS, safe URL and UUID company', () => {
  assert.equal(winterOsConfig({}), null)
  for (const bad of [
    { WINTER_OS_URL: env.WINTER_OS_URL },
    { ...env, WINTER_OS_URL: 'http://os.example.com' },
    { ...env, WINTER_OS_URL: 'https://user:secret@os.example.com' },
    { ...env, WINTER_OS_URL: 'https://os.example.com?secret=bad' },
    { ...env, WINTER_OS_COMPANY_ID: '../other' },
    { ...env, WINTER_OS_URL: 'https://os.example.com/api' },
    { ...env, WINTER_OS_URL: 'https://os.example.com/prefix/' },
    { ...env, WINTER_OS_URL: 'http://localhost:3101', NODE_ENV: 'production' },
  ]) assert.throws(() => winterOsConfig(bad), { status: 503 })
  assert.match(winterOsConfig({ ...env, WINTER_OS_URL: 'http://localhost:3101', NODE_ENV: 'development' }).url, /^http:/)
})

test('configured OS receives one private review; public result excludes the issue', async () => {
  let calls = 0
  const result = await submitInquiry(inquiry, env, {
    fetch: async (url, options) => {
      calls++
      assert.equal(url, `https://os.example.com/api/companies/${companyId}/decisions`)
      assert.equal(options.headers.Authorization, 'Bearer test-only-token')
      assert.equal(options.redirect, 'error')
      assert.ok(options.signal instanceof AbortSignal)
      assert.deepEqual(JSON.parse(options.body), inquiryDecision(inquiry))
      return ok()
    },
    appendSheet: async () => assert.fail('must not also write to Sheets'),
  })
  assert.equal(calls, 1)
  assert.equal(result, undefined)
})

test('OS errors, timeouts and malformed acknowledgments fail explicitly without fallback or private detail', async () => {
  for (const request of [
    async () => Response.json({ error: 'private detail' }, { status: 401 }),
    async () => { throw new DOMException('secret token', 'TimeoutError') },
    async () => Response.json({ success: true }),
  ]) {
    await assert.rejects(submitInquiry(inquiry, env, {
      fetch: request,
      appendSheet: async () => assert.fail('must not fall back'),
    }), (error) => error.status === 503 && !error.message.includes('secret') && !error.message.includes('private detail'))
  }
})

test('Sheets is used only when all OS configuration is absent', async () => {
  let calls = 0
  const dependencies = {
    fetch: async () => assert.fail('no OS request expected'),
    appendSheet: async (value) => { calls++; assert.deepEqual(value, inquiry) },
  }
  await submitInquiry(inquiry, {}, dependencies)
  assert.equal(calls, 1)
  await assert.rejects(submitInquiry(inquiry, { WINTER_OS_INTAKE_TOKEN: 'partial' }, dependencies), { status: 503 })
  assert.equal(calls, 1)
})


test('success acknowledgment must match configured company and submitted origin', async () => {
  const originId = inquiryDecision(inquiry).originId
  for (const issue of [
    { id: 'private-id', companyId: 'other-company', originId },
    { id: 'private-id', companyId, originId: 'other-origin' },
    { id: 'private-id', companyId },
    { id: 'private-id', originId },
  ]) {
    await assert.rejects(submitInquiry(inquiry, env, {
      fetch: async () => Response.json({ issue, created: true }),
      appendSheet: async () => assert.fail('mismatched acknowledgments must not fall back'),
    }), { status: 503 })
  }
  // A matching deduplicated response is also a valid acknowledgment.
  await submitInquiry(inquiry, env, {
    fetch: async () => Response.json({ issue: { id: 'private-id', companyId, originId }, created: false }),
    appendSheet: async () => assert.fail('must not fall back'),
  })
})
