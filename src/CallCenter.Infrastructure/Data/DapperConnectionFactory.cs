using System.Data;
using Microsoft.Data.SqlClient;

namespace CallCenter.Infrastructure.Data;

public sealed class DapperConnectionFactory(string connectionString) : IDapperConnectionFactory
{
    public IDbConnection CreateConnection()
    {
        return new SqlConnection(connectionString);
    }
}
