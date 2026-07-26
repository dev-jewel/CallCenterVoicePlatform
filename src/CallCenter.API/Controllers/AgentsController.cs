using CallCenter.Application.DTOs;
using CallCenter.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallCenter.API.Controllers;

[ApiController]
[Route("api/agents")]
[Authorize(Roles = "Administrator,Supervisor")]
public class AgentsController(IAgentService agentService) : ControllerBase
{
    [HttpGet]
    public Task<IReadOnlyList<AgentDto>> List(CancellationToken cancellationToken)
    {
        return agentService.ListAsync(cancellationToken);
    }

    [HttpPost]
    public async Task<ActionResult<AgentDto>> Create(
        CreateAgentRequest request,
        CancellationToken cancellationToken)
    {
        var agent = await agentService.CreateAsync(request, cancellationToken);

        return CreatedAtAction(
            nameof(List),
            agent);
    }
}