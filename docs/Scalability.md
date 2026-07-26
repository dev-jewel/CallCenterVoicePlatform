# Scalability and Availability

At 50+ agents, deploy two stateless API instances behind a reverse proxy, one SQL Server primary with tested backup, a PBX/SBC pair where carrier design permits, and centralized logs. At 500+ agents, scale API instances horizontally, use Redis for presence/cache/rate limits, RabbitMQ for asynchronous workloads, separate reporting reads, partition time-series call data, and move recordings to resilient object storage.

## High availability and load balancing
Use health-checked L7 load balancing with no API session affinity; JWT and distributed state remove node dependence. Keep PBX/SBC redundancy independent from the web tier. SQL Server HA, recording-store replication, carrier failover numbers, and a documented degraded mode are architecture decisions subject to infrastructure budget. Capacity test concurrent calls, websocket connections, CRM dependency latency, and queue-routing latency before each growth milestone.

## Monitoring
Track call attempts/completions/failures, queue wait and abandonment, agent presence, PBX webhook latency, CRM error rate, recording pipeline lag, SQL saturation, message backlog and dead-letter count. Alert on user-impacting SLO burn, not only host CPU. Correlate every call through portal, PBX, CRM, recording and event logs with a call/correlation ID.
