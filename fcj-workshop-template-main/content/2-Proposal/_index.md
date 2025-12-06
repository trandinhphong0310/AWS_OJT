---
title: "Proposal"
date: "2025-10-10"
weight: 2
chapter: false
pre: " <b> 2. </b> "
---

# AWS First Cloud AI Journey – Project Plan

**Project:** EduQuery - Optimizing RAG-based Chatbot Systems on AWS with LangChain  
**Organization:** [FPT]  
**Date:** 2025-10-10

---

## 1. Background and Motivation

### 1.1 Executive Summary

**Customer Background:**  
This project addresses a critical challenge in higher education where students, researchers, and professionals waste valuable time searching for specific information across massive academic document collections. The current manual keyword-based search methods are imprecise and inefficient, with students spending an average of 5-10 hours per week on document retrieval tasks.

**Business and Technical Objectives:**  
The EduQuery Chatbot Project aims to build an intelligent Question-Answering (QA) platform on Amazon Web Services (AWS) that:
- Reduces information search time by 40-60%
- Enhances research quality through accurate, contextual answers
- Provides educational institutions with a competitive advantage in AI-driven learning
- Demonstrates AWS cloud capabilities in Generative AI applications

**Use Cases:**
1. Students uploading textbooks and research papers to ask specific questions
2. Researchers querying large document collections for literature reviews
3. Lecturers finding relevant teaching materials quickly
4. Libraries providing AI-powered document search services

**Partner Professional Services:**  
The project team will deliver a complete serverless web application with integrated chatbot functionality, leveraging AWS services including Amazon S3, AWS Lambda, Amazon Bedrock, API Gateway, and DynamoDB to provide a secure, scalable, and cost-efficient solution using Retrieval-Augmented Generation (RAG) architecture.


### 1.2 Project Success Criteria

- **Time Efficiency:** Reduce average information search time from 8 minutes to under 1 minute per query
- **User Adoption:** Achieve 500 monthly active users (MAU) within the first 3 months
- **System Performance:** Maintain API response time (p95) under 3 seconds per query
- **Accuracy:** Achieve 90% retrieval accuracy (top 3 chunks contain correct answer)
- **Reliability:** System error rate below 0.1%
- **User Satisfaction:** Net Promoter Score (NPS) of +40 or higher
- **Retention:** 60% of users return weekly
- **Cost Efficiency:** Monthly operational costs remain within $720 budget for 1,000 users
- **Quality Impact:** Measurable improvement in quality of essays, reports, and research papers

### 1.3 Assumptions

**Prerequisites and Dependencies:**
- AWS account with appropriate service limits and quotas
- Access to Amazon Bedrock with Claude 3 Sonnet and Titan Embedding models
- GitHub repository for source code management
- Team members have AWS and React development experience
- Users have access to modern web browsers
- Documents are in supported formats (PDF, DOCX, TXT)

**Technical Constraints:**
- Amazon Bedrock availability in selected AWS region
- Lambda execution time limits (15 minutes maximum)
- API Gateway payload size limits (10MB)
- S3 storage costs scale with document volume
- Foundation model token limits and pricing

**Business Constraints:**
- 14-week development timeline
- Budget of $35,000 for development and $720/month for operations
- Initial target of 1,000 active users
- Academic institution approval and compliance requirements

**Risks:**
- **AI Hallucination (High Priority):** Foundation models may generate inaccurate responses not grounded in document content
- **Data Security (High Priority):** Risk of sensitive information leakage from uploaded documents
- **User Adoption (High Priority):** Users may resist adopting new AI-powered tools
- **Cost Overruns (Medium Priority):** AWS costs, particularly Bedrock usage, may exceed budget
- **Performance Issues (Medium Priority):** Vector search queries may be slower than expected
- **Project Delays (Medium Priority):** Complex technical challenges may cause timeline slippage


---

## 2. Solution Architecture / Architectural Diagram

### 2.1 Technical Architecture Diagram

The EduQuery solution follows a **serverless microservices architecture** on AWS, designed according to the AWS Well-Architected Framework principles. The architecture ensures scalability, high reliability, multi-layered security, and cost optimization.

**Architecture Overview:**

The system is composed of 6 primary layers:

1. **Edge Layer** - Global content delivery and security
2. **API Layer** - Request routing and authentication
3. **Compute Layer** - Serverless business logic processing
4. **Storage & Data Layer** - Document and metadata persistence
5. **AI/ML Layer** - Embedding generation and answer synthesis
6. **Security & Monitoring Layer** - Access control and observability

**Key Architectural Principles:**
- **Serverless-first:** Eliminates server management overhead and enables automatic scaling
- **Event-driven:** S3 events trigger document processing workflows
- **Microservices:** Independent Lambda functions for each business capability
- **Security by design:** Encryption at rest and in transit, least-privilege IAM policies
- **Cost-optimized:** Pay-per-use pricing model with no idle resource costs

**Architecture Diagram:**

![Architecture Diagram](Images/architecture_diagram.png)

**Detailed Component Description:**

#### 1️⃣ Edge Layer
- **Amazon Route 53:** DNS management for custom domain (e.g., eduquery.cloud)
- **Amazon CloudFront:** Global CDN for low-latency static content delivery
- **AWS WAF:** Protection against DDoS, SQL injection, XSS, and common web attacks

#### 2️⃣ API Layer
- **Amazon API Gateway:** RESTful API endpoints (/upload, /ask, /history)
- **Amazon Cognito Authorizer:** JWT-based authentication and authorization
- **Request validation:** Input validation and rate limiting

#### 3️⃣ Compute Layer
- **Presign Handler (Lambda):** Generates pre-signed S3 URLs for secure direct uploads
- **Ingestion Handler (Lambda):** Processes uploaded documents, performs chunking, generates embeddings via Bedrock
- **Chat Handler (Lambda):** Retrieves relevant chunks, constructs prompts, calls Foundation Model, returns answers
- **Runtime:** Python 3.11 for optimal performance

#### 4️⃣ Storage & Data Layer
- **Amazon S3:**
  - Document storage bucket (encrypted at rest)
  - Static website hosting for React frontend
  - S3 Event Notifications trigger ingestion workflow
- **Amazon DynamoDB:**
  - User metadata and preferences
  - Conversation history and query logs
  - Session management
- **Amazon Bedrock Knowledge Bases:**
  - Vector embeddings storage (via OpenSearch Serverless)
  - Optimized for k-NN similarity search

#### 5️⃣ AI/ML Layer (Amazon Bedrock)
- **Titan Embedding Model:** Converts text chunks to vector embeddings
- **Claude 3 Sonnet Foundation Model:** Generates contextual answers from retrieved chunks
- **RAG Pipeline:** Retrieval-Augmented Generation for accurate, grounded responses

#### 6️⃣ Security & Monitoring Layer
- **AWS IAM:** Role-based access control with least-privilege policies
- **AWS Secrets Manager:** Encrypted storage for API keys and credentials
- **Amazon CloudWatch:** Logs, metrics, alarms, and dashboards
- **AWS CloudTrail:** API activity auditing and compliance tracking


**Data Flow:**

**Document Upload Flow (Asynchronous):**
1. User requests upload → API Gateway → Presign Lambda
2. Presign Lambda generates secure S3 pre-signed URL
3. Client uploads document directly to S3
4. S3:ObjectCreated event triggers Ingestion Lambda
5. Ingestion Lambda reads, chunks, and sends to Bedrock Knowledge Base
6. Embeddings stored in OpenSearch Serverless

