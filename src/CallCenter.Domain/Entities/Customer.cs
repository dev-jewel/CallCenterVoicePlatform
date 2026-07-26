namespace CallCenter.Domain.Entities;

public sealed class Customer
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string ExternalCrmId { get; set; }
    public required string DisplayName { get; set; }
    public string? PrimaryPhoneNumber { get; set; }
    public DateTimeOffset CreatedAtUtc { get; init; } = DateTimeOffset.UtcNow;
}
