import type { Metadata } from 'next'
import { ServiceLandingPage, type ServiceLandingPageContent } from '@/components/ServiceLandingPage'

const url = 'https://winteradvisory.llc/klaviyo-ai-automation'

export const metadata: Metadata = {
  title: 'Klaviyo AI Automation Consultant | Winter Advisory',
  description: 'Klaviyo AI automation consulting for ecommerce lifecycle teams that need faster campaign production, better QA, and brand-safe review workflows.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Klaviyo AI Automation Consultant | Winter Advisory',
    description: 'Deploy AI-assisted Klaviyo workflows for lifecycle production, segmentation, QA, reporting, and controlled campaign operations.',
    url,
    type: 'website',
  },
}

const faqs = [
  {
    question: 'Can AI safely write Klaviyo emails for a brand?',
    answer: 'AI should not publish directly at first. The practical deployment is a supervised workflow that drafts briefs, copy variants, QA checks, and segment notes for human review before anything reaches customers.',
  },
  {
    question: 'Where does Klaviyo AI automation create leverage first?',
    answer: 'The first useful pilots are usually campaign brief generation, product-aware copy variants, flow QA, segmentation notes, offer checks, performance summaries, and handoff from CX insights into lifecycle planning.',
  },
  {
    question: 'Do we need a custom tool?',
    answer: 'Not always. Many teams can start with a controlled workflow around existing Klaviyo, Shopify, product, and performance data. Custom tooling only makes sense when repeatability, permissions, or scale justify it.',
  },
]

const content: ServiceLandingPageContent = {
  eyebrow: 'Klaviyo AI automation',
  title: 'AI workflows for Klaviyo teams that need to move faster without losing brand control.',
  description: 'Winter Advisory helps lifecycle and retention teams deploy AI-assisted workflows for campaign production, flow QA, segmentation, product context, and performance review inside the ecommerce stack.',
  primaryCta: 'Book a lifecycle AI audit',
  secondaryCta: 'See the workflow plan',
  proof: ['Brand voice QA', 'Product context', 'Campaign throughput'],
  outcomes: [
    { metric: '2x', label: 'More campaign surface area without lowering review standards.' },
    { metric: '1 source', label: 'Product, offer, segment, and performance context pulled into the same brief.' },
    { metric: 'QA gates', label: 'Brand, offer, compliance, product, and segmentation checks before send.' },
    { metric: 'Weekly', label: 'Performance learnings folded back into the next generation cycle.' },
  ],
  painTitle: 'Lifecycle teams are under pressure to ship more, personalize more, and still protect the brand.',
  pains: [
    {
      title: 'Campaign briefs are scattered',
      copy: 'Product launches, offers, customer segments, prior winners, and brand rules often live in different docs, tools, and team memory.',
    },
    {
      title: 'AI copy gets generic fast',
      copy: 'Without examples, product context, forbidden claims, and review rubrics, AI output sounds plausible but not like the brand.',
    },
    {
      title: 'QA is still manual',
      copy: 'Segmentation, links, offers, exclusions, claims, personalization, and flow logic all need checks before a workflow can scale.',
    },
    {
      title: 'Performance learning is slow',
      copy: 'Winning angles, segments, subject lines, offers, and creative lessons should feed the next brief without another reporting meeting.',
    },
  ],
  deploymentTitle: 'A controlled Klaviyo AI deployment path.',
  deploymentSteps: [
    {
      step: 'Collect',
      title: 'Gather the inputs',
      copy: 'Map where brand voice, product facts, offers, segment rules, prior campaign data, and approval criteria currently live.',
    },
    {
      step: 'Design',
      title: 'Build the assisted workflow',
      copy: 'Define how AI creates briefs, variants, QA checks, segment notes, and performance summaries for lifecycle team review.',
    },
    {
      step: 'Evaluate',
      title: 'Compare against current work',
      copy: 'Test output quality, speed, adoption, review burden, and business relevance against the current lifecycle process.',
    },
    {
      step: 'Handoff',
      title: 'Make it repeatable',
      copy: 'Document prompt patterns, approval gates, operating cadence, and the next expansion path for campaigns or flows.',
    },
  ],
  deliverables: [
    'Lifecycle workflow map',
    'Brand voice rubric',
    'Campaign brief template',
    'AI prompt library',
    'QA checklist',
    'Segment and offer rules',
    'Performance summary loop',
    'Pilot expansion plan',
  ],
  stack: ['Klaviyo', 'Shopify', 'Gorgias', 'Postscript', 'Attentive', 'Recharge', 'GA4', 'Triple Whale', 'Northbeam'],
  faq: faqs,
  jsonLd: serviceJsonLd('Klaviyo AI automation consulting', url, [
    'Campaign production workflow',
    'Klaviyo QA automation',
    'Lifecycle reporting loop',
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

export default function KlaviyoAiAutomationPage() {
  return <ServiceLandingPage content={content} />
}
