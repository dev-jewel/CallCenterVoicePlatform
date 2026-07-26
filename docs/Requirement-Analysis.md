# Requirement Analysis

## Context and goals
The company is replacing a third-party call-center product with an on-premises platform using BTCL numbers and CRM APIs. The business needs reliable inbound and outbound communication, fair call distribution, agent and team visibility, recordings, quality assurance, and a controlled route to future AI. Success means a secure MVP for 50+ agents that can grow to 500+ agents, multiple teams, campaigns, and higher call volume without rewriting core domain rules.

## Stakeholders
| Stakeholder | Decision or need |
| --- | --- |
| Executive sponsor | Cost, service quality, risk and roadmap outcomes |
| Contact-center manager | Queues, teams, campaigns, service levels and reporting |
| Agents and supervisors | Usable desktop, presence, call controls and coaching |
| Customers | Reliable, respectful, timely communication |
| CRM owner | Stable data contract, ownership and data-quality controls |
| IT operations and security | On-premises operation, identity, backup, monitoring and access control |
| BTCL/PBX provider | Number provisioning, SIP trunks, codec, capacity and incident path |
| Compliance/legal | Recording consent, retention, access and audit requirements |

## Assumptions
BTCL connectivity is exposed through a SIP-compatible carrier/PBX; the CRM has authenticated APIs and stable customer IDs; staff use modern browsers and managed headsets; recording consent and retention policy will be approved before production; production has redundant network, compute, and backup capacity. These assumptions are validation items, not settled facts.

## Functional requirements
1. Authenticate users and authorize agent, supervisor, administrator, and QA roles.
2. Maintain agents, teams, skills, queues, campaigns, dispositions and schedules.
3. Receive inbound calls, identify the caller through CRM, route by queue/skill/availability, and surface a screen-pop.
4. Initiate governed outbound calls, associate them with a customer and campaign, and record the outcome.
5. Track a call lifecycle, transfers, holds, callbacks, dispositions, recording metadata and audit events.
6. Provide live supervisor queue/agent visibility and historical operational and quality reports.
7. Store recordings outside the transaction database and protect playback by authorization and audit.
8. Synchronize call activity to CRM reliably with retries and idempotency.

## Non-functional requirements
| Area | Initial target |
| --- | --- |
| Availability | 99.9% monthly for the web/control plane, with PBX failover separately agreed |
| Performance | 95% of portal API reads under 300 ms excluding CRM/PBX latency |
| Security | TLS, JWT/OIDC integration path, least privilege, secrets outside source control, audited recording access |
| Reliability | Idempotent events, retry/backoff, durable outbox and dead-letter handling for integrations |
| Observability | Structured logs, metrics, traces, health checks and alert runbooks |
| Recovery | Tested backup restore; defined RPO/RTO after stakeholder agreement |
| Maintainability | Clean dependency direction, versioned APIs and automated CI |

## Risks and mitigations
Carrier/PBX ambiguity is the highest technical risk; validate it with a SIP proof of connectivity. CRM latency/outages require timeouts, circuit breaking and queued sync. Recording policy and customer consent require legal sign-off. Load uncertainty requires call-volume measurement and capacity tests. Scope growth is contained through an explicit MVP and phased roadmap.

## Out of scope for MVP
Predictive dialing, workforce management, billing, native mobile apps, multilingual IVR, advanced QA automation, AI transcription/summary/assistance, cross-region active-active operation, and replacing CRM customer-master ownership are excluded.
