
# 🚀 Rydoo Login Security Automation Suite

A professional-grade automated testing framework focused on **Security Boundary Testing** and **Functional Validation** for the Rydoo platform. This project demonstrates a modern "Infrastructure as Code" approach to Quality Assurance.

---

### 🌟 Project Value Proposition

* **Security Focused:** Validates authentication boundaries and negative login scenarios.
* **Environment Agnostic:** Uses a configuration-as-code strategy to switch between **QA** and **PROD** environments seamlessly.
* **Zero-Configuration Execution:** Leverages **Docker** to eliminate environment-related "flaky" tests.
* **Live Reporting:** Integrated with **Allure Reports** and **GitHub Pages** for real-time stakeholder visibility.

---

### 🛠 Tech Stack

* **Framework:** Cypress 15.10.0
* **Environment:** Docker (Containerized execution)
* **Reporting:** Allure Report (with dynamic environment metadata)
* **CI/CD:** GitHub Actions (Automated regression pipeline)

---

### 🚀 Quick Start (Local Execution)

The framework is optimized for **Developer Experience (DX)**. If you have Docker Desktop running, you can execute the entire lifecycle (Build, Test, and Report) with a single command:

```bash
# Runs tests in the QA environment and opens the visual report
npm run full:qa

```

Alternatively, to run against the Production environment:

```bash
npm run full:prod

```

---

### 📊 Reporting & Observability

After execution, a comprehensive **Allure Report** is generated. It includes:

* **Visual Validation:** Screenshots and execution logs for every step.
* **Environment Metadata:** Dynamic tracking of the execution context (OS, Node version, Target Env, and Tester ID).
* **Historical Trends:** Traceability of test results over time via GitHub Pages.

---

### 📁 Project Architecture

* **`cypress/e2e`**: Modular test suites covering security and functionality.
* **`cypress/environments`**: JSON-based configuration files for different stages (QA/PROD).
* **`Dockerfile`**: Defines the isolated execution environment for 100% deterministic results.
* **`.github/workflows`**: CI/CD pipeline configuration for automated nightly runs and deployment.

---

### 👨‍💻 About the Author

**Ahmet Demir**

* **Senior QA Automation Engineer** (5+ Years Experience)
* Specializing in Web, Mobile, API, and Database automation.
* Expertise in building scalable, containerized test architectures.

---

### Architecture Insight for Reviewers 💡

This project is not just a collection of tests; it is a **Testing Micro-Infrastructure**. It utilizes **Docker layer caching** for fast builds and a **dynamic Node.js script** to inject environment metadata into Allure, proving readiness for high-frequency CI/CD environments 

