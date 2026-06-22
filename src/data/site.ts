export interface TimelineItem {
  title: string;
  org: string;
  time: string;
  bullets: string[];
}

export const site = {
  name: "Hongchen (Steven) Yang",
  tagline: "Database Systems • Systems Research • Software Engineering",
  location: "Waltham, MA",
  email: "stevenyang0316@gmail.com",
  linkedin: "https://www.linkedin.com/in/hongchen-yang-3803b4294/",
  githubUsername: "steventimes",
  resumePath: "/resume.pdf",
  photoPath: "/headphoto.jpg",

  about: [
    "I'm a B.S. Computer Science student and Mathematics minor at Brandeis University, graduating in December 2026.",
    "At the Smart & Scalable Data Systems Lab, I study workload-aware RocksDB tuning and prototype benchmarking workflows for FluidLSM, a self-adaptive LSM-based key-value store.",
    "My work also spans higher-education data fragmentation, text-to-SQL evaluation, database teaching, backend engineering, and public-interest privacy tooling."
  ],

  highlights: [
    { label: "Academic", value: "3.748 GPA • Dean's List every semester" },
    { label: "Education", value: "B.S. Computer Science • Mathematics minor" },
    { label: "Focus", value: "Database systems, systems research, software engineering" }
  ],

  skills: {
    Languages: ["Java", "C++", "Python", "Go", "Rust", "JavaScript", "TypeScript", "SQL"],
    "Frameworks & Systems": ["Spring Boot", "MyBatis", "RocksDB", "PostgreSQL", "MySQL", "Redis", "Docker", "Linux", "Git"],
    "Spoken Languages": ["Mandarin Chinese (Native)", "English (Fluent)"]
  },

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
  ] satisfies TimelineItem[],

  projects: [
    {
      name: "Blacklight Privacy Detection Tool",
      desc: "Contributed research, feature development, and validation for TikTok and X tracking-pixel detection in The Markup's public-interest privacy inspection tool, which has handled more than 18 million scans.",
      tech: ["Privacy Measurement", "Tracker Detection", "Product Research"],
      link: "https://themarkup.org/blacklight/2026/02/09/blacklight-update-tiktok-x-twitter"
    }
  ]
};
