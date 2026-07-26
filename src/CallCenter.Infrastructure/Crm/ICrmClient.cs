namespace CallCenter.Infrastructure.Crm;

public interface ICrmClient
{
    Task<CrmCustomer?> FindCustomerAsync(string phoneNumber, CancellationToken cancellationToken);
}
