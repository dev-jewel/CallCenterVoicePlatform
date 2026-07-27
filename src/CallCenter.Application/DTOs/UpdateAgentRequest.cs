using CallCenter.Domain.Enums;

namespace CallCenter.Application.DTOs;

public sealed record UpdateAgentRequest(string EmployeeNumber, string DisplayName, string Email, AgentStatus Status);
