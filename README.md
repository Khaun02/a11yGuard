🛡️ A11yGuard
AI-Powered Accessibility Remediation Engine
A11yGuard is an enterprise-grade accessibility management platform designed to bridge the gap between manual auditing and technical remediation. It automates the lifecycle of WCAG 2.1 AA compliance by combining a robust Java Spring Boot backend with a generative AI engine to provide real-time code patches.

🚀 The Mission
Manual accessibility auditing is slow and expensive. A11yGuard empowers developers and non-technical testers to identify, prioritize, and fix accessibility barriers instantly. By calculating a proprietary Risk Score, the platform helps organizations focus on the issues that matter most to users with disabilities.

✨ Key Features
AI Code Remediation: Integrated with Google Gemini 2.5 Flash to analyze broken HTML/ARIA patterns and generate instant, context-aware code fixes.

Dynamic Risk Scoring: Prioritizes issues using a custom algorithm weighing WCAG severity against page traffic impact.

Enterprise Dashboard: A React-driven interface featuring real-time compliance analytics and barrier tracking.

Automated Reporting: Generates professional PDF compliance reports via the Java backend for stakeholders and legal teams.

Secure Authentication: Integrated with AWS Cognito for secure, scalable user management.

🛠️ Tech Stack
Frontend: React (Vite), Tailwind CSS, Lucide-React, AWS Amplify.

Backend: Java 17, Spring Boot, Spring Data JPA, Spring Cloud AWS.

AI/ML: Google Gemini API.

Cloud/DevOps: AWS (App Runner, Cognito, S3, DynamoDB).

Database: PostgreSQL / H2.

📂 Repository Structure
/ally-guard-ui: React frontend and Amplify configuration.

/ally-guard-core: Java Spring Boot microservice (The "Brain").