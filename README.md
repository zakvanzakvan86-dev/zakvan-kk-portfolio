# Zakvan KK — Personal Portfolio Website

A production-ready personal portfolio website for **Zakvan KK**, final-year BCA (Analytics) student at Kristu Jayanti College, Bengaluru (2024–2027).

> **"Data analyst who ships the software on top of it."**

---

## File Structure

The website is authored in three clean, separated files with zero framework overhead:

- `index.html` — Semantic, accessible HTML5 markup with ARIA landmarks.
- `style.css` — Modern, responsive CSS with an architectural slate & cobalt palette.
- `script.js` — Client logic for role switching, command palette (Ctrl+K), developer terminal (~), live GitHub REST API telemetry, and Bangalore time.
- `resume.pdf` — Downloadable curriculum vitae file.

---

## How to Run Locally

### Option 1: Direct Browser Opening (Zero installation)
1. Double-click `index.html` or right-click `index.html` → **Open With** → Google Chrome, Brave, Safari, or Firefox.
2. The portfolio will load immediately.

### Option 2: Local HTTP Server (VS Code / Python / Node)
- **Using Python 3:**
  ```bash
  python3 -m http.server 3000
  ```
  Open `http://localhost:3000` in your browser.

- **Using Node.js (Vite / npx):**
  ```bash
  npx serve .
  ```
  or run the project's dev command:
  ```bash
  npm run dev
  ```

---

## How to Deploy to Vercel for Free (Drag & Drop, No CLI Required)

You can publish this portfolio to the web in under 60 seconds with a free Vercel URL (e.g., `zakvan-portfolio.vercel.app`):

1. Go to **[https://vercel.com](https://vercel.com)** and sign in (or create a free personal account using your GitHub or Google account).
2. On your Vercel Dashboard, go to **Add New...** → **Project**.
3. **Drag and Drop Deployment:**
   - Compress the folder containing `index.html`, `style.css`, `script.js`, and `resume.pdf` into a `.zip` archive (or drag the folder directly into the Vercel drop zone).
   - Alternatively, push this folder to your GitHub account (`github.com/zakvanzakvan86-dev/portfolio`) and click **Import** in Vercel.
4. Leave the default settings (Framework Preset: **Other** or **Vite**, Root Directory: `./`).
5. Click **Deploy**.
6. Vercel will build and assign your live production URL instantly with free SSL, global CDN caching, and automatic mobile optimization.

---

## Configuring the Contact Form (Formspree)

The contact form is built to post to [Formspree](https://formspree.io):

1. Register for free at **[formspree.io](https://formspree.io)**.
2. Create a new form and copy your Form ID (e.g. `xpwzlkjq`).
3. Open `index.html` and search for `YOUR_FORMSPREE_ID`.
4. Replace `YOUR_FORMSPREE_ID` with your real Form ID:
   ```html
   <form action="https://formspree.io/f/xpwzlkjq" method="POST" ...>
   ```
5. Save the file. Any submissions will now be delivered straight to your email inbox!
*(Note: If left unconfigured, the form will honestly inform the visitor and provide a direct mailto link rather than faking a success state).*

---

## Key Features

- **Role / Recruiter Mode Switcher**: Quick toggle between **Full Site**, **Data Analyst view**, and **Developer view** to spotlight relevant case studies.
- **Problem → Approach → Result Documentation**: Honest, deep case studies for all 5 projects (including capstone framing for CampusHub).
- **System Architecture & Data Pipeline**: Interactive diagrams for the Stall Management System and Analytics Pipeline.
- **Interactive Toolbox**: Click any skill (SQL, Power BI, Java, Python, Vert.x, MongoDB, etc.) to highlight connected projects.
- **Live GitHub REST Telemetry**: Fetches real repository counts and latest activity from `api.github.com/users/zakvanzakvan86-dev`.
- **Interactive 3D Project Cards**: Smooth perspective tilt with detailed modal views.
- **AI Robot Assistant & Portfolio Chatbot**:
  - Code-rendered floating animated robot guide with speech prompts.
  - Floating modal chatbot powered by Gemini (`/api/chat`) with strict portfolio factual grounding and resilient offline fallback answers.
  - Secure server architecture where API keys are never exposed to the client.
- **Dynamic Background Network**: Lightweight HTML5 Canvas particle constellation that responds gracefully to mouse coordinates and respects `prefers-reduced-motion`.
- **Keyboard Power Features**:
  - `Ctrl + K` or `⌘ + K`: Global Command Palette
  - `~`: Developer CLI terminal with commands (`help`, `projects`, `skills`, `chess`, `mode`)
  - `Esc`: Closes any open modal (Chatbot, Command Palette, or Project Details)

---

## Environment Variables

For the AI Chatbot powered by Gemini, set the following variable:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

In Vercel:
1. Go to **Settings** → **Environment Variables**.
2. Add `GEMINI_API_KEY` with your Gemini API key from Google AI Studio.