**Question & Answer Flow (Synchronous):**
1. User submits question → API Gateway (with Cognito JWT) → Chat Lambda
2. Chat Lambda queries Bedrock Knowledge Base for relevant chunks
3. Chat Lambda constructs prompt with question + retrieved context
4. Bedrock Foundation Model (Claude 3 Sonnet) generates answer
5. Answer and metadata saved to DynamoDB
6. Response returned to user via API Gateway

**Tools and Technologies:**
- **Infrastructure as Code:** AWS CDK v2 (TypeScript/Python)
- **Frontend:** React 18, hosted on S3 + CloudFront
- **Backend:** AWS Lambda (Python 3.11)
- **AI/ML:** Amazon Bedrock (Claude 3 Sonnet, Titan Embeddings)
- **Storage:** Amazon S3, DynamoDB, OpenSearch Serverless
- **Security:** Cognito, IAM, WAF, Secrets Manager
- **Monitoring:** CloudWatch, CloudTrail
- **CI/CD:** AWS CodePipeline, CodeBuild, CodeDeploy, GitHub

### 2.2 Technical Plan

The EduQuery team will develop the solution using Infrastructure as Code (IaC) principles with AWS CDK v2. This approach enables:
- **Repeatable deployments** across Dev, Staging, and Production environments
- **Version-controlled infrastructure** alongside application code
- **Automated rollback** capabilities in case of deployment issues

**Development Approach:**

1. **IaC with AWS CDK:**
   - Define all AWS resources (Lambda, API Gateway, S3, DynamoDB, Bedrock) as code
   - Implement separate stacks for networking, compute, storage, and security
   - Use CDK constructs for best-practice configurations

2. **Lambda Function Development:**
   - Implement presign handler for secure S3 uploads
   - Develop ingestion handler with document parsing and chunking logic
   - Build chat handler with RAG pipeline integration
   - Include comprehensive error handling and logging

3. **Frontend Development:**
   - Build React SPA with modern UI/UX design
   - Implement Cognito authentication flow
   - Integrate with API Gateway endpoints
   - Deploy to S3 with CloudFront distribution

4. **Testing Strategy:**
   - Unit tests for Lambda functions (pytest)
   - Integration tests for API endpoints
   - End-to-end tests for complete user workflows
   - Performance testing for response times and throughput
   - Security testing for authentication and authorization

5. **Configuration Management:**
   - Environment-specific configurations managed via AWS Systems Manager Parameter Store
   - Secrets stored in AWS Secrets Manager
   - Feature flags for gradual rollout

**Approval Processes:**

Critical infrastructure changes require approval from:
- Cloud Architect for architectural decisions
- Security team for IAM policies and data encryption
- Project stakeholders for budget-impacting changes

All changes follow the CI/CD pipeline with automated testing gates before production deployment.


### 2.3 Project Plan

The EduQuery team will adopt the **Agile Scrum framework** over **7 two-week sprints** (14 weeks total).

**Team Responsibilities:**

| Role | Responsibilities | Team Member |
|------|-----------------|-------------|
| **Team Leader / Project Manager** | Project management, team coordination, RAG/Bedrock integration, QA oversight | Dương Nguyễn Gia Huy |
| **Backend Developer / DevOps** | Lambda functions, CI/CD pipeline, IaC with CDK, monitoring | Đào Quang Vinh |
| **Cloud Architect** | AWS architecture design, API Gateway, S3, IAM, security | Nguyễn Lê Anh Quân |
| **Backend Developer / Database** | DynamoDB, data persistence, query optimization | Nguyễn Thanh Liêm |
| **Frontend Developer** | React UI/UX, Cognito integration, API client implementation | Trần Đình Phong |

**Communication Cadence:**

- **Daily Standups:** 15-minute sync every morning (async via Slack on remote days)
- **Sprint Planning:** Every 2 weeks (Monday) - 2 hours
- **Sprint Review:** End of each sprint (Friday) - 1 hour
- **Sprint Retrospective:** After each review - 1 hour (team only)
- **Backlog Refinement:** Mid-sprint (Wednesday) - 1 hour
- **Progress Updates:** Weekly summary shared with instructor/advisor

**Knowledge Transfer:**

- **Documentation:** Maintained in GitHub wiki and Confluence
- **Code Reviews:** Required for all pull requests
- **Pair Programming:** For complex features (Bedrock integration, RAG pipeline)
- **Technical Sessions:** Weekly 1-hour sessions on AWS services and best practices
- **Handover Documentation:** Comprehensive runbooks and architecture decision records (ADRs)

### 2.4 Security Considerations

Security is implemented across five categories following AWS Well-Architected Security Pillar:

#### 1️⃣ Access Control
- **Amazon Cognito:** User authentication with JWT tokens
- **AWS IAM:** Role-based access control with least-privilege policies
- **MFA Enforcement:** Multi-factor authentication for administrative access
- **API Gateway Authorizer:** Validates JWT tokens on every API request
- **Session Management:** Automatic token expiration and refresh mechanisms

#### 2️⃣ Infrastructure Security
- **VPC Configuration:** Lambda functions in private subnets (if VPC-enabled)
- **Security Groups:** Restrictive inbound/outbound rules
- **AWS WAF:** Protection against OWASP Top 10 vulnerabilities
- **DDoS Protection:** CloudFront and AWS Shield Standard
- **Network Isolation:** Separate environments for Dev/Staging/Production

#### 3️⃣ Data Protection
- **Encryption at Rest:** 
  - S3: AES-256 encryption
  - DynamoDB: AWS-managed encryption
  - Bedrock Knowledge Bases: Encrypted by default
- **Encryption in Transit:** 
  - HTTPS/TLS 1.2+ for all API communications
  - Signed S3 URLs with expiration
- **Data Classification:** Sensitive documents tagged and access-logged
- **Multi-tenancy Isolation:** User data strictly segregated in DynamoDB and S3

#### 4️⃣ Detection & Monitoring
- **AWS CloudTrail:** All API calls logged and retained for 90 days
- **Amazon CloudWatch:** 
  - Real-time log monitoring with metric filters
  - Alarms for suspicious activities (failed auth attempts, unusual API patterns)
- **AWS Config:** Continuous compliance monitoring
- **GuardDuty (Optional):** Threat detection for AWS accounts

#### 5️⃣ Incident Management
- **Incident Response Plan:** Documented procedures for security events
- **Automated Alerts:** CloudWatch alarms notify team via SNS/Slack
- **Backup & Recovery:** 
  - S3 versioning enabled
  - DynamoDB point-in-time recovery
  - Regular backup testing
- **Audit Trail:** CloudTrail logs for forensic analysis

**Compliance & Regulatory:**

The customer will share their regulatory control validation requirements (e.g., GDPR, FERPA for educational data) as inputs. The EduQuery team will ensure all security objectives are met and documented for compliance audits.


---

## 3. Activities and Deliverables

### 3.1 Activities and Deliverables

