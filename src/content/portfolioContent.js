const androidCareerStartYear = 2012;
const leadershipStartYear = 2020;
const currentYear = new Date().getFullYear();
const yearsBuildingAndroid = currentYear - androidCareerStartYear;
const recentLeadershipYears = currentYear - leadershipStartYear;

export const profileImages = {
  profile1: { src: "/assets/profile_1.jpg", width: 6000, height: 3376 },
  profile2: { src: "/assets/profile_2.jpg", width: 6000, height: 3376 },
  profile3: { src: "/assets/profile_3.jpg", width: 1152, height: 2048 },
  profile4: { src: "/assets/profile_4.jpg", width: 6000, height: 3376 },
  profile5: { src: "/assets/profile_5.jpg", width: 1152, height: 2048 },
  profile6: { src: "/assets/profile_6.jpg", width: 4032, height: 3024 },
  profile7: { src: "/assets/profile_7.jpg", width: 4032, height: 2268 },
  profile8: { src: "/assets/profile_8.jpg", width: 4032, height: 2268 },
};

export const workItems = [
  {
    name: "Rill Social",
    type: "Freelance",
    message: "A social hangout app with groups, events, and messaging",
    asset: "/assets/portfolio_rill.png",
    assetWidth: 1008,
    assetHeight: 2244,
    link: "https://play.google.com/store/apps/details?id=com.rill",
  },
  {
    name: "Lens Distortions",
    type: "Freelance",
    message: "World class photo editor, 5M+ downloads",
    asset: "/assets/portfolio_lensdistortions.png",
    assetWidth: 826,
    assetHeight: 1472,
    link: "https://play.google.com/store/apps/dev?id=6722069957231039117",
  },
  {
    name: "Mach Energy",
    type: "Freelance",
    message: "Energy monitoring application for real estate",
    asset: "/assets/portfolio_mach.png",
    assetWidth: 1080,
    assetHeight: 1920,
    link: "https://machenergy.com",
  },
  {
    name: "Lucra Sports",
    type: "Full-time",
    message:
      "Gaming B2B SDK, compliance and wallet management. Powering apps like Backyard Sports, Dave & Busters, and 5iron Golf.",
    asset: "/assets/portfolio_lucra.webp",
    assetWidth: 461,
    assetHeight: 937,
    link: "https://lucrasports.com",
  },
  {
    name: "Microsoft Flip",
    type: "Full-time",
    message:
      "5M+ downloads, powered the central camera SDK used in Teams, GroupMe, and Skype",
    asset: "/assets/portfolio_flip.png",
    assetWidth: 488,
    assetHeight: 1086,
    link: "https://play.google.com/store/apps/details?id=com.vidku.app.flipgrid",
  },
  {
    name: "LiveSafe",
    type: "Full-time",
    message: "Campus and workplace safety platform, 500k+ downloads",
    asset: "/assets/portfolio_livesafe.png",
    assetWidth: 498,
    assetHeight: 886,
    link: "https://play.google.com/store/apps/details?id=com.livesafe.activities",
  },
  {
    name: "Outdoorsy",
    type: "Full-time",
    message: "RV rental app, 10k+ downloads",
    asset: "/assets/portfolio_outdoorsy.png",
    assetWidth: 301,
    assetHeight: 553,
    link: "https://play.google.com/store/apps/details?id=com.outdoorsy.owner",
  },
  {
    name: "Cryptonomy",
    type: "Side project",
    message: "Crypto investment tracker and portfolio app",
    asset: "/assets/portfolio_cryptonomy.png",
    assetWidth: 430,
    assetHeight: 926,
    link: "https://producthunt.com/posts/cryptonomy-2-0",
  },
  {
    name: "Varsity Tutors",
    type: "Full-time",
    message: "Online tutoring app, 100k+ downloads",
    asset: "/assets/portfolio_varsitytutors.png",
    assetWidth: 506,
    assetHeight: 1134,
    link: "https://play.google.com/store/apps/details?id=com.varsitytutors.tutoringtools",
  },
];

export const portfolioMetrics = {
  androidCareerStartYear,
  yearsBuildingAndroid,
  projectsShownCount: workItems.length,
  recentLeadershipYears,
};

export const portfolioIdentity = {
  name: "Elliot Mitchell",
  headline: "Director of Mobile / Android Engineer",
  subheadline: `Built Android apps for ${yearsBuildingAndroid} years. Spent the last ${recentLeadershipYears} leading teams, growing engineers, and obsessing over the gap between fast and good - and yes, I still write the code.`,
};

export const openSourceLinks = [
  "https://github.com/emitchel/Sumbeat",
  "https://github.com/emitchel/Umbrella",
  "https://github.com/emitchel/uDraw",
  "https://github.com/emitchel/compose-games",
  "https://github.com/emitchel/intervention",
];

