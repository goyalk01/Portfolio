FROM python:3.10-slim

WORKDIR /app

COPY agents/requirements.txt ./agents/
RUN pip install --no-cache-dir -r agents/requirements.txt

COPY . .

WORKDIR /app/agents
EXPOSE 8000
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
