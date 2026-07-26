namespace CallCenter.Application.Interfaces;

public interface ITokenService
{
    string Create(string username, string role);
}
