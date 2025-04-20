FROM python:3.11-slim

WORKDIR /tourist_project

# Cài curl
RUN apt-get update && apt-get install -y curl

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# CMD ["gunicorn", "--config", "gunicorn_config.py", "app:app"]

CMD ["python", "run_dev.py"]