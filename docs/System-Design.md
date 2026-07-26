# System Design

The solution begins as a four-project modular monolith: Angular portals call an ASP.NET Core API whose modules enforce clean boundaries. `Domain` contains rules; `Application` contains use cases and interfaces; `Infrastructure` contains SQL Server, Dapper, CRM, recording, and SIP/PBX adapters; `API` is the composition and HTTP boundary. SQL Server holds authoritative transactional data; object storage holds recordings. RabbitMQ is introduced for durable asynchronous integration, and Redis is optional for ephemeral state at scale.

## Major components
* Agent portal: authenticated desktop for presence, caller context and call outcomes.
* Admin/supervisor portal: configuration, live operations and reporting.
* API/application modules: identity, agent administration, routing, calls, recording metadata and reporting.
* Telephony adapter: carrier/PBX-specific ingress and command boundary.
* CRM adapter: customer lookup and durable call-activity synchronization.
* Recording service: secure object-store lifecycle and authorization checks.
* Observability: Serilog, metrics, traces, health checks, alerting.

## Core data flows
Inbound: BTCL -> SBC/PBX -> telephony adapter -> routing module -> selected agent; CRM lookup provides screen-pop; lifecycle events update SQL and publish an outbox event; recording metadata is saved and CRM sync runs asynchronously. Outbound follows the inverse command path after authorization and campaign/consent validation.
