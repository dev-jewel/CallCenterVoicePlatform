namespace CallCenter.Infrastructure.Crm;

public sealed record CrmCustomer(
    string ExternalId,
    string DisplayName
);