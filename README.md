# Tech Lead Challenge – Teddy

## Context & Disclaimer

This project was completed as part of a technical evaluation for a Tech Lead position. Given the limited timeframe for delivery and my full-time professional and personal responsibilities, I focused on delivering a **Minimum Viable Product (MVP)** that is fully executable and demonstrates the core functionalities required by the challenge.

The challenge itself is engaging and technically feasible; however, the delivery window was compressed. Outside of working hours, I also manage household responsibilities.

To ensure transparency and communicate technical intent, all features and improvements not implemented within the available time are documented in this `README.md`. Each item includes:

* A rationale for the selected technology or architectural direction,
* A description of the planned implementation approach,
* And an explanation of its value to the project overall.

This implementation represents a functional baseline delivered under tight constraints. In a real-world scenario, with adequate time for planning and execution, several architectural, performance, and usability aspects would be revisited or extended. For example:

* **Monorepo Structure:** Leveraging Nx, Lerna, or PNPM workspaces for better code sharing and tooling between frontend and backend.
* **Build Optimization:** Exploring SWC (Speedy Web Compiler) with Vite for improved compile times and DX.
* **Error Handling & Validation:** Building more robust error boundaries and data validation strategies across the stack.
* **UI/UX Enhancements:** Investing in a more polished and user-friendly interface.
* **Security Best Practices:** Implementing secure authentication flows (e.g., refresh tokens, JWT handling), authorization layers, and input sanitization.

This document explains the current MVP, addresses the original challenge questions, and outlines a path forward toward a more complete and production-grade solution—reflecting a clear understanding of technical priorities and real-world best practices.

## Questions

### 1. How long would it take?

For a single, dedicated, and highly skilled full-stack developer, implementing all core requirements (Front-End: React + Vite, Back-End: Nest.js + TypeORM + Postgres), adhering to Nest.js documentation standards , using TypeScript, and including all specified differentiators (End-to-end tests , Observability, Swagger , Unit Tests , Deployment , Docker/Docker Compose, and Messaging for scalability ), I estimate a timeframe of **3 to 4 weeks** working 8 hours a day.

This duration accounts for:

* Initial project setup, boilerplate, and infrastructure configuration.
* Full CRUD implementation for client management, including validation and basic error handling.
* Development of both frontend screens and their integration with the backend.
* Implementation of a robust authentication/authorization system (if required beyond simple name input).
* Thorough unit, integration, and end-to-end testing.
* Setup of observability tools (logging, metrics, tracing).
* API documentation with Swagger.
* Dockerization for development and deployment.
* Integration and basic implementation of a messaging queue.
* Deployment considerations and basic CI/CD pipeline setup.
* Architectural design and AWS service selection.

### 2. How many developers?

For an initial build aimed at a high-quality MVP with all specified features and differentiators, a team of **two developers** would be ideal.

* **1x Senior Back-End Developer:** To lead the Nest.js development, database design, API architecture, observability implementation, messaging integration, and ensuring adherence to Nest.js best practices.
* **1x Mid-Level to Senior Front-End Developer:** To focus on the React + Vite application, UI/UX implementation, state management, and end-to-end testing.

Alternatively, a single **highly experienced Senior Full-Stack Developer** could manage the entire project, but the 3-4 week timeframe would be a more conservative estimate for one person to deliver everything with high quality.

### 3. What is the seniority of the developers?

Given the need for architectural design , implementation of advanced features like observability  and messaging , adherence to specific framework standards , and the delivery of a robust, tested application, the developers should possess a strong level of experience:

* **At least one Senior Developer (preferably Full-Stack or Back-End focused):** Essential for making architectural decisions, guiding the project, setting up the core backend services, and handling complex integrations.
* **Mid-Level to Senior Front-End Developer:** Capable of independent development, understanding complex state management, consuming APIs, and implementing effective UI/UX.

A team comprised of at least one senior resource is crucial to ensure the project's quality, scalability, and maintainability from the outset.

## Technologies Used

### Frontend Stack

* **React 19** - Latest React version with improved performance and features
* **Vite 7** - Next-generation frontend tooling with HMR and optimized builds
* **TanStack Router** - Type-safe routing with data fetching and caching
* **TanStack Query (React Query)** - Data fetching, caching, and synchronization
* **Tailwind CSS v4** - Utility-first CSS framework with CSS-first configuration
* **Shadcn/ui** - Accessible component library built on Radix UI primitives
* **Framer Motion** - Production-ready animation library
* **Axios** - HTTP client for API communication
* **Lucide React** - Beautiful, customizable SVG icons

### Backend Stack

* **Nest.js 11** - Progressive Node.js framework with enterprise architecture
* **TypeORM 0.3** - Object-relational mapping with TypeScript support
* **PostgreSQL 17** - Advanced open-source relational database
* **Pino** - High-performance JSON logging library
* **Prometheus** - Metrics collection and monitoring
* **Jest** - Testing framework with coverage reporting
* **Class Validator & Class Transformer** - Validation and serialization
* **Swagger/OpenAPI** - Interactive API documentation

### Development & Operations

* **TypeScript 5.8+** - Static type checking for both frontend and backend
* **Docker & Docker Compose** - Containerization for consistent environments
* **ESLint & Prettier** - Code linting and formatting
* **SWC** - Fast TypeScript/JavaScript compiler for development builds

## Technology Choices Rationale

### React with Vite

React was chosen for its component-based architecture and extensive ecosystem. Vite provides significantly faster build times compared to traditional bundlers like Webpack, with instant hot module replacement (HMR) and optimized production builds using Rollup.

### Nest.js

Selected for its enterprise-grade architecture, extensive TypeScript support, and built-in features like dependency injection, decorators, and modular structure. It follows Angular-inspired patterns making it highly scalable and maintainable for backend applications.

### PostgreSQL

Chosen for its robustness, ACID compliance, and excellent performance with complex queries. It provides advanced features like JSON support, full-text search, and strong consistency guarantees essential for production applications.

### TypeORM

Preferred over Prisma for its more flexible query builder, better support for complex database operations, and extensive feature set. It provides both Active Record and Data Mapper patterns, allowing for more sophisticated database interactions when needed.

### TanStack Router

Implemented for its superior type safety, powerful data fetching capabilities, and built-in caching mechanisms. It offers better developer experience with fully typed routes and automatic code splitting compared to traditional routing solutions.

### Tailwind CSS v4

Utilized for its utility-first approach enabling rapid UI development. Version 4 offers improved performance, CSS-first configuration, and better developer experience compared to previous versions, making it ideal for consistent design systems.

### Shadcn/ui with Radix UI

Chosen for building accessible, customizable components. Shadcn/ui provides pre-built components following design system principles, while Radix UI ensures accessibility compliance and keyboard navigation support out of the box.

### TanStack Query (React Query)

Implemented for sophisticated data fetching, caching, and synchronization. It provides automatic background updates, optimistic updates, and intelligent caching strategies that significantly improve user experience and reduce unnecessary API calls.

### Pino Logging

Selected over Winston for its superior performance in production environments. Pino's structured JSON logging and minimal overhead make it ideal for high-throughput applications and seamless integration with modern observability tools.

### Prometheus Metrics

Integrated for comprehensive application monitoring. The `/metrics` endpoint exposes custom business metrics alongside standard Node.js metrics, enabling proactive monitoring and alerting in production environments.

## Architectural Design (High-Level)

The application follows a modern, layered client-server architecture with emphasis on type safety, observability, and maintainability:

### Frontend Architecture

1. **Presentation Layer:** React components organized with Shadcn/ui design system
2. **Routing Layer:** TanStack Router with type-safe navigation and route guards
3. **State Management:** TanStack Query for server state + localStorage for client preferences
4. **API Layer:** Centralized Axios client with environment-based configuration
5. **Type Safety:** Full TypeScript integration with shared types between frontend and backend

### Backend Architecture

1. **Controller Layer:** REST API endpoints with Swagger documentation and validation
2. **Service Layer:** Business logic with dependency injection and modular design
3. **Repository Layer:** TypeORM entities with Active Record pattern
4. **Middleware Layer:** Global validation, CORS, logging, and error handling
5. **Observability Layer:** Structured logging (Pino) and metrics collection (Prometheus)

### Key Architectural Patterns

* **Repository Pattern:** Clean separation between business logic and data access
* **Dependency Injection:** Loosely coupled modules for better testability
* **DTOs (Data Transfer Objects):** Input validation and API contract enforcement
* **Global Pipes:** Automatic validation, transformation, and sanitization
* **Interceptors:** Cross-cutting concerns like logging and error handling
* **Health Checks:** Application monitoring and container orchestration support

### Database Design

PostgreSQL with TypeORM providing:

* **Entity Relationships:** Properly modeled client data with constraints
* **Migration System:** Version-controlled database schema changes
* **Connection Pooling:** Optimized database connection management
* **Query Optimization:** Efficient data retrieval with pagination support

For a production environment, considering AWS technologies:

* **Compute:** AWS Fargate (for containerized Nest.js app) or EC2 instances for greater control.
* **Database:** AWS RDS for managed PostgreSQL instances, ensuring scalability, backups, and high availability.
* **Networking:** AWS VPC, ALB (Application Load Balancer) for distributing traffic, and Security Groups for controlled access.
* **Monitoring & Logging:** AWS CloudWatch for collecting logs and metrics from both frontend (if deployed statically) and backend services.
* **Messaging (for Scalability):** AWS SQS (Simple Queue Service) or AWS SNS (Simple Notification Service) as managed alternatives to RabbitMQ/BullMQ, depending on messaging patterns.

## How to Run the Applications

This project utilizes Docker Compose to simplify the setup and execution of the backend and its dependencies (PostgreSQL).

**Prerequisites:**

* Node.js (v22+) & npm/yarn
* Docker & Docker Compose

**Steps to Run:**

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/MatheusJulidori/test-teddy.git
    cd test-teddy
    ```

2. **Start Backend Services (Database & NestJS):**
    The `docker-compose.yml` file is located at the project root and will orchestrate both the PostgreSQL database and the NestJS backend application.

    ```bash
    docker-compose up --build
    ```

    * This command will build and execute the whole application stack, including the database, backend API, and the frontend application.

3. **Access the Applications:**
    * **Frontend (Admin Panel):** Open your browser and navigate to `http://localhost:5173` (or the port Vite indicates).
    * **Backend API Documentation (Swagger):** Access the interactive API documentation at `http://localhost:3000/api/v1/docs`.

## Implemented Features (MVP)

The following features are fully implemented and functional:

### Core Functionality

* **Authentication System:** Simple name-based login with localStorage persistence and route guards
* **Client Management:** Complete CRUD operations (Create, Read, Update, Delete) for client entities
* **Advanced Client Operations:** Bulk selection/deselection with toggle functionality
* **Pagination:** Server-side pagination for both regular and selected client lists
* **Data Persistence:** Client selections persist across browser sessions using localStorage

### Technical Features

* **API Documentation:** Interactive Swagger UI at `/api/v1/docs` with complete endpoint documentation
* **Input Validation:** Server-side validation using class-validator with detailed error responses
* **Type Safety:** End-to-end TypeScript implementation with shared types between frontend and backend
* **Responsive Design:** Mobile-first design using Tailwind CSS with accessible component library
* **Error Handling:** Centralized error handling with user-friendly error messages
* **Logging & Monitoring:** Structured JSON logging with Pino and Prometheus metrics collection
* **Health Checks:** Application health monitoring endpoint for container orchestration
* **Development Tools:** Hot reload, TypeScript compilation, and comprehensive linting setup

### User Interface

* **Modern UI Components:** Accessible components built with Shadcn/ui and Radix primitives
* **Smooth Animations:** Framer Motion animations for enhanced user experience
* **Intuitive Navigation:** Type-safe routing with breadcrumbs and navigation guards
* **Data Loading States:** Optimistic updates and loading indicators for better UX
* **Client Cards:** Rich client information display with selection state management

## Differentiators (Conceptual Approach for a Full Project)

While not fully implemented in this time-constrained MVP, here's how the specified differentiators would be approached in a comprehensive development scenario:

### Observability

* **Structured Logging:(Implemented)** Implement a standardized logging system using Pino to output logs in JSON format. These logs would be enriched with context (request IDs, user IDs, module names) and shipped to a centralized logging system like AWS CloudWatch Logs, Datadog, or an ELK stack (Elasticsearch, Logstash, Kibana) for easy querying and analysis.
* **Metrics:(Implemented)** Instrument the Nest.js application using Prometheus client libraries. Custom metrics (e.g., request duration, error rates, database query times, active connections) would be exposed via a `/metrics` endpoint. These metrics would be collected by Prometheus and visualized in Grafana dashboards, allowing real-time monitoring of application health and performance.
* **Distributed Tracing:** Integrate OpenTelemetry. This would enable tracing requests across different services (frontend to backend, backend to database, backend to messaging queue), providing end-to-end visibility into request flows and helping pinpoint performance bottlenecks or errors. Traces would be visualized in tools like Jaeger or AWS X-Ray.
* **Health Checks:(Implemented)** Implement `/health` endpoint for container orchestration platforms (like Kubernetes or AWS ECS/Fargate) to manage application liveness and readiness.

### Unit & End-to-End Tests

* **Unit Tests:(Implemented)** For the backend, Jest would be used extensively to write unit tests for services, controllers (mocking dependencies), and utility functions. For the frontend, Jest combined with React Testing Library would be used to test individual components, hooks, and utility functions, ensuring their isolated behavior.
* **End-to-End (E2E) Tests:** Frameworks like Playwright or Cypress would be employed to simulate real user interactions across the entire application stack. This would involve testing critical user flows (e.g., login, client CRUD, client selection) from the UI all the way through the backend and database, ensuring the system behaves as expected in an integrated environment.

### Deployment & Dockerization

* **Docker & Docker Compose:(Implemented)** Utilized not just for local development, but also as the foundation for containerized deployment. `Dockerfile`s would be optimized for production builds, reducing image size and improving performance.
* **CI/CD Pipeline:** A robust CI/CD pipeline (e.g., using GitHub Actions, GitLab CI/CD, or AWS CodePipeline) would automate the build, test, and deployment process. Upon code push, it would run tests, build Docker images, push them to a container registry (e.g., AWS ECR), and deploy new versions to the production environment (e.g., AWS Fargate/ECS).

### Architecture with Messaging for Scalability

* For scenarios requiring asynchronous processing, decoupling services, or handling high-volume background tasks, a messaging queue would be integrated.
* **RabbitMQ:** A general-purpose message broker, suitable for complex routing, fanout patterns, and reliable message delivery. Ideal for cross-service communication or heavy background processing where durability and advanced messaging features are key.
* **BullMQ (with Redis):** A powerful, Node.js-native job queue built on Redis. Excellent for deferred processing, task scheduling, and background jobs that are primarily handled within the Node.js ecosystem (e.g., sending emails after client registration, generating reports).
* The choice would depend on the specific use case and existing infrastructure. For this admin panel, a simple use case could be asynchronous notifications (e.g., sending an email after a client is updated) or processing batch operations.

## Video Demonstration

A short video demonstrating the MVP functionalities is available at the project root

## Figma URL

The design reference for the project can be accessed here
[Figma design](https://www.figma.com/file/1sT5mJ91e9Q6jP7o7Y2gQ8/Teste-Tech-Lead-Teddy?type=design&node-id=0%3A1&mode=design&t=2W7D2V9J3J2J2J2J-1)
