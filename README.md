# Call Center Voice Platform

An enterprise architecture skeleton for an on-premises call-center platform using BTCL telephone numbers and CRM APIs. It intentionally demonstrates a safe foundation rather than a complete business product.

## Architecture

Angular portals call an ASP.NET Core modular monolith. Clean Architecture keeps business rules independent of database, CRM, and PBX details. SQL Server stores transactional metadata; recording media belongs in object storage. RabbitMQ and Redis boundaries support future scale.

![Architecture](diagrams/architecture.png)

## Layout

* `src/`: exactly four .NET 8 projects: `CallCenter.API`, `CallCenter.Application`, `CallCenter.Domain`, and `CallCenter.Infrastructure`.
* `frontend/`: Angular portal skeleton.
* `Architecture_Design_Document.md`: complete requirement analysis and architecture decisions.
* `diagrams/`: Mermaid, editable Draw.io XML, and PNG views.
* `docker/`: local orchestration.

## Run locally

1. Start SQL Server locally (SQL Server Express/Developer, LocalDB, or your own instance) and set `ConnectionStrings__CallCenter` as an environment variable.
2. Run `dotnet run --project src/CallCenter.API`.
3. In `frontend/callcenter-angular`, run `npm install` then `npm run start`.
4. Browse API documentation at the URL printed by ASP.NET Core (normally `http://localhost:5294/swagger`).

## Docker for publishing

Docker is not required for normal local development. The [API Dockerfile](src/CallCenter.API/Dockerfile) and [Compose file](docker/docker-compose.yml) are deployment assets for creating and publishing a container image when you are ready to deploy.

## Documentation and roadmap

The complete architecture set is in `Architecture_Design_Document.md`. Next phases validate BTCL/PBX connectivity, implement prioritized MVP modules, add durable events/load testing, then introduce AI only after consent, privacy and evaluation controls are accepted.

## Assignment note

This is an architecture and planning submission. Routing algorithms, recording ingestion, CRM write-back and AI processing are represented as contracts and documented design rather than falsely represented as finished production workflows.
