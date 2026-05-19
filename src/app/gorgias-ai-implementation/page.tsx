import type { Metadata } from 'next'
import { ServiceLandingPage, type ServiceLandingPageContent } from '@/components/ServiceLandingPage'

const url = 'https://winteradvisory.llc/gorgias-ai-implementation'

export const metadata: Metadata = {
  title: 'Gorgias AI Implementation Consultant | Winter Advisory',
  description: 'Gorgias AI implementation consulting for ecommerce CX teams that need ticket deflection, macro QA, Shopify context, and safe human review loops.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Gorgias AI Implementation Consultant | Winter Advisory',
    description: 'Deploy AI-assisted Gorgias workflows for ecommerce support teams with clear policies, escalation rules, QA, and measurable deflection.',
    url,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Should Gorgias AI answer customers automatically?',
    answer: 'Not for every workflow at the start. The safest path is to begin with grounded drafts, routing, summaries, policy checks, and supervised automations before expanding autonomy.',
  },
  {
    question: 'What should we automate first in ecommerce CX?',
    answer: 'Start with high-volume, low-risk intents such as WISMO, returns status, subscription edits, product FAQ, order changes, and macro suggestions with clear escalation rules.',
  },
  {
    question: 'How do we measure whether support AI is working?',
    answer: 'Measure deflection, handle time, re-open rate, escalation quality, CSAT, refund leakage, and agent adoption. The pilot should include baselines before AI goes live.',
  },
]

const content: ServiceLandingPageContent = {
  eyebrow: 'Gorgias AI implementation',
  title: 'AI deployment for ecommerce support teams using Gorgias.',
  description: 'Winter Advisory helps CX and ecommerce teams deploy support AI with policy grounding, Shopify context, escalation rules, QA checks, and a practical path from assisted workflows to safe automation.',
  primaryCta: 'Book a CX AI audit',
  secondaryCta: 'See the rollout plan',
  proof: ['Policy grounding', 'Escalation rules', 'Deflection measurement'],
  outcomes: [
    { metric: 'Top 20', label: 'Support intents ranked by volume, risk, and automation fit.' },
    { metric: '50-70%', label: 'Routine ticket surface often worth investigating for controlled deflection.' },
    { metric: 'QA loop', label: 'Review answer quality before expanding autonomy.' },
    { metric: 'Agent trust', label: 'Drafts and summaries designed around how the team already works.' },
  ],
  painTitle: 'Support AI fails when it answers before the policies, data, and escalation rules are ready.',
  pains: [
    {
      title: 'Policies are not machine-ready',
      copy: 'Return rules, subscription exceptions, shipping promises, discounts, warranties, and VIP handling need clear grounding before AI drafts responses.',
    },
    {
      title: 'Customer context is fragmented',
      copy: 'A good answer needs Shopify order data, subscription status, prior tickets, product details, and current policies in one reviewable workflow.',
    },
    {
      title: 'Deflection can hide bad experience',
      copy: 'Ticket reduction is not enough. The deployment has to watch re-opens, escalations, CSAT, refund risk, and agent confidence.',
    },
    {
      title: 'Agents need a handoff',
      copy: 'The team needs macros, notes, escalation reasons, and QA feedback that make the workflow faster instead of harder to supervise.',
    },
  ],
  deploymentTitle: 'A support AI rollout that protects customer trust.',
  deploymentSteps: [
    {
      step: 'Baseline',
      title: 'Classify the work',
      copy: 'Analyze ticket types, volume, risk, policy ambiguity, handle time, escalation paths, and current macro quality.',
    },
    {
      step: 'Ground',
      title: 'Prepare the knowledge layer',
      copy: 'Turn policies, product facts, order context, and exception rules into sources the AI workflow can use and humans can inspect.',
    },
    {
      step: 'Pilot',
      title: 'Launch supervised assistance',
      copy: 'Start with routing, summaries, macro drafts, intent labels, and low-risk automations while tracking quality and adoption.',
    },
    {
      step: 'Expand',
      title: 'Automate where evidence supports it',
      copy: 'Increase autonomy only for intents with strong answer quality, low risk, clear escalation paths, and measurable customer outcomes.',
    },
  ],
  deliverables: [
    'Ticket intent map',
    'Automation risk ranking',
    'Policy grounding plan',
    'Escalation matrix',
    'Macro QA rubric',
    'Deflection scorecard',
    'Agent adoption loop',
    'CX rollout runbook',
  ],
  stack: ['Gorgias', 'Shopify', 'Klaviyo', 'Recharge', 'Loop', 'Yotpo', 'Zendesk', 'Help Scout', 'GA4'],
  faq: faqs,
  jsonLd: serviceJsonLd('Gorgias AI implementation consulting', url, [
    'CX AI readiness audit',
    'Support automation pilot',
    'Gorgias AI rollout advisory',
  ]),
}

function serviceJsonLd(name: string, pageUrl: string, offers: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Winter Advisory',
      url: 'https://winteradvisory.llc',
    },
    areaServed: 'United States',
    serviceType: name,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} services`,
      itemListElement: offers.map((offer, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: offer,
        },
      })),
    },
  }
}

export default function GorgiasAiImplementationPage() {
  return <ServiceLandingPage content={content} />
}
