export const projects = [
  {
    id: "grandmart",
    title: "GrandMart — Multi-Outlet Enterprise ERP",
    description:
      "Enterprise supermarket management platform with multi-outlet inventory synchronization, role-based access control, POS billing, HR payroll, and real-time sales analytics.",
    longDescription:
      "GrandMart is a high-throughput, enterprise-scale retail management platform engineered for multi-outlet retail chains. It automates point-of-sale checkouts, real-time stock deduplication across distributed warehouses, automated replenishment orders, and role-based staff administration.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Hibernate"],
    category: "Enterprise / Backend",
    isPrivate: true,
    privateBadge: "🔒 PRIVATE • ENTERPRISE PRODUCTION",
    github: null,
    link: null,
    images: ["/projects/neokart/1.png"],
    featured: true,
    features: [
      "Distributed inventory synchronization with sub-second SKU consistency across physical branches",
      "Stateless JWT-authenticated role-based access control (RBAC) across Cashiers, Store Managers, and Central Admin",
      "High-concurrency POS checkout processing integrated with automated barcode scan handlers",
      "Comprehensive HR management module supporting employee shifts, payroll generation, and audit logging",
      "Automated financial reconciliation reports with exportable CSV and PDF statements",
    ],
    contribution:
      "Architected the modular Spring Boot backend, designed normalized 3NF PostgreSQL schemas with optimized composite indexes, integrated Redis caching to cut database load by 68%, and containerized services via Docker.",
    metrics: [
      { label: "SKU Consistency", value: "99.99%" },
      { label: "Query Speedup", value: "3.2x faster" },
      { label: "Daily Transactions", value: "10,000+" },
    ],
  },
  {
    id: "aamzone",
    title: "AamZone — Mango E-Commerce Platform",
    description:
      "Specialty farm-to-table mango e-commerce platform facilitating farmer catalogs, pre-ordering, seasonal batch reservations, and temperature-controlled logistics tracking.",
    longDescription:
      "AamZone connects premium fruit orchards directly with consumers and wholesale buyers. Designed to manage seasonal surge traffic during harvest periods, it features pre-order queue management, perishable batch expiry controls, and automated dispatch manifests.",
    tech: ["React.js", "Spring Boot", "PostgreSQL", "Tailwind CSS", "Razorpay"],
    category: "E-Commerce",
    isPrivate: true,
    privateBadge: "🔒 CLIENT PROJECT • PRODUCTION",
    github: null,
    link: null,
    images: ["/projects/neokart/2.png"],
    featured: true,
    features: [
      "Direct orchard-to-consumer inventory tracking with batch harvest date traceability",
      "Surge-resistant pre-booking queue that manages concurrent orders for limited-harvest Alphonso batches",
      "Integrated Razorpay payment gateway with automatic webhook verification and failure reconciliation",
      "WhatsApp dispatch alerts and customer SMS delivery status updates via automated webhooks",
      "Interactive farmer portal with dynamic pricing controls and order packaging checklists",
    ],
    contribution:
      "Built the full-stack checkout and inventory locking engine. Designed responsive, glassmorphic UI components in React and optimized backend transactions to prevent overselling of perishable inventory.",
    metrics: [
      { label: "Peak Surge Concurrency", value: "2,500 users" },
      { label: "Order Fulfilment Rate", value: "99.4%" },
      { label: "Checkout Conversion", value: "+28%" },
    ],
  },
  {
    id: "doob-booking",
    title: "DOOB — Sports Venue Booking Engine",
    description:
      "High-concurrency sports arena and slot booking platform featuring real-time collision prevention, dynamic court pricing, and instant payment verification.",
    longDescription:
      "DOOB solves the complex challenge of concurrent slot reservations across multi-court sports facilities. With milliseconds precision, it enforces distributed transaction locks on court intervals, preventing double-bookings and managing cancellation waitlists.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "Redis"],
    category: "Enterprise / Backend",
    isPrivate: true,
    privateBadge: "🔒 CLIENT PROJECT • PRODUCTION",
    github: null,
    link: null,
    images: ["/projects/scm/1.png"],
    featured: true,
    features: [
      "Pessimistic locking and Redis atomic counters to eliminate simultaneous double-booking of slots",
      "Dynamic pricing engine calculating peak-hour, weekend, and membership tariff adjustments",
      "Instant SMS and email notifications upon booking confirmation and automated cancellation windows",
      "Venue owner operations panel for blackout date management, turf maintenance, and revenue reporting",
      "Fast, touch-optimized calendar view allowing user bookings in under 3 taps",
    ],
    contribution:
      "Engineered the slot-booking concurrency algorithm using Spring Boot transactions and PostgreSQL row locks. Implemented RESTful APIs and secure customer authentication.",
    metrics: [
      { label: "Double-Booking Incident Rate", value: "0%" },
      { label: "Lock Release Time", value: "< 250ms" },
      { label: "Monthly Court Bookings", value: "8,500+" },
    ],
  },
  {
    id: "rqd-farm",
    title: "RQD Farm — Agri-Tech Produce Marketplace",
    description:
      "Agricultural marketplace connecting organic farm producers with B2B wholesale buyers, providing dynamic pricing, bulk logistics, and payment escrow.",
    longDescription:
      "RQD Farm provides an end-to-end digital infrastructure for wholesale agricultural commerce. It streamlines quotation negotiations between bulk distributors and rural farm collectives, handling weight discrepancies, tiered discounts, and consignment tracking.",
    tech: ["React.js", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    category: "E-Commerce",
    isPrivate: true,
    privateBadge: "🔒 CLIENT PROJECT • AGRI-TECH",
    github: null,
    link: null,
    images: ["/projects/neokart/3.png"],
    featured: true,
    features: [
      "B2B tiered pricing tiers based on minimum order quantities (MOQ) and freight destination zones",
      "Real-time consignment dispatch tracking from cold-storage hubs to regional distribution centers",
      "FastAPI asynchronous order processing pipeline handling high-volume transaction records",
      "Interactive crop yield forecasting calculators for verified agricultural producers",
      "Role-tailored dashboards for growers, logistics coordinators, and commercial retail buyers",
    ],
    contribution:
      "Developed the frontend interface with responsive Tailwind CSS components and integrated FastAPI endpoints for real-time order lifecycle tracking and automated invoice generation.",
    metrics: [
      { label: "Produce Tracked", value: "50+ Tons" },
      { label: "Quotation Turnaround", value: "4x faster" },
      { label: "API Response Latency", value: "< 45ms" },
    ],
  },
  {
    id: "neokart",
    title: "NeoKart — Full-Stack E-Commerce Ecosystem",
    description:
      "Modern e-commerce platform built with Spring Boot and SQL Server, featuring stateless JWT authentication, Razorpay gateway, admin & customer control panels.",
    longDescription:
      "NeoKart delivers a seamless consumer e-commerce shopping experience. It features full catalog browsing, advanced faceted filtering, cart persistence, secure payment processing via Razorpay, and comprehensive admin product catalog management.",
    tech: ["Java", "Spring Boot", "JWT", "Razorpay", "SQL Server", "REST APIs"],
    category: "Full Stack / Backend",
    isPrivate: false,
    github: "https://github.com/GulrezSarankar/Live-NeoKart.git",
    link: "https://github.com/GulrezSarankar/Live-NeoKart.git",
    images: [
      "/projects/neokart/1.png",
      "/projects/neokart/2.png",
      "/projects/neokart/3.png",
    ],
    featured: false,
    features: [
      "Stateless JWT authorization architecture securing customer and administrator API endpoints",
      "Comprehensive product catalog management with multi-image uploads and categorized taxonomy",
      "Integrated Razorpay payment flow with cryptographically verified transaction signatures",
      "Persistent user carts and order histories with printable digital tax invoices",
      "Admin inventory management panel with low-stock alerts and order status updates",
    ],
    contribution:
      "Designed and coded the entire Spring Boot backend and database schema. Wrote secure authentication filters, payment verification handlers, and REST API documentation.",
    metrics: [
      { label: "API Endpoints", value: "35+ REST" },
      { label: "Test Coverage", value: "85%+" },
      { label: "Security Standard", value: "JWT + SSL" },
    ],
  },
  {
    id: "pysummarizer",
    title: "PySummarizer — AI Neural Text Condenser",
    description:
      "AI text summarization web platform leveraging Google T5 Transformer NLP model with user session history, automated email dispatch, and database persistence.",
    longDescription:
      "PySummarizer enables users to condense long-form articles, academic papers, and technical documents into coherent, concise summaries. Built with React and Flask, it interfaces with the Hugging Face Google T5 neural network pipeline.",
    tech: ["Python", "Flask", "React", "MySQL", "T5 Transformer", "Tailwind CSS"],
    category: "Full Stack / AI",
    isPrivate: false,
    github: "https://github.com/GulrezSarankar/Summary-Generator.git",
    link: "https://summary-inky.vercel.app/",
    images: [
      "/projects/summary/1.png",
      "/projects/summary/2.png",
      "/projects/summary/3.png",
      "/projects/summary/4.png",
    ],
    featured: false,
    features: [
      "Abstractive neural text summarization utilizing fine-tuned Google T5 Transformer architecture",
      "Adjustable compression ratios allowing users to choose between headline, brief, or detailed summaries",
      "Automated summary dispatch to registered email addresses via SMTP background workers",
      "Export capabilities supporting PDF, Markdown, and plain text downloads",
      "User history archive preserving previous text analyses and word count reduction statistics",
    ],
    contribution:
      "Constructed the complete frontend in React with responsive UI, built the Flask microservice connecting to the Hugging Face inference pipeline, and implemented user history persistence in MySQL.",
    metrics: [
      { label: "Average Condensation", value: "70% text reduction" },
      { label: "Processing Speed", value: "~1.8 seconds" },
      { label: "NLP Model", value: "Google T5" },
    ],
  },
  {
    id: "sams",
    title: "SAMS — Smart Attendance Management System",
    description:
      "Enterprise attendance management system delivering real-time student tracking, automated reports, and executive analytics dashboards.",
    longDescription:
      "SAMS modernizes academic recordkeeping by replacing manual paper logs with an instant, cloud-connected attendance portal. Faculty can mark attendance in seconds, while students and department heads track eligibility metrics in real-time.",
    tech: ["React.js", "FastAPI", "Python", "MySQL", "Tailwind CSS"],
    category: "Full Stack",
    isPrivate: false,
    github: "https://github.com/GulrezSarankar/SAMS.git",
    link: "https://society-affair-management-system.vercel.app/",
    images: [
      "/projects/sams/1.png",
      "/projects/sams/2.png",
      "/projects/sams/3.png",
      "/projects/sams/4.png",
    ],
    featured: false,
    features: [
      "Bulk attendance marking interface optimized for classroom tablets and mobile screens",
      "Automated eligibility calculation flags students falling below mandatory 75% thresholds",
      "Exportable department-level attendance spreadsheets compatible with university grading systems",
      "Role-based dashboards for faculty, academic coordinators, and enrolled students",
      "FastAPI asynchronous backend with sub-50ms query responses over indexed MySQL tables",
    ],
    contribution:
      "Engineered the full-stack system: implemented React user interfaces, built high-speed FastAPI endpoints, and designed normalized MySQL schemas with student enrollment constraints.",
    metrics: [
      { label: "Time Saved / Class", value: "85% reduction" },
      { label: "Student Records", value: "1,200+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "smart-contact-manager",
    title: "Smart Contact Manager — Cloud CRM",
    description:
      "Production-ready Spring Boot CRM application featuring Google OAuth2, automated SMTP email dispatch, pagination, contact management, and dashboard analytics.",
    longDescription:
      "Smart Contact Manager is a secure personal and professional CRM platform. It provides enterprise contact organization, Google OAuth2 login, cloud image storage, and automated transactional emails with robust data protection.",
    tech: ["Java", "Spring Boot", "MySQL", "Spring Security", "OAuth2", "Thymeleaf"],
    category: "Enterprise / Backend",
    isPrivate: false,
    github: "https://github.com/GulrezSarankar/SCM.git",
    link: "https://github.com/GulrezSarankar/SCM.git",
    images: ["/projects/scm/1.png"],
    featured: false,
    features: [
      "Dual authentication system supporting local encrypted passwords and Google OAuth2 social login",
      "Dynamic pagination and indexed full-text search across large contact directories",
      "Secure contact image upload and thumbnail generation with server-side validation",
      "Automated password reset tokens delivered via JavaMailSender SMTP integration",
      "Spring Security CSRF protection, BCrypt password hashing, and role verification",
    ],
    contribution:
      "Built the core Spring Boot application from scratch, configured Spring Security filters, designed the relational MySQL database schema, and implemented email verification flows.",
    metrics: [
      { label: "Security Level", value: "BCrypt + OAuth2" },
      { label: "Search Latency", value: "< 20ms" },
      { label: "Database", value: "MySQL Relational" },
    ],
  },
];
