---
title: "Week 8 Worklog"
date: "2025-10-27"
weight: 1
chapter: false
pre: " <b> 1.8. </b> "
---

### Week 8 Objectives:

* Practice connecting to and managing EC2 instances using various methods (RDP Client, Fleet Manager, SSH).
* Learn and configure database sources (SQL Server, Oracle) and perform schema conversion to Aurora MySQL.
* Gain hands-on experience with AWS migration tools, including creating migration tasks, endpoints, and troubleshooting.
* Understand and use AWS CLI for account, region, and resource management.
* Explore backup, restore, and resource cleanup processes on AWS.

### Tasks to be carried out this week:
| Day | Task                                                                                                                                                                                                   | Start Date | Completion Date | Reference Material                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | --------------- | ----------------------------------------- |
| 2   | - Learn database concept <br> - Learn Amazon RDS and Amazon Aurora                                                                                                   | 10/27/2025 | 10/27/2025      | 
| 3   | - Learn about Redshift and elasticache <br>&emsp; **Practice:** <br>&emsp; + Create a VPC <br>&emsp; + Create EC2, RDS security group <br>&emsp; + Create DB subnet group <br>&emsp; + Create EC2 instance <br>&emsp; Create RDS database instance                                              | 10/28/2025 | 10/28/2025      | <https://000005.awsstudygroup.com/> |
| 4   | - Deploy application <br> - Backup, restore & clean up resources <br> - **Practice:** <br>&emsp; + EC2 Connect Fleet Manager <br>&emsp; + EC2 Connect RDP Client <br>&emsp; + SQLSrv Src Config | 10/29/2025 | 10/29/2025      | <https://000043.awsstudygroup.com/> <br> <https://000005.awsstudygroup.com/>
| 5   | - Oracle connect SrcDB <br>&emsp; + Oracle config SrcDB <br> - Drop constraint <br> - **Practice:** <br>&emsp; + MSSQL to aur MySQL target config <br>&emsp; + MSSQL to aur MySQL create project <br>&emsp; + MSSQL to aur MySQL SchemConv <br>&emsp; + Oracle2 MySQL Schema conversion 1 | 10/30/2025 | 10/30/2025      | <https://000043.awsstudygroup.com/> |
| 6   | - **Practice:** <br>&emsp; + Create Mig Task And Endpoint <br>&emsp; + Inspect S3 <br>&emsp; + Create Severless Migration <br>&emsp; + Create event not <br>&emsp; + Logs <br>&emsp; + Troubleshoot Test Scenario Mem Pressure | 10/31/2025 | 10/31/2025      | <https://000043.awsstudygroup.com/> |


### Week 8 Achievements:

* Successfully connected to EC2 instances using both RDP Client and Fleet Manager.
* Configured SQL Server and Oracle as source databases, and set up Aurora MySQL as the migration target.
* Completed schema conversion and migration projects from MSSQL/Oracle to Aurora MySQL, including troubleshooting and constraint management.
* Practiced creating migration tasks, endpoints, and serverless migrations; monitored logs and events.
* Used AWS CLI for resource management and verified account, region, and EC2 information.
* Performed backup, restore, and cleanup of AWS resources as part of the migration workflow.
