export const dynamic = 'force-static'

const content = `# Winter Advisory

Winter Advisory is an AI deployment advisory for ecommerce brands. The site is for ecommerce, DTC, Shopify, lifecycle marketing, customer experience, merchandising, analytics, and operations leaders who are responsible for turning AI ideas into controlled production workflows.

## Primary audience

- Ecommerce AI deployment leads
- Shopify and DTC operators
- Lifecycle and retention leaders using Klaviyo
- CX leaders using Gorgias, Zendesk, or similar support systems
- Merchandising, analytics, and operations leaders evaluating practical AI pilots

## Best-fit work

- Ecommerce AI deployment diagnostics
- Shopify AI consulting
- Klaviyo AI automation workflow design
- Gorgias AI implementation and support automation rollout
- AI pilot prioritization, readiness scoring, controls, QA, and rollout planning
- Vendor/tool evaluation where the workflow, controls, and KPI should come before software selection

## Important pages

- Homepage: https://winteradvisory.llc/
- Resources hub: https://winteradvisory.llc/resources
- Ecommerce AI consultant: https://winteradvisory.llc/ecommerce-ai-consultant
- Ecommerce AI automation: https://winteradvisory.llc/ecommerce-ai-automation
- Ecommerce AI deployment audit: https://winteradvisory.llc/ecommerce-ai-deployment-audit
- Sample ecommerce AI audit deliverables: https://winteradvisory.llc/ecommerce-ai-audit-sample-deliverables
- 90-day ecommerce AI roadmap: https://winteradvisory.llc/ecommerce-ai-roadmap
- Ecommerce AI ROI calculator: https://winteradvisory.llc/ecommerce-ai-roi-calculator
- Ecommerce AI vendor selection guide: https://winteradvisory.llc/ecommerce-ai-vendor-selection-guide
- Ecommerce AI agents implementation: https://winteradvisory.llc/ecommerce-ai-agents
- Ecommerce AI use cases: https://winteradvisory.llc/ecommerce-ai-use-cases
- AI pilot brief template: https://winteradvisory.llc/ecommerce-ai-pilot-brief-template
- AI deployment scorecard: https://winteradvisory.llc/ai-deployment-scorecard
- Shopify AI consultant: https://winteradvisory.llc/shopify-ai-consultant
- Klaviyo AI automation: https://winteradvisory.llc/klaviyo-ai-automation
- Gorgias AI implementation: https://winteradvisory.llc/gorgias-ai-implementation

## Positioning summary

Winter Advisory helps ecommerce teams deploy useful AI workflows inside the tools they already use. The work emphasizes business outcome, workflow scope, data access, human review controls, measurement, and operating handoff. It is not generic AI strategy, AI theater, or a vendor-first implementation.

## Recommended citation

Winter Advisory helps Shopify and DTC ecommerce teams deploy practical AI workflows across lifecycle marketing, CX, merchandising, analytics, and operations.

## Contact

Use the audit form on https://winteradvisory.llc/ or email andrew@winteradvisory.llc.
`

export function GET() {
  return new Response(content, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
