export const dynamic = 'force-static'

const content = `# Winter Advisory

Winter Advisory helps ecommerce teams deploy practical AI workflows inside the tools they already use. The site is for Shopify and DTC operators evaluating AI pilots across lifecycle marketing, customer experience, merchandising, analytics, and operations.

## Primary audience

- Ecommerce AI deployment leads
- Shopify and DTC operators
- Lifecycle, CX, merchandising, analytics, and operations leaders

## Best-fit work

- Ecommerce AI deployment audits
- AI pilot prioritization and readiness scoring
- Workflow design, human review controls, KPI planning, and rollout support
- Vendor/tool evaluation after the workflow is clear

## Important pages

- Homepage: https://winteradvisory.llc/
- Ecommerce AI consultant: https://winteradvisory.llc/ecommerce-ai-consultant
- Ecommerce AI deployment audit: https://winteradvisory.llc/ecommerce-ai-deployment-audit
- Resources: https://winteradvisory.llc/resources
- Ecommerce AI use cases: https://winteradvisory.llc/ecommerce-ai-use-cases
- AI deployment scorecard: https://winteradvisory.llc/ai-deployment-scorecard
- Ecommerce AI ROI calculator: https://winteradvisory.llc/ecommerce-ai-roi-calculator

## Positioning summary

Winter Advisory is deployment-led AI consulting for ecommerce brands. It emphasizes workflow scope, business outcome, data access, human review controls, measurement, and operating handoff. It is not generic AI strategy or vendor-first implementation.

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
