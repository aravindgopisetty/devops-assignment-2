### Stage 1: Build stage
FROM python:3.9-slim as builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#### Stage 2: Runtime
FROM python:3.9-slim
WORKDIR /app

### Copy site-packages 
COPY --from=builder /usr/local /usr/local

COPY . .
RUN useradd --create-home --shell /bin/bash app
RUN chown -R app:app /app
USER app

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