export const writingArticles = [
  {
    title: "Imagining Your Repository Layer with Coroutines",
    publication: "Pro Android Dev",
    source: "Medium",
    link: "https://proandroiddev.com/imagining-your-repository-layer-with-coroutines-7ee052ee4caa",
  },
];

export const skillTags = [
  "Kotlin",
  "Java",
  "Swift",
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Node.js",
  "Jetpack Compose",
  "XML/View-based UI",
  "Camera SDK",
  "Hilt/Dagger",
  "SDK Architecture & Publishing",
  "Modular Build Systems",
  "Google Play Billing",
  "CI/CD (Bitrise / GitHub Actions / GitLab CI / Jenkins)",
  "Firebase",
  "AWS",
  "Cloudflare",
  "New Relic",
  "App Center",
  "JUnit",
  "Robolectric",
  "Bluetooth LE",
];

export const experienceTimeline = [
  {
    dates: "Jul 2024-Present",
    company: "Lucra Sports",
    role: "Director of Mobile",
    note: "Built Android app end-to-end in 6 months; architected SDK for third-party distribution",
  },
  {
    dates: "Jan 2021-Jul 2024",
    company: "Microsoft",
    role: "Sr. Engineering Manager, Android",
    note: "Led Camera SDK integration across Teams, Xbox, Snapchat, GroupMe and Flip",
  },
  {
    dates: "May 2017-Present",
    company: "Freelance",
    role: "Principal Android Engineer",
    note: "Lens Distortions, Mach Energy - multi-million user scale",
  },
  {
    dates: "Apr 2020-Dec 2020",
    company: "LiveSafe",
    role: "Sr. Android Engineer",
    note: "Shipped to 350k+ devices",
  },
  {
    dates: "Jan 2020-Apr 2020",
    company: "Outdoorsy",
    role: "Sr. Android Engineer",
    note: "",
  },
  {
    dates: "Nov 2018-Dec 2019",
    company: "Nerdery",
    role: "Sr. Android Engineer",
    note: "Bluetooth LE glucose monitoring",
  },
  {
    dates: "Jul 2017-Nov 2018",
    company: "Spreetail",
    role: "Android Engineer",
    note: "Offline-first fulfillment tooling",
  },
  {
    dates: "Apr 2016-Jul 2017",
    company: "Varsity Tutors",
    role: "Android Engineer II",
    note: "Live video tutoring",
  },
  {
    dates: "Nov 2012-Apr 2016",
    company: "Sandhills Publishing",
    role: "Lead Android Engineer",
    note: "",
  },
];

export const theme2Content = {
  hero: {
    supportingBlurb:
      "Shipping mobile products means balancing architecture, product pressure, reliability, and team clarity at the same time. The work here spans leadership roles, product builds, and platform-level SDK work used at real scale.",
    summaryStats: [
      {
        value: portfolioMetrics.yearsBuildingAndroid,
        label: "Years building Android",
      },
      {
        value: portfolioMetrics.projectsShownCount,
        label: "Portfolio projects on this page",
      },
      {
        value: portfolioMetrics.recentLeadershipYears,
        label: "Years leading teams and growing engineers",
      },
    ],
    currentFocusLabel: "Current focus",
    currentFocusBlurb:
      "Lucra Sports, Android product delivery, and staying close to architecture decisions that actually survive contact with shipping teams.",
  },
  about: {
    heading: "Leadership, architecture, and delivery in the same room.",
    body: `${portfolioIdentity.name} is a Director of Mobile and Android engineer who has spent the last ${portfolioMetrics.yearsBuildingAndroid} years shipping products across social, creator, education, safety, gaming, finance, and enterprise spaces. The through line is the same in each role: write the code, raise the bar, and keep the team moving.`,
    currentRoleLabel: "Now",
    currentRoleBlurb:
      "Director of Mobile at Lucra Sports, building Android end-to-end and architecting SDK distribution for partner apps.",
    previousRoleLabel: "Previously",
    previousRoleBlurb:
      "Led Android work touching Microsoft Flip, Teams, GroupMe, Skype, Xbox, and Snapchat through shared camera SDK efforts.",
    quoteText:
      '"To be happy we need something to solve. Happiness is therefore a form of action."',
    quoteAttribution: "Mark Manson",
  },
  writing: {
    articleBlurb:
      "A concise piece on repository design, coroutine mental models, and structuring async work so the boundaries stay readable.",
  },
  skills: {
    heading: "A mobile engineering stack shaped by shipping, not theory.",
    blurb:
      "Native Android is the center of gravity, but the surrounding work spans SDK design, release systems, CI, cloud services, test infrastructure, and the practical realities of cross-functional delivery.",
  },
  contact: {
    heading: "Contact and profiles.",
    blurb:
      "Use the links below for email, GitHub, LinkedIn, and Stack Overflow.",
  },
};

