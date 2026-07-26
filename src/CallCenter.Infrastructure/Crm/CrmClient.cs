using System.Net.Http.Json;

namespace CallCenter.Infrastructure.Crm;

public interface ICrmClient { Task<CrmCustomer?> FindCustomerAsync(string phoneNumber, CancellationToken cancellationToken); }
public sealed record CrmCustomer(string ExternalId, string DisplayName);
public sealed class CrmClient(HttpClient client) : ICrmClient
{
    public async Task<CrmCustomer?> FindCustomerAsync(string phoneNumber, CancellationToken cancellationToken)
    {
        using var response = await client.GetAsync($"customers/by-phone/{Uri.EscapeDataString(phoneNumber)}", cancellationToken);
        return response.IsSuccessStatusCode ? await response.Content.ReadFromJsonAsync<CrmCustomer>(cancellationToken) : null;
    }
}
