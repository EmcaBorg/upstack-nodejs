# Node.js exercise UpStack
NodeJS Employees API (Express, Typescript, PostgreSQL, Docker)

## Development server
Run `make run` (Mac) or `docker-compose up --build --detach` (Windows) to build and run an application `http://localhost:3001/`.

## Running unit and integration tests
Run `make test` (Mac) or `docker compose -f docker-compose.yml -f docker-compose.test.yml up --build` to execute the unit and integration tests

## API 
- GET /employees/all
- GET /employees/search/:name
- POST /employees/save

- GET /roles/all
- GET /roles/search/:code
- POST /roles/save

## Postman collection
https://www.getpostman.com/collections/12a6a0fd8b3a6cca618f