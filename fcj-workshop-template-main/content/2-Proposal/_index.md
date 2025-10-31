---
title: "Proposal"
date: "2025-09-09"
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# AI Chatbot Platform on AWS
## A Serverless, Secure, and Scalable Architecture for Conversational Intelligence

### 1. Executive Summary
This project proposes a **serverless AI Chatbot Platform** designed to deliver intelligent, secure, and cost-effective conversational services using AWS Cloud infrastructure.
The platform leverages **AWS Bedrock for generative AI, Lambda for serverless compute**, and **API Gateway** for scalable API management. It integrates **DynamoDB** and **OpenSearch** for structured and unstructured data storage, while **S3** handles file persistence.

A complete **CI/CD pipeline** (CodePipeline, CodeBuild, CodeDeploy, and CodeArtifact) automates deployment and version control, ensuring continuous delivery from GitHub. The architecture is fully monitored and protected through **CloudWatch, CloudTrail, Secrets Manager, IAM,** and **WAF**, ensuring operational reliability and compliance.

### 2. Problem Statement
### What’s the Problem?
Most chatbot platforms rely on third-party APIs or monolithic servers, resulting in:
* High operational and maintenance costs.
* Limited scalability when handling concurrent user requests.
* Security and compliance challenges for sensitive user data.

### The Solution
To develop a **cost-efficient, scalable, and serverless AI chatbot system** built entirely on AWS cloud-native services, enabling seamless integration of conversational AI, data search, and logging while minimizing DevOps overhead.

### 3. Solution Architecture
The platform employs a serverless AWS architecture to deliver intelligent, scalable, and cost-effective conversational services. User messages are sent through Amazon API Gateway and processed by AWS Lambda, which integrates with Amazon Bedrock for natural language generation. Chat data and logs are stored securely in Amazon DynamoDB and Amazon S3, while Amazon OpenSearch enables real-time analytics and search across conversations. The frontend interface is hosted on AWS Amplify, secured with Amazon Cognito, and delivered globally via CloudFront. The architecture is detailed below:

![AI Chatbot Platform on AWS](/images/2-Proposal/chatbot_architect.jpeg)  

### AWS Services Used
- **Amazon API Gateway**:  Serves as the entry point for all client requests, routing them securely to backend services.
- **AWS Lambda**:  Executes chatbot logic, message ingestion, and data processing without the need for managing servers.
- **Amazon Bedrock**:  Provides access to foundational large language models (LLMs) for natural language understanding and response generation.
- **Amazon DynamoDB**:  A fully managed NoSQL database used for storing chat sessions, user profiles, and message histories.
- **Amazon S3**:  Used for storing static content such as chatbot logs, configuration files, and uploaded documents.
- **Amazon CloudFront**:  Acts as a content delivery network (CDN) to accelerate web responses globally.
- **AWS WAF (Web Application Firewall)**:  Protects the API endpoints from common web exploits and attacks.
- **Amazon CloudWatch**:  Monitors application logs, Lambda performance metrics, and provides alerting.
- **AWS CloudTrail**:  Records all API activity across the AWS account for auditing and compliance.
- **AWS IAM (Identity and Access Management)**:  Manages secure access control for users and services.
- **AWS KMS (Key Management Service)**:  Provides data encryption for sensitive information.
- **Amazon CodePipeline, CodeBuild, and CodeDeploy**:  Automate CI/CD processes for continuous integration and deployment.
- **Amazon OpenSearch Service**:  Enables real-time search and analytics on chatbot interactions.

### Component Design
- **Frontend Interface**: provides a user-friendly chat interface accessible via web or mobile, communicates with the backend through API Gateway.
- **API Layer (Amazon API Gateway)**: routes incoming HTTP requests to the appropriate AWS Lambda functions.Integrates with AWS WAF for threat protection and request validation.
- **Compute Layer (AWS Lambda Functions)**: chat Handler Lambda – Manages user messages, invokes Amazon Bedrock for generating responses, pre-sign Lambda – Generates secure presigned URLs for file uploads to S3, ingestion Lambda – Processes incoming data and stores it in DynamoDB and OpenSearch.
- **Data Layer**: DynamoDB stores user and conversation data, OpenSearch indexes chat history for efficient search and analytics.
- **Storage Layer (Amazon S3)**: stores chat-related media, logs, and static website assets.
- **Edge & Security Layer**: route 53 manages DNS routing, cloudFront accelerates content delivery globally, AWS WAF, KMS, and IAM secure the platform.
- **Monitoring & Logging**: CloudWatch and CloudTrail monitor Lambda performance, track logs, and audit activity.
- **CI/CD Pipeline**: CodePipeline, CodeBuild, and CodeDeploy automate build, test, and deployment workflows, CodeArtifact manages dependencies and packages.

### 4. Technical Implementation
**Implementation Phases**

This project has two parts—developing the AI Chatbot backend on AWS and building the chatbot web interface—each following 4 phases:
- Build Theory and Draw Architecture: Research AWS services including Lambda, API Gateway, Bedrock, DynamoDB, and Amplify, and design the complete serverless architecture for chatbot interaction (1 month pre-internship).
- Calculate Price and Check Practicality: Use AWS Pricing Calculator to estimate the monthly cost of all AWS components and adjust configurations for budget efficiency (Month 1).
- Fix Architecture for Cost or Solution Fit: Optimize the design for performance and cost, such as adjusting Lambda memory/time settings, DynamoDB read/write capacity, or caching Bedrock responses (Month 2).
- Develop, Test, and Deploy: Implement backend functions using AWS SDK, configure API Gateway and Bedrock integration, develop the React/Next.js chatbot interface, and deploy using AWS Amplify and CodePipeline (Months 2–3).

**Technical Requirements**
- AI Chatbot Backend: AWS Lambda (Node.js/Python runtime) handles chat processing, integrates with Amazon Bedrock for LLM responses, and connects to DynamoDB for storing user sessions and messages. API Gateway provides REST or WebSocket endpoints for communication.
- Frontend Web Application: Built with React or Next.js and hosted on AWS Amplify for fast deployment and CI/CD integration. Cognito manages user authentication and secure access.
- Data Storage and Analytics: DynamoDB stores structured chat data (user info, message history), S3 stores logs and media files, and OpenSearch enables searching and analyzing conversation data.
- Security and Monitoring: IAM controls access permissions, KMS encrypts sensitive data, WAF protects APIs, CloudWatch monitors Lambda performance, and CloudTrail logs system activities.
- CI/CD Pipeline: CodePipeline automates the deployment process; CodeBuild builds backend functions; CodeDeploy manages versioned releases; CodeArtifact stores shared dependencies for consistent builds.

### 5. Timeline & Milestones
**Project Timeline**
- Pre-Internship (Month 0): 1 month for studying AWS AI services, researching Bedrock models, and finalizing architecture design.
- Internship (Months 1–3): 3 months of main development and deployment.
- Month 1: Study AWS services in depth (Lambda, API Gateway, Bedrock, DynamoDB, Amplify) and prepare development environment.
- Month 2: Implement and optimize architecture, integrate AI model via Amazon Bedrock, and test Lambda-API workflows.
- Month 3: Develop and deploy the chatbot web interface on Amplify, connect to backend, configure CI/CD pipeline (CodePipeline, CodeBuild, CodeDeploy), and finalize system testing.
- Post-Launch (Up to 1 Year): Continuous monitoring and improvement phase for scalability, feature upgrades, and research on model fine-tuning or custom AI prompt engineering.

### 6. Budget Estimation
You can find the budget estimation on the [AWS Pricing Calculator](https://calculator.aws/#/estimate?id=621f38b12a1ef026842ba2ddfe46ff936ed4ab01).  
Or you can download the [Budget Estimation File](../attachments/budget_estimation.pdf).

### Infrastructure Costs
- AWS Services:
    - AWS Lambda: $0.20/month (10,000 invocations, 512 MB memory).
    - Amazon API Gateway: $0.10/month (5,000 API requests).
    - Amazon Bedrock: $0.40/month (model inference and token usage).
    - Amazon DynamoDB: $0.15/month (on-demand read/write requests and 2 GB data).
    - Amazon S3: $0.10/month (3 GB storage and 1,000 requests).
    - Amazon OpenSearch Service: $0.30/month (small instance for indexing chat logs).
    - Amazon Amplify: $0.35/month (frontend hosting and build pipeline).
    - Amazon CloudFront: $0.05/month (content delivery and caching).
    - Amazon Cognito: $0.02/month (authentication for up to 100 monthly active users).
    - AWS WAF: $0.05/month (basic rule configuration for API protection).
    - Amazon CloudWatch & CloudTrail: $0.08/month (logging and monitoring).

    Total: $1.8/month, or $21.6/year.

### 7. Risk Assessment
#### Risk Matrix
- Service Outages: Medium impact, medium probability.
- Data Leakage or Security Misconfiguration: High impact, low probability.
- Cost Overruns due to API or Bedrock Usage: Medium impact, low probability.
- Model Inaccuracy or Latency: Medium impact, medium probability.

#### Mitigation Strategies
- Service Reliability: Implement multi-region deployment and automatic retries via AWS Lambda.
- Security: Enforce IAM least-privilege access, encrypt data with KMS, and use AWS WAF and Secrets Manager.
- Cost Management: Set AWS Budgets and CloudWatch alarms for API and Bedrock usage thresholds.
- Performance: Cache frequent queries in DynamoDB and use OpenSearch for fast retrieval.

#### Contingency Plans
- If AWS Bedrock becomes unavailable, switch to an open-source fallback model hosted on EC2 or SageMaker.
- In case of service disruption, use CloudFormation stacks to redeploy infrastructure quickly.
- If costs exceed the budget, scale down OpenSearch instances and optimize Lambda execution time.

### 8. Expected Outcomes
#### Technical Improvements: 
- Delivers real-time conversational responses through fully managed AWS services.
- Eliminates the need for manual server maintenance and API management.
- Ensures high scalability, security, and automation via a CI/CD pipeline.
#### Long-term Value
- Provides a foundation for future AI-based applications such as recommendation bots or knowledge assistants.
- Offers a reusable architecture for educational research and enterprise chatbot prototypes.
- Reduces long-term operational costs by adopting a 100% serverless infrastructure.