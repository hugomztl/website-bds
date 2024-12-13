FROM python:3.14.0a2-alpine3.21

RUN ["pip", "install", "selenium", "python-dotenv"]

COPY cronjobs /etc/crontabs/root

COPY license_generator.py /usr/sbin/

COPY .env /usr/sbin/

CMD ["crond", "-f", "-d", "8"]