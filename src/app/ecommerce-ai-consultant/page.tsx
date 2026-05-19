import type { Metadata } from 'next'
import { ServiceLandingPage, type ServiceLandingPageContent } from '@/components/ServiceLandingPage'

const url = 'https://winteradvisory.llc/ecommerce-ai-consultant'

export const metadata: Metadata = {
  title: 'Ecommerce AI Consultant | Winter Advisory',
  description: 'Ecommerce AI consulting for Shopify and DTC brands that need practical AI deployment across lifecycle marketing, CX, merchandising, analytics, and operations.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Consultant | Winter Advisory',
    description: 'Vendor-agnostic ecommerce AI deployment consulting for teams that need workflow selection, controls, KPI design, and operating handoff.',
    url,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What makes Winter Advisory different from a generic ecommerce AI consultant?',
    answer: 'The work starts with deployment: workflow scope, owner, systems, controls, KPI, and handoff. Strategy matters only if it helps choose the right pilot and get it into controlled use.',
  },
  {
    question: 'Which ecommerce functions can this cover?',
    answer: 'The strongest fit is lifecycle marketing, customer experience, merchandising, analytics, and operations for Shopify and DTC teams with an existing commerce stack.',
  },
  {
    question: 'Do you recommend tools or build custom systems?',
    answer: 'Both are options, but tool choice follows the workflow. Winter Advisory can evaluate native platform AI, SaaS vendors, automation layers, custom builds, agencies, or internal implementation paths.',
  },
  {
    question: 'What should we have before reaching out?',
    answer: 'A rough workflow, a business pressure, and someone who can own the pilot are enough. The first audit can shape the use case, controls, and KPI if they are not clear yet.',
  },
]

const content: ServiceLandingPageContent = {
  eyebrow: 'Ecommerce AI consultant',
  title: 'AI consulting for ecommerce teams that need deployment, not theater.',
  description: 'Winter Advisory helps Shopify and DTC brands choose the right AI workflows, design the controls, evaluate tools, and ship practical pilots across lifecycle marketing, CX, merchandising, analytics, and operations.',
  primaryCta: 'Book an ecommerce AI audit',
  secondaryCta: 'See the deployment path',
  proof: ['Workflow first', 'Vendor agnostic', 'Human-in-loop'],
  outcomes: [
    { metric: '1 pilot', label: 'A focused first AI workflow with owner, KPI, and rollout plan.' },
    { metric: '4 lanes', label: 'Lifecycle, CX, merchandising, analytics, and operations coverage.' },
    { metric: '0 commissions', label: 'Tool recommendations are based on fit, not vendor incentives.' },
    { metric: 'Controls', label: 'Review gates, QA, escalation, and rollback before autonomy expands.' },
  ],
  painTitle: 'Most ecommerce AI consulting starts too broad or too tool-first.',
  pains: [
    {
      title: 'AI ideas are scattered',
      copy: 'Teams have use cases across marketing, CX, catalog, analytics, and ops, but no shared way to rank them by value, risk, and readiness.',
    },
    {
      title: 'Vendors lead the workflow',
      copy: 'A tool demo can look useful while skipping the owner, source data, review gates, edge cases, and measurement plan needed for deployment.',
    },
    {
      title: 'Leadership wants ROI',
      copy: 'Executives need a business case and rollout narrative before approving budget, but operators need practical artifacts before they can build.',
    },
    {
      title: 'Autonomy arrives too early',
      copy: 'Customer-facing, financial, and brand-sensitive work needs supervised pilots before the team can safely expand automation.',
    },
  ],
  deploymentTitle: 'A deployment-led path for ecommerce AI.',
  deploymentSteps: [
    {
      step: 'Diagnose',
      title: 'Map the operating drag',
      copy: 'Inventory recurring workflows, source systems, owners, manual work, and decision points across the ecommerce stack.',
    },
    {
      step: 'Prioritize',
      title: 'Choose the first credible pilot',
      copy: 'Score use cases by impact, readiness, implementation complexity, data access, control burden, and ability to measure a baseline.',
    },
    {
      step: 'Design',
      title: 'Define controls and economics',
      copy: 'Create the pilot brief, KPI model, review gates, QA rubric, vendor/build recommendation, and expansion criteria.',
    },
    {
      step: 'Deploy',
      title: 'Move into controlled use',
      copy: 'Support implementation, evaluation, operating cadence, executive updates, and handoff so the workflow survives after launch.',
    },
  ],
  deliverables: [
    'AI opportunity map',
    'Pilot brief',
    'Workflow and stack map',
    'Vendor selection scorecard',
    'Pilot ROI estimate',
    'Control and QA plan',
    'Launch runbook',
    'Executive rollout brief',
  ],
  stack: ['Shopify', 'Klaviyo', 'Gorgias', 'Zendesk', 'Recharge', 'GA4', 'Triple Whale', 'Northbeam', 'NetSuite'],
  faq: faqs,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ecommerce AI consulting',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Winter Advisory',
      url: 'https://winteradvisory.llc',
    },
    areaServed: 'United States',
    serviceType: 'Ecommerce AI deployment consulting',
    url,
    mainEntityOfPage: url,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Ecommerce AI consulting services',
      itemListElement: contentList(['AI deployment audit', 'Pilot sprint', 'Vendor selection advisory', 'Deployment lead advisory']),
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

export default function EcommerceAiConsultantPage() {
  return <ServiceLandingPage content={content} />
}
