using CallCenter.Domain.Entities;

namespace CallCenter.Application.DTOs;

public sealed record AgentDto(Guid Id, string EmployeeNumber, string DisplayName, string Email, AgentStatus Status);
public sealed record CreateAgentRequest(string EmployeeNumber, string DisplayName, string Email);
