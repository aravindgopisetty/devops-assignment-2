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
