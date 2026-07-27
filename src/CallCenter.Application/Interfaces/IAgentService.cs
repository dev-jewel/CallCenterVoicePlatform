using CallCenter.Application.DTOs;

namespace CallCenter.Application.Interfaces;

public interface IAgentService
{
    Task<IReadOnlyList<AgentDto>> ListAsync(CancellationToken cancellationToken);
    Task<AgentDto> CreateAsync(CreateAgentRequest request, CancellationToken cancellationToken);
    Task<AgentDto?> UpdateAsync(Guid id, UpdateAgentRequest request, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
