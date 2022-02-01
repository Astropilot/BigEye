# Dockerfile
FROM python:3.9

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential postgresql gcc g++ python3-dev musl-dev curl libxslt-dev openssl \
    && apt-get clean

WORKDIR /app/

RUN pip install --upgrade pip && pip install uwsgi

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY ./pyproject.toml ./poetry.lock* /app/

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false
RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --no-dev ; fi"

COPY . /app
ENV PYTHONPATH=/app
