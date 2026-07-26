# API Design

The public portal API is versioned under `/api/v1`, JSON over HTTPS, and protected by bearer tokens. Commands use request validation and return problem details on failure; list endpoints are paginated and filtered. OpenAPI is generated from controllers.

| Endpoint | Purpose |
| --- | --- |
| `POST /api/v1/auth/login` | Development skeleton token issue; production integrates enterprise identity |
| `GET,POST /api/v1/agents` | List and administer agents |
| `POST /api/v1/calls/outbound` | Start an authorized outbound-call command |
| `POST /api/v1/telephony/events` | Authenticated PBX webhook ingress |
| `GET /api/v1/queues/{id}/snapshot` | Supervisor queue snapshot |
| `GET /health` | Liveness/readiness health endpoint |

Synchronous APIs are for user interaction. CRM synchronization, recording indexing, and future AI tasks use durable events with correlation IDs, idempotency keys, retry policy and dead-letter monitoring. Internal contract versions are explicit so adapters evolve independently.
