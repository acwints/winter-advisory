import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const url = 'https://winteradvisory.llc/resources'

export const metadata: Metadata = {
  title: 'Ecommerce AI Deployment Resources | Winter Advisory',
  description: 'Winter Advisory resources for ecommerce AI deployment leads: use cases, pilot brief template, readiness scorecard, and implementation pages.',
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: 'Ecommerce AI Deployment Resources | Winter Advisory',
    description: 'Practical resources for ecommerce teams turning AI workflows into controlled pilots and production systems.',
    url,
    type: 'website',
  },
}

const resources = [
  {
    type: 'Diagnostic',
    title: 'Ecommerce AI deployment audit',
    href: '/ecommerce-ai-deployment-audit',
    copy: 'A focused audit for choosing the right AI pilot, mapping the stack, defining controls, and creating a rollout recommendation.',
  },
  {
    type: 'Sample artifacts',
    title: 'Sample AI audit deliverables',
    href: '/ecommerce-ai-audit-sample-deliverables',
    copy: 'Preview the opportunity map, pilot brief, control plan, KPI model, and launch runbook produced by an audit.',
  },
  {
    type: 'Roadmap',
    title: '90-day ecommerce AI roadmap',
    href: '/ecommerce-ai-roadmap',
    copy: 'Plan the path from opportunity discovery to pilot design, controlled launch, and expansion decision.',
  },
  {
    type: 'Business case',
    title: 'Ecommerce AI ROI calculator',
    href: '/ecommerce-ai-roi-calculator',
    copy: 'Estimate the monthly benefit, net impact, ROI, and payback period for a controlled ecommerce AI pilot.',
  },
  {
    type: 'Vendor evaluation',
    title: 'Ecommerce AI vendor selection guide',
    href: '/ecommerce-ai-vendor-selection-guide',
    copy: 'Compare native AI, SaaS tools, automation layers, custom builds, agencies, and internal teams by workflow fit.',
  },
  {
    type: 'Agent deployment',
    title: 'Ecommerce AI agents',
    href: '/ecommerce-ai-agents',
    copy: 'Evaluate support, lifecycle, merchandising, analytics, and operations agents with the right autonomy level and controls.',
  },
  {
    type: 'Planning template',
    title: 'Ecommerce AI pilot brief template',
    href: '/ecommerce-ai-pilot-brief-template',
    copy: 'Use this to align business outcome, workflow scope, owner, systems, controls, KPI, and rollout plan before implementation.',
  },
  {
    type: 'Use-case library',
    title: 'Ecommerce AI use cases',
    href: '/ecommerce-ai-use-cases',
    copy: 'Review practical AI workflows across lifecycle, CX, merchandising, analytics, and operations with controls and KPIs.',
  },
  {
    type: 'Assessment',
    title: 'AI deployment scorecard',
    href: '/ai-deployment-scorecard',
    copy: 'Score a potential AI pilot across owner, workflow clarity, data access, review controls, and measurement.',
  },
]

const servicePages = [
  {
    title: 'Ecommerce AI consultant',
    href: '/ecommerce-ai-consultant',
    copy: 'Deployment-led AI consulting for Shopify and DTC teams across lifecycle, CX, merchandising, analytics, and operations.',
  },
  {
    title: 'Ecommerce AI automation',
    href: '/ecommerce-ai-automation',
    copy: 'Workflow-first AI automation for Shopify, Klaviyo, Gorgias, merchandising, analytics, and operations.',
  },
  {
    title: 'Shopify AI consultant',
    href: '/shopify-ai-consultant',
    copy: 'Deployment advisory for AI workflows connected to Shopify events, catalog data, lifecycle, CX, analytics, and ops.',
  },
  {
    title: 'Klaviyo AI automation',
    href: '/klaviyo-ai-automation',
    copy: 'AI-assisted lifecycle workflows for campaign production, flow QA, segmentation, and brand-safe review.',
  },
  {
    title: 'Gorgias AI implementation',
    href: '/gorgias-ai-implementation',
    copy: 'Support AI rollout with policy grounding, Shopify context, escalation rules, QA, and measurable deflection.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Ecommerce AI Deployment Resources',
  url,
  description: 'A resource hub for ecommerce AI deployment leads evaluating workflows, pilots, readiness, and implementation paths.',
  hasPart: [...resources, ...servicePages].map((item) => ({
    '@type': 'WebPage',
    name: item.title,
    url: `https://winteradvisory.llc${item.href}`,
    description: item.copy,
  })),
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070a] text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="relative px-6 pb-16 pt-36 sm:pt-40 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#05070a_0%,#0d1b1e_48%,#111318_100%)]" />
        <div className="mx-auto max-w-7xl">
          <p className="font-microgramma text-xs uppercase text-cyan-200">Resources</p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            Ecommerce AI deployment resources for serious operators.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Practical templates, use cases, and decision tools for deployment leads who need AI workflows that work inside real ecommerce teams.
          </p>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-amber-200">Plan the pilot</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Start with the artifacts that make AI deployment concrete.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                className="rounded-lg border border-white/10 bg-[#081115] p-6 transition hover:border-cyan-200/50 hover:bg-white/[0.06]"
              >
                <p className="font-microgramma text-xs uppercase text-cyan-200">{resource.type}</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{resource.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{resource.copy}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200">Open resource</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-microgramma text-xs uppercase text-cyan-200">Implementation lanes</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              Focused pages for the workflows buyers are already searching for.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {servicePages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="rounded-lg border border-white/10 bg-[#05070a] p-6 transition hover:border-cyan-200/50 hover:bg-white/[0.04]"
              >
                <h3 className="text-2xl font-semibold text-white">{page.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{page.copy}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200">View page</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-start">
          <div>
            <p className="font-microgramma text-xs uppercase text-amber-200">Use the resources with a real workflow</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white sm:text-6xl">
              Bring the use case, score, or pilot brief.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Winter Advisory can help pressure-test whether the workflow is ready for a diagnostic, pilot sprint, or no-build decision.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
            <h3 className="text-2xl font-semibold text-white">Request an AI deployment audit</h3>
            <p className="mt-2 text-sm text-slate-400">Mention the resource and workflow you are working from.</p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
