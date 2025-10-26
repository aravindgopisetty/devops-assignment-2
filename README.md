🚀 Overview of Devops assignment 2

This project showcases the end-to-end automation of a modern DevOps pipeline for a web-based application.

Here’s how the workflow operates:

A developer pushes the latest code updates or new features to the develop branch in GitHub.

A GitHub webhook immediately notifies the Jenkins server about the new commit.

Jenkins automatically triggers the CI/CD pipeline.

The pipeline builds a new Docker image of the application.

The image is tagged and pushed to Docker Hub, serving as the container registry.

Jenkins then connects to the Kubernetes cluster and updates the application deployment with the latest image.

Kubernetes performs a rolling update, ensuring that the new version is deployed seamlessly without any downtime.

🧰 Tech Stack Used

Version Control: Git & GitHub

Containerization: Docker and Docker Hub

Continuous Integration / Delivery: Jenkins

Orchestration & Deployment: Kubernetes (via Docker Desktop)

🖥 Project Overview

The Movie Ticket Booking Portal is a lightweight static application where users can book tickets and view booking details.

The project demonstrates:

Git & GitHub for version control

Docker for containerization

Jenkins for automated CI/CD

Docker Hub for image storage

Kubernetes for deployment and scaling
<img width="1919" height="1029" alt="Screenshot 2025-10-26 201943" src="https://github.com/user-attachments/assets/851031a9-e2b4-4523-b37b-cc18543754e3" />
<img width="1902" height="1013" alt="Screenshot 2025-10-26 201958" src="https://github.com/user-attachments/assets/14624c9d-8852-4f37-b33f-71a93c8b1f06" />
<img width="1909" height="916" alt="Screenshot 2025-10-26 202014" src="https://github.com/user-attachments/assets/be68b9f7-56ec-4f39-a566-659e145a1270" />
