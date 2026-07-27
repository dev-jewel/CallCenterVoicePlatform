using AutoMapper;
using CallCenter.Application.DTOs;
using CallCenter.Application.Interfaces;
using CallCenter.Domain.Entities;

namespace CallCenter.Application.Services;

public sealed class AgentService(IAgentRepository repository, IMapper mapper) : IAgentService
{
    public async Task<IReadOnlyList<AgentDto>> ListAsync(CancellationToken cancellationToken)
    {
        return mapper.Map<IReadOnlyList<AgentDto>>(await repository.ListAsync(cancellationToken));
    }

    public async Task<AgentDto> CreateAsync(CreateAgentRequest request, CancellationToken cancellationToken)
    {
        var agent = new Agent { EmployeeNumber = request.EmployeeNumber, DisplayName = request.DisplayName, Email = request.Email };
        await repository.AddAsync(agent, cancellationToken);
        return mapper.Map<AgentDto>(agent);
    }

    public async Task<AgentDto?> UpdateAsync(Guid id, UpdateAgentRequest request, CancellationToken cancellationToken)
    {
        var agent = await repository.GetByIdAsync(id, cancellationToken);
        if (agent is null)
        {
            return null;
        }

        agent.EmployeeNumber = request.EmployeeNumber;
        agent.DisplayName = request.DisplayName;
        agent.Email = request.Email;
        agent.Status = request.Status;

        await repository.UpdateAsync(agent, cancellationToken);
        return mapper.Map<AgentDto>(agent);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var agent = await repository.GetByIdAsync(id, cancellationToken);
        if (agent is null)
        {
            return false;
        }

        await repository.DeleteAsync(agent, cancellationToken);
        return true;
    }
}