| Project Phase | Timeline | Activities | Deliverables/Milestones | Total Man-Days |
|---------------|----------|------------|------------------------|----------------|
| **Phase 1: Foundation & Backend Core** | Week 1-4 | • Set up AWS environment (VPC, IAM Roles)<br>• Build IaC using AWS CDK<br>• Develop ingestion Lambda (file processing, Bedrock integration)<br>• Develop query Lambda (RAG pipeline, answer generation)<br>• Unit testing for Lambda functions | **Milestone 1: Backend MVP Completed**<br>• Documents can be uploaded to S3<br>• Automatic processing triggered<br>• Internal API returns answers from documents<br>• All unit tests passing | 80 man-days |
| **Phase 2: API & Security** | Week 5-7 | • Build API Gateway endpoints (/upload, /ask, /history)<br>• Integrate Amazon Cognito (registration, login, JWT)<br>• Secure endpoints with Cognito Authorizer<br>• API documentation (OpenAPI/Swagger)<br>• Integration testing with Postman | **Milestone 2: Secure API Completed**<br>• All endpoints protected by authentication<br>• Users can register/login<br>• Authenticated API calls successful<br>• API documentation published | 60 man-days |
| **Phase 3: Frontend Development** | Week 8-11 | • Design UI/UX mockups<br>• Develop React application (login, upload, chat interfaces)<br>• Integrate frontend with backend APIs<br>• Implement error handling and loading states<br>• Responsive design for mobile/tablet<br>• Frontend unit tests | **Milestone 3: Alpha Version Completed**<br>• Fully functional user interface<br>• End-to-end user flow operational<br>• Users can login, upload docs, query data<br>• Responsive across devices | 80 man-days |
| **Phase 4: Testing, Deployment & Launch** | Week 12-14 | • Comprehensive testing (unit, integration, E2E, performance)<br>• Build CI/CD pipeline (CodePipeline, CodeBuild, CodeDeploy)<br>• Deploy beta version for user testing<br>• Collect and incorporate user feedback<br>• Performance optimization<br>• Security audit<br>• Production deployment<br>• User training and documentation | **Milestone 4: Ready for Launch**<br>• All tests passing (>90% coverage)<br>• CI/CD pipeline operational<br>• Beta testing completed with feedback<br>• Production deployment successful<br>• User documentation complete<br>• System ready for end users | 60 man-days |
| **Total** | **14 weeks** | | | **280 man-days** |

**Change Management:**
- All scope changes discussed and agreed upon by team
- Change requests documented and impact-assessed (timeline, resources)
- Agile framework allows flexibility within sprint boundaries

**Communication Plan:**
- **Weekly Status Reports:** Shared with instructor/advisor every Friday
- **Sprint Reviews:** Bi-weekly demos and progress updates
- **Risk Register:** Updated weekly and reviewed in sprint planning
- **Slack Channel:** Real-time team communication
- **GitHub Projects:** Task tracking and progress visibility

**Transition Plan:**
- **Knowledge Transfer Sessions:** Conducted in Week 13-14
- **Documentation Handover:** Architecture diagrams, runbooks, API docs, user guides
- **Support Period:** 4 weeks post-launch with on-call support
- **Training:** 2-day workshop for operations team

### 3.2 Out of Scope

The following items are explicitly out of scope for this project:

- **Mobile Native Applications:** iOS/Android apps (web-responsive only)
- **Multi-language Support:** UI and NLP limited to English initially
- **Advanced Analytics Dashboard:** User behavior analytics and reporting
- **Integration with Existing LMS:** Moodle, Canvas, or other learning management systems
- **Multimodal Document Support:** Images, diagrams, handwritten notes analysis
- **Real-time Collaboration:** Multiple users editing/annotating same document
- **Offline Mode:** Application requires internet connectivity
- **Custom Foundation Model Training:** Using pre-trained Bedrock models only
- **Data Migration:** Importing existing document repositories
- **Third-party Integrations:** Google Drive, Dropbox, OneDrive connectors
- **Advanced User Management:** Role hierarchies, organizational units, approval workflows
- **Compliance Certifications:** SOC 2, ISO 27001 audits (security best practices implemented but not certified)


### 3.3 Path to Production

The initial delivery will be a **Proof of Concept (PoC)** with targeted use cases outlined in Section 1.1. While functional, it will lack certain features required for full production deployment.

**Key Gaps for Production:**

1. **Scalability Optimization:**
   - PoC tested with 1,000 users; production may require 10,000+
   - Need load testing and auto-scaling configuration refinement
   - Database query optimization for high-concurrency scenarios

2. **Advanced Error Handling:**
   - PoC has basic error handling; production needs comprehensive retry logic
   - Graceful degradation when Bedrock services are unavailable
   - User-friendly error messages for all failure scenarios

3. **Monitoring & Observability:**
   - PoC has basic CloudWatch logs; production needs custom dashboards
   - Distributed tracing with AWS X-Ray
   - Business metrics tracking (query success rate, user satisfaction)

4. **Security Hardening:**
   - PoC implements core security; production needs penetration testing
   - Regular security audits and vulnerability scanning
   - Compliance validation for specific regulations (GDPR, FERPA)

5. **Operational Excellence:**
   - Automated backup and disaster recovery procedures
   - Runbooks for common operational tasks
   - On-call rotation and incident response procedures
   - Cost optimization reviews and reserved capacity planning

6. **Feature Completeness:**
   - Multi-language support for international users
   - Advanced search filters and document management
   - User feedback mechanisms and rating system
   - Admin dashboard for system monitoring

**Production Readiness Checklist:**

- [ ] Load testing completed with 10x expected traffic
- [ ] Security audit and penetration testing passed
- [ ] Disaster recovery plan tested and documented
- [ ] Monitoring dashboards and alerts configured
- [ ] Runbooks created for all operational procedures
- [ ] User training materials and documentation finalized
- [ ] Compliance requirements validated
- [ ] Cost optimization strategies implemented
- [ ] Support team trained and ready
- [ ] Rollback procedures tested

**Estimated Timeline to Production:**
- PoC Completion: Week 14
- Production Hardening: Additional 4-6 weeks
- Full Production Launch: Week 20-22


---

## 4. Expected AWS Cost Breakdown by Services

### 4.1 Cost Overview - Two Deployment Scenarios

This project provides cost estimates for two scenarios:
1. **Free Tier / Student Version**: Minimal cost for development and testing (suitable for student projects)
2. **Production Version**: Full-scale deployment for institutional use

---

### 4.2 Scenario 1: Free Tier / Student Version (Development & Testing)

**Target Audience:** Students, small teams, proof-of-concept  
**Usage Assumptions:**
- 10-20 monthly active users (classmates, instructors)
- 500 document uploads per month
- 5,000 queries per month
- 10GB total storage
- Development/testing workload

| AWS Service | Usage Details | Estimated Cost (USD/month) | Notes |
|-------------|---------------|---------------------------|-------|
| **AWS Lambda** | • 5,500 invocations/month<br>• ~27,500 GB-seconds<br>• Well within free tier (1M requests, 400K GB-seconds) | **$0** | ✅ Free Tier covers completely |
| **Amazon API Gateway** | • 5,500 REST API requests/month<br>• Free tier: 1M requests/month | **$0** | ✅ Free Tier covers completely |
| **Amazon S3** | • 10GB storage<br>• 500 PUT requests<br>• 5,000 GET requests<br>• Free tier: 5GB storage, 2K PUT, 20K GET | **~$0.12** | Minimal overage on storage |
| **Amazon Bedrock** | **Ingestion:**<br>• 500 documents × 20 tokens = 10K tokens<br>• Titan Embeddings: $0.0001/1K tokens = $0.001<br>**Querying:**<br>• 5K queries × 15 tokens input = 75K tokens<br>• 5K queries × 500 tokens output = 2.5M tokens<br>• Titan Text (cheaper): $0.0008/1K input, $0.0016/1K output | **~$4.12** | Using Titan instead of Claude for cost savings |
| **Amazon DynamoDB** | • 100MB storage<br>• 5K read requests<br>• 500 write requests<br>• Free tier: 25GB, 25 RCU, 25 WCU | **$0** | ✅ Free Tier covers completely |
| **Amazon Cognito** | • 20 monthly active users<br>• Free tier: 50,000 MAU | **$0** | ✅ Free Tier covers completely |
| **Amazon CloudFront** | • 10GB data transfer<br>• 5K HTTPS requests<br>• Free tier: 1TB transfer, 10M requests | **$0** | ✅ Free Tier covers completely |
| **Amazon CloudWatch** | • 2GB log ingestion<br>• 5 custom metrics<br>• 5 alarms<br>• Free tier: 5GB logs, 10 metrics, 10 alarms | **$0** | ✅ Free Tier covers completely |
| **AWS Secrets Manager** | • 2 secrets stored<br>• Free tier: 30-day trial, then $0.40/secret | **$0.80** | After 30-day trial |
| **Data Transfer** | • 5GB outbound<br>• Free tier: 100GB/month | **$0** | ✅ Free Tier covers completely |
| **AWS CodePipeline** | • 1 active pipeline<br>• Free tier: 1 pipeline/month | **$0** | ✅ Free Tier covers completely |
| **Total Monthly Cost (Student Version)** | | **≈ $5.04/month** | 🎓 **Affordable for students!** |

**💡 Student Cost Optimization Tips:**
- Use **AWS Educate** or **AWS Academy** credits (typically $100-200/year)
- Leverage **12-month free tier** for new AWS accounts
- Use **Titan models** instead of Claude (10x cheaper)
- Implement aggressive caching to reduce Bedrock calls
- Clean up unused resources regularly
- Set **AWS Budget alerts** at $10/month

---

### 4.3 Scenario 2: Production Version (Institutional Deployment)

**Target Audience:** Universities, libraries, research institutions  
**Usage Assumptions:**
- 1,000 monthly active users (students, faculty, staff)
- 200,000 document uploads per month
- 2,000,000 queries per month
- 200GB total storage
- Production workload with high availability

| AWS Service | Usage Details | Estimated Cost (USD/month) | Notes |
|-------------|---------------|---------------------------|-------|
| **AWS Lambda** | • Uploads: 200K invocations × 30s × 1GB memory<br>• Queries: 2M invocations × 5s × 1GB memory<br>• Total: ~1.67M GB-seconds | **$120** | Optimized with Graviton2 processors |
| **Amazon API Gateway** | • 2.2M REST API requests/month<br>• Data transfer included | **$8** | Standard REST API pricing |
| **Amazon S3** | • 200GB storage (documents)<br>• 10GB storage (frontend)<br>• 200K PUT requests<br>• 2M GET requests | **$5** | Standard storage class with lifecycle policies |
| **Amazon Bedrock** | **Ingestion:**<br>• 200K documents × 20 tokens = 4M tokens<br>• Titan Embeddings: $0.0001/1K tokens = $0.40<br>**Querying:**<br>• 2M queries × 15 tokens input = 30M tokens<br>• 2M queries × 500 tokens output = 1B tokens<br>• Claude 3 Sonnet: $0.003/1K input + $0.015/1K output | **$440** | Premium model for better accuracy; reduced 35% via caching |
| **Amazon DynamoDB** | • 1GB storage<br>• 2M read requests<br>• 200K write requests<br>• On-demand pricing | **$15** | On-demand mode for variable workload |
| **Amazon Cognito** | • 1,000 monthly active users | **$0** | Free tier covers up to 50,000 MAU |
| **Amazon CloudFront** | • 100GB data transfer<br>• 2M HTTPS requests | **$10** | Global edge locations |
| **Amazon CloudWatch** | • 10GB log ingestion<br>• 10 custom metrics<br>• 10 alarms | **$15** | Optimized with log filtering |
| **AWS Secrets Manager** | • 5 secrets stored | **$2** | API keys and credentials |
| **Data Transfer** | • 50GB outbound to internet | **$5** | Beyond free tier |
| **OpenSearch Serverless** | • Included in Bedrock Knowledge Bases | **$0** | Managed by Bedrock |
| **AWS CodePipeline** | • 1 active pipeline | **$1** | First pipeline free, additional $1/month |
| **Total Monthly Cost (Production)** | | **≈ $621/month** | 🏢 **For 1,000 active users** |

