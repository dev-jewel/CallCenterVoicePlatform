using CallCenter.API.Contracts;
using CallCenter.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallCenter.API.Controllers;

[ApiController]
[Route("api/auth")]
[AllowAnonymous]
public class AuthController(ITokenService tokens) : ControllerBase
{
    [HttpPost("login")]
    public ActionResult<object> Login(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Username and password are required." });
        }

        return Ok(new
        {
            accessToken = tokens.Create(request.Username, "Administrator"),
            tokenType = "Bearer"
        });
    }
}
