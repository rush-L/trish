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
  resumeUrl: "/resume/trisha-capapas-resume.pdf",
  // 🔶 single source for the production domain — swap once deployed (e.g. to
  // Vercel) and canonical URLs, OpenGraph, robots.txt, and sitemap.xml all
  // pick it up automatically.
  siteUrl: "https://trisha.example",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/trisha-capapas-113a48293" },
    { label: "Email", href: "mailto:trishasoliscapapas@gmail.com" },
    { label: "Phone", href: "tel:+639760032536" },
  ],

  // --- The one-line brand statement ----------------------------------------
  statement:
    "She turns field operations into momentum — leading teams, building the tools they run on, and keeping the promise between strategy and execution.",

  // --- Executive summary (HR scan target: understood in 15 seconds) --------
  summary:
    "Trisha Capapas is a Registered Marketing Professional based in Metro Manila, currently leading field operations and marketing execution for ActivAsia Inc. In two years she moved from intern to Area Manager, now directing 116 people across 59 Puregold stores in Greater Manila. Her core strength is pairing operational leadership with a builder's instinct — she designed the internal reporting tool 1,000+ employees now rely on. She combines marketing strategy, process design, and hands-on team leadership to turn field complexity into measurable, repeatable results.",

  // --- Hero words (animated) ------------------------------------------------
  heroLine: ["Strategy", "with", "a", "signature."],
  heroSub:
    "A Registered Marketing Professional leading 116 people across 59 stores in Greater Manila — building the tools her team runs on and turning field data into decisions that stick.",

  // --- Imagery ----------------------------------------------------------
  // Portrait + field/proof photography, wired into Hero, Journey, Work, Human.
  media: {
    portrait: "/images/profile/portrait.jpg",
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
      {
        label: "Unilever Training Curriculum 2",
        issuer: "Unilever Philippines · PRID3 University",
        src: "/images/credentials/unilever-training-2.jpg",
      },
      {
        label: "Power Up With People: Leadership Training",
        issuer: "ActivAsia Inc.",
        src: "/images/credentials/activasia-leadership-training.jpg",
      },
      {
        label: "MS Advanced Excel Certification",
        issuer: "Mapúa University · Innovation and Development Office",
        src: "/images/credentials/advanced-excel-certificate.png",
      },
      {
        label: "Power BI Certification",
        issuer: "Mapúa University · Innovation and Development Office",
        src: "/images/credentials/power-bi-certificate.png",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 2 — FROM CURIOSITY TO LEADERSHIP (the journey)
  // ==========================================================================
  journey: {
    kicker: "From Curiosity to Leadership",
    title: "A line drawn from a curious student to a leader who ships.",
    intro:
      "Not a list of jobs — a trajectory. Four roles at one company, each widening the aperture: from learning the craft, to owning outcomes, to leading the people who deliver them.",
    // most recent role first — HR scans current position before history
    stages: [
      {
        year: "2026–Present",
        role: "Area Manager",
        org: "ActivAsia Inc.",
        bullets: [
          "Led a 116-person team (3 Field Supervisors, 113 Merchandisers) across 59 Puregold stores in Greater Manila",
          "Directed daily field operations, resolving issues in real time using live field and competitor data",
          "Turned leadership into a daily coaching practice, sustaining consistent execution at scale",
        ],
        narrative:
          "Full ownership of people and performance across 59 Puregold stores in Greater Manila — leading 3 Field Supervisors and 113 Merchandisers. Leadership stopped being a title and became a daily practice.",
        image: "/images/journey/area-manager.jpg",
      },
      {
        year: "2025",
        role: "Innovation Associate",
        org: "ActivAsia Inc.",
        bullets: [
          "Designed and shipped an internal attendance & reporting tool now used by 1,000+ employees",
          "Replaced manual tracking with a scalable process, cutting reporting friction company-wide",
          "Proved that innovation could be systemized, not just improvised",
        ],
        narrative:
          "Chartered to question the status quo. Designed and implemented an internal tool now used by 1,000+ employees, proving that innovation is a discipline, not a mood.",
        image: "/images/journey/innovation-associate.jpg",
      },
      {
        year: "2024",
        role: "Activation Merchandising Coordinator",
        org: "ActivAsia Inc.",
        bullets: [
          "Coordinated activations across multiple field teams while enforcing brand and campaign guidelines",
          "Consolidated scattered field reports into a single view leadership could act on",
          "Monitored on-ground execution to keep campaigns audit-ready and on-brand",
        ],
        narrative:
          "Took ownership of the moving parts — coordinating activations against brand guidelines, monitoring field execution, and consolidating results into reports leadership could act on.",
      },
      {
        year: "2024",
        role: "Intern",
        org: "ActivAsia Inc.",
        bullets: [
          "Supported operations and merchandising teams during onboarding to the field",
          "Learned firsthand that a campaign is only as strong as the operation behind it",
        ],
        narrative:
          "First contact with the real machine — supporting operations and merchandising teams, and learning that a campaign is only as good as the operation standing behind it.",
      },
      {
        year: "2020–2024",
        role: "The Student",
        org: "Polytechnic University of the Philippines",
        honor: "Magna Cum Laude",
        bullets: [
          "Earned a BS in Business Administration, Marketing Management",
          "Graduated Magna Cum Laude and President's Lister for all four years",
          "Built a foundation in marketing strategy by questioning why frameworks work, not just applying them",
        ],
        narrative:
          "Graduated Magna Cum Laude and President's Lister all four years — not for memorizing frameworks, but for asking why they work. Curiosity became a method.",
        image: "/images/profile/graduation.png",
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 4 — ACHIEVEMENTS & CREDIBILITY (proof, not prose)
  // ==========================================================================
  achievements: {
    kicker: "Achievements & Credibility",
    title: "The proof behind the promise.",
    // headline metrics (marquee KPIs)
    kpis: [
      { value: "59", suffix: "", label: "stores managed", sub: "Puregold, Greater Manila Area" },
      { value: "116", suffix: "", label: "team members led", sub: "3 Field Supervisors + 113 Merchandisers" },
      { value: "1000", suffix: "+", label: "tool users", sub: "Internal attendance & reporting system" },
      { value: "4", suffix: "", label: "roles in 2 years", sub: "Intern → Area Manager, ActivAsia Inc." },
      { value: "Magna", suffix: " Cum Laude", label: "academic distinction", sub: "President's Lister, 2020–2024" },
    ],
    credentialsKicker: "Proof, not just claims",
  },

  // ==========================================================================
  // CHAPTER — SKILLS (organized, evidence-only)
  // ==========================================================================
  skills: {
    kicker: "Skills",
    title: "What she brings into the room.",
    categories: [
      {
        label: "Leadership",
        proof: "Leads 116 people across 59 stores",
        items: ["Team Leadership", "Coaching", "Stakeholder Management"],
      },
      {
        label: "Operations",
        proof: "Owns execution across 59 Puregold stores",
        items: ["Field Operations", "Store & Territory Management", "Process Design"],
      },
      {
        label: "Project & Process Management",
        proof: "Shipped the tool 1,000+ employees run on",
        items: ["Cross-functional Coordination", "Process Rollout", "Issue Resolution"],
      },
      {
        label: "Financial & Compliance",
        proof: "Trusted with budget, liquidation & compliance",
        items: ["Budget Management", "Liquidation Reporting", "Government Compliance"],
      },
      {
        label: "Data & Analytics",
        proof: "Power BI & Advanced Excel certified",
        items: ["Power BI", "Advanced Excel", "Google Analytics"],
      },
    ],
  },

  // ==========================================================================
  // CHAPTER 5 — SELECTED WORK (case studies as stories)
  // ==========================================================================
  work: {
    kicker: "Selected Work",
    title: "Fewer projects. Deeper stories.",
    projects: [
      {
        index: "01",
        name: "Field Operations Across Puregold & DT Stores",
        tag: "Operations · Leadership",
        year: "2026",
        company: "ActivAsia Inc.",
        role: "Area Manager",
        duration: "2026–Present",
        metrics: ["59 stores", "116-person team"],
        problem:
          "59 Puregold and DT stores across Greater Manila needed consistent activation, merchandising, and promotional execution — with results riding on the daily judgment of 116 frontline people, and no room to slow the teams closest to the shelf.",
        responsibilities: [
          "Built a direct coaching rhythm for 3 Field Supervisors",
          "Standardized issue-resolution steps across the store network",
          "Fed market and competitor insight back into weekly planning",
          "Ran daily supervision, resolving issues as they surfaced",
        ],
        outcome:
          "Sustains operations across 59 stores and a 116-person team, with field feedback now shaping promotional and merchandising decisions.",
        takeaway:
          "Scale doesn't come from adding oversight — it comes from a team that can make the right call without waiting for one. Next: formalize the coaching rhythm into a playbook other regions can adopt.",
        gallery: [
          { src: "/images/work/store-visit-1.jpg", caption: "Global visit of Smollan CEOs and Unilever team." },
          { src: "/images/work/store-visit-2.jpg", caption: "Walking the floor with the field team." },
          { src: "/images/work/store-visit-3.jpg", caption: "Checking shelf execution on the ground." },
          { src: "/images/work/store-visit-4.jpg", caption: "On-site with Merchandisers at a Puregold store." },
          { src: "/images/work/store-visit-5.jpg", caption: "Store visit — reviewing activation compliance." },
          { src: "/images/work/store-visit-6.jpg", caption: "Field visit across the Greater Manila territory." },
          { src: "/images/work/store-visit-7.jpg", caption: "On the floor with the Field Supervisor team." },
          {
            src: "/images/work/store-visit-8.jpg",
            caption: "Store visit — coaching the team on the ground.",
            focus: "center 25%",
          },
          { src: "/images/work/store-visit-9.jpg", caption: "Field operations, store-level execution check." },
          { src: "/images/work/unilever-training-am-1.jpg", caption: "Unilever training curriculum, PRID3 University." },
          {
            src: "/images/work/unilever-training-am-2.jpg",
            caption: "Project Eddgie execution.",
            focus: "center 25%",
          },
        ],
      },
      {
        index: "02",
        name: "An Internal Tool Built for 1,000+ Users",
        tag: "Innovation · Process Design",
        year: "2025",
        company: "ActivAsia Inc.",
        role: "Innovation Associate",
        duration: "2025",
        metrics: ["1,000+ users"],
        problem:
          "Attendance tracking and reporting relied on manual, inconsistent processes that didn't scale with headcount — and any new system had to roll out without disrupting a team already relying on the old one.",
        responsibilities: [
          "Mapped end-user workflows before writing a single requirement",
          "Coordinated cross-functional teams to align the tool with business objectives",
          "Designed and implemented a scalable rollout process",
          "Resolved issues through direct analysis and stakeholder coordination",
        ],
        outcome:
          "Adopted by more than 1,000 users, measurably improving attendance tracking and reporting efficiency company-wide.",
        takeaway:
          "Adoption is a design problem before it's a technology problem. Next: extend the same tooling discipline to other manual, high-friction processes.",
        gallery: [
          {
            src: "/images/work/internal-tool.png",
            caption: "Cascading the Refillers Attendance App to the wider team.",
          },
          {
            src: "/images/work/refillers-attendance-cascade.jpg",
            caption: "Refillers Attendance App cascade — full team call, 55 attendees.",
          },
          {
            src: "/images/work/compliance-update-presentation.jpg",
            caption: "Presenting the Applications Compliance Update in person.",
          },
          {
            src: "/images/work/compliance-update-room.jpg",
            caption: "The room during the Applications Compliance Update briefing.",
          },
          {
            src: "/images/work/activasia-unilever-review-1.jpg",
            caption: "ActivAsia × Unilever business review.",
          },
          {
            src: "/images/work/activasia-unilever-review-2.jpg",
            caption: "Business review, cross-functional alignment session.",
          },
          {
            src: "/images/work/activasia-unilever-review-3.jpg",
            caption: "ActivAsia × Unilever business review, full team.",
          },
          {
            src: "/images/work/activasia-unilever-review-4.jpg",
            caption: "Business review — planning session with stakeholders.",
          },
          {
            src: "/images/work/one-unilever-core-team-1.jpg",
            caption: "One Unilever Core Team.",
          },
          {
            src: "/images/work/one-unilever-core-team-2.jpg",
            caption: "One Unilever Core Team — celebrating a milestone.",
          },
          {
            src: "/images/work/one-unilever-core-team-3.jpg",
            caption: "One Unilever Core Team, on site.",
          },
          {
            src: "/images/work/one-unilever-core-team-4.jpg",
            caption: "One Unilever Core Team — team photo.",
          },
        ],
      },
      {
        index: "03",
        name: "Merchandising Activation & Field Reporting",
        tag: "Marketing · Execution",
        year: "2024",
        company: "ActivAsia Inc.",
        role: "Activation Merchandising Coordinator",
        duration: "2024",
        metrics: [] as string[],
        problem:
          "Merchandising activations needed to stay true to brand guidelines and campaign objectives across multiple field teams — while scattered field results needed consolidating into something leadership could actually act on.",
        responsibilities: [
          "Coordinated activations against brand and campaign objectives",
          "Monitored field execution closely for on-brand compliance",
          "Supported operations teams end-to-end, from planning to on-ground execution",
        ],
        outcome:
          "Consistent, on-brand execution across activations, with reporting that showed leadership field reality — not just plans.",
        takeaway:
          "A report is only useful if it reflects what actually happened on the ground. Next: build a standing feedback loop from field data straight back into campaign planning.",
        video: "/images/work/acme-app-demo.mp4",
        imageCaption: "A walkthrough of the ACME activation reporting app.",
      },
    ],
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
