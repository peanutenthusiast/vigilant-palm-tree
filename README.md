## Project Summary

This project uses the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository as a baseline to create a Device Readings API that allows storing and fetching of device readings.

Navigate to src/device-readings to: 
- view the controller, service, module files, as well as their corresponding unit tests.
- the dto/ folder which exposes the Data Transfer Objects for each endpoint
- the entities/ folder which exposes the Reading entity

The test/app.e2e-spec.ts contains the integration tests for the API.

## Startup Instructions

Run the below command to install necessary dependencies.
```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Visit 'localhost:3000/api' to peruse the Swagger documentation for the API.

At a high level, the API exposes two endpoints:
- POST '/device-readings'
- GET '/device-readings/:id'

To execute the unit and integration test suites, run the below commands (after running npm install)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Reflection

### What roadblocks did you run into when writing your code (i.e., where did you spend the bulk of your time)?

I spent the bulk of my time working on tests and validation to ensure yellow, red, and green paths for each endpoint were sufficiently handled. While the opinionated nature of the framework allowed easier code modularization, I spent a lot of time checking documentation, StackOverflow, etc. to ensure NestJs's validation library handled the API's particular edge cases. In doing so, relying on the framework's capabilities and automation (various decorators for validation, Swagger documentation) was a primary roadblock in writing the code.

Too much reliance on the framework's capabilities could lead to future development issues. While I used `ValidationPipe` and various validation decorators to handle bad requests, more specific use cases may render this library obsolete. The same goes for the '@nestjs/swagger'. While it made generating API documentation much easier, I spent a lot of time investigating the library's usage to properly annotate endpoints, DTO's, etc. Certain development teams may prefer more flexibility with the libraries and frameworks. However, the specifications for this project were simple enough to validate use of the framework.


### If you had more time, what part of your project would you refactor? What other tradeoffs did you make?

With more time, I would consider refactoring the implementation of `device-readings.service` to be more performant and scalable. The file uses an internal Map data structure to track device id's and readings, and readings also use a Map to store timestamp and count respectively. However, the use of `Array.prototype.sort` can, at worst cases, result in O(n^2) runtime, so other data structures (e.g. a Sorted Map) may be more appropriate should 1) sorted readings be a requirement for the `GET /device-readings/:id` endpoint and 2) the API needs to handle a larger load of users. Albeit, if 2) is true, this API might consider use of database technologies, e.g. Redis or MongoDB, which is out of scope for this project. 

I would also add more integration tests to handle more complicated use cases, such as multiple updates for readings with preexisting timestamps, more malformed data, and successfull 200 responses for the fetch readings endpoint. I would also add more specific and helpful error message to guide the user to consume the API correctly, as well as injecting a logger to indicate warning messages at the server level (e.g. "You cannot update the count for a preexisting timestamp.")

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
