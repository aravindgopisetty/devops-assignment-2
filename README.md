# 🚀 Overview of Devops assignment 2

This project showcases the end-to-end automation of a modern DevOps pipeline for a web-based application.

Here’s how the workflow operates:

A developer pushes the latest code updates or new features to the develop branch in GitHub.

A GitHub webhook immediately notifies the Jenkins server about the new commit.

Jenkins automatically triggers the CI/CD pipeline.

The pipeline builds a new Docker image of the application.

The image is tagged and pushed to Docker Hub, serving as the container registry.

Jenkins then connects to the Kubernetes cluster and updates the application deployment with the latest image.

Kubernetes performs a rolling update, ensuring that the new version is deployed seamlessly without any downtime.

## 🧰 Tech Stack Used

Version Control: Git & GitHub

Containerization: Docker and Docker Hub

Continuous Integration / Delivery: Jenkins

Orchestration & Deployment: Kubernetes (via Docker Desktop)

# 🖥 Project Overview

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

# 🧭 Version Control and Branching (Git)

Effective version control is the backbone of this DevOps workflow. Git ensures that every code change is tracked, collaborative development is smooth, and rollbacks are simple if needed.

## 🪄 Process:

A local Git repository is initialized to manage the source code.

The repository is connected to GitHub for remote collaboration and backup.

The GitFlow branching strategy is used to maintain clean and stable code throughout the development lifecycle.
<img width="1919" height="1079" alt="Screenshot 2025-10-26 202711" src="https://github.com/user-attachments/assets/7be10c7b-6c75-4ef4-8e1e-044f8fdcc57d" />
# 🐳 Containerization (Docker)

Containerization ensures that the application runs consistently across all environments by packaging the code, dependencies, and configuration into a lightweight container image.

## 🧰 Why Docker?

Eliminates “works on my machine” issues.

Ensures consistent runtime environments.

Speeds up deployment and scaling.

Integrates seamlessly with CI/CD pipelines.

## 🪄 Process:

A Dockerfile is created to define how the application should be built and run inside a container.

Using Docker, the application is packaged into an image.

The image is tagged and pushed to Docker Hub, acting as the central image registry.

The containerized app can be deployed anywhere — local machine, cloud, or Kubernetes cluster.
# ☸️ Kubernetes Deployment
Start Minikube
minikube start

 Apply manifests
kubectl apply -f k8s/

Verify pods & services
kubectl get pods
kubectl get services
Scale replicas:

kubectl scale deployment ticket-booking-flask --replicas=3
Delete deployment:

kubectl delete -f k8s/
# 🔁 Continuous Integration (Jenkins)

Jenkins is the backbone of the automated CI/CD pipeline. It continuously integrates new code, builds the application, and deploys it to the Kubernetes cluster — all without manual intervention.

The entire process is defined and managed through the Jenkins pipeline (Jenkinsfile).

## 🧰 Jenkins Setup Steps

Install Jenkins

Jenkins can be installed locally or using its official Docker image.

Install Required Plugins

Go to Manage Jenkins → Manage Plugins and install:

Docker Pipeline

Kubernetes CLI

Credentials Binding

Add Credentials (Manage Jenkins → Manage Credentials)

Docker Hub

Kind: Username with password

ID: docker-hub-cred-id (must match Jenkinsfile)

Username: Your Docker Hub username

Password: Your Docker Hub password or access token

Kubernetes Config

Kind: Secret file

ID: kubeconfig-file (must match Jenkinsfile)

File: Upload your local kubeconfig (e.g., C:\Users\<YOUR_USER>\.kube\config)

🏗️ Pipeline Stages (Defined in Jenkinsfile)
1. Source Code Checkout

Jenkins automatically fetches the latest code from the develop branch using Pipeline script from SCM.

This ensures that every commit is immediately built and tested.

2. Docker Image Build

Executes docker build to package the application into an image.

The image is tagged with both:

A unique build number (e.g., username/ticket-app:16)

The latest tag for easy deployment.

3. Push Image to Docker Hub

Jenkins logs in to Docker Hub using the stored credentials (docker-hub-cred-id).

Both the build-specific and latest images are pushed to the repository.

4. Deploy to Kubernetes

Jenkins authenticates with the Kubernetes cluster using the kubeconfig-file secret.

The image tag in deployment.yaml is dynamically updated to reflect the new build.

The pipeline applies the updated manifests to the cluster using:

kubectl apply -f deployment.tmp.yaml
kubectl apply -f service.yaml


TLS verification is skipped for local clusters (optional).

Finally, Jenkins waits for the deployment to complete successfully with:

kubectl rollout status deployment/<deployment-name>
<img width="1609" height="760" alt="Screenshot 2025-10-26 203146" src="https://github.com/user-attachments/assets/a5ed4d2d-d015-40a5-b530-18253a227667" />





