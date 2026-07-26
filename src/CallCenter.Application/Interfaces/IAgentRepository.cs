using CallCenter.Domain.Entities;

namespace CallCenter.Application.Interfaces;

public interface IAgentRepository
{
    Task<IReadOnlyList<Agent>> ListAsync(CancellationToken cancellationToken);
    Task AddAsync(Agent agent, CancellationToken cancellationToken);
}
