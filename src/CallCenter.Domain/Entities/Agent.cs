using CallCenter.Domain.Enums;

namespace CallCenter.Domain.Entities;

public sealed class Agent
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string EmployeeNumber { get; set; }
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public AgentStatus Status { get; set; } = AgentStatus.Offline;
    public DateTimeOffset CreatedAtUtc { get; init; } = DateTimeOffset.UtcNow.AddHours(6);
}
