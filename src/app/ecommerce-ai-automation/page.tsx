import type { Metadata } from 'next'
import { ServiceLandingPage, type ServiceLandingPageContent } from '@/components/ServiceLandingPage'

const url = 'https://winteradvisory.llc/ecommerce-ai-automation'

export const metadata: Metadata = {
  title: 'Ecommerce AI Automation | Winter Advisory',
  description: 'Ecommerce AI automation consulting for Shopify and DTC teams that need controlled workflows across Klaviyo, Gorgias, merchandising, analytics, and operations.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Automation | Winter Advisory',
    description: 'Deploy ecommerce AI automation with workflow scope, owner, KPI, human review, QA controls, and rollout handoff.',
    url,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What ecommerce workflows should be automated with AI first?',
    answer: 'Start with repeated workflows that have a clear owner, measurable baseline, accessible data, and manageable risk: campaign QA, support routing, macro drafts, PDP enrichment, weekly reporting, returns triage, and operations exception summaries.',
  },
  {
    question: 'How is this different from buying an AI automation tool?',
    answer: 'Tools are implementation paths. Winter Advisory starts with the workflow, controls, KPI, and owner, then evaluates whether native platform AI, a SaaS vendor, automation layer, custom build, or internal process is the right path.',
  },
  {
    question: 'Can AI automation connect Shopify, Klaviyo, and Gorgias?',
    answer: 'Yes, but cross-system automation needs source-of-truth rules, permissions, logs, review gates, and failure handling before anything writes back to customer-facing or financial systems.',
  },
  {
    question: 'Do you build the automations?',
    answer: 'Winter Advisory can support workflow design, vendor selection, automation specs, prototype direction, QA plans, rollout cadence, and implementation coordination. Build mode depends on the stack and the pilot.',
  },
]

const content: ServiceLandingPageContent = {
  eyebrow: 'Ecommerce AI automation',
  title: 'AI automation for ecommerce workflows that need controls.',
  description: 'Winter Advisory helps Shopify and DTC teams automate the right parts of lifecycle, CX, merchandising, analytics, and operations without letting AI act beyond the workflow evidence.',
  primaryCta: 'Audit an automation workflow',
  secondaryCta: 'See the automation path',
  proof: ['Workflow scope', 'Human review', 'Rollout evidence'],
  outcomes: [
    { metric: '1 workflow', label: 'A focused automation pilot with owner, KPI, controls, and launch path.' },
    { metric: '3 systems', label: 'Shopify, Klaviyo, Gorgias, analytics, ops, or finance mapped before integration.' },
    { metric: 'QA first', label: 'Review, escalation, rollback, and logs designed before autonomy expands.' },
    { metric: 'No lock-in', label: 'Build, buy, native AI, or automation layer chosen after the workflow is clear.' },
  ],
  painTitle: 'Ecommerce AI automation breaks when teams automate before they understand the handoff.',
  pains: [
    {
      title: 'The workflow crosses systems',
      copy: 'A useful automation may need Shopify order data, Klaviyo segments, CX policies, product facts, analytics context, and ops rules.',
    },
    {
      title: 'The risk is not equal',
      copy: 'Drafting a campaign brief is not the same as changing an order, issuing a refund, promising inventory, or publishing claims to a PDP.',
    },
    {
      title: 'Owners inherit brittle flows',
      copy: 'Automations fail when no one owns exceptions, logs, source data, QA, or the weekly review rhythm after launch.',
    },
    {
      title: 'Tool choice comes too early',
      copy: 'The best path may be native AI, a SaaS workflow, Zapier/Make/n8n, a custom app, or internal process redesign. The workflow should decide.',
    },
  ],
  deploymentTitle: 'A practical path from automation idea to controlled pilot.',
  deploymentSteps: [
    {
      step: 'Scope',
      title: 'Define the job and the boundary',
      copy: 'Clarify the trigger, input data, user, owner, output, approval point, and what the automation should not do.',
    },
    {
      step: 'Map',
      title: 'Connect systems without losing source of truth',
      copy: 'Identify data sources, permissions, write actions, logs, exception paths, and systems that should remain read-only during the pilot.',
    },
    {
      step: 'Control',
      title: 'Design human review and failure handling',
      copy: 'Set QA samples, confidence thresholds, rollback triggers, escalation rules, brand or policy checks, and monitoring cadence.',
    },
    {
      step: 'Launch',
      title: 'Pilot against a measurable baseline',
      copy: 'Compare speed, cost, quality, revenue, support, or margin outcomes before expanding scope, users, or autonomy.',
    },
  ],
  deliverables: [
    'Automation workflow brief',
    'System and data map',
    'Build vs buy recommendation',
    'Human review design',
    'QA and rollback plan',
    'Pilot KPI model',
    'Implementation spec',
    'Launch runbook',
  ],
  stack: ['Shopify', 'Klaviyo', 'Gorgias', 'Zendesk', 'Recharge', 'Loop', 'GA4', 'Triple Whale', 'NetSuite'],
  faq: faqs,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ecommerce AI automation consulting',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Winter Advisory',
      url: 'https://winteradvisory.llc',
    },
    areaServed: 'United States',
    serviceType: 'Ecommerce AI automation consulting',
    url,
    mainEntityOfPage: url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ecommerce AI automation services',
      itemListElement: contentList(['AI automation audit', 'Workflow automation pilot', 'Vendor selection advisory', 'Automation rollout support']),
    },
  },
}

function contentList(items: string[]) {
  return items.map((name, index) => ({
    '@type': 'Offer',
    position: index + 1,
    itemOffered: {
      '@type': 'Service',
      name,
    },
  }))
}

export default function EcommerceAiAutomationPage() {
  return <ServiceLandingPage content={content} />
}
