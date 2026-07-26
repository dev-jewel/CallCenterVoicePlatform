using System.Data;
using Microsoft.Data.SqlClient;

namespace CallCenter.Infrastructure.Data;

public interface IDapperConnectionFactory
{
    IDbConnection CreateConnection();
}

public sealed class DapperConnectionFactory(string connectionString) : IDapperConnectionFactory
{
    public IDbConnection CreateConnection() => new SqlConnection(connectionString);
}
