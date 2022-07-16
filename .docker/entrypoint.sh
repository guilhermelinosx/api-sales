#!/bin/bash

yarn install
yarn typeorm migration:run -d src/shared/infra/typeorm
yarn start