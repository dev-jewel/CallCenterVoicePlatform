# Deployment Strategy

## Environments
Development uses Docker Compose, mockable CRM/PBX adapters, synthetic data and non-production secrets. Staging mirrors production topology sufficiently for integration, security, restore, and load testing. Production uses segregated network zones, managed secrets, TLS, redundant API/PBX paths, protected SQL/object storage, and least-privilege service identities.

## CI/CD and rollback
CI restores, builds, tests, scans dependencies, validates diagrams/docs, builds immutable container images and publishes versioned artifacts. CD promotes the exact artifact through staging to production with approval and health checks. Database changes are backward-compatible expand/migrate/contract releases. Rollback selects the last known-good image; a migration rollback is only used when explicitly tested, otherwise forward-fix restores compatibility.

## Backup and recovery
Perform encrypted SQL full/differential/log backups to a separate failure domain; version recordings and configuration; test restore at an agreed cadence. Document and rehearse RPO/RTO, carrier failover, CRM outage, message backlog recovery, and credential compromise runbooks.
