using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CallCenter.Application.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CallCenter.Infrastructure.Security;

public sealed class JwtTokenService(IOptions<JwtOptions> options)
    : ITokenService
{
    public string Create(string username, string role)
    {
        var value = options.Value;

        var claims = new[]
                 {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(
                        JwtRegisteredClaimNames.Iat,
                        DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(),
                        ClaimValueTypes.Integer64)
                };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(value.SigningKey));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: value.Issuer,
            audience: value.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(value.ExpiryMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}