# Database Design

SQL Server is the system of record for transactional metadata. Recordings remain in object storage; the database stores immutable references, hashes, retention, and access audit.

| Entity | Key relationships |
| --- | --- |
| Agent | belongs to Team; has Skills and Presence events |
| CustomerReference | maps local identity to CRM external ID |
| Queue | belongs to Team; uses QueueSkill rules |
| Campaign | owns outbound call policies and Call records |
| Call | references CustomerReference, Agent, Queue, Campaign and Recording |
| CallEvent | append-only lifecycle event for a Call |
| Recording | references Call and object storage URI; has retention state |
| AuditEvent | immutable actor/action/resource history |
| OutboxMessage | durable integration event with status and retry fields |

Use GUID keys, UTC timestamps, optimistic concurrency where configuration is contested, unique external IDs, and indexes on call start time, agent/status, queue/status, CRM ID, and outbox processing status. Partition/archive call-event and recording metadata by time as volume grows.
