using CallCenter.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CallCenter.Infrastructure.Data;

public sealed class CallCenterDbContext(DbContextOptions<CallCenterDbContext> options) : DbContext(options)
{
    public DbSet<Agent> Agents => Set<Agent>();
    public DbSet<Customer> Customers => Set<Customer>();
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Agent>(entity => { entity.HasKey(x => x.Id); entity.Property(x => x.EmployeeNumber).HasMaxLength(32).IsRequired(); entity.HasIndex(x => x.EmployeeNumber).IsUnique(); entity.Property(x => x.DisplayName).HasMaxLength(160).IsRequired(); entity.Property(x => x.Email).HasMaxLength(256).IsRequired(); });
        builder.Entity<Customer>(entity => { entity.HasKey(x => x.Id); entity.Property(x => x.ExternalCrmId).HasMaxLength(128).IsRequired(); entity.HasIndex(x => x.ExternalCrmId).IsUnique(); entity.Property(x => x.DisplayName).HasMaxLength(160).IsRequired(); entity.Property(x => x.PrimaryPhoneNumber).HasMaxLength(32); });
    }
}
