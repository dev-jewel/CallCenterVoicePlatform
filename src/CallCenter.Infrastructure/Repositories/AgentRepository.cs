using CallCenter.Application.Interfaces;
using CallCenter.Domain.Entities;
using CallCenter.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CallCenter.Infrastructure.Repositories;

public sealed class AgentRepository(CallCenterDbContext context) : IAgentRepository
{
    public async Task<IReadOnlyList<Agent>> ListAsync(
        CancellationToken cancellationToken)
    {
        return await context.Agents
            .AsNoTracking()
            .OrderBy(x => x.DisplayName)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(
        Agent agent,
        CancellationToken cancellationToken)
    {
        context.Agents.Add(agent);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<Agent?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await context.Agents.FirstOrDefaultAsync(a => a.Id == id, cancellationToken);
    }

    public async Task UpdateAsync(Agent agent, CancellationToken cancellationToken)
    {
        context.Agents.Update(agent);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Agent agent, CancellationToken cancellationToken)
    {
        context.Agents.Remove(agent);
        await context.SaveChangesAsync(cancellationToken);
    }
}