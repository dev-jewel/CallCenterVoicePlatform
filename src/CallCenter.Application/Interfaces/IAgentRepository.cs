using CallCenter.Domain.Entities;

namespace CallCenter.Application.Interfaces;

public interface IAgentRepository
{
    Task<IReadOnlyList<Agent>> ListAsync(CancellationToken cancellationToken);
    Task<Agent?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task AddAsync(Agent agent, CancellationToken cancellationToken);
    Task UpdateAsync(Agent agent, CancellationToken cancellationToken);
    Task DeleteAsync(Agent agent, CancellationToken cancellationToken);
}
