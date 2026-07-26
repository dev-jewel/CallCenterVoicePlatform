using CallCenter.Application.DTOs;
using CallCenter.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace CallCenter.API.Controllers;

[ApiController, Route("api/agents"), Authorize(Roles = "Administrator,Supervisor")]
public sealed class AgentsController(IAgentService agentService) : ControllerBase
{
    [HttpGet] public Task<IReadOnlyList<AgentDto>> List(CancellationToken cancellationToken) => agentService.ListAsync(cancellationToken);
    [HttpPost] public async Task<ActionResult<AgentDto>> Create(CreateAgentRequest request, CancellationToken cancellationToken) => CreatedAtAction(nameof(List), await agentService.CreateAsync(request, cancellationToken));
}
