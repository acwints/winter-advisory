# The upskilling default: research and adversarial review

Working notes, 2026-10-25. Three parallel research/review agents investigated the history, opposing thesis, and economic mechanisms. These findings guide further questions; they are not finished essay copy. Andrew's concrete examples are still needed.

## What the argument now needs to distinguish

- A company investing little does not establish that it calculated a negative return.
- Broad employee learning, broad technical self-service, and training everyone into an engineer are different historical claims.
- Knowing enough Python to improve one recurring task is not becoming an engineer. Compare the same task and quality standard across tools.
- Access to AI, instruction in AI, paid practice, and redesigning a workflow are different interventions.
- Useful output, time savings, business value, and financial savings are different outcomes.
- Current fluency is not learning potential. Surprising performance is not evidence of randomly distributed or stable innate aptitude.

## Strongest opposing thesis

Companies may be buying a service that performs tasks and teaching employees to use it, rather than reversing their philosophy about investing in employee engineering skills. That resembles adopting spreadsheets or search. Broader relevance, lower first-use effort, and just-in-time assistance could justify broader AI exposure without implying a new belief in aggressive workforce education.

The essay needs to answer this alternative seriously. Its best comparison is the cost of enabling a particular employee to improve a particular task, then and now.

## Historical evidence and its limits

### Airbnb Data University, May 2017

