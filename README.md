# 🛡️ A11yGuard: Context-Aware Accessibility Remediation

A11yGuard is a full-stack platform built to move accessibility audits out of static spreadsheets and into an actionable developer workflow. It centralizes WCAG 2.1 AA tracking and utilizes Generative AI to bridge the "remediation gap" by producing valid WAI-ARIA patches for identified barriers.

## 🛠️ Technical Implementation

* **AI Remediation Engine**: Built a service layer around the **Google Gemini API** to parse specific audit failures (e.g., WCAG 1.1.1 or 4.1.2) and return structured HTML5/ARIA code blocks.
* **Reactive Risk Scoring**: Developed a dashboard using **React 18** that calculates real-time compliance health using a weighted algorithm: Risk = Severity × Impact.
* **Persistent Audit Queue**: Implemented a **RESTful Java API (Spring Boot)** to manage the lifecycle of an accessibility barrier from detection to verified fix.
* **Enterprise Auth**: Integrated **AWS Cognito** via AWS Amplify to manage secure session states and multi-tenant access.

## 🚀 Problem Solving & Features

1. **Automated Barrier Tracking**: Replaced manual template-based documentation with a centralized relational database to manage asynchronous audit data.
2. **Contextual Code Patches**: Rather than generic advice, the system delivers specific "Before vs. After" code snapshots to help developers implement fixes faster.
3. **Live Compliance Analytics**: Uses React's functional programming patterns (like `.reduce()`) to provide instant feedback on project risk as new audit data is ingested.
4. **Stakeholder reporting**: Leverages the Java backend to generate automated PDF compliance reports for stakeholders and legal teams.

## 📂 Architecture Stack

* **Frontend**: React (Vite), Tailwind CSS, Lucide-React.
* **Backend**: Java 17, Spring Boot, Spring Data JPA.
* **Cloud**: AWS (Amplify, Cognito), Google Gemini API.
* **Database**: PostgreSQL / H2 for persistent barrier tracking.