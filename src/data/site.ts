export interface WorkItem {
  id: string;
  title: string;
  context: string;
  contribution: string;
  methods: string[];
  link?: { label: string; href: string };
}

export interface ExperienceItem {
  title: string;
  org: string;
  time: string;
  bullets: string[];
}

export type TimelineItem = ExperienceItem;

export interface TechnologyGroup {
  label: string;
  items: string[];
}

export interface Profile {
  role: string;
  intro: string;
  photoPath: string;
  resumePath: string;
  email: string;
  metadata: Array<{ label: string; value: string }>;
}

export interface NavigationItem {
  label: string;
  href: string;
}

interface CommandItem extends NavigationItem {
  external?: boolean;
}

export const site = {
  name: "Hongchen (Steven) Yang",
  role: "Database systems researcher and software engineer.",
  tagline: "Database Systems • Systems Research • Software Engineering",
  location: "Waltham, MA",
  email: "stevenyang0316@gmail.com",
  linkedin: "https://www.linkedin.com/in/hongchen-yang-3803b4294/",
  githubUsername: "steventimes",
  githubUrl: "https://github.com/steventimes",
  resumePath: "/resume.pdf",
  photoPath: "/headphoto.jpg",

  navigation: [
    { label: "Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#skills" },
    { label: "Contact", href: "#contact" }
  ] satisfies NavigationItem[],

  profile: {
    role: "Database systems researcher and software engineer.",
    intro: "I am a Brandeis University computer science student researching database systems and building reproducible evaluation workflows.",
    photoPath: "/headphoto.jpg",
    resumePath: "/resume.pdf",
    email: "stevenyang0316@gmail.com",
    metadata: [
      { label: "Institution", value: "Brandeis University" },
      { label: "Degree", value: "B.S. Computer Science · Mathematics minor" },
      { label: "Graduation", value: "December 2026" },
      { label: "Academic", value: "3.748 GPA · Dean's List every semester" }
    ]
  } satisfies Profile,

  selectedWork: [
    {
      id: "fluidlsm",
      title: "FluidLSM and workload-aware RocksDB tuning",
      context: "Shifting workloads, skew, and burstiness affect compaction behavior and performance in LSM-tree systems.",
      contribution: "Group dependent configuration parameters, prune derived knobs, study tuning methods, and build prototype benchmarks that inform FluidLSM.",
      methods: [
        "RocksDB",
        "LSM trees",
        "Bayesian optimization",
        "tree-based surrogate models",
        "lightweight online learning"
      ]
    },
    {
      id: "fragmented-data",
      title: "Fragmented higher-education data and text-to-SQL",
      context: "Fragmented institutional data complicates text-to-SQL evaluation.",
      contribution: "Design controllable synthetic schemas, define fragmentation metrics, and build ETL and evaluation pipelines for provenance and baseline comparisons.",
      methods: ["Python", "SQL", "synthetic data", "provenance tracking", "text-to-SQL evaluation"]
    },
    {
      id: "blacklight",
      title: "Blacklight privacy detection",
      context: "The Markup's Blacklight tool inspects websites for tracking technologies.",
      contribution: "Contribute research, feature development, and validation for TikTok and X tracking-pixel detection; Blacklight has handled more than 18 million scans.",
      methods: ["privacy measurement", "tracker detection", "product research"],
      link: {
        label: "Read the Blacklight update",
        href: "https://themarkup.org/blacklight/2026/02/09/blacklight-update-tiktok-x-twitter"
      }
    }
  ] satisfies WorkItem[],

  technology: [
    { label: "Programming", items: ["Java", "C++", "Python", "Go", "Rust", "JavaScript", "TypeScript", "SQL"] },
    { label: "Systems and Data", items: ["RocksDB", "PostgreSQL", "MySQL", "Redis"] },
    { label: "Backend and Web", items: ["Spring Boot", "MyBatis", "Astro", "HTML", "CSS", "Tailwind CSS"] },
    { label: "Tooling", items: ["Docker", "Linux", "Git", "GitHub Actions"] },
    { label: "Spoken Languages", items: ["Mandarin Chinese (Native)", "English (Fluent)"] }
  ] satisfies TechnologyGroup[],

  repositories: [
    {
      name: "fpstreams",
      description: "A typed functional programming library for Python with lazy streams, Option and Result containers, parallel processing, and optional Rust acceleration.",
      language: "Python",
      stars: 1,
      forks: 0,
      updatedAt: "2026-03-10T13:40:21Z",
      url: "https://github.com/steventimes/fpstreams"
    },
    {
      name: "soccer-analytics",
      description: "A data and machine-learning pipeline for match collection, Postgres and Redis storage, rolling feature engineering, and competition-specific prediction models.",
      language: "Python",
      stars: 0,
      forks: 0,
      updatedAt: "2026-07-10T02:57:23Z",
      url: "https://github.com/steventimes/soccer-analytics"
    },
    {
      name: "high-ed-data-generator",
      description: "A Rust synthetic higher-education data generator with Python and DuckDB tools for fragmentation evaluation.",
      language: "Python",
      stars: 0,
      forks: 0,
      updatedAt: "2026-07-10T02:55:56Z",
      url: "https://github.com/steventimes/high-ed-data-generator"
    },
    {
      name: "Prompt-Testing-Framework",
      description: "A PromptOps workspace for testing, versioning, comparing, and governing LLM prompts across a Spring backend and Vite frontend.",
      language: "JavaScript",
      stars: 0,
      forks: 0,
      updatedAt: "2026-07-10T02:54:58Z",
      url: "https://github.com/steventimes/Prompt-Testing-Framework"
    }
  ],

  commands: [
    { label: "Selected Work", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Technical Stack", href: "#skills" },
    { label: "Public Code", href: "#repos" },
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "/resume.pdf" },
    { label: "Email Steven", href: "mailto:stevenyang0316@gmail.com" },
    { label: "GitHub", href: "https://github.com/steventimes", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hongchen-yang-3803b4294/", external: true }
  ] satisfies CommandItem[],

  contactText: "For research, engineering, or collaboration inquiries, email me.",

  experience: [
    {
      title: "Researcher — Smart & Scalable Data Systems Lab",
      org: "Brandeis University",
      time: "May 2025 – Present",
      bullets: [
        "Study how shifting workloads, skew, and burstiness affect compaction behavior and performance in LSM-tree and NoSQL systems.",
        "Reduce RocksDB configuration search cost by grouping dependent parameters and pruning knobs derived from others.",
        "Investigate workload-aware tuning with Bayesian optimization, tree-based surrogate models, and lightweight online learning.",
        "Build prototype benchmarks that inform FluidLSM, a self-adaptive LSM-based key-value store."
      ]
    },
    {
      title: "Data Science Intern — Independent Study",
      org: "Brandeis University",
      time: "Jan 2026 – Present",
      bullets: [
        "Design a benchmark for fragmented higher-education data and its effects on text-to-SQL systems.",
        "Create controllable synthetic schemas and fragmentation metrics for reproducible baseline comparisons.",
        "Develop Python ETL and evaluation pipelines for provenance tracking, fragmentation analysis, and text-to-SQL experiments."
      ]
    },
    {
      title: "Teaching Assistant — Introduction to Database",
      org: "Brandeis University",
      time: "Jan 2026 – Present",
      bullets: [
        "Lead office hours and review sessions for approximately 50 students covering SQL, ER modeling, normalization, indexing, and query optimization.",
        "Grade assignments and exams and provide feedback on query design, relational modeling, and database fundamentals."
      ]
    },
    {
      title: "Software Engineering Intern",
      org: "Shanghai Development Center of Computer Software Technology",
      time: "May 2024 – Aug 2024",
      bullets: [
        "Traced Supersonic AI's text-to-SQL workflow across translation, parsing, planning, and execution stages.",
        "Worked with the RuoYi backend architecture and its Maven-based Spring Boot, MyBatis, and Redis integration.",
        "Used Linux development workflows to run services, inspect logs, debug backend tasks, and refactor Java service logic."
      ]
    }
  ] satisfies ExperienceItem[]
};
