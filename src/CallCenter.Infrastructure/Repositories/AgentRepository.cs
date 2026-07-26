using CallCenter.Application.Interfaces;
using CallCenter.Domain.Entities;
using CallCenter.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CallCenter.Infrastructure.Repositories;

public sealed class AgentRepository(CallCenterDbContext context) : IAgentRepository
{
    public async Task<IReadOnlyList<Agent>> ListAsync(CancellationToken cancellationToken) => await context.Agents.AsNoTracking().OrderBy(x => x.DisplayName).ToListAsync(cancellationToken);
    public async Task AddAsync(Agent agent, CancellationToken cancellationToken) { context.Agents.Add(agent); await context.SaveChangesAsync(cancellationToken); }
}
