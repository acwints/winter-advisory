'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './essay.module.css';

const eras = {
  code: { name: 'Code', description: 'A steep technical entry requirement limits who can try an idea themselves.' },
  automation: { name: 'Automation', description: 'Tools like Zapier, Make, and n8n give more people a way to connect systems and build workflows.' },
  ai: { name: 'AI', description: 'More people can attempt the implementation. Curiosity and follow-through can show up across technical backgrounds.' },
};
// A fixed, invented population illustrates the argument; these are not observations or aptitude scores.
const people = Array.from({ length: 180 }, (_, id) => ({
  id, x: 4 + ((id * 71 + 19) % 181) / 181 * 92,
  y: 4 + ((id * 113 + 37) % 179) / 179 * 92,
}));
function Population() {
  const [era, setEra] = useState<keyof typeof eras>('ai');
  const threshold = { code: 77, automation: 53, ai: 15 }[era];
  return <figure className={styles.interactive}>
    <h3>Try changing the tools.</h3>
    <p>The people stay in the same place. The technical entry requirement changes.</p>
    <div className={styles.controls} aria-label="Choose a tool era">
      {(Object.keys(eras) as (keyof typeof eras)[]).map(key => <button key={key} type="button" aria-pressed={era === key} onClick={() => setEra(key)}>{eras[key].name}</button>)}
    </div>
    <div className={styles.plotLayout}>
      <span className={styles.yAxis}>Initiative & follow-through →</span>
      <div className={styles.plot} role="img" aria-label={`${eras[era].name}: invented people plotted by technical fluency and initiative. A lower technical threshold makes room for more potential builders. This illustrates a hypothesis, not measured population shares.`}>
        <div className={styles.gridX} /><div className={styles.gridY} />
        <div className={styles.region} style={{ left: `${threshold}%`, right: 0, top: 0, height: '56%' }} />
        {people.map(p => <span key={p.id} className={`${styles.dot} ${p.x > threshold && p.y > 44 ? styles.active : ''}`} style={{ left: `${p.x}%`, bottom: `${p.y}%` }} />)}
      </div>
      <span className={styles.xAxis}>Less technical fluency <span>More technical fluency</span></span>
    </div>
    <p className={styles.explanation} aria-live="polite">{eras[era].description}</p>
    <figcaption>Conceptual model. The dots, thresholds, and two axes are invented to explain the idea. Shading means a possible opening to build, not proven ability or interest. People’s behavior also depends on the task, time, support, and permission they have.</figcaption>
  </figure>;
}
function Poster({ name, alt, caption }: { name: string; alt: string; caption: string }) {
  return <figure className={styles.poster}>
    <a href={`/images/ai-upskilling/${name}.webp`} target="_blank" rel="noreferrer" aria-label={`Open full-size diagram: ${alt}`}><Image src={`/images/ai-upskilling/${name}.webp`} alt={alt} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 1160px" /></a>
    <figcaption>{caption} Open the image to see it full size.</figcaption>
  </figure>;
}
export default function Essay() {
  return <main className={styles.essay} data-theme="winter-essay">
    <a className={styles.skipLink} href="#argument">Skip to the essay</a>
    <header className={styles.header}><Link href="/" className={styles.wordmark}>WINTER ADVISORY</Link><Link href="/writing">Writing</Link></header>
    <article>
      <div className={styles.hero}>
        <h1>AI adoption and<br />the upskilling default</h1>
        <p className={styles.dek}>We used to assume teaching everyone to code wasn’t worth it. Now we assume teaching everyone AI is. I think both defaults deserve a closer look.</p>
        <div className={styles.byline}><span>Andrew Winter</span><time dateTime="2026-10-27">October 27, 2026</time></div>
      </div>
      <section className={styles.prose} id="argument">
        <p>It strikes me that it’s somehow obvious to everyone that “AI adoption” is a thing every company should care about across their organization. But that was never true for “engineering training.”</p>
        <p>It was maybe slightly more true for automation training. Zapier, Make, n8n, etc. But nobody seemed to think every employee needed to become an automation wizard either.</p>
        <p>We seemed pretty comfortable assuming that teaching everyone to code would take too long, cost too much, and have too little to do with most people’s jobs. Now we seem comfortable assuming that getting everyone good at AI must be worth the investment. A new line item from the clouds just sort of exists.</p>
        <p>After living and breathing AI 24/7 for the past two years, I’m skeptical of anyone who claims to have a clean framework for this. I think there are good reasons we changed the default. I also think we’re bringing a lot of the same sloppy assumptions with us.</p>
        <p>My view is that we probably underinvested in technical upskilling before AI, and we may be overcorrecting now. AI has changed who can benefit and what it costs to help them. That gives us a reason to reconsider the investment, but it doesn’t make company-wide adoption a goal we can stop thinking about.</p>
      </section>
      <section className={styles.prose}>
        <h2>We drew a pretty weird line.</h2>
        <p>Think about what we expected from people in the 2010s. Excel and PowerPoint were normal. Depending on your role, maybe Tableau or Looker. A designer could spend years getting good at Figma and nobody would find that strange.</p>
        <p>But SQL was “nice to have.” Python meant you were becoming a different kind of person.</p>
        <p>I’m describing the norm I remember across job descriptions and teams, and I know there were exceptions. Airbnb, for example, <a href="https://medium.com/airbnb-engineering/how-airbnb-democratizes-data-science-with-data-university-3eccc71e073a">built Data University</a> to teach employees across roles how to work with data, including SQL. They also gave people shared tools and access to the data. The training had somewhere to go.</p>
        <p>Still, why was a coding language so much scarier than Figma? Learning the tool was acceptable up to some threshold, and then we started talking about whether someone was “technical.”</p>
        <p>There were real reasons for that. Writing a useful query requires understanding the data. A script someone runs every day can become something the company depends on, and someone has to maintain it. If you use it twice a year, the learning time might never pay back.</p>
        <p>I don’t think the old “technical” versus “non-technical” gap was ever as large as we made it seem. I suspect we stopped too early with a lot of people. Someone who knew the business inside out might have gotten a ton of value from a little SQL or Python, without needing to become a software engineer. We often treated those as much closer to the same thing than they were.</p>
      </section>
      <Poster name="builders" alt="Two architectural scenes show a narrow technical-skills gate becoming a broad entrance to building with AI. People with and without technical backgrounds appear on both sides." caption="My hypothesis: the technical barrier has fallen, giving more people room to act on an idea. This is an illustration, not a population estimate." />
      <section className={styles.prose}>
        <h2>AI as the great bundler.</h2>
        <p>You used to be a data analyst who spent your time in Postgres or Looker. Or a designer who spent your time in Figma. Your role and your tools were pretty tightly connected.</p>
        <p>You can already see some of this in how people use Claude or ChatGPT with connectors instead of opening individual SaaS apps. Now you can work through a question, write a query, mock up a page, and build a first version of it in the same AI workspace. You still need the underlying systems, and you may still go back into those specialist tools. But you can attempt a much bigger part of the work yourself.</p>
        <p>I think of AI as the great bundler here. You can pull activities out of several different roles and put them together around something you want to get done. A marketer who understands the customer might be able to build the little tool they’ve wanted for years, instead of writing a brief and waiting for three other teams.</p>
        <p>I expect we’ll see more of this across human capital too. If you’re a builder, and you’ve developed enough domain proficiency to do useful work, why would your scope stop at Design, or Finance, or CX? You might notice that the customer problem you’re working on requires a different onboarding flow, a better internal report, and a small change to the product. Being able to attempt more of that yourself changes what your job can include.</p>
        <p>I think job titles and scopes are going to evolve rapidly and horizontally. We’ll have to figure out who owns what when someone’s ability to solve a problem extends well beyond the tools and tasks we hired them for.</p>
        <p>That doesn’t give them an analyst’s understanding of the data or an engineer’s judgment about what will break. Domain proficiency still matters, and the cost of getting something wrong varies a lot. It does let them get further before they need to ask someone else.</p>
        <p>Automation tools already moved us in this direction. AI has made the upfront investment smaller again, while making it harder to predict who will take to it.</p>
      </section>
      <section className={styles.prose} id="builders">
        <h2>Some people see something and want to make it.</h2>
        <p>The confusing piece is that we haven’t just expanded the old spectrum a bit in one direction. You can’t work your way down the org chart from engineering and expect the next group over to be the next best at this.</p>
        <p>You get something more like this hypothetical team:</p>
        <blockquote>“Half our engineers clearly derive a ton of leverage here and half seem to not. But our social media intern is fucking crushing it right now, even though our lifecycle marketing team is really struggling with it.”</blockquote>
        <p>Skills, intelligence, and education still have a lot to do with it. But I suspect personality and behavioral patterns have more to do with it than we’re used to accounting for. Curiosity. Entrepreneurism. A bias for action. The willingness to spend a few hours figuring something out before deciding you need someone else to do it.</p>
        <p>More technical people are probably more likely to be builders. I just don’t think the relationship is as direct as we’ve treated it, and you likely have builders sitting in places you never thought to look.</p>
        <p>The gap between “technical” and “non-technical” has shrunk massively. And the distinction I find myself thinking about more is “builders” and “non-builders.” Who sees a problem and thinks, “I bet I can figure out how to make something that solves that”?</p>
        <p>I don’t mean everyone should become a founder or spend their weekends making apps. I mean the person on your team who keeps finding things they could improve and trying to do something about them. AI gives that person a lot more room to run, including when they’ve never thought of themselves as technical.</p>
      </section>
      <Poster name="changing-divide" alt="The same workforce appears in two dot maps. An old technical-fluency filter gives way to a wider possible pool across technical backgrounds, with initiative and follow-through becoming more relevant." caption="Two dimensions are enough to sketch the idea, but they can’t describe a person. The boundaries here are illustrative; these aren’t measured population shares." />
      <section className={styles.prose}>
        <p>I’m also wary of replacing one overly stark divide with another. Someone can be curious and self-sufficient in one part of their work and have no interest in building software. Someone else might have the interest but no time, access, or permission to try.</p>
        <p>And the intern who makes an impressive demo still has to show that it works. The engineer asking annoying questions about reliability might be doing exactly what you need. Enthusiasm is easier to see than judgment.</p>
        <p>So I’d treat “builder” as something someone does in a particular situation. I wouldn’t put it on their employee record after watching them use ChatGPT for a week.</p>
      </section>
      <Population />
      <section className={styles.prose}>
        <h2>A much bigger pool still has limits.</h2>
        <p>In my head, the rough sketch goes something like this: less than 5% of the workforce building software, mostly engineers. More investment in coding skills might have expanded that pool, but I have a hard time imagining it getting past 10%. Automation tools were opening up something more like 15% to 20%. With AI, I can imagine something closer to 50%.</p>
        <p>Those are intuition-level numbers, not workforce estimates or a forecast. I’m also using “building” much more broadly than “employed as a software engineer.” I mean people who can create a useful tool or change how something works as part of their job. The distinction between those two populations is a lot of what I’m trying to get at.</p>
        <p>But even if you buy the 50% intuition, 50% is still not 100%. We should be realistic about what we expect the KPIs for AI adoption to look like. Giving the whole company access might make sense. Expecting everyone to build, use the tools equally often, or get the same amount out of them seems like a much stranger goal.</p>
      </section>
      <section className={styles.prose} id="training">
        <h2>Then we flipped the training default.</h2>
        <p>It makes sense to offer AI training to a much broader group than we offered coding training to. You can get value from drafting, research, or working through a spreadsheet without building anything. And a short introduction can help someone discover a use for it that neither of you would have predicted.</p>
        <p>But “AI adoption” seems to contain everything from “here’s how to use this tool responsibly” to “our marketing team should be building its own agents.” Those are very different asks.</p>
        <p>For this kind of technical upskilling, it feels like we’ve gone from “default toggled off” to “default toggled on.” Both postures have reasonable explanations. Both can lead us to spend too little on some people and too much on others.</p>
        <p>My hunch is that a lot of companies would have benefited from being more diligent about SQL, HTML, and Python training over the past ten years. I also suspect a lot of the AI training happening today won’t pay off. I don’t have the evidence to tell you how much of either. But I don’t think changing the default has relieved us of the need to ask.</p>
        <p>From an ROI perspective, AI feels like a much more reasonable investment than teaching everyone at the company to code. But a lot of the cost of learning to code was upfront. Once you knew how, you could keep using that skill without paying for each bit of code you wrote. You still had infrastructure, maintenance, and other costs, of course.</p>
        <p>With AI, the token spend keeps going as you use it. The person experimenting more, or the workflow running more often, can keep adding to the bill. On top of that, you pay for checking the output, fixing things, and keeping them working. If you’re not paying attention, AI adoption can become a runaway train even when the cost of getting started looked tiny.</p>
        <p>And if you’re trying to judge the training itself, you need to ask what the person would have done with access to the tool anyway. All the value they get from AI doesn’t automatically belong in the training provider’s ROI slide.</p>
      </section>
      <section className={styles.prose}>
        <h2>I’d give more people a chance, without demanding the same result.</h2>
        <p>This is part of how I think about AI adoption at Won. I’d encourage people to try AI on their actual work. Offer training. Give them access and some room to experiment. Reward the people who find useful ways to do things, especially when they’re coming from somewhere you wouldn’t have thought to look.</p>
        <p>Then pay attention to what happens. Did the work get better? Did something get done that previously wasn’t getting done? Did the person save an hour, or spend that hour checking and fixing the result? If they’re struggling, is another class going to help, or are they missing access to the data they need?</p>
        <p>Some people don’t like it, don’t want to use it, or don’t get much out of it. Depending on the role and the stakes, that can be okay. If someone does good work with different tools, I don’t need them to perform enthusiasm for AI. If their job now requires something they can’t do, we should be clear about the requirement and give them a reasonable chance to learn.</p>
        <p>Excel is a useful comparison. Some people just get it. Some people become great at it because their work gives them a reason to. We don’t expect everyone to become the person who builds the complicated financial model. With AI, we’re still figuring out which capabilities belong in that category and which are closer to being able to open a spreadsheet.</p>
        <p>I want us to be much less confident about who gets to be technical, and much more specific about what we’re asking people to learn. I’d rather give someone time to try building something useful, see where they get stuck, and spend the next training dollar helping them through that.</p>
      </section>
      <aside className={styles.sources} aria-labelledby="reading-title">
        <h2 id="reading-title">Further reading</h2>
        <p>These helped me interrogate the argument. They study particular workplaces and tasks; none establishes a universal return on AI training or a “builder” personality type.</p>
        <a href="https://medium.com/airbnb-engineering/how-airbnb-democratizes-data-science-with-data-university-3eccc71e073a">Airbnb’s Data University (2017)</a><p>A counterexample to the idea that companies never taught technical skills across roles, and an example of giving the training shared tools and data to work with.</p>
        <a href="https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/">HBS / BCG: The jagged technological frontier (2023)</a><p>The consultant experiment shows why the task matters when judging AI results. Early success on one kind of work doesn’t establish capability across the rest of a role.</p>
        <a href="https://digitaleconomy.stanford.edu/publication/generative-ai-at-work/">Brynjolfsson, Li & Raymond: Generative AI at Work</a><p>The customer-support study finds larger gains among less experienced workers, which complicates the assumption that your existing stars will get the most out of AI.</p>
      </aside>
    </article>
    <footer className={styles.footer}><Link href="/">Winter Advisory</Link><Link href="/contact">Talk to Andrew</Link><a href="#">Back to top</a></footer>
  </main>;
}
