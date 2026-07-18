/* ============================================================================
   PROFILE — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   Every factual detail on the site lives here. Update ONLY this file and the
   entire experience re-renders correctly.
   ============================================================================ */

export const profile = {
  // --- Identity -------------------------------------------------------------
  firstName: "Trisha",
  lastName: "Capapas",
  fullName: "Trisha S. Capapas",
  credential: "RMP", // Registered Marketing Professional
  credentialFull: "Registered Marketing Professional",
  title: "Area Manager · Field Operations & Marketing",
  location: "Metro Manila, Philippines",
  email: "trishasoliscapapas@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/trisha-capapas-113a48293" },
    { label: "Email", href: "mailto:trishasoliscapapas@gmail.com" },
    { label: "Phone", href: "tel:+639760032536" },
  ],

  // --- The one-line brand statement ----------------------------------------
  statement:
    "She turns field operations into momentum — leading teams, building the tools they run on, and keeping the promise between strategy and execution.",

  // --- Hero words (animated) ------------------------------------------------
  heroLine: ["Strategy", "with", "a", "signature."],
  heroSub:
    "A Registered Marketing Professional leading 116 people across 59 stores in Greater Manila — building the tools her team runs on and turning field data into decisions that stick.",

  // --- Imagery ----------------------------------------------------------
  // Portrait + field/proof photography, wired into Hero, Journey, Work, Human.
  media: {
    portrait: "/images/profile/portrait.jpg",
    graduation: "/images/profile/graduation.png",
    credentials: [
      {
        label: "RMP Certification",
        issuer: "Chartered Association of Marketing and Business Professionals",
        src: "/images/credentials/rmp-certification.jpg",
      },
      {
        label: "Advanced Google Analytics",
        issuer: "Google Analytics Academy",
        src: "/images/credentials/google-analytics.jpg",
      },
      {
        label: "Unilever Training Curriculum 1",
        issuer: "Unilever Philippines · PRID3 University",
        src: "/images/credentials/unilever-training.jpg",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 1 — THE MIND BEHIND THE STRATEGY (philosophy, not résumé)
  // ==========================================================================
  philosophy: {
    kicker: "Chapter 01 — The Mind Behind the Strategy",
    title: "Marketing is a system of decisions, not a stack of campaigns.",
    body: [
      "She doesn't start with a slogan. She starts with a question: what does the business actually need to move?",
      "Every operation she runs gets the same discipline — understand the customer, map the process behind the promise, and let the data settle the argument. Execution is the reward for getting the thinking right.",
    ],
    // Three operating beliefs
    tenets: [
      {
        no: "01",
        head: "Clarity before creativity",
        text: "A sharp idea on a blurry problem still misses. Define the problem until the solution is obvious.",
      },
      {
        no: "02",
        head: "The operation is the message",
        text: "How a company delivers is what customers actually believe. Fix the process and the brand follows.",
      },
      {
        no: "03",
        head: "Decide with evidence",
        text: "Intuition sets the hypothesis; data settles it. Every initiative earns its place with a number.",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 2 — FROM CURIOSITY TO LEADERSHIP (the journey)
  // ==========================================================================
  journey: {
    kicker: "Chapter 02 — From Curiosity to Leadership",
    title: "A line drawn from a curious student to a leader who ships.",
    intro:
      "Not a list of jobs — a trajectory. Four roles at one company, each widening the aperture: from learning the craft, to owning outcomes, to leading the people who deliver them.",
    // ordered chapters of her career
    stages: [
      {
        year: "2020–2024",
        role: "The Student",
        org: "BS Business Administration, Marketing Management — Polytechnic University of the Philippines",
        honor: "Magna Cum Laude",
        narrative:
          "Graduated Magna Cum Laude and President's Lister all four years — not for memorizing frameworks, but for asking why they work. Curiosity became a method.",
        image: "/images/profile/graduation.png",
      },
      {
        year: "2024",
        role: "Intern",
        org: "ActivAsia Inc.",
        narrative:
          "First contact with the real machine — supporting operations and merchandising teams, and learning that a campaign is only as good as the operation standing behind it.",
      },
      {
        year: "2024",
        role: "Activation Merchandising Coordinator",
        org: "ActivAsia Inc.",
        narrative:
          "Took ownership of the moving parts — coordinating activations against brand guidelines, monitoring field execution, and consolidating results into reports leadership could act on.",
      },
      {
        year: "2025",
        role: "Innovation Associate",
        org: "ActivAsia Inc.",
        narrative:
          "Chartered to question the status quo. Designed and implemented an internal tool now used by 1,000+ employees, proving that innovation is a discipline, not a mood.",
        image: "/images/journey/innovation-associate.jpg",
      },
      {
        year: "2026",
        role: "Area Manager",
        org: "ActivAsia Inc.",
        narrative:
          "Full ownership of people and performance across 59 Puregold stores in Greater Manila — leading 3 Field Supervisors and 113 Merchandisers. Leadership stopped being a title and became a daily practice.",
        image: "/images/journey/area-manager.jpg",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 3 — MARKETING BEYOND CAMPAIGNS
  // ==========================================================================
  beyond: {
    kicker: "Chapter 03 — Marketing Beyond Campaigns",
    title: "Marketing that reaches past the ad and into the business.",
    lead:
      "Ask most people what marketing is and they'll say advertising. She sees the whole system — and the leverage hidden inside it.",
    domains: [
      {
        head: "Operations",
        text: "Runs daily activation, merchandising, and promotional operations across 59 stores in Greater Manila — so the plan on paper matches what happens on the ground.",
      },
      {
        head: "Process Design",
        text: "Designed and rolled out an internal reporting and attendance tool now used by 1,000+ employees, cutting manual tracking and improving efficiency.",
      },
      {
        head: "Team Leadership",
        text: "Leads and coaches 3 Field Supervisors and 113 Merchandisers, resolving operational issues before they become bigger ones.",
      },
      {
        head: "Data & Analytics",
        text: "Turns field performance, market insight, and competitor activity into decisions the team can act on — using Excel, Power BI, and Google Analytics.",
      },
      {
        head: "Financial Stewardship",
        text: "Manages budgets and liquidation reporting for community programs, ensuring transparency and full compliance with government requirements.",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 4 — THE NUMBERS BEHIND THE STORY (analytics dashboard)
  // ==========================================================================
  dashboard: {
    kicker: "Chapter 04 — The Numbers Behind the Story",
    title: "A capability profile, read like a report — not a progress bar.",
    note: "Self-assessed capability, weighted by years applied in role at ActivAsia Inc.",
    // radial / bar values are relative capability, 0–100
    competencies: [
      { label: "Leadership", value: 92, note: "116-person team across 59 stores" },
      { label: "Operations", value: 90, note: "Daily field ops, Greater Manila Area" },
      { label: "Process Design", value: 88, note: "Internal tool built for 1,000+ users" },
      { label: "Data & Reporting", value: 85, note: "Power BI, Advanced Excel, Google Analytics" },
      { label: "Marketing", value: 82, note: "RMP-certified; brand-aligned activation" },
      { label: "Finance", value: 78, note: "Budget & liquidation reporting" },
      { label: "Communication", value: 87, note: "Cross-functional stakeholder coordination" },
    ],
    // headline metrics (marquee KPIs)
    kpis: [
      { value: "59", suffix: "", label: "stores managed", sub: "Puregold, Greater Manila Area" },
      { value: "116", suffix: "", label: "team members led", sub: "3 Field Supervisors + 113 Merchandisers" },
      { value: "1000", suffix: "+", label: "tool users", sub: "Internal attendance & reporting system" },
      { value: "Magna", suffix: " Cum Laude", label: "academic distinction", sub: "President's Lister, 2020–2024" },
    ],
    // a small time-series to render as a line chart, mapped to real role progression
    trajectory: [
      { period: "Student", index: 20 },
      { period: "Intern", index: 35 },
      { period: "Coordinator", index: 52 },
      { period: "Innovation", index: 74 },
      { period: "Area Mgr", index: 96 },
    ],
  },

  // ==========================================================================
  // CHAPTER 5 — SELECTED WORK (case studies as stories)
  // ==========================================================================
  work: {
    kicker: "Chapter 05 — Selected Work",
    title: "Fewer projects. Deeper stories.",
    projects: [
      {
        index: "01",
        name: "Field Operations at 59 Stores",
        tag: "Operations · Leadership",
        year: "2026",
        problem:
          "59 Puregold stores across Greater Manila needed consistent activation, merchandising, and promotional execution — with results depending on the daily judgment of frontline teams.",
        challenge:
          "Keep execution consistent across dozens of stores and 116 people without slowing down the teams closest to the shelf.",
        thinking:
          "Treated consistency as a coaching problem, not a control problem — the goal was capable Field Supervisors and Merchandisers, not more layers of oversight.",
        strategy:
          "Built a direct coaching rhythm for 3 Field Supervisors, standardized issue-resolution steps, and fed market and competitor insight back into weekly planning.",
        execution:
          "Runs daily supervision across the full store network, resolving operational issues as they surface and adjusting plans with real field data.",
        outcome:
          "Sustains operations across 59 stores and a 116-person team, with field feedback now shaping promotional and merchandising decisions.",
        lessons:
          "Scale doesn't come from adding oversight — it comes from a team that can make the right call without waiting for one.",
        future:
          "Formalize the coaching rhythm into a playbook other regions can adopt.",
        image: "/images/work/field-operations.jpg",
        imageCaption: "On a store visit with the field team, Greater Manila.",
      },
      {
        index: "02",
        name: "An Internal Tool Built for 1,000+ Users",
        tag: "Innovation · Process Design",
        year: "2025",
        problem:
          "Attendance tracking and reporting relied on manual, inconsistent processes that didn't scale with headcount.",
        challenge:
          "Design and roll out a new system without disrupting a team already relying on the old one.",
        thinking:
          "Started with the people who'd actually use it — mapped their workflows before writing a single requirement.",
        strategy:
          "Coordinated cross-functional teams to align the tool with real workflows and business objectives, not just a feature list.",
        execution:
          "Designed and implemented a scalable process, resolving issues through direct analysis and stakeholder coordination.",
        outcome:
          "Adopted by more than 1,000 users, measurably improving attendance tracking and reporting efficiency company-wide.",
        lessons:
          "Adoption is a design problem before it's a technology problem.",
        future:
          "Extend the same tooling discipline to other manual, high-friction processes.",
        image: "/images/work/internal-tool.png",
        imageCaption: "Cascading the Refillers Attendance App to the wider team.",
      },
      {
        index: "03",
        name: "Merchandising Activation & Field Reporting",
        tag: "Marketing · Execution",
        year: "2024",
        problem:
          "Merchandising activations needed to stay true to brand guidelines and campaign objectives across multiple field teams.",
        challenge:
          "Keep campaign fidelity high while consolidating scattered field results into something leadership could actually act on.",
        thinking:
          "Treated reporting as part of execution, not an afterthought — visibility was the lever.",
        strategy:
          "Coordinated activations against brand and campaign objectives, monitored field execution closely, and built consolidated performance assessment reports.",
        execution:
          "Supported operations teams end-to-end, from planning to on-ground compliance and issue resolution.",
        outcome:
          "Consistent, on-brand execution across activations, with reporting that showed leadership field reality — not just plans.",
        lessons:
          "A report is only useful if it reflects what actually happened on the ground.",
        future:
          "Build a standing feedback loop from field data straight back into campaign planning.",
        video: "/images/work/acme-app-demo.mp4",
        imageCaption: "A walkthrough of the ACME activation reporting app.",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 6 — HOW I THINK (frameworks)
  // ==========================================================================
  think: {
    kicker: "Chapter 06 — How I Think",
    title: "The frameworks behind the decisions.",
    frameworks: [
      {
        no: "01",
        name: "Problem before solution",
        steps: ["Define", "Diagnose", "Design", "Decide"],
        text: "Most failed initiatives solved the wrong problem beautifully. She spends the effort up front so the solution is almost inevitable.",
      },
      {
        no: "02",
        name: "The growth equation",
        steps: ["Acquire", "Activate", "Retain", "Expand"],
        text: "Growth isn't a single lever — it's a chain. She finds the weakest link and strengthens it before adding spend.",
      },
      {
        no: "03",
        name: "Lead the system, not the task",
        steps: ["Clarify", "Enable", "Measure", "Trust"],
        text: "Leadership is designing conditions where good work is the natural outcome — then getting out of the way.",
      },
    ],
    principles: [
      "Strong opinions, loosely held — updated the moment the data disagrees.",
      "If it can't be measured, define what would count as success before you start.",
      "The best process is the one the team will actually use.",
      "Respect the customer's intelligence; they can tell when the promise and the operation don't match.",
    ],
  },

  // ==========================================================================
  // CHAPTER 7 — BEYOND WORK (humanize)
  // ==========================================================================
  human: {
    kicker: "Chapter 07 — Beyond Work",
    title: "The person behind the professional.",
    quote:
      "“Discipline is the bridge between goals and accomplishment.”",
    quoteAuthor: "— a line she keeps close",
    facets: [
      { label: "Civic Leadership", value: "SK Treasurer, SK Parang Council (2023–Present); former Youth for Parang President (2022–2023)" },
      { label: "Hometown", value: "Marikina City, Philippines" },
      { label: "Academic Honors", value: "Magna Cum Laude & President's Lister, PUP Manila (2020–2024)" },
      { label: "Data Tools", value: "Power BI, Advanced Microsoft Excel, Google Analytics" },
      { label: "Recognized Training", value: "Certified Unilever's Project Eddgie Trainer (2026)" },
      { label: "Credential", value: "RMP — Registered Marketing Professional, Philippines" },
    ],
    learning: ["Power BI (2025)", "Advanced Excel (2025)", "Unilever Trainer Certification (2026)"],
    lifePhilosophy:
      "Show up for the people counting on you — at work, and in the community.",
  },

  // --- Closing --------------------------------------------------------------
  closing: {
    kicker: "The Next Chapter",
    title: "Ready for the room where decisions get made.",
    body:
      "Open to the next opportunity. If you're building a team that needs execution at scale, process discipline, and leadership that ships — let's talk.",
    cta: "Start a conversation",
  },
} as const;

export type Profile = typeof profile;
