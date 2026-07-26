using CallCenter.Application.Interfaces;
using CallCenter.Application.Services;
using CallCenter.Infrastructure.Crm;
using CallCenter.Infrastructure.Data;
using CallCenter.Infrastructure.Repositories;
using CallCenter.Infrastructure.Security;
using CallCenter.Infrastructure.Telephony;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CallCenter.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var baseAddress = configuration["Crm:BaseUrl"]
            ?? "https://crm.invalid/";

        var connectionString = configuration.GetConnectionString("CallCenter")
            ?? throw new InvalidOperationException(
                "Connection string 'CallCenter' is required.");

        services.AddDbContext<CallCenterDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddHttpClient<ICrmClient, CrmClient>(client =>
        {
            client.BaseAddress = new Uri(baseAddress);
        });
        services.AddSingleton<IDapperConnectionFactory>(_ =>
          new DapperConnectionFactory(connectionString));

        services.Configure<JwtOptions>(
          configuration.GetSection(JwtOptions.SectionName));

        services.AddScoped<IAgentRepository, AgentRepository>();
        services.AddScoped<IAgentService, AgentService>();
        services.AddSingleton<ITelephonyGateway, TelephonyGateway>();
        services.AddSingleton<ITokenService, JwtTokenService>();

        return services;
    }
}