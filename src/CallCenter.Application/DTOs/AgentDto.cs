using CallCenter.Domain.Enums;

namespace CallCenter.Application.DTOs;

public sealed record AgentDto(
    Guid Id,
    string EmployeeNumber,
    string DisplayName,
    string Email,
    AgentStatus Status);
