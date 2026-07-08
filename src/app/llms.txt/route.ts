export const dynamic = 'force-static'

const content = `# Winter Advisory

Winter Advisory is a generalist AI deployment advisory. It helps teams take AI from demo to production inside the tools they already use — auditing workflows, running controlled pilots, and scaling the deployments that produce evidence.

## Primary audience

- Leaders evaluating AI pilots and production deployments
- Teams that need a deployment lead, not another strategy deck
- Operators across sales, marketing, CX, operations, data, and engineering

## Best-fit work

- AI deployment audits
- AI pilot prioritization and readiness scoring
- Workflow design, human review controls, KPI planning, and rollout support
- Vendor/tool and build-vs-buy evaluation after the workflow is clear

## Important pages

- Homepage: https://winteradvisory.llc/

## Positioning summary

Winter Advisory is deployment-led AI consulting. It emphasizes workflow scope, business outcome, data access, human review controls, measurement, and operating handoff. It is not generic AI strategy or vendor-first implementation.

## Contact

Use the contact form on https://winteradvisory.llc/ or email andrew@winteradvisory.llc.
`

export function GET() {
  return new Response(content, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  })
}