export const theme4Content = {
  themeName: "Signal Playground",
  metaTitle: "Elliot Mitchell - Signal Playground",
  metaDescription:
    "Dark warm portfolio theme for Elliot Mitchell focused on Android craft, leadership, team building, and end-to-end mobile delivery.",
  profileAlt: "Portrait of Elliot Mitchell",
  navItems: [
    { label: "Intro", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "Stack", href: "#stack" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Android craft, leadership, and full-stack delivery",
    headlineLines: ["Leads teams.", "Ships Android."],
    title: portfolioIdentity.headline,
    statement:
      "I care about motion, spacing, and interaction detail. I also care about the architecture, release systems, and team habits that let great mobile work keep shipping.",
    supportingBlurb: portfolioIdentity.subheadline,
    tickerPhrases: [
      "Android first",
      "Team builder",
      "Pixel care",
      "Design quality",
      "SDK architecture",
      "Release systems",
      "Full-stack delivery",
    ],
    floatingCards: [
      "Pixel care",
      "Ripples matter",
      "Design systems",
      "End-to-end ownership",
    ],
  },
  principles: {
    sectionLabel: "Operating mode",
    heading: "High velocity only works when the system stays readable.",
    items: [
      {
        title: "Lead close to the code",
        body: "Direction lands better when architecture, UI detail, and tradeoffs stay visible.",
      },
      {
        title: "Build teams that ship calmly",
        body: "Clarity, trust, and standards matter more than performative process.",
      },
      {
        title: "Think past the mobile layer",
        body: "The app is one surface in a wider system of APIs, releases, observability, and partner constraints.",
      },
    ],
  },
  work: {
    sectionLabel: "Portfolio wall",
    heading: "A tighter view of shipped apps.",
    blurb:
      "The mobile surface matters, but so do the systems underneath it. This view keeps the work easier to scan without flattening it into a list of logos.",
    openProjectLabel: "View project",
  },
  skills: {
    sectionLabel: "Stack and signal",
    heading: "The stack, grouped by what it moves.",
    blurb:
      "Android stays at the center. The surrounding work reaches build systems, SDK design, cloud services, testing, and release operations.",
    focusAreas: [
      {
        title: "Mobile UI craft",
        body: "Compose, view systems, motion, and the details people feel before they can name them.",
      },
      {
        title: "Platform decisions",
        body: "SDK design, modularization, dependency strategy, and architecture that survives real teams.",
      },
      {
        title: "Leadership systems",
        body: "Hiring, mentoring, clear feedback, and keeping quality intact while speed stays high.",
      },
    ],
    toolGroups: [
      {
        title: "Android and UI",
        items: [
          "Kotlin",
          "Java",
          "Jetpack Compose",
          "XML/View-based UI",
          "Camera SDK",
          "Google Play Billing",
          "Bluetooth LE",
        ],
      },
      {
        title: "Architecture and testing",
        items: [
          "Hilt/Dagger",
          "SDK Architecture & Publishing",
          "Modular Build Systems",
          "JUnit",
          "Robolectric",
        ],
      },
      {
        title: "Release and platform systems",
        items: [
          "CI/CD (Bitrise / GitHub Actions / GitLab CI / Jenkins)",
          "Firebase",
          "AWS",
          "Cloudflare",
          "New Relic",
          "App Center",
        ],
      },
      {
        title: "Cross-platform and web",
        items: [
          "Swift",
          "React",
          "React Native",
          "JavaScript",
          "TypeScript",
          "Node.js",
        ],
      },
    ],
  },
  experience: {
    sectionLabel: "Timeline",
    heading: "Roles across shipping, scaling, and leading mobile teams.",
    blurb:
      "A quick read on the companies, roles, and kinds of mobile problems I have spent time solving.",
  },
  contact: {
    sectionLabel: "Contact and signal",
    heading: "Contact, code, writing, and the usual trail.",
    blurb:
      "Use the links below for direct contact and public work.",
    links: [
      { key: "email", label: "Email" },
      { key: "stackOverflow", label: "Stack Overflow" },
      { key: "github", label: "GitHub" },
      { key: "linkedin", label: "LinkedIn" },
    ],
  },
  notes: {
    sectionLabel: "Further signal",
    writingHeading: "Writing",
    openSourceHeading: "Open source",
    footerNote: "Handmade by me.",
  },
};

export const contactDetails = {
  email: "elliot.r.mitchell@gmail.com",
  linkedin: "https://linkedin.com/in/elliotrmitchell",
  github: "https://github.com/emitchel",
  stackOverflow: "https://stackoverflow.com/users/2435402/elliotm",
};
