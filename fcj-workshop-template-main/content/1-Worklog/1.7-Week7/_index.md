---
title: "Week 7 Worklog"
date: "2025-10-19"
weight: 1
chapter: false
pre: " <b> 1.7. </b> "
---

### Week 7 Objectives:

* Understand and practice AWS Identity and Access Management (IAM), including users, groups, roles, and policies.
* Learn how to configure permissions and access control for secure resource management.
* Implement AWS Key Management Service (KMS) for data encryption and test integration with S3.
* Enable AWS CloudTrail for auditing activities and use Amazon Athena to query log data.
* Explore EC2 instance creation and tagging, and manage instance policies through IAM.
* Gain experience in applying security restrictions (by IP, time, and role switching) for IAM users.

### Tasks to be carried out this week:
| Day | Task                                                                                                                                                                                                   | Start Date | Completion Date | Reference Material                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | --------------- | ----------------------------------------- |
| 2   | - Initiating access to EC2 console in AWS Region - Tokyo, North Virginia <br> - Proceed to create EC2 instance when there are no and qualified Tags <br> - Edit resource EC2 and check policy <br> - Create restriction policy                                                                                                  | 10/19/2025 | 10/19/2025      | <https://000030.awsstudygroup.com/> <br> <https://000028.awsstudygroup.com/> |
| 3   | - Create IAM Limited user <br> - Test IAM User Limits <br> - Create Policy and Role <br> - Create Group and User <br> - Create KMS <br> - Create bucket <br> - Upload data to S3                                             | 10/20/2025 | 10/20/2025      | <https://000033.awsstudygroup.com/> |
| 4   | - Create CloudTrail <br> - Logging to CloudTrail & Create Amazon Athena <br> - Retrieve data with Athena **Practice:** <br>&emsp; + Test and share encrypted data on S3 <br>&emsp; + Create IAM Group <br> &emsp; + Create IAM Users | 10/21/2025 | 10/21/2025      | <https://000044.awsstudygroup.com/> <br> <https://000033.awsstudygroup.com/> |
| 5   | - Check permission <br>&emsp; + Create admin IAM role <br>&emsp; + Configure switch role <br>&emsp; + Limit switch role by IP <br>&emsp; + Limit switch role by time                            | 10/22/2025 | 10/22/2025      | <https://cloudjourney.awsstudygroup.com/> |
| 6   | - **Practice:** <br>&emsp; + Create EC2 instance <br>&emsp; + Create S3 bucket <br>&emsp; + Generate IAM user and access key <br>&emsp; + Create IAM role and using IAM role                                                                                     | 10/23/2025 | 10/23/2025      | <https://000048.awsstudygroup.com/> |


### Week 7 Achievements:

* Successfully created and configured an EC2 instance in multiple AWS Regions (Tokyo and North Virginia).
* Set up IAM users, groups, and roles, applied custom policies, and verified permission restrictions.
* Implemented KMS key creation and tested encryption with data uploaded to an S3 bucket.
* Deployed and validated CloudTrail logging, connected it to Athena, and successfully queried activity logs.
* Tested role-based access control (RBAC) by limiting switch roles through IP address and time-based conditions.
* Enhanced understanding of AWS resource security, policy configuration, and compliance monitoring in a real cloud environment.
