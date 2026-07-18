/* ============================================================================
   PROFILE — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   Every factual detail on the site lives here. When the ATS résumé arrives,
   update ONLY this file and the entire experience re-renders correctly.

   🔶 = placeholder to confirm/replace from the résumé.
   ============================================================================ */

export const profile = {
  // --- Identity -------------------------------------------------------------
  firstName: "Trisha", // 🔶 confirm
  lastName: "Delacruz", // 🔶 replace with real surname
  fullName: "Trisha Delacruz", // 🔶
  credential: "RMP", // Registered Marketing Professional
  credentialFull: "Registered Marketing Professional",
  title: "Marketing Strategist · Operations & Innovation Leader",
  location: "Metro Manila, Philippines", // 🔶 confirm
  email: "hello@trisha.example", // 🔶 replace
  socials: [
    { label: "LinkedIn", href: "#" }, // 🔶
    { label: "Email", href: "mailto:hello@trisha.example" }, // 🔶
  ],

  // --- The one-line brand statement ----------------------------------------
  statement:
    "She turns marketing into momentum — where strategy, operations, and data converge into growth.",

  // --- Hero words (animated) ------------------------------------------------
  heroLine: ["Strategy", "with", "a", "signature."],
  heroSub:
    "A Registered Marketing Professional who reads the numbers, leads the room, and rebuilds the process — so growth is never an accident.",

  // ==========================================================================
  // CHAPTER 1 — THE MIND BEHIND THE STRATEGY (philosophy, not résumé)
  // ==========================================================================
  philosophy: {
    kicker: "Chapter 01 — The Mind Behind the Strategy",
    title: "Marketing is a system of decisions, not a stack of campaigns.",
    body: [
      "She doesn't start with a slogan. She starts with a question: what does the business actually need to move?",
      "Every brand she touches gets the same discipline — understand the customer, map the operation behind the promise, and let the data settle the argument. Creativity is the reward for getting the thinking right.",
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
      "Not a list of jobs — a trajectory. Each step widened the aperture: from learning the craft, to owning outcomes, to leading the people who deliver them.",
    // ordered chapters of her career
    stages: [
      {
        year: "20XX", // 🔶
        role: "The Student",
        org: "Bachelor's in Marketing", // 🔶 institution + degree
        honor: "Magna Cum Laude",
        narrative:
          "Graduated Magna Cum Laude — not for memorizing frameworks, but for asking why they work. Curiosity became a method.",
      },
      {
        year: "20XX", // 🔶
        role: "Marketing Intern",
        org: "🔶 Company",
        narrative:
          "First contact with the real machine. Learned that a campaign is only as good as the operation standing behind it.",
      },
      {
        year: "20XX", // 🔶
        role: "Marketing Coordinator",
        org: "🔶 Company",
        narrative:
          "Took ownership of the moving parts — calendars, channels, cross-team hand-offs. Turned scattered activity into a system that could be measured.",
      },
      {
        year: "20XX", // 🔶
        role: "Innovation Associate",
        org: "🔶 Company",
        narrative:
          "Chartered to question the status quo. Redesigned processes and piloted new ideas, proving that innovation is a discipline, not a mood.",
      },
      {
        year: "20XX", // 🔶
        role: "Area Manager",
        org: "🔶 Company",
        narrative:
          "Full ownership of people, performance, and P&L across a region. Leadership stopped being a title and became a daily practice.",
      },
      {
        year: "20XX", // 🔶
        role: "Registered Marketing Professional",
        org: "PRC / RMP Credential", // 🔶 confirm issuing body
        honor: "RMP",
        narrative:
          "Earned the RMP credential — a formal mark that the instinct had become expertise, tested and recognized.",
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
        text: "Streamlined workflows so the promise made in marketing is the promise kept in delivery.",
      },
      {
        head: "Processes",
        text: "Rebuilt repeatable systems that cut friction and made good outcomes the default, not the exception.",
      },
      {
        head: "Customer Experience",
        text: "Designed every touchpoint as a decision — from first impression to the moment loyalty is earned.",
      },
      {
        head: "Team Performance",
        text: "Turned individual effort into collective momentum through clear goals and honest feedback.",
      },
      {
        head: "Decision Making",
        text: "Replaced opinion-led debate with evidence-led choices the whole team could stand behind.",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 4 — THE NUMBERS BEHIND THE STORY (analytics dashboard)
  // ==========================================================================
  dashboard: {
    kicker: "Chapter 04 — The Numbers Behind the Story",
    title: "A capability profile, read like a report — not a progress bar.",
    note: "Self-assessed capability, weighted by years applied in role. 🔶 tune to résumé.",
    // radial / bar values are relative capability, 0–100
    competencies: [
      { label: "Leadership", value: 92, note: "Region-level team & P&L ownership" },
      { label: "Operations", value: 88, note: "Process & workflow redesign" },
      { label: "Innovation", value: 90, note: "Pilots, R&D, new-model design" },
      { label: "Analytics", value: 85, note: "Reporting, dashboards, decisions" },
      { label: "Marketing", value: 94, note: "Strategy, brand, go-to-market" },
      { label: "Communication", value: 89, note: "Stakeholders, teams, clients" },
      { label: "Project Mgmt", value: 87, note: "Delivery across cross-functional teams" },
    ],
    // headline metrics (marquee KPIs) 🔶 replace with real, verifiable numbers
    kpis: [
      { value: "5", suffix: "", label: "roles, one trajectory", sub: "Intern → Area Manager" },
      { value: "Magna", suffix: "", label: "Cum Laude", sub: "Academic distinction" },
      { value: "RMP", suffix: "", label: "credential", sub: "Registered Marketing Professional" },
      { value: "100", suffix: "%", label: "systems mindset", sub: "Strategy meets operations" },
    ],
    // a small time-series to render as a line chart 🔶 illustrative
    trajectory: [
      { period: "Student", index: 20 },
      { period: "Intern", index: 34 },
      { period: "Coordinator", index: 52 },
      { period: "Innovation", index: 70 },
      { period: "Area Mgr", index: 88 },
      { period: "RMP", index: 100 },
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
        name: "🔶 Regional Turnaround", // 🔶 real project
        tag: "Operations · Leadership",
        year: "20XX",
        problem:
          "A region underperforming against target, with teams working hard but pulling in different directions.",
        challenge:
          "Fix results without burning out people — and make the fix stick after the spotlight moved on.",
        thinking:
          "Treated it as a systems problem, not a motivation problem. Mapped where effort leaked before it reached the customer.",
        strategy:
          "Aligned every team on a single scoreboard, redesigned the weekly operating rhythm, and removed three redundant steps.",
        execution:
          "Rolled out in stages with clear owners, weekly evidence reviews, and fast course-correction.",
        outcome:
          "🔶 Quantified result — e.g. performance recovered to/above target within X months, retention up.",
        lessons:
          "People don't resist change; they resist confusion. Clarity was the real intervention.",
        future:
          "Codify the operating rhythm into a playbook other regions can adopt without a rebuild.",
      },
      {
        index: "02",
        name: "🔶 Process Innovation Pilot",
        tag: "Innovation · Analytics",
        year: "20XX",
        problem:
          "A core process everyone accepted as 'just how it works' — slow, manual, and quietly expensive.",
        challenge:
          "Prove a better way with limited budget and skeptical stakeholders who'd seen pilots fizzle before.",
        thinking:
          "Started from the data, not the opinion. Measured the true cost of the status quo to make the case undeniable.",
        strategy:
          "Designed a lean pilot with a clear hypothesis, a control, and a single metric that mattered.",
        execution:
          "Ran the pilot tight and transparent, sharing results in the open so momentum built on its own.",
        outcome:
          "🔶 Quantified result — e.g. cycle time cut by X%, adopted org-wide.",
        lessons:
          "The hardest part of innovation isn't the idea — it's the evidence that earns permission to scale.",
        future:
          "Extend the framework into adjacent processes and instrument it for continuous improvement.",
      },
      {
        index: "03",
        name: "🔶 Go-To-Market Reframe",
        tag: "Marketing · Strategy",
        year: "20XX",
        problem:
          "A strong offer that wasn't landing — the message described the product, not the customer's problem.",
        challenge:
          "Reposition without alienating the existing audience, and do it on a marketing calendar already in motion.",
        thinking:
          "Went back to the customer's own words. Rebuilt the narrative around the outcome they were buying.",
        strategy:
          "Sharpened positioning, rebuilt the funnel around intent, and aligned sales and marketing on one story.",
        execution:
          "Sequenced the relaunch across channels with tight measurement at each stage.",
        outcome:
          "🔶 Quantified result — e.g. conversion up X%, CAC down, pipeline quality improved.",
        lessons:
          "Positioning isn't what you say about yourself — it's the problem customers hire you to solve.",
        future:
          "Build an always-on testing loop so the message keeps sharpening as the market shifts.",
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
      "“Discipline is the bridge between goals and accomplishment.”", // 🔶 swap for her real favorite quote
    quoteAuthor: "— a line she keeps close", // 🔶
    facets: [
      { label: "Reading", value: "Business, behavioral science & the occasional novel" }, // 🔶
      { label: "Coffee", value: "Third-wave, black, and preferably before the first meeting" }, // 🔶
      { label: "Travel", value: "Collects cities the way others collect books" }, // 🔶
      { label: "Music", value: "Focus playlists by day, live sets by night" }, // 🔶
      { label: "Photography", value: "Frames the ordinary until it looks intentional" }, // 🔶
      { label: "Volunteering", value: "Mentoring students finding their own trajectory" }, // 🔶
    ],
    learning: ["🔶 Data storytelling", "🔶 Advanced analytics", "🔶 Leadership at scale"],
    lifePhilosophy:
      "Build a career you don't need a vacation from — then take the vacation anyway.",
  },

  // --- Closing --------------------------------------------------------------
  closing: {
    kicker: "The Next Chapter",
    title: "Ready for the room where decisions get made.",
    body:
      "Not looking for a job — building a career. If you're assembling a team that treats marketing as strategy, operations, and growth in one, let's talk.",
    cta: "Start a conversation",
  },
} as const;

export type Profile = typeof profile;
