# AI Readiness

AI is not part of the MVP. The architecture prepares for it by retaining consent and recording metadata, producing immutable call events, storing recordings by reference, and publishing a versioned `CallCompleted` event. An isolated AI worker can consume a copy of permitted audio, create a transcript/summary/QA score with model/version/provenance, and write derived artifacts separately from the original call record.

AI agent assistance and routing remain advisory until measurable quality, bias, latency, privacy, and human-override controls are accepted. The design requires consent policy enforcement before export, encryption in transit/at rest, prompt/data minimization, retention deletion propagation, evaluation datasets, audit trails, and an on-premises/approved-provider deployment decision. Routing recommendations must expose confidence and reason codes and always permit supervisor override.
