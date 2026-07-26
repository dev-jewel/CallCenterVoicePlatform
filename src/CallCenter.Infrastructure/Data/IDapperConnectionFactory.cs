using System.Data;

namespace CallCenter.Infrastructure.Data;

public interface IDapperConnectionFactory
{
    IDbConnection CreateConnection();
}