**AWS Pricing Calculator Link:**  
[https://calculator.aws/#/estimate?id=eduquery-chatbot-production-2023](https://calculator.aws/#/estimate?id=eduquery-chatbot-production-2023)

---

### 4.4 Cost Comparison Summary

| Metric | Student Version | Production Version | Difference |
|--------|----------------|-------------------|------------|
| **Monthly Active Users** | 10-20 | 1,000 | 50-100x |
| **Monthly Queries** | 5,000 | 2,000,000 | 400x |
| **Document Uploads** | 500 | 200,000 | 400x |
| **AI Model** | Titan Text (cheaper) | Claude 3 Sonnet (premium) | Quality vs Cost |
| **Monthly Cost** | **~$5** | **~$621** | 124x |
| **Cost per User** | $0.25-0.50 | $0.62 | Economies of scale |
| **Suitable For** | PoC, Testing, Learning | Production, Enterprise | - |

---

### 4.5 Cost Optimization Strategies

#### For Student Version:
1. **AWS Credits**: Apply for AWS Educate ($100-200 free credits)
2. **Free Tier Maximization**: Stay within free tier limits for 12 months
3. **Titan Models**: Use cheaper Titan instead of Claude
4. **Aggressive Caching**: Cache 80%+ of queries
5. **Resource Cleanup**: Delete unused documents and logs regularly
6. **Budget Alerts**: Set alerts at $5, $10, $15

#### For Production Version:
1. **Reserved Capacity**: Consider Savings Plans for consistent Lambda usage
2. **Right-sizing**: Continuously monitor Lambda memory allocation
3. **CloudFront Caching**: Cache static assets and frequent API responses
4. **S3 Lifecycle**: Move old documents to Glacier after 90 days
5. **Query Optimization**: Cache frequent Bedrock queries (35% savings)
6. **Monitoring**: AWS Budgets with alerts at 80% and 100% thresholds

---

### 4.6 Scaling Considerations (Production)

**At 5,000 users (5x scale):**
- Lambda: ~$600/month
- Bedrock: ~$2,200/month
- Other services: ~$100/month
- **Total: ~$2,900/month**

**At 10,000 users (10x scale):**
- Lambda: ~$1,200/month
- Bedrock: ~$4,400/month
- Other services: ~$200/month
- **Total: ~$5,800/month**

---

### 4.7 Recommended Deployment Path

**Phase 1 (Weeks 1-14): Student Version**
- Deploy using free tier and AWS Educate credits
- Cost: **~$5/month** or **$0 with credits**
- Purpose: Development, testing, proof-of-concept
- Users: 10-20 (team members, instructors)

**Phase 2 (Months 4-6): Pilot Production**
- Scale to 100 users
- Cost: **~$80/month**
- Purpose: Beta testing with real users
- Users: 100 (selected students/faculty)

**Phase 3 (Month 7+): Full Production**
- Scale to 1,000+ users
- Cost: **~$621/month**
- Purpose: Institution-wide deployment
- Users: 1,000+ (entire university)


---

## 5. Team Structure & Responsibilities

### 5.1 Project Team Overview

| Name | Student ID | Primary Role | Secondary Role | Email/Contact Info |
|------|-----------|--------------|----------------|-------------------|
| **Dương Nguyễn Gia Huy** | SE182202 | Team Leader / Project Manager | QA Engineer + RAG/Bedrock Developer | huy.dng@example.com |
| **Đào Quang Vinh** | SE180012 | Backend Developer | DevOps Engineer | vinh.dq@example.com |
| **Nguyễn Lê Anh Quân** | SE192307 | Cloud Architect | Backend Developer (API Gateway, S3) | quan.nla@example.com |
| **Nguyễn Thanh Liêm** | SE184163 | Backend Developer | Database Specialist (DynamoDB) | liem.nt@example.com |
| **Trần Đình Phong** | SE184217 | Frontend Developer | UI/UX Designer | phong.td@example.com |

---

### 5.2 Detailed Responsibilities by Team Member

#### 👨‍💼 Dương Nguyễn Gia Huy - Team Leader / Project Manager
**Primary Responsibilities:**
- Overall project management and timeline coordination
- Team coordination and task assignment
- Progress reporting to instructor/advisor
- Risk management and mitigation strategies
- Quality assurance oversight

**Technical Responsibilities:**
- Amazon Bedrock integration (Foundation Models)
- RAG (Retrieval-Augmented Generation) pipeline implementation
- Implement text chunking and embedding generation
- Build vector search and retrieval logic
- Design comprehensive test cases (unit, integration, E2E)
- Implement automated testing with Jest/Pytest
- Perform API testing with Postman/Newman
- Conduct performance and security testing

**Deliverables:**
- Weekly progress reports and meeting minutes
- Bedrock embedding integration
- RAG pipeline implementation
- Query processing logic
- Test strategy document
- Automated test suites
- Test coverage reports (target: >80%)

---

#### 💻 Đào Quang Vinh - Backend Developer / DevOps Engineer
**Primary Responsibilities:**
- Core backend logic development
- CI/CD pipeline development
- System monitoring and deployment
- Infrastructure automation

**Technical Responsibilities:**
- Develop Lambda function for document ingestion
- Develop chat/query handler Lambda function
- Set up AWS CodePipeline for automated deployment
- Configure CloudWatch logs and metrics
- Implement AWS CDK/CloudFormation for IaC
- API response formatting and error handling
- Performance optimization

**Deliverables:**
- Document ingestion Lambda function
- Chat handler Lambda function
- CI/CD pipeline (CodePipeline, CodeBuild, CodeDeploy)
- Infrastructure as Code (AWS CDK)
- CloudWatch dashboards and alarms
- API documentation (OpenAPI/Swagger)

---

#### 🏗️ Nguyễn Lê Anh Quân - Cloud Architect
**Primary Responsibilities:**
- AWS architecture design and service selection
- Infrastructure planning and optimization
- Security architecture and IAM policies
- Technical consultation and best practices

**Technical Responsibilities:**
- Design serverless architecture (Lambda, API Gateway, S3, DynamoDB)
- Set up AWS account and IAM roles/policies
- Configure Amazon API Gateway endpoints
- Implement S3 presigned URL generation for secure uploads
- Integration oversight and technical decision-making

**Deliverables:**
- Project proposal and architecture diagrams
- AWS infrastructure design documents
- API Gateway configuration
- S3 upload handler Lambda function
- Security and IAM documentation

---

#### 🗄️ Nguyễn Thanh Liêm - Backend Developer / Database Specialist
**Primary Responsibilities:**
- Backend data management
- Database design and optimization
- Data persistence logic
- Query optimization

**Technical Responsibilities:**
- DynamoDB schema design and implementation
- Conversation history storage logic
- User metadata management
- Database query optimization
- Data access patterns implementation
- Cost monitoring for database operations

**Deliverables:**
- DynamoDB tables and access patterns
- Data persistence Lambda functions
- Database documentation
- Query optimization reports
- Data backup and recovery procedures

---

#### 🎨 Trần Đình Phong - Frontend Developer
**Primary Responsibilities:**
- User interface design and development
- Frontend-backend integration
- User experience optimization
- Responsive design implementation

**Technical Responsibilities:**
- Develop React single-page application (SPA)
- Design and implement UI/UX for chat interface
- Integrate Amazon Cognito for authentication
- Implement file upload interface with drag-and-drop
- Connect frontend to API Gateway endpoints
- Handle API responses and error states
- Deploy frontend to S3 + CloudFront

**Deliverables:**
- React application with modern UI/UX
- User authentication flow (Cognito integration)
- Document upload interface
- Chat/Q&A interface
- Responsive design for mobile/tablet
- Frontend deployment to S3/CloudFront

---


---

### 5.3 Weekly Time Commitment

| Team Member | Hours/Week | Focus Areas |
|-------------|-----------|-------------|
| **Dương Nguyễn Gia Huy** | 25-30 hours | Project Management, RAG/Bedrock Integration, QA/Testing |
| **Đào Quang Vinh** | 25-30 hours | Backend (Lambda), DevOps (CI/CD, IaC) |
| **Nguyễn Lê Anh Quân** | 25-30 hours | Architecture, Backend (API Gateway, S3) |
| **Nguyễn Thanh Liêm** | 25-30 hours | Backend (DynamoDB), Data Management |
| **Trần Đình Phong** | 25-30 hours | Frontend (React, UI/UX, Cognito) |

**Total Team Effort:** ~125-145 hours/week

---

### 5.4 Communication & Collaboration Tools

| Tool | Purpose | Frequency |
|------|---------|-----------|
| **Slack/Discord** | Daily communication, quick questions | Real-time |
| **GitHub** | Code repository, version control, issue tracking | Daily commits |
| **Google Meet/Zoom** | Sprint planning, reviews, retrospectives | 3x per week |
| **Notion/Confluence** | Documentation, meeting notes, knowledge base | Updated weekly |
| **AWS Console** | Infrastructure management | As needed |
| **Postman** | API testing and documentation | Daily (dev phase) |

---

### 5.6 Decision-Making Process

**Technical Decisions:**
- **Minor decisions** (code implementation): Individual developer autonomy
- **Medium decisions** (service selection, architecture changes): Team discussion + Huy approval
- **Major decisions** (scope changes, budget): Full team consensus + instructor approval

**Conflict Resolution:**
1. Team discussion in daily standup or dedicated meeting
2. If no consensus: Huy (Team Leader) makes final decision with input from Anh Quân (Cloud Architect)
3. Document decision rationale in GitHub or Notion


---

## 6. Resources & Cost Estimates

### 6.1 Resource Allocation

| Resource | Responsibility | Rate (USD/Hour) |
|----------|---------------|-----------------|
| **Cloud Architect / Team Leader** (1 headcount) | Architecture design, project management, stakeholder communication, technical leadership | $45 |
| **Backend Developers** (2 headcount) | Lambda functions, API development, Bedrock integration, IaC development | $35 |
| **Frontend Developer** (1 headcount) | React UI/UX, Cognito integration, responsive design | $35 |
| **QA Engineer** (1 headcount) | Test strategy, automation, quality assurance, CI/CD testing | $30 |
| **DevOps Engineer** (1 headcount) | CI/CD pipeline, monitoring, performance optimization | $35 |

*Note: DevOps role is combined with Backend Developer 2 (Ngô Đức Huy)*

### 6.2 Effort Breakdown by Phase

| Project Phase | Cloud Architect | Backend Devs (×2) | Frontend Dev | QA Engineer | DevOps | Total Hours |
|---------------|----------------|-------------------|--------------|-------------|--------|-------------|
| **Phase 1: Foundation & Backend** (Weeks 1-4) | 120h | 240h | 40h | 80h | 80h | 560h |
| **Phase 2: API & Security** (Weeks 5-7) | 80h | 160h | 40h | 80h | 60h | 420h |
| **Phase 3: Frontend Development** (Weeks 8-11) | 80h | 80h | 240h | 80h | 40h | 520h |
| **Phase 4: Testing & Launch** (Weeks 12-14) | 80h | 80h | 80h | 160h | 80h | 480h |
| **Total Hours** | **360h** | **560h** | **400h** | **400h** | **260h** | **1,980h** |

### 6.3 Cost Calculation

| Resource | Total Hours | Rate (USD/Hour) | Total Cost (USD) |
|----------|-------------|-----------------|------------------|
| Cloud Architect / Team Leader | 360h | $45 | $16,200 |
| Backend Developers (2 × 280h) | 560h | $35 | $19,600 |
| Frontend Developer | 400h | $35 | $14,000 |
| QA Engineer | 400h | $30 | $12,000 |
| DevOps Engineer | 260h | $35 | $9,100 |
| **Total Development Cost** | **1,980h** | | **$70,900** |

### 6.4 Cost Contribution Distribution

| Party | Contribution (USD) | % Contribution of Total |
|-------|-------------------|------------------------|
| **Customer (University)** | $35,450 (50%) | 50% |
| **Partner (Development Team)** | $28,360 (40%) | 40% |
| **AWS (Credits/Sponsorship)** | $7,090 (10%) | 10% |
| **Total** | **$70,900** | **100%** |

*Note: AWS contribution assumes participation in AWS Activate or similar program providing credits*

### 6.5 Ongoing Operational Costs

| Category | Description | Estimated Cost (USD/month) |
|----------|-------------|---------------------------|
| **AWS Infrastructure** | Lambda, Bedrock, S3, DynamoDB, etc. (see Section 4) | $621 |
| **Maintenance & Support** | ~10% of one engineer's time for monitoring, updates, bug fixes | $280 |
| **Total Monthly Operational Cost** | | **≈ $901/month** |

### 6.6 Total Project Investment

#### Student Version (Development Phase)
| Cost Category | Amount (USD) |
|---------------|--------------|
| **Development Cost** (4 students × 3.5 months × $0) | $0 |
| **AWS Infrastructure** (3.5 months × $5) | $17.50 |
| **AWS Educate Credits** | -$100 (covers 20 months) |
| **Total Student Phase Cost** | **$0** (covered by credits) |

#### Production Version (Post-Graduation)
| Cost Category | Amount (USD) |
|---------------|--------------|
| **One-time Development Cost** | $70,900 |
| **First Year Operational Cost** (12 months × $621) | $7,452 |
| **Total First Year Investment** | **$78,352** |

### 6.7 Return on Investment (ROI) Analysis

#### Student Version ROI
**Educational Value:**
- **Team members:** 5 students
- **Learning outcomes:** AWS certification-ready skills, real-world project experience
- **Portfolio value:** Professional project for resumes and interviews
- **Cost:** **$0** (covered by AWS Educate credits)
- **ROI:** **Infinite** (zero cost, high educational value)

#### Production Version ROI
**Value Generation:**
- **Number of users:** 1,000 students
- **Average time saved per user:** 3 hours/week
- **Total time saved:** 1,000 × 3 hours × 4 weeks = **12,000 hours/month**
- **Assumed value per hour (opportunity cost):** $1.25/hour (student time value)
- **Total value generated:** 12,000 × $1.25 = **$15,000/month**

**ROI Calculation:**
- **Monthly value:** $15,000
- **Monthly cost:** $621
- **Monthly net benefit:** $15,000 - $621 = **$14,379/month**
- **Annual net benefit:** $14,379 × 12 = **$172,548/year**
- **Payback period:** $70,900 / $14,379 ≈ **5 months**
- **First-year ROI:** ($172,548 - $78,352) / $78,352 = **120%**

**Conclusion:**  
- **Student Phase:** Zero-cost learning experience with high educational value
- **Production Phase:** Strong financial viability with 5-month payback and 120% first-year ROI


---

## 7. Acceptance

### 7.1 Acceptance Process

Upon completion of each Phase (as defined in Section 3.1), the EduQuery Team will submit the associated tangible Deliverables to the Customer, accompanied by an **Acceptance Form** (see Appendix A).

**Acceptance Period:**  
Upon submission, the Customer will review, evaluate, and/or test the applicable Deliverable(s) within **eight (8) business days** (the "Acceptance Period") to determine whether each Deliverable satisfies the acceptance criteria for that particular phase in all material respects.

### 7.2 Acceptance Confirmation

If the Deliverable satisfies its acceptance criteria in all material respects, the Customer will furnish a **written acceptance confirmation** to the EduQuery Team via the Acceptance Form prior to the end of the Acceptance Period.

### 7.3 Rejection Process

For a Deliverable that is not accepted due to a non-conformity or defect, the Customer will indicate the **detailed reasons for rejection** on the Acceptance Form and return it together with the associated tangible rejected Deliverables, if any, to the EduQuery Team (a "Rejection Notice") within the Acceptance Period.

### 7.4 Remediation Process

Upon receipt of a Rejection Notice, the EduQuery Team will **promptly correct any defects or non-conformities** to the extent required so that each Deliverable satisfies the requirements of this Project Plan and its acceptance criteria in all material respects.

Thereafter, the EduQuery Team will **resubmit a modified Deliverable** to the Customer, accompanied by the Acceptance Form, and the process set forth above will be repeated.

However, the Customer will limit its review, evaluation, and/or test of each resubmitted Deliverable to:
1. Determining whether the EduQuery Team has corrected the defects or non-conformities identified in the Rejection Notice
2. Assessing the effects or impact which the corrections or modifications have on other Deliverables or other portions of the same Deliverable

### 7.5 Deemed Acceptance

If the Customer **fails to provide** the EduQuery Team with a Rejection Notice prior to the end of the applicable Acceptance Period, then the corresponding Deliverable(s) are **deemed accepted**.

### 7.6 Phase-Specific Acceptance Criteria

#### Phase 1: Foundation & Backend Core
- [ ] Documents successfully upload to Amazon S3
- [ ] S3 events trigger Lambda ingestion handler
- [ ] Documents are parsed, chunked, and embedded in Bedrock Knowledge Base
- [ ] Query Lambda retrieves relevant chunks and generates answers
- [ ] Unit tests achieve >80% code coverage
- [ ] All automated tests pass

#### Phase 2: API & Security
- [ ] API Gateway endpoints operational (/upload, /ask, /history)
- [ ] Amazon Cognito user registration and login functional
- [ ] JWT tokens properly validated on all protected endpoints
- [ ] Postman collection demonstrates successful authenticated API calls
- [ ] API documentation published and accessible
- [ ] Security audit checklist completed

#### Phase 3: Frontend Development
- [ ] React application deployed to S3 and accessible via CloudFront
- [ ] Users can register and login through UI
- [ ] Document upload interface functional
- [ ] Chat interface displays questions and answers correctly
- [ ] Application responsive on desktop, tablet, and mobile
- [ ] Frontend unit tests achieve >70% coverage
- [ ] End-to-end user flow operational

#### Phase 4: Testing, Deployment & Launch
- [ ] All unit, integration, and E2E tests passing
- [ ] Test coverage >85% for backend, >70% for frontend
- [ ] CI/CD pipeline successfully deploys to Dev, Staging, and Production
- [ ] Performance testing shows p95 response time <3 seconds
- [ ] Security audit completed with no critical findings
- [ ] Beta testing completed with at least 50 users
- [ ] User feedback incorporated into final release
- [ ] Documentation complete (architecture, runbooks, user guides)
- [ ] Knowledge transfer sessions conducted
- [ ] Production deployment successful

### 7.7 Final Project Acceptance

Upon successful acceptance of all Phase 4 deliverables, the project will be considered **complete and accepted**. The Customer will provide a **Final Project Acceptance Certificate** confirming:
- All deliverables meet acceptance criteria
- System is operational in production environment
- Documentation and knowledge transfer completed
- Support transition plan in place


---

## 8. Risk Management

### 8.1 Risk Register

| No. | Risk Type | Description | Impact Level | Probability | Priority | Mitigation Strategy |
|:---:|-----------|-------------|--------------|-------------|----------|---------------------|
| 1 | **Technical** | Inaccurate AI responses (Hallucination) - Foundation models may generate answers not grounded in document content | High | Medium | High | • Apply prompt engineering to ensure responses based on context only<br>• Display source chunks with answers for verification<br>• Use latest Foundation Models on Bedrock<br>• Implement confidence scoring |
| 2 | **Technical** | Slow vector query performance - k-NN searches may exceed acceptable latency | Medium | Low | Medium | • Use Amazon OpenSearch Serverless (optimized by AWS)<br>• Optimize chunk size and metadata for efficient filtering<br>• Implement caching for frequent queries<br>• Monitor and tune index parameters |
| 3 | **Security** | Leakage of sensitive data from documents - Unauthorized access to confidential information | Very High | Low | High | • Encrypt data at rest (S3, DynamoDB, Bedrock) and in transit (HTTPS/TLS)<br>• Enforce least-privilege IAM policies<br>• Implement multi-tenancy isolation<br>• Regular security audits<br>• Data classification and access logging |
| 4 | **Business** | Users may reject the product - Low adoption due to unfamiliarity with AI tools | High | Medium | High | • Develop in iterative phases with early user feedback<br>• Focus on simple, intuitive UI/UX<br>• Conduct training sessions and demos<br>• Communicate clear value proposition<br>• Provide excellent onboarding experience |
| 5 | **Operational** | AWS costs exceed budget - Bedrock usage higher than estimated | High | Medium | Medium | • Set up AWS Budgets with automated alerts<br>• Monitor costs daily via AWS Cost Explorer<br>• Implement query caching to reduce Bedrock calls<br>• Choose cost-optimized Foundation Models<br>• Set usage quotas per user |
| 6 | **Project** | Delays due to complex technical issues - Bedrock integration or RAG pipeline challenges | Medium | Medium | Medium | • Apply Agile methodology for adaptive planning<br>• Identify risks early in PoC stage<br>• Allocate buffer time in timeline<br>• Maintain close communication with AWS support<br>• Have backup technical approaches ready |
| 7 | **Technical** | Lambda cold start latency - First invocation delays affecting user experience | Medium | Medium | Low | • Implement Lambda provisioned concurrency for critical functions<br>• Optimize Lambda package size<br>• Use Lambda SnapStart (if available for runtime)<br>• Set appropriate timeout values |
| 8 | **Compliance** | Regulatory requirements not met - GDPR, FERPA, or institutional policies | High | Low | Medium | • Early engagement with compliance team<br>• Document data handling procedures<br>• Implement data retention and deletion policies<br>• Provide user data export capabilities<br>• Regular compliance reviews |
| 9 | **Operational** | Bedrock service availability - Regional outages or service disruptions | Medium | Low | Low | • Implement graceful degradation<br>• Display clear error messages to users<br>• Consider multi-region deployment for critical production<br>• Monitor AWS Service Health Dashboard |
| 10 | **Business** | Insufficient training data - Limited document uploads in early stages | Low | Medium | Low | • Seed system with sample academic documents<br>• Incentivize early adopters to upload content<br>• Partner with library to digitize popular resources |

### 8.2 Contingency Plans

#### If AI Hallucination Becomes Severe:
- **Immediate:** Switch to displaying retrieved text snippets instead of synthesized answers
- **Short-term:** Experiment with different Foundation Models on Bedrock (e.g., Claude vs. Titan)
- **Long-term:** Implement answer validation pipeline with confidence thresholds

#### If Bedrock Costs Become Too High:
- **Immediate:** Implement aggressive caching and rate limiting
- **Short-term:** Limit free queries per user per month (e.g., 50 queries/month)
- **Long-term:** Introduce tiered pricing model (free tier + paid subscriptions)

#### If User Adoption is Low:
- **Immediate:** Conduct user interviews to identify barriers
- **Short-term:** Simplify UI, add tutorial videos, offer incentives
- **Long-term:** Pivot to different user segments or use cases

#### If Project Timeline Slips:
- **Immediate:** Prioritize MVP features, defer nice-to-haves
- **Short-term:** Add temporary resources or extend team hours
- **Long-term:** Negotiate timeline extension with stakeholders

#### If Security Breach Occurs:
- **Immediate:** Activate incident response plan, isolate affected systems
- **Short-term:** Conduct forensic analysis, notify affected users
- **Long-term:** Implement additional security controls, conduct third-party audit

### 8.3 Risk Monitoring

- **Weekly Risk Review:** Team reviews risk register in sprint planning
- **Monthly Stakeholder Update:** High-priority risks communicated to sponsors
- **Automated Monitoring:** CloudWatch alarms for cost, performance, and error thresholds
- **Quarterly Risk Assessment:** Comprehensive review with updated probability and impact ratings


---

## 9. Expected Outcomes and Success Metrics

### 9.1 Key Performance Indicators (KPIs)

#### Technical Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **API Response Time (p95)** | < 3 seconds per query | CloudWatch metrics, custom dashboards |
| **System Error Rate** | < 0.1% | CloudWatch Logs Insights, error tracking |
| **Retrieval Accuracy (RAG)** | 90% (top 3 chunks contain correct answer) | Manual evaluation on test dataset (100 queries) |
| **System Uptime** | 99.5% | CloudWatch synthetic monitoring |
| **Lambda Cold Start Time** | < 1 second | CloudWatch Lambda Insights |
| **Document Processing Time** | < 60 seconds for 10-page PDF | Custom CloudWatch metrics |

#### Business Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **User Adoption Rate** | 500 MAU within 3 months | DynamoDB query logs, Cognito analytics |
| **User Retention Rate** | 60% weekly return rate | DynamoDB user activity tracking |
| **Customer Satisfaction (NPS)** | +40 or higher | In-app surveys, quarterly feedback forms |
| **Query Success Rate** | 85% of queries receive satisfactory answers | User feedback buttons (thumbs up/down) |
| **Average Queries per User** | 20 queries/month | DynamoDB analytics |
| **Document Upload Rate** | 200 documents/month | S3 event metrics |

#### Impact Metrics

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|-------------------|
| **Average Search Time** | 8 minutes | < 1 minute | User surveys, time-on-task studies |
| **Time Saved per User** | 0 hours | 3 hours/week | User surveys, usage analytics |
| **Research Quality** | Baseline score | +20% improvement | Faculty assessment of student work |
| **User Satisfaction** | Baseline score | +40% improvement | Pre/post implementation surveys |

### 9.2 Business Benefits

#### Short-term (0–6 months)
- **Productivity Gains:** Students and researchers save 3-5 hours per week on information retrieval
- **Enhanced Engagement:** Increased interaction with academic materials through conversational interface
- **Early Adopter Advantage:** Institution recognized as innovator in AI-driven education
- **Proof of Concept:** Validated RAG architecture for future AI applications

#### Medium-term (6–18 months)
- **Quality Improvement:** Measurable enhancement in quality of essays, reports, and research papers
- **Knowledge Ecosystem:** Rich dataset of queries and documents for learning analytics
- **Expanded Use Cases:** Adoption by additional departments (administrative, legal, HR)
- **Cost Savings:** Reduced time spent by library staff on reference questions

#### Long-term (18+ months)
- **Institutional Reputation:** Strengthened position as leader in AI-driven education
- **Platform Expansion:** Foundation for multimodal AI, LMS integration, advanced analytics
- **Revenue Opportunities:** Potential commercialization or licensing to other institutions
- **Research Opportunities:** Dataset for educational AI research and publications

### 9.3 Technical Improvements

- **Cloud Maturity:** Transition from experimental prototype to production-grade enterprise system
- **Serverless Expertise:** Team gains deep knowledge of AWS serverless architecture
- **AI/ML Capabilities:** Hands-on experience building Generative AI applications with Amazon Bedrock
- **DevOps Excellence:** Established CI/CD pipeline and IaC practices for future projects
- **Security Posture:** Implemented comprehensive security controls and compliance framework

### 9.4 Long-term Value Creation

The EduQuery platform creates a flexible foundation for future enhancements:

**Potential Future Features:**
- **Multimodal Support:** Analyze images, diagrams, and charts in documents
- **LMS Integration:** Seamless connection with Moodle, Canvas, Blackboard
- **Advanced Analytics:** AI-powered recommendations, knowledge gap identification
- **Collaborative Features:** Shared document collections, team workspaces
- **Mobile Applications:** Native iOS and Android apps
- **Multi-language Support:** International student support
- **Voice Interface:** Voice-based queries and answers
- **Citation Generation:** Automatic bibliography creation

**Scalability Path:**
- Current: 1,000 users, single institution
- Year 1: 5,000 users, multiple departments
- Year 2: 10,000+ users, consortium of institutions
- Year 3+: Commercial SaaS offering

### 9.5 Success Criteria Summary

The project will be considered successful if:

✅ **Technical:** System meets all performance, reliability, and security targets  
✅ **Business:** Achieves user adoption and satisfaction goals  
✅ **Financial:** Delivers positive ROI within 6 months  
✅ **Impact:** Demonstrates measurable improvement in learning efficiency and research quality  
✅ **Strategic:** Positions institution as leader in AI-driven education


---

## 10. Appendices

### Appendix A: Acceptance Form Template

```
PROJECT DELIVERABLE ACCEPTANCE FORM

Project Name: EduQuery - RAG-based Chatbot System on AWS
Phase: [Phase Number and Name]
Deliverable: [Deliverable Name]
Submission Date: [Date]
Review Period: [Start Date] to [End Date]

ACCEPTANCE CRITERIA CHECKLIST:
[ ] All functional requirements met
[ ] All technical specifications satisfied
[ ] Documentation complete and accurate
[ ] Testing completed with passing results
[ ] Security requirements validated
[ ] Performance targets achieved

ACCEPTANCE DECISION:
[ ] ACCEPTED - All criteria met, deliverable approved
[ ] REJECTED - See deficiencies listed below

DEFICIENCIES (if rejected):
1. _______________________________________________________
2. _______________________________________________________
3. _______________________________________________________

REVIEWER INFORMATION:
Name: _______________________
Title: _______________________
Signature: ___________________
Date: _______________________

NOTES:
_____________________________________________________________
_____________________________________________________________
```

### Appendix B: Technical Specifications

#### B.1 Development Environment
- **Programming Languages:** Python 3.11 (backend), JavaScript/TypeScript (frontend)
- **Frontend Framework:** React 18 with TypeScript
- **Infrastructure as Code:** AWS CDK v2
- **Version Control:** Git with GitHub
- **Package Management:** npm (frontend), pip (backend)

#### B.2 AWS Services Configuration
- **Lambda Runtime:** Python 3.11, 1GB memory, 15-minute timeout
- **API Gateway:** REST API with Cognito Authorizer
- **S3:** Standard storage class, versioning enabled, encryption at rest
- **DynamoDB:** On-demand capacity mode, point-in-time recovery enabled
- **Bedrock Models:** 
  - Embedding: amazon.titan-embed-text-v1
  - Generation: anthropic.claude-3-sonnet-20240229-v1:0
- **CloudFront:** Standard distribution, HTTPS only, custom domain

#### B.3 Security Specifications
- **Encryption at Rest:** AES-256 for S3, DynamoDB, Bedrock
- **Encryption in Transit:** TLS 1.2+ for all communications
- **Authentication:** Amazon Cognito with JWT tokens
- **Authorization:** IAM roles with least-privilege policies
- **Session Management:** 1-hour token expiration, refresh tokens valid for 30 days
- **Password Policy:** Minimum 8 characters, complexity requirements

#### B.4 Performance Specifications
- **API Response Time:** p50 < 1s, p95 < 3s, p99 < 5s
- **Document Processing:** < 60 seconds for 10-page PDF
- **Concurrent Users:** Support 100 concurrent users
- **Throughput:** 1,000 queries per minute
- **Availability:** 99.5% uptime (excluding planned maintenance)

### Appendix C: AWS Pricing Calculator

**Detailed Cost Estimation:**  
[AWS Pricing Calculator Link: https://calculator.aws/#/estimate?id=eduquery-chatbot-2023]

**Assumptions:**
- Region: us-east-1 (N. Virginia)
- 1,000 monthly active users
- 200,000 document uploads/month
- 2,000,000 queries/month
- 200GB document storage
- 90-day log retention

**Service-by-Service Breakdown:**
- See Section 4.1 for detailed monthly cost breakdown

### Appendix D: Architecture Diagrams

#### D.1 High-Level Architecture
![High-Level Architecture](Images/architecture_diagram.png)

#### D.2 Data Flow Diagrams
- **Document Upload Flow:** User → API Gateway → Presign Lambda → S3 → Ingestion Lambda → Bedrock
- **Query Flow:** User → API Gateway → Chat Lambda → Bedrock Knowledge Base → Foundation Model → Response

#### D.3 Network Diagram
- **Public Subnet:** CloudFront, API Gateway
- **Private Subnet:** Lambda functions (if VPC-enabled)
- **AWS Managed Services:** S3, DynamoDB, Bedrock, Cognito

#### D.4 Security Architecture
- **Perimeter Security:** WAF, CloudFront
- **Application Security:** API Gateway, Cognito
- **Data Security:** Encryption, IAM policies
- **Monitoring:** CloudWatch, CloudTrail

### Appendix E: References

#### E.1 AWS Documentation
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Amazon Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [Amazon API Gateway Security](https://docs.aws.amazon.com/apigateway/latest/developerguide/security.html)

#### E.2 Industry Research
- Gartner: "Hype Cycle for Generative AI, 2023"
- McKinsey: "The Economic Potential of Generative AI"
- Forrester: "The State of AI in Higher Education"

#### E.3 Academic Studies
- "Impact of AI-Powered Tools on Student Learning Outcomes" (Journal of Educational Technology, 2023)
- "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Lewis et al., 2020)
- "Measuring the Effectiveness of AI Chatbots in Academic Settings" (EdTech Research, 2023)

#### E.4 Best Practices
- [AWS Serverless Application Lens](https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/)
- [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)
- [Prompt Engineering Guide for Foundation Models](https://www.promptingguide.ai/)

### Appendix F: Glossary

| Term | Definition |
|------|------------|
| **RAG** | Retrieval-Augmented Generation - AI architecture combining information retrieval with text generation |
| **Foundation Model** | Large pre-trained AI model (e.g., Claude, GPT) capable of various language tasks |
| **Embedding** | Vector representation of text enabling semantic similarity search |
| **k-NN** | k-Nearest Neighbors - algorithm for finding similar vectors |
| **Serverless** | Cloud computing model where infrastructure is fully managed by provider |
| **IaC** | Infrastructure as Code - managing infrastructure through code rather than manual processes |
| **JWT** | JSON Web Token - standard for secure authentication |
| **MAU** | Monthly Active Users - unique users who interact with system in a month |
| **p95** | 95th percentile - metric where 95% of values are below this threshold |
| **NPS** | Net Promoter Score - customer satisfaction metric (-100 to +100) |

---

---

**End of Document**
