using AutoMapper;
using CallCenter.Application.DTOs;
using CallCenter.Application.Interfaces;
using CallCenter.Domain.Entities;

namespace CallCenter.Application.Services;

public sealed class AgentService(IAgentRepository repository, IMapper mapper) : IAgentService
{
    public async Task<IReadOnlyList<AgentDto>> ListAsync(CancellationToken cancellationToken) =>
        mapper.Map<IReadOnlyList<AgentDto>>(await repository.ListAsync(cancellationToken));

    public async Task<AgentDto> CreateAsync(CreateAgentRequest request, CancellationToken cancellationToken)
    {
        var agent = new Agent { EmployeeNumber = request.EmployeeNumber, DisplayName = request.DisplayName, Email = request.Email };
        await repository.AddAsync(agent, cancellationToken);
        return mapper.Map<AgentDto>(agent);
    }
}
