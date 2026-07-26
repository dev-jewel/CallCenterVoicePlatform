namespace CallCenter.Application.DTOs;

public sealed record CreateAgentRequest(string EmployeeNumber, string DisplayName, string Email);
