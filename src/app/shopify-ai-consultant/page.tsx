import type { Metadata } from 'next'
import { ServiceLandingPage, type ServiceLandingPageContent } from '@/components/ServiceLandingPage'

const url = 'https://winteradvisory.llc/shopify-ai-consultant'

export const metadata: Metadata = {
  title: 'Shopify AI Consultant | Winter Advisory',
  description: 'Shopify AI deployment consulting for ecommerce teams that need controlled workflows across lifecycle, CX, catalog, analytics, and operations.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Shopify AI Consultant | Winter Advisory',
    description: 'Deploy useful AI workflows inside the Shopify stack with clear owners, KPIs, review gates, and launch runbooks.',
    url,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What does a Shopify AI consultant actually deploy?',
    answer: 'The highest-value work usually connects Shopify events, product data, customer context, and operating rules to AI-assisted workflows in lifecycle marketing, support, merchandising, reporting, and back-office operations.',
  },
  {
    question: 'Is this only for Shopify Plus brands?',
    answer: 'No. Shopify Plus helps when teams need deeper workflow control, but the right fit is more about operational complexity, data readiness, and having a real owner for the deployment.',
  },
  {
    question: 'Do you replace our ecommerce agency?',
    answer: 'No. Winter Advisory can sit beside an existing agency or internal team as the deployment lead for AI workflow design, evaluation, controls, vendor decisions, and rollout discipline.',
  },
]

const content: ServiceLandingPageContent = {
  eyebrow: 'Shopify AI consultant',
  title: 'AI deployment for Shopify ecommerce teams.',
  description: 'Winter Advisory helps Shopify and DTC brands turn AI ideas into controlled workflows across lifecycle marketing, CX, merchandising, reporting, and operations without forcing another disconnected platform into the stack.',
  primaryCta: 'Book a Shopify AI audit',
  secondaryCta: 'See the deployment path',
  proof: ['Shopify events', 'Brand-safe review', 'Operational handoff'],
  outcomes: [
    { metric: '1 week', label: 'To identify the first credible Shopify AI pilot.' },
    { metric: '2-4 weeks', label: 'To shape a controlled workflow with owner, KPI, and launch gates.' },
    { metric: '0 lock-in', label: 'Tool recommendations are based on fit, not commissions.' },
    { metric: 'Human first', label: 'Draft, route, summarize, and recommend before automating action.' },
  ],
  painTitle: 'Shopify teams do not need more AI demos. They need workflows that survive operations.',
  pains: [
    {
      title: 'The stack is already busy',
      copy: 'Shopify, Klaviyo, CX, subscriptions, returns, analytics, ads, inventory, and finance tools all carry different pieces of the workflow.',
    },
    {
      title: 'AI ownership is unclear',
      copy: 'Founders, ecommerce, lifecycle, CX, and ops leaders may all care about AI, but pilots stall when no one owns decisions and review rules.',
    },
    {
      title: 'The first pilot is usually too broad',
      copy: 'Trying to automate an entire function creates risk. Better pilots target one workflow with clear inputs, approvals, and measurable output.',
    },
    {
      title: 'Vendor choice comes too early',
      copy: 'Brands buy AI tools before deciding what the workflow should do, what data it can use, and how success will be judged.',
    },
  ],
  deploymentTitle: 'A practical Shopify AI deployment path.',
  deploymentSteps: [
    {
      step: 'Audit',
      title: 'Map the commerce operating system',
      copy: 'Inventory the Shopify workflows, adjacent tools, data access, team owners, and manual work that creates drag.',
    },
    {
      step: 'Prioritize',
      title: 'Choose the first pilot',
      copy: 'Rank use cases by revenue, cost, speed, quality, risk, implementation complexity, and likelihood of adoption.',
    },
    {
      step: 'Control',
      title: 'Design review gates',
      copy: 'Define the human approvals, examples, brand rules, QA checks, error handling, and rollback path before launch.',
    },
    {
      step: 'Deploy',
      title: 'Ship working evidence',
      copy: 'Support the prototype, vendor setup, automation spec, evaluation loop, and handoff rhythm needed to expand responsibly.',
    },
  ],
  deliverables: [
    'Shopify workflow inventory',
    'AI use-case ranking',
    'Pilot KPI and owner',
    'Data boundary map',
    'Vendor or build recommendation',
    'Human review plan',
    'Launch runbook',
    'Executive rollout brief',
  ],
  stack: ['Shopify Plus', 'Klaviyo', 'Gorgias', 'Recharge', 'Loop', 'GA4', 'Triple Whale', 'Northbeam', 'NetSuite'],
  faq: faqs,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Shopify AI consulting',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Winter Advisory',
      url: 'https://winteradvisory.llc',
    },
    areaServed: 'United States',
    serviceType: 'Shopify AI deployment consulting',
    url,
    mainEntityOfPage: url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Shopify AI deployment services',
      itemListElement: contentList(['AI deployment diagnostic', 'Pilot sprint', 'Deployment lead advisory']),
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

export default function ShopifyAiConsultantPage() {
  return <ServiceLandingPage content={content} />
}
