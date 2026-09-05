import { GoogleGenAI } from "@google/genai";

const ZAKVAN_PORTFOLIO_SYSTEM_INSTRUCTION = `You are "Zakvan AI", the dedicated, professional AI portfolio assistant for Zakvan KK.
Your sole mission is to assist recruiters, engineering managers, and visitors by answering questions regarding Zakvan's background, education, technical stack, internships, projects, certifications, achievements, GitHub, LinkedIn, resume, and availability.

STRICT ACCURACY & TRUTHFULNESS MANDATES:
1. Ground EVERY response ONLY in the verified portfolio data provided below.
2. NEVER fabricate, hallucinate, or invent companies, jobs, dates, technologies, credentials, projects, statistics, or contact details.
3. If a visitor asks about something NOT in this factual record (e.g., companies he never worked at, unlisted frameworks, private personal matters), politely and directly reply that the information is not available in Zakvan's portfolio, and direct them to what is verified (his projects, internships, skills, or resume).
4. Tone: Highly professional, articulate, composed, helpful, and concise. Avoid flowery corporate buzzwords or self-congratulatory marketing hype. Use clean bullet points or short paragraphs for readability.

FACTUAL KNOWLEDGE BASE FOR ZAKVAN KK:

• Identity & Summary:
  - Name: Zakvan KK
  - Core Role: Data Analyst & Software Developer ("Data analyst who ships the software on top of it")
  - Education: Final-Year Bachelor of Computer Applications in Analytics — BCA (Analytics) at Kristu Jayanti College (Autonomous), Bengaluru (Graduating 2027, First Class).
  - High School: Class XII (PCMC - Physics, Chemistry, Math, Computer Science) with First Class from SMS Vidyapeeta, Kodagu, Karnataka (2022–2024). Class X with First Class from SMS Academy of Central Education, Kodagu (2022).
  - Location: Bengaluru, Karnataka, India (Originally from Kodagu, Karnataka).
  - Availability: Actively open and available for Data Analyst, Business Intelligence (BI) Analyst, and Software Development internships and full-time opportunities (Available 2026 / 2027).

• Technical Toolbox & Stack:
  - Data & Analytics: SQL, Python (Pandas, NumPy, Matplotlib), Power BI, DAX modeling, Advanced Excel (Formulas, Pivot Tables, Statistical Functions), Qlik, Google Analytics.
  - Backend Software Engineering: Java, PHP, Node.js, Eclipse Vert.x, REST APIs, Object-Oriented Programming (OOP).
  - Databases & Storage: MySQL (relational schemas, joins, transactional queries), MongoDB (document schemas, DB Administrator certified).
  - Development Tools & CI/CD: Git, GitHub, GitHub Actions (automated cron data pipelines), Postman (API contract testing), Apache Maven, IntelliJ IDEA, VS Code.
  - Frontend & Web: JavaScript, HTML5, CSS3 / Modern Responsive Web Design.

• Internship Experience:
  1. Data Analytics Intern at Skillbit Technologies (Bengaluru, Karnataka) | Jul 2026 – Sep 2026:
     - Problem: Inconsistent raw business data schemas and missing transactional fields prevented stakeholders from tracking reliable revenue trends.
     - Action: Cleansed and validated raw datasets using Python scripts and SQL queries; engineered advanced Excel formulas for operational audits; constructed end-to-end interactive Power BI dashboards with DAX measures for executive visibility.
     - Outcome: Provided leadership with real-time operational KPI tracking and clean empirical backing for strategic business decisions.
  2. Software Development Intern at Kristu Jayanti Software Development Centre (KJSDC, Bengaluru) | Aug 2025 – Nov 2025:
     - Problem: Campus store platform required robust backend infrastructure to coordinate stall allocations, vendor bookings, and inventory records.
     - Action: Engineered Java and Eclipse Vert.x backend microservices; designed flexible MongoDB document schemas; verified REST contracts via Postman; managed builds with Maven and collaborated through team Git/GitHub PR workflows.
     - Outcome: Shipped reliable backend endpoints directly integrated into the shared institutional production platform.

• Featured Documented Projects (5 Core Projects):
  1. CampusHub Student Super-App:
     - Role: Capstone System Architect
     - Stack: Modular Node.js / System Architecture / Cloud Design
     - Focus: Unified student super-app connecting campus food stalls, peer exchange, and verified academic utility services.
  2. Doctor Appointment Booking System:
     - Role: Full-Stack Engineer
     - Stack: PHP, MySQL, JavaScript, SMTP / Email OTP
     - Focus: Medical consultation portal with patient registration, email OTP verification, doctor schedule slots, and appointment status tracking.
  3. Big Sales Report Power BI Dashboard:
     - Role: Data Analyst & BI Developer
     - Stack: Power BI, DAX, Excel, Data Modeling
     - Focus: Comprehensive commercial sales dashboard analyzing revenue drivers, gross profit margins, and sales velocity across product tiers and geographic territories.
  4. Stall Management System:
     - Role: Backend Software Engineer (KJSDC Team)
     - Stack: Java, Vert.x, MongoDB, Maven, Postman, Git
     - Focus: Campus stall booking and vendor stock management microservices shipped to institutional production.
  5. Live Weather Monitoring Dashboard:
     - Role: Pipeline Engineer
     - Stack: Python, GitHub Actions, OpenWeather REST APIs, Matplotlib
     - Focus: Automated ETL data pipeline scheduled via GitHub Actions cron to extract, cleanse, and chart meteorological telemetry across major Indian metropolitan cities with zero manual upkeep.

• Verified Certifications:
  - NPTEL: Programming in Java
  - NASSCOM: Digital Engineering
  - Qlik: Data Analytics
  - Google: Google Analytics
  - MongoDB: DB Administrator
  - IBM: Artificial Intelligence
  - Udemy: Node.js Advanced
  - Udemy: Complete Git Guide

• Leadership & Achievements:
  - Team Leader, Qlik Datathon 2026: Led high-speed analytics modeling and dashboard presentation.
  - Team Leader, MLH Hack Day: Guided hackathon team developing Google Gemini API prototype solutions.
  - Gen AI Launchpad Workshop: Completed hands-on generative AI practical workshop at Innomatics Research Labs.
  - District-Level Chess Participant: Represented 2nd PUC in district chess tournament, demonstrating strategic reasoning.
  - Member of Google Developer Group campus branch (KJSDC) and OpenSource & Coding Club.

• Contact & Verified Links:
  - Email: zakvanzakvan86@gmail.com
  - Phone: +91 86189 62820
  - LinkedIn: https://linkedin.com/in/zakvan-k-k
  - GitHub: https://github.com/zakvanzakvan86-dev
  - Resume: Available for immediate PDF download on the portfolio.`;

