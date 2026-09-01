export interface Link {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Profile {
  role: string;
  intro: string;
  photoPath: string;
  resumePath: string;
  email: string;
  githubUrl: string;
  metadata: Array<{ label: string; value: string }>;
}

export interface ResearchItem {
  id: string;
  title: string;
  organization: string;
  time: string;
  summary: string;
  question: string;
  contribution: string;
  methods: string[];
  trace?: string[];
}

export interface FeaturedExperience {
  title: string;
  organization: string;
  time: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  link: Link;
}

export interface ExperienceItem {
  title: string;
  organization: string;
  time: string;
  summary: string;
}

export interface PublicProject {
  name: string;
  description: string;
  language: string;
  url: string;
  homepage?: string;
  packageUrl?: string;
}

export interface OtherWorkItem {
  id: string;
  title: string;
  description: string;
  link: Link;
}

export interface TechnologyGroup {
  label: string;
  items: string[];
}

interface Site {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedin: string;
  githubUrl: string;
  resumePath: string;
  navigation: NavigationItem[];
  profile: Profile;
  research: {
    primary: ResearchItem;
    secondary: ResearchItem;
  };
  featuredExperience: FeaturedExperience;
  supportingExperience: ExperienceItem[];
  publicCode: PublicProject[];
  otherWork: OtherWorkItem[];
  technology: TechnologyGroup[];
  contactText: string;
}

export const site: Site = {
  name: "Hongchen (Steven) Yang",
  role: "Computer science student working across database systems and applied AI.",
  location: "Waltham, MA",
  email: "stevenyang0316@gmail.com",
  linkedin: "https://www.linkedin.com/in/hongchen-yang-3803b4294/",
  githubUrl: "https://github.com/steventimes",
  resumePath: "/resume.pdf",

  navigation: [
    { label: "Research", href: "#research" },
    { label: "Experience", href: "#experience" },
    { label: "Code", href: "#code" },
    { label: "Contact", href: "#contact" }
  ],

  profile: {
    role: "Computer science student working across database systems and applied AI.",
    intro: "I study adaptive storage systems and build agent workflows for real operational tasks.",
    photoPath: "/headphoto.jpg",
    resumePath: "/resume.pdf",
    email: "stevenyang0316@gmail.com",
    githubUrl: "https://github.com/steventimes",
    metadata: [
      { label: "Institution", value: "Brandeis University" },
      { label: "Degree", value: "B.S. Computer Science" },
      { label: "Graduation", value: "Expected December 2026" },
      { label: "Academic", value: "3.748 GPA · Dean's List every completed semester" }
    ]
  },

  research: {
    primary: {
      id: "fluidlsm",
      title: "FluidLSM and workload-aware RocksDB tuning",
      organization: "Smart & Scalable Data Systems Lab · Brandeis University",
      time: "May 2025 – Present",
      summary: "I study how storage systems respond when workloads shift instead of staying fixed.",
      question: "How do skew, burstiness, and changing access patterns affect compaction behavior and performance in LSM-tree systems?",
      contribution: "I build controlled RocksDB benchmarks, narrow the configuration search space by grouping dependent knobs, and evaluate adaptive tuning methods that inform FluidLSM.",
      methods: [
        "RocksDB",
        "LSM trees",
        "Bayesian optimization",
        "tree-based surrogate models",
        "lightweight online learning"
      ],
      trace: [
        "Workload shifts",
        "Compaction behavior",
        "Adaptive tuning",
        "FluidLSM"
      ]
    },
    secondary: {
      id: "fragmented-data",
      title: "Data fragmentation and text-to-SQL evaluation",
      organization: "Data Science Intern, Independent Study · Brandeis University",
      time: "Jan 2026 – Present",
      summary: "A controlled benchmark for studying how fragmented administrative data changes text-to-SQL performance.",
      question: "How can fragmentation be generated and measured consistently enough for reproducible text-to-SQL comparisons?",
      contribution: "I develop synthetic schemas, fragmentation generators, Python ETL, provenance tracking, and evaluation pipelines for join and query quality.",
      methods: ["Python", "SQL", "synthetic data", "provenance", "text-to-SQL"]
    }
  },

  featuredExperience: {
    title: "AI Development Intern",
    organization: "Hefei City Cloud Data Center Co., Ltd.",
    time: "Jun 2026 – Aug 2026",
    summary: "I worked on an AI-assisted reimbursement workflow and the agent infrastructure behind it.",
    contributions: [
      "Built an email-to-reimbursement workflow that ingests messages and attachments, extracts merchant, amount, and date fields, and sends structured results to the reimbursement system.",
      "Developed memory assignment and vector retrieval nodes for persistent agent context, filtered search, and memory lifecycle management.",
      "Extended Java services and Vue interfaces for memory resources and workflow nodes, including migration and database, vector-store, and model-service integrations."
    ],
    technologies: ["Java", "Spring Boot", "Vue", "Qdrant", "agent memory", "workflow orchestration"],
    link: {
      label: "View reimbursement workflow code",
      href: "https://github.com/steventimes/Email-project-yudao"
    }
  },

  supportingExperience: [
    {
      title: "Teaching Assistant, Introduction to Database",
      organization: "Brandeis University",
      time: "Jan 2026 – Present",
      summary: "Lead office hours and review sessions for about 50 students studying SQL, data modeling, normalization, indexing, and query optimization."
    },
    {
      title: "Software Engineering Intern",
      organization: "Shanghai Development Center of Computer Software Technology",
      time: "May 2024 – Aug 2024",
      summary: "Traced a text-to-SQL workflow, worked with a Spring Boot and MyBatis backend, and used Linux tooling to run services, inspect logs, and refactor Java service logic."
    }
  ],

  publicCode: [
    {
      name: "fpstreams",
      description: "Typed, lazy data pipelines for Python, with synchronous streams, structured async concurrency, record-oriented transforms, and optional Rust execution.",
      language: "Python · Rust",
      url: "https://github.com/steventimes/fpstreams",
      homepage: "https://steventimes.github.io/fpstreams/",
      packageUrl: "https://pypi.org/project/fpstreams/"
    },
    {
      name: "dependency-checker",
      description: "A coding-agent skill and MCP interface for indexing static, multi-ecosystem dependency evidence across declarations, resolutions, usage, security, and policy.",
      language: "Python",
      url: "https://github.com/steventimes/dependency-checker"
    }
  ],

  otherWork: [
    {
      id: "blacklight",
      title: "Blacklight privacy detection",
      description: "Contributed research, feature development, and validation for TikTok and X tracking-pixel detection in a privacy scanner that has handled more than 18 million scans.",
      link: {
        label: "Read the Blacklight update",
        href: "https://themarkup.org/blacklight/2026/02/09/blacklight-update-tiktok-x-twitter"
      }
    },
    {
      id: "software-systems-atlas",
      title: "Software Systems Atlas",
      description: "A deployed bilingual learning site that organizes software-systems topics into a structured curriculum.",
      link: {
        label: "Open Software Systems Atlas",
        href: "https://software-systems-atlas.pages.dev"
      }
    }
  ],

  technology: [
    { label: "Programming", items: ["Java", "C++", "Python", "Go", "Rust", "JavaScript", "TypeScript", "SQL"] },
    { label: "Systems & Data", items: ["RocksDB", "PostgreSQL", "MySQL", "DuckDB", "Redis", "Qdrant"] },
    { label: "Backend & Web", items: ["Spring Boot", "MyBatis", "Vue", "Astro", "HTML", "CSS"] },
    { label: "Tooling", items: ["Docker", "Linux", "Git", "GitHub Actions"] },
    { label: "Languages", items: ["Mandarin Chinese (Native)", "English (Fluent)"] }
  ],

  contactText: "For database research, AI systems, software engineering, or collaboration, email me."
};
