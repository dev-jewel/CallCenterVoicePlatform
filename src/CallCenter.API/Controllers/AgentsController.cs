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

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<AgentDto>> Update(
        Guid id,
        UpdateAgentRequest request,
        CancellationToken cancellationToken)
    {
        var agent = await agentService.UpdateAsync(id, request, cancellationToken);
        if (agent is null)
        {
            return NotFound();
        }
        
        return Ok(agent);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(
        Guid id,
        CancellationToken cancellationToken)
    {
        var deleted = await agentService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}