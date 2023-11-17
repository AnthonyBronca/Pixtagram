#! /bin/bash

SCHEMA_NAME="pixtagram_schema"

flask db upgrade
flask seed all

gunicorn --bind 0.0.0.0:5000 app:app
