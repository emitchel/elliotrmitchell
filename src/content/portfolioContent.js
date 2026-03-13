const androidCareerStartYear = 2012;
const leadershipStartYear = 2020;
const currentYear = new Date().getFullYear();
const yearsBuildingAndroid = currentYear - androidCareerStartYear;
const recentLeadershipYears = currentYear - leadershipStartYear;

export const profileImages = {
  profile1: "/assets/profile_1.jpg",
  profile2: "/assets/profile_2.jpg",
  profile3: "/assets/profile_3.jpg",
  profile4: "/assets/profile_4.jpg",
  profile5: "/assets/profile_5.jpg",
  profile6: "/assets/profile_6.jpg",
  profile7: "/assets/profile_7.jpg",
  profile8: "/assets/profile_8.jpg",
};

export const workItems = [
  {
    name: "Rill Social",
    type: "Freelance",
    message: "A social hangout app with groups, events, and messaging",
    asset: "/assets/portfolio_rill.png",
    link: "https://play.google.com/store/apps/details?id=com.rill",
  },
  {
    name: "Lens Distortions",
    type: "Freelance",
    message: "World class photo editor, 5M+ downloads",
    asset: "/assets/portfolio_lensdistortions.png",
    link: "https://play.google.com/store/apps/dev?id=6722069957231039117",
  },
  {
    name: "Mach Energy",
    type: "Freelance",
    message: "Energy monitoring application for real estate",
    asset: "/assets/portfolio_mach.png",
    link: "https://machenergy.com",
  },
  {
    name: "Lucra Sports",
    type: "Full-time",
    message:
      "Gaming B2B SDK, compliance and wallet management. Powering apps like Backyard Sports, Dave & Busters, and 5iron Golf.",
    asset: "/assets/portfolio_lucra.webp",
    link: "https://lucrasports.com",
  },
  {
    name: "Microsoft Flip",
    type: "Full-time",
    message:
      "5M+ downloads, powered the central camera SDK used in Teams, GroupMe, and Skype",
    asset: "/assets/portfolio_flip.png",
    link: "https://play.google.com/store/apps/details?id=com.vidku.app.flipgrid",
  },
  {
    name: "LiveSafe",
    type: "Full-time",
    message: "Campus and workplace safety platform, 500k+ downloads",
    asset: "/assets/portfolio_livesafe.png",
    link: "https://play.google.com/store/apps/details?id=com.livesafe.activities",
  },
  {
    name: "Outdoorsy",
    type: "Full-time",
    message: "RV rental app, 10k+ downloads",
    asset: "/assets/portfolio_outdoorsy.png",
    link: "https://play.google.com/store/apps/details?id=com.outdoorsy.owner",
  },
  {
    name: "Cryptonomy",
    type: "Side project",
    message: "Crypto investment tracker and portfolio app",
    asset: "/assets/portfolio_cryptonomy.png",
    link: "https://producthunt.com/posts/cryptonomy-2-0",
  },
  {
    name: "Varsity Tutors",
    type: "Full-time",
    message: "Online tutoring app, 100k+ downloads",
    asset: "/assets/portfolio_varsitytutors.png",
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

export const contactDetails = {
  email: "elliot.r.mitchell@gmail.com",
  linkedin: "https://linkedin.com/in/elliotrmitchell",
  github: "https://github.com/emitchel",
  stackOverflow: "https://stackoverflow.com/users/2435402/elliotm",
};
