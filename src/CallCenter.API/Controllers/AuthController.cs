using CallCenter.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace CallCenter.API.Controllers;

public sealed record LoginRequest(string Username, string Password);
[ApiController, Route("api/auth")]
public sealed class AuthController(ITokenService tokens) : ControllerBase
{
    [HttpPost("login")]
    public ActionResult<object> Login(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password)) return BadRequest(new { message = "Username and password are required." });
        return Ok(new { accessToken = tokens.Create(request.Username, "Administrator"), tokenType = "Bearer" });
    }
}
