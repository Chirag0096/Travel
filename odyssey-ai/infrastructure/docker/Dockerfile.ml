FROM python:3.11-slim
WORKDIR /app
COPY . .
CMD ["sh", "-c", "echo Build ml container here"]

