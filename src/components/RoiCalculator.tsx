"use client"

import { useMemo, useState } from 'react'

const defaults = {
  weeklyHours: 18,
  hourlyCost: 65,
  conversionLift: 0.4,
  monthlyRevenue: 750000,
  grossMargin: 62,
  supportTickets: 4200,
  deflectionRate: 8,
  costPerTicket: 4.5,
  monthlyPilotCost: 8500,
}

export function RoiCalculator() {
  const [inputs, setInputs] = useState(defaults)
  const [copied, setCopied] = useState(false)

  const results = useMemo(() => {
    const laborSavings = inputs.weeklyHours * inputs.hourlyCost * 4.33
    const contributionLift = inputs.monthlyRevenue * (inputs.conversionLift / 100) * (inputs.grossMargin / 100)
    const supportSavings = inputs.supportTickets * (inputs.deflectionRate / 100) * inputs.costPerTicket
    const monthlyBenefit = laborSavings + contributionLift + supportSavings
    const netMonthly = monthlyBenefit - inputs.monthlyPilotCost
    const roi = inputs.monthlyPilotCost > 0 ? (netMonthly / inputs.monthlyPilotCost) * 100 : 0
    const paybackMonths = monthlyBenefit > 0 ? inputs.monthlyPilotCost / monthlyBenefit : 0

    return {
      laborSavings,
      contributionLift,
      supportSavings,
      monthlyBenefit,
      netMonthly,
      roi,
      paybackMonths,
    }
  }, [inputs])

  const summary = `Winter Advisory ecommerce AI ROI estimate

Monthly benefit: ${formatCurrency(results.monthlyBenefit)}
Net monthly impact after pilot cost: ${formatCurrency(results.netMonthly)}
Estimated ROI: ${Math.round(results.roi)}%
Estimated payback: ${results.paybackMonths.toFixed(1)} months

Inputs:
Weekly hours saved: ${inputs.weeklyHours}
Hourly loaded cost: ${formatCurrency(inputs.hourlyCost)}
Monthly revenue affected: ${formatCurrency(inputs.monthlyRevenue)}
Conversion/revenue lift: ${inputs.conversionLift}%
Gross margin: ${inputs.grossMargin}%
Monthly support tickets in scope: ${inputs.supportTickets}
Deflection/avoidance rate: ${inputs.deflectionRate}%
Cost per ticket: ${formatCurrency(inputs.costPerTicket)}
Monthly pilot cost: ${formatCurrency(inputs.monthlyPilotCost)}`

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  function discussEstimate() {
    window.localStorage.setItem('winter-advisory-score-summary', summary)
    window.dispatchEvent(new Event('winter-advisory-score'))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-5">
        <Panel title="Operator time saved">
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              label="Weekly hours saved"
              value={inputs.weeklyHours}
              min={0}
              max={100}
              step={1}
              onChange={(value) => setInputs((current) => ({ ...current, weeklyHours: value }))}
            />
            <NumberField
              label="Loaded hourly cost"
              value={inputs.hourlyCost}
              min={0}
              max={250}
              step={5}
              prefix="$"
              onChange={(value) => setInputs((current) => ({ ...current, hourlyCost: value }))}
            />
          </div>
        </Panel>

        <Panel title="Revenue or conversion impact">
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField
              label="Monthly revenue affected"
              value={inputs.monthlyRevenue}
              min={0}
              max={5000000}
              step={25000}
              prefix="$"
              onChange={(value) => setInputs((current) => ({ ...current, monthlyRevenue: value }))}
            />
            <NumberField
              label="Lift"
              value={inputs.conversionLift}
              min={0}
              max={10}
              step={0.1}
              suffix="%"
              onChange={(value) => setInputs((current) => ({ ...current, conversionLift: value }))}
            />
            <NumberField
              label="Gross margin"
              value={inputs.grossMargin}
              min={0}
              max={100}
              step={1}
              suffix="%"
              onChange={(value) => setInputs((current) => ({ ...current, grossMargin: value }))}
            />
          </div>
        </Panel>

        <Panel title="Support or exception work avoided">
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberField
              label="Monthly tickets in scope"
              value={inputs.supportTickets}
              min={0}
              max={50000}
              step={100}
              onChange={(value) => setInputs((current) => ({ ...current, supportTickets: value }))}
            />
            <NumberField
              label="Deflection / avoidance"
              value={inputs.deflectionRate}
              min={0}
              max={80}
              step={1}
              suffix="%"
              onChange={(value) => setInputs((current) => ({ ...current, deflectionRate: value }))}
            />
            <NumberField
              label="Cost per ticket"
              value={inputs.costPerTicket}
              min={0}
              max={50}
              step={0.5}
              prefix="$"
              onChange={(value) => setInputs((current) => ({ ...current, costPerTicket: value }))}
            />
          </div>
        </Panel>

        <Panel title="Pilot investment">
          <NumberField
            label="Monthly pilot cost"
            value={inputs.monthlyPilotCost}
            min={0}
            max={100000}
            step={500}
            prefix="$"
            onChange={(value) => setInputs((current) => ({ ...current, monthlyPilotCost: value }))}
          />
        </Panel>
      </div>

      <aside className="h-fit rounded-lg border border-white/10 bg-[#071014] p-6 lg:sticky lg:top-6">
        <p className="font-microgramma text-xs uppercase text-amber-200">Pilot business case</p>
        <div className="mt-5 space-y-4">
          <Metric label="Monthly benefit" value={formatCurrency(results.monthlyBenefit)} />
          <Metric label="Net monthly impact" value={formatCurrency(results.netMonthly)} tone={results.netMonthly >= 0 ? 'good' : 'risk'} />
          <Metric label="Estimated ROI" value={`${Math.round(results.roi)}%`} tone={results.roi >= 0 ? 'good' : 'risk'} />
          <Metric label="Payback period" value={`${results.paybackMonths.toFixed(1)} months`} />
        </div>
        <div className="mt-6 rounded-lg border border-white/10 bg-[#05070a] p-4">
          <p className="text-sm font-semibold text-white">Benefit breakdown</p>
          <div className="mt-4 space-y-3 text-sm">
            <Breakdown label="Operator time" value={results.laborSavings} />
            <Breakdown label="Revenue lift" value={results.contributionLift} />
            <Breakdown label="Support savings" value={results.supportSavings} />
          </div>
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-500">
          This is a planning estimate, not a financial guarantee. The point is to identify whether a pilot is worth a controlled test.
        </p>
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={copySummary}
            className="w-full rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/60 hover:bg-white/5"
          >
            {copied ? 'Copied' : 'Copy ROI summary'}
          </button>
          <button
            type="button"
            onClick={discussEstimate}
            className="w-full rounded-full bg-cyan-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Discuss this estimate
          </button>
        </div>
      </aside>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  prefix = '',
  suffix = '',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/10 bg-[#05070a] px-3 py-2">
        {prefix && <span className="text-sm text-slate-500">{prefix}</span>}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent text-sm text-white outline-none"
        />
        {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full accent-cyan-200"
      />
    </label>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'risk' }) {
  const color = tone === 'risk' ? 'text-amber-100' : tone === 'good' ? 'text-cyan-100' : 'text-white'

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={`mt-2 font-microgramma text-3xl ${color}`}>{value}</p>
    </div>
  )
}

function Breakdown({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-100">{formatCurrency(value)}</span>
    </div>
  )
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}
