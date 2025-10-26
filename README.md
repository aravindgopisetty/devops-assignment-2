# Kommalas — Movie ticket booking (end-to-end demo)

This repository contains a single-page frontend (`kommalas.html`, `styles.css`) and a minimal Node.js + Express backend (`server.js`) that serves the site and provides simple booking APIs. It is designed for learning Docker, CI/CD (Jenkins), and Kubernetes orchestration.

## Contents
- `kommalas.html` — single-page frontend (UI + client-side logic)
- `styles.css` — site styles
- `server.js` — Express server + API endpoints
- `bookings.json` — simple file-based booking persistence
- `Dockerfile`, `.dockerignore` — containerization
- `README.md` — this file
- `kommalas_overview.md` — marketing copy and microcopy

## Quick start — Node.js
1. Install Node.js (LTS) and npm.
2. From the project folder run:

```powershell
npm install
npm start
```

3. Open http://localhost:3000 in your browser.

## Quick start — Docker (no Node required)
1. Build the image:

```powershell
docker build -t kommalas:local .
```

2. Run the container:

```powershell
docker run --rm -p 3000:3000 kommalas:local
```

3. Open http://localhost:3000

## Project contract (short)
- Inputs: user selects movie/time, enters name and seats; frontend POSTs JSON to `/api/book`.
- Outputs: Booking object with id and createdAt. Bookings readable from `/api/bookings`.
- Error modes: missing fields -> 400; backend unavailable -> frontend falls back to localStorage.

## API (server)
- GET /api/movies — returns movies and showtimes
- GET /api/bookings — returns list of bookings (reads `bookings.json`)
- POST /api/book — create a booking, body: { movie, lang, time, seats, name }
- DELETE /api/bookings — clear bookings

## Version control & GitFlow (commands)
Use Git and GitFlow to manage the repo. Example commands (PowerShell):

```powershell
# initialize repo
git init
git add .
git commit -m "chore: initial Kommalas project"

# create develop branch
git checkout -b develop

# feature branch example
git checkout -b feature/add-dockerfile develop
# work, then
git add .; git commit -m "feat: add Dockerfile"
git checkout develop
git merge --no-ff feature/add-dockerfile

# create a release
git checkout -b release/1.0.0 develop
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "v1.0.0"
git checkout develop
git merge --no-ff release/1.0.0
```

## Containerization (Docker)
- Build image:

```powershell
docker build -t <dockerhub-username>/kommalas:0.1.0 .
```

- Push to Docker Hub (after login):

```powershell
docker login
docker push <dockerhub-username>/kommalas:0.1.0
```

## CI/CD (Jenkins) — pipeline overview
You can create a Declarative Jenkins pipeline that does the following stages:
- Checkout code (from GitHub)
- Run lint/tests (add tests as needed)
- Build Docker image and tag with build number
- Login to Docker Hub and push image
- Deploy/update Kubernetes Deployment (kubectl set image) or use a manifest with updated image

Sample `Jenkinsfile` (paste into repo root)

```groovy
pipeline {
  agent any
  environment {
    IMAGE = "<dockerhub-username>/kommalas"
    TAG = "0.1.${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build') { steps { sh 'docker build -t $IMAGE:$TAG .' } }
    stage('Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login --username $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE:$TAG'
        }
      }
    }
    stage('Deploy to k8s') {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONF')]) {
          sh 'export KUBECONFIG=$KUBECONF; kubectl set image deployment/kommalas kommalas=$IMAGE:$TAG --record'
        }
      }
    }
  }
}
```

## Jenkins setup notes
- Run Jenkins (Docker):

```powershell
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```
- Install plugins: Pipeline, GitHub, Docker Pipeline, Credentials Binding, Kubernetes CLI (kubectl).
- Add credentials: GitHub token, Docker Hub username/password (`dockerhub-creds`), kubeconfig file credential (`kubeconfig`).
- Configure a Multibranch Pipeline pointing to your GitHub repo, or a Pipeline job that uses the `Jenkinsfile` in the repo.

## Docker Hub integration
- Create a repo on Docker Hub named `kommalas` under your username.
- Store Docker Hub credentials inside Jenkins as `dockerhub-creds` (username/password) and reference them in the pipeline.

## Kubernetes manifests (example)
Create `k8s/deployment.yaml` and `k8s/service.yaml`. Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kommalas
spec:
  replicas: 2
  selector:
    matchLabels:
      app: kommalas
  template:
    metadata:
      labels:
        app: kommalas
    spec:
      containers:
      - name: kommalas
        image: <dockerhub-username>/kommalas:0.1.0
        ports:
        - containerPort: 3000
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
```

Service (NodePort for local cluster):

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kommalas
spec:
  type: NodePort
  selector:
    app: kommalas
  ports:
  - port: 3000
    targetPort: 3000
    nodePort: 30080
```

## Scaling
- Scale replicas:

```powershell
kubectl scale deployment/kommalas --replicas=5
kubectl get pods -l app=kommalas
```

## Horizontal Pod Autoscaler (optional)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: kommalas-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: kommalas
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50
```

## Push to GitHub (example)
```powershell
git remote add origin https://github.com/<youruser>/kommalas.git
git push -u origin develop
```

## README screenshots and submission
- Add screenshots to `docs/` and reference them in the README. For assignment submission include:
  - Commit history / branch view screenshot
  - Docker Hub image/tags screenshot
  - Jenkins pipeline run screenshot showing stages
  - `kubectl get pods` showing multiple replicas
  - App running in browser screenshot

## Troubleshooting
- If Jenkins can't push images: ensure Docker daemon is available where the pipeline runs, or use Kaniko/buildx inside k8s.
- If HPA doesn't scale: ensure `metrics-server` is installed in the cluster.

## Next steps I can do for you
- Create a `Jenkinsfile` in the repo and a `k8s/` folder with manifests (I can add these now).
- Initialize a git repository in this folder and prepare branch structure (I can do this and show commands).
- Push the project to GitHub (I can prepare the exact commands; you'll need to create the remote repo or give me a URL).

If you want me to add the Jenkinsfile + k8s manifests and initialize git now, tell me and I'll proceed.