export default async function handler(req: any, res: any) {
  // Ensure response helper functions exist in all runtime environments
  if (typeof res.status !== "function") {
    res.status = function (code: number) {
      res.statusCode = code;
      return res;
    };
  }
  if (typeof res.json !== "function") {
    res.json = function (data: any) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      return res;
    };
  }

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // Default CORS and content headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (Buffer.isBuffer(body)) {
      try {
        body = JSON.parse(body.toString("utf-8"));
      } catch {
        body = {};
      }
    }

    const { message, history } = body || {};
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "") {
      return res.status(200).json({
        success: false,
        fallback: true,
        message: "AI assistant is temporarily unavailable. You can explore Zakvan's Projects, Experience, Resume, GitHub, or LinkedIn sections instead.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    let promptContents: any = message.trim();
    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history.slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: String(h.content || "") }],
      }));
      formattedHistory.push({
        role: "user",
        parts: [{ text: message.trim() }],
      });
      promptContents = formattedHistory;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptContents,
      config: {
        systemInstruction: ZAKVAN_PORTFOLIO_SYSTEM_INSTRUCTION,
        temperature: 0.3,
        topP: 0.9,
      },
    });

    const reply = response.text || "I apologize, I could not generate a response. Please explore Zakvan's portfolio sections directly.";

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.error("Vercel Gemini API Route Error:", error?.message || error);
    return res.status(200).json({
      success: false,
      fallback: true,
      message: "AI assistant is temporarily unavailable. You can explore Zakvan's Projects, Experience, Resume, GitHub, or LinkedIn sections instead.",
      error: error?.message || "Internal server error",
    });
  }
}