[Primary engineering account](https://medium.com/airbnb-engineering/how-airbnb-democratizes-data-science-with-data-university-3eccc71e073a)

Broad foundational data literacy and applied SQL/BI instruction were explicit goals across roles. The company had already built shared data and tools, then identified education as a bottleneck. It reported more than 500 participants in six months and greater weekly platform usage. These self-reports do not establish causal ROI. Advanced Python/R material was primarily for engineers/data scientists, and the 300-level series was described as next; do not claim completed company-wide Python education. This disproves categorical absence, not establishes prevalence.

### EverythingMe / Re:dash, PyData London 2015

[Primary practitioner conference abstract](https://pydata.org/london2015/schedule/presentation/47/)

Company-wide data analysis included people with varying SQL ability, supported by a shared warehouse and reusable queries. Distinguish authoring from modifying or reusing a query. A practitioner account, not an audited training-outcome study.

### AT&T, 2018 proxy / 2016 actuals

[SEC filing](https://www.sec.gov/Archives/edgar/data/732717/000119312518079415/d471421ddef14a.htm)

Large reskilling investment supported a specific operational transition toward software-defined networks. Broad training spending is not all coding instruction and does not show blanket training of every role. Check dates and categories before using dollar amounts in publication.

### Amazon, July 2019

[Original announcement](https://press.aboutamazon.com/2019/7/amazon-pledges-to-upskill-100-000-u-s-employees-for-in-demand-jobs-by-2025)

Announced a $700m commitment for 100,000 US employees by 2025, including a nontechnical-to-software-engineering pipeline among multiple programs. A pledge is not completed spending or demonstrated ROI. Changing occupations differs from building technical self-service inside an existing role.

### SQL demand, November 2019

[Indeed's original analysis](https://hiringlab.indeed.com/2019/11/19/todays-top-tech-skills/)

SQL appeared in 22% of the US tech-job postings examined for the year ending September 2019, Python in 18%. Tech job titles only; mentions do not distinguish required and preferred, and demand is not evidence of employer-funded learning. “SQL was always nice to have” needs a specific adjacent business role and context.

### Learning did not broadly default to off

[Pew, March 2016](https://www.pewresearch.org/internet/2016/03/22/almost-two-thirds-of-employed-adults-pursue-job-related-learning/)

63% of employed US adults reported at least one of the job-related learning activities asked about. This is a broad self-report, not a rate of coding training or employer expenditure. Avoid turning a selective technical-learning observation into a claim that employers or workers generally did not upskill.

## Possible explanations, not an identified historical cause

1. **A skill needed a runway.** Useful data, permissions, documented definitions, an execution environment, feedback, and an owner for maintenance can determine whether instruction pays. Airbnb provides a concrete account of building complements.
2. **Frequency mattered.** Learning and remembering syntax might pay for a weekly task but not a task performed twice a year. AI may lower relearning costs through help at the moment of use. [Blackwell & Green, attention investment, 1999](https://www.cl.cam.ac.uk/~afb21/publications/PPIG99.html) is a theoretical lens, not a measured account of 2010s employer choices.
3. **Specialization had benefits and costs.** A specialist may solve requests efficiently, while queues and lost business context can make self-service valuable. Neither model is uniformly better.
4. **Workload and hiring alternatives mattered.** [OECD Employment Outlook 2019, ch.6](https://www.oecd.org/en/publications/2019/04/oecd-employment-outlook-2019_0d35ae00/full-report/component-11.html) discusses time, cost, and recruitment alternatives using 2010s survey evidence. This does not isolate Python or SQL. [OECD enterprise training review, 2021](https://www.oecd.org/en/publications/training-in-enterprises_7d63d210-en/full-report/component-6.html) is also relevant. Do not make poaching the main explanation: theory permits it, but it was not a leading explanation in the case-study evidence the adversarial researcher examined.
5. **The return had multiple owners.** A skill can benefit a worker, another team, or a future employer without paying back to the manager financing the learning. [Acemoglu & Pischke, 1998 working paper / 1999 publication](https://www.nber.org/papers/w6357) explains incentives theoretically, not why particular 2010s firms behaved as they did.
6. **AI has a wider low-friction task surface.** It can help within existing writing, email, and meeting tools. [Dillon et al., multi-firm experiment](https://arxiv.org/abs/2504.11436) studies access, not the incremental return to a generic course. Distinguish reduced activity time from reorganization or financial savings.
7. **Easy generation can hide hard responsibility.** Requirements, integration, testing, and debugging were already end-user programming problems before AI. [Ko et al., 2011 review](https://faculty.washington.edu/ajko/papers/Ko2011EndUserSoftwareEngineering.pdf). Apparent intern/engineer differences could partly reflect task risk, ease of checking, or delayed feedback rather than aptitude.

## Evidence that must be allowed to push back

[Chen & Bao, Training for Technology, 2026 preprint](https://arxiv.org/abs/2603.04982): 164 law students randomized among no access, optional LLM access, and access plus brief training. Training improved adoption and exam outcomes compared with untrained access. Narrow educational setting, not corporate financial ROI. Still important because it separates instruction from mere access and challenges a blanket anti-training claim.

[Brynjolfsson, Rock & Syverson, Productivity J-Curve](https://www.nber.org/papers/w25148): complementary intangible investment can precede measured returns. Do not conclude early negative returns imply a bad long-term investment; equally, this theory does not justify unlimited unmeasured spending.

## Material issue in the existing calculator

The current calculation is valid for its stated package assumptions, but it combines access, learning, and tool spending. It does **not** identify the return to training alone. Fix the label and make the missing counterfactual prominent; do not quietly attribute all AI savings to a course.

For a training decision, compare the same tools and task with versus without the training. For a rollout decision, compare the entire package with the existing process. Ideally compare quality-adjusted outcomes over an appropriate horizon, including spillovers and failure costs.

## Diagram briefs for the next iteration

### What did the training actually buy?

Four aligned conditions: existing process; AI access only; same access plus training; same access and training plus workflow redesign. Highlight a pair when choosing the question: adoption, training, or redesign. Do not invent outcomes. The diagram should teach the counterfactual before offering any simulated financial example.

### Same task, different runway

Choose one actual recurring task from Andrew's experience. Compare Python/SQL, no-code, and AI on that same outcome: learning; data access; execution; verification; integration; maintenance. Mark which barriers each tool may lower. All relative friction is illustrative unless measured; don't make technical instruction the only gate.

### Are we comparing the people or the tasks?

Cross person with task rather than mapping fixed types of person. Show an engineer and a marketer doing multiple comparable tasks with explicit quality/risk/evaluation criteria. This can challenge the existing hypothetical “AI-native pockets” rather than reinforcing them.

## Interview questions, prioritized

1. Which specific nontechnical role and repeated task are you remembering when SQL/Python was merely nice to have? Was that a hiring preference, optional education, or permission to use it?
2. If the employee magically knew SQL/Python, what would still stop them—access, data quality, execution, time, ownership, or authority to change the workflow?
3. Did someone evaluate and decline the investment, or did nobody own the decision? Those imply different stories.
4. What makes the social intern “crushing it”—output, speed, engagement, revenue, judgment, or something else? Is that comparable with how the engineer or lifecycle team is evaluated?
5. Is the AI expenditure being questioned a tool seat, a course, protected practice time, consultancy, or redesigning how the company works?
6. What would convince you broad training is mostly rational? What would convince you the old selective approach was rational?
7. Who needs to see the return, over what horizon? Can useful capacity count even when headcount does not change?
8. Are we trying to identify today's strong users, people with the highest learning gains, or teams with the most valuable opportunities? These may be different groups.

## What survives; what is still open

Survives: the perceived default changed; first-use economics and task breadth plausibly changed; old role labels can miss contributors; deeper investment still deserves examination.

Open: prevalence of the historical and current defaults, actual returns to historical training, whether most current programs fail, whether stable person-level AI aptitude exists, and which complements AI truly removes.

Avoid the agreeable but empty endpoint “both extremes are bad.” The essay should explain which constraint changed, what that predicts, and what Andrew has actually seen.
