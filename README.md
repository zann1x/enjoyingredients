![CI Status](https://github.com/zann1x/enjoyingredients/workflows/CI/badge.svg)

# enjoyingredients

## Prerequisites

- Docker is installed

## Local development setup

``` bash
$ docker-compose -f docker-compose.node.yml run --rm node
$ docker-compose up -d
$ ./install-db.sh
```

The website is running on ``localhost:3000``. \
The CMS is accessible via ``localhost:8090``. \
The database is accessible via ``localhost:3306``.
