FROM --platform=amd64 node:16 as frontend

WORKDIR /react-app

COPY ./react-app/package*.json .

RUN npm install

COPY ./react-app .

RUN npm run build


# Start with the python:3.9 image
FROM --platform=amd64 python:3.9
# REACT_APP_BASE_URL -> Your deployment URL
ENV REACT_APP_BASE_URL=https://pixtagram.herokuapp.com/
# FLASK_APP -> entry point to your flask app
ENV FLASK_APP=app
# FLASK_ENV -> Tell flask to use the production server
ENV FLASK_ENV=production
# SQLALCHEMY_ECHO -> Just set it to true
ENV SQLALCHEMY_ECHO=True
# Set the directory for upcoming commands to /var/www
ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}

ARG S3_BUCKET
ENV S3_BUCKET=${S3_BUCKET}

ARG S3_KEY
ENV S3_KEY=${S3_KEY}

ARG S3_SECRET
ENV S3_SECRET=${S3_SECRET}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG SCHEMA=pixtagram_schema
ENV SCHEMA=${SCHEMA}

WORKDIR /var/www
# Copy all the files from your repo to the working directory
COPY Procfile .
COPY requirements.txt .
COPY migrations ./migrations
COPY .flaskenv .
COPY app ./app

RUN pip install -r requirements.txt
RUN pip install psycopg2[binary]


COPY --from=frontend /react-app/build/* ./app/static/

# Start the flask environment by setting our
# closing command to gunicorn app:app
COPY bin ./bin
EXPOSE 5000
CMD ["bash", "./bin/start.sh"]
