# Implementation Plan

## Source Analysis

The assignment requires a solution architecture and requirement-analysis deliverable for an on-premises call center platform. The platform must use BTCL-provided numbers, integrate with an existing CRM over APIs, support more than 50 agents initially, and evolve to more than 500 agents across teams and campaigns. The evaluation explicitly emphasizes stakeholder questions, MVP judgement, scalable design, AI readiness, and deployment planning.

This repository therefore demonstrates a production-oriented foundation rather than a complete business application. Calling, CRM, recording, and AI implementations are represented by stable boundaries and contracts; they are not simulated as finished operational features.

## Delivery Sequence

1. Establish repository conventions, solution topology, and this plan.
2. Create the four-project .NET 8 Clean Architecture solution with dependency direction: Domain <- Application <- Infrastructure <- API. Persistence and telephony are Infrastructure modules, not separate projects.
3. Add minimal, executable vertical slices for agent listing and authentication, plus EF Core, Dapper, JWT, validation, mapping, structured logging, error handling, health checks, and OpenAPI.
4. Create a minimal Angular workspace with login, dashboard, agent feature, routing, auth guard, interceptor, typed API service, and shared UI shell.
5. Write the complete planning set: requirements, questions, MVP, design, database, API, scale, AI, and deployment.
6. Create architecture, deployment, ERD, and sequence diagrams in Mermaid and editable Draw.io XML, then render PNG counterparts.
7. Add local Docker Compose and GitHub Actions CI.
8. Restore and build the backend, validate the Angular TypeScript build where dependencies are available, parse Mermaid sources, and inspect the repository for incomplete markers.

## Architectural Decisions

| Decision | Rationale |
| --- | --- |
| Modular monolith first | Keeps the 50-agent MVP operationally simple while preserving module boundaries for later extraction. |
| ASP.NET Core .NET 8 | LTS baseline with a mature ecosystem and predictable on-premises support. |
| SQL Server plus EF Core and Dapper | EF Core owns transactional writes and migrations; Dapper is reserved for report-oriented read queries. |
| RabbitMQ event boundary | Decouples non-critical work such as CRM activity sync, recording indexing, and later AI jobs. |
| Redis optional boundary | Supports ephemeral presence, cache, rate limits, and distributed coordination once horizontal scale requires it. |
| SIP/PBX adapter | Prevents the business model from depending on a BTCL carrier or a single PBX implementation. |
| Object storage for recordings | Avoids storing large media blobs in the transactional database. |

## Completion Criteria

* Every requested repository area exists and has meaningful content.
* The backend solution compiles without application code stubs.
* Documentation makes assumptions, excluded MVP work, risks, and decisions explicit.
* Diagrams are valid Mermaid and editable Draw.io XML, with PNG renderings included.
* The repository includes repeatable local setup, container orchestration, and CI instructions.
