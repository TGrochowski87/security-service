using AuthorizationServer.Common;
using AuthorizationServer.Models;

namespace AuthorizationServer.Service
{
    public interface IAccountService
    {
        Result<string> Login(LoginModel user);
        Result<List<string>> GetScopes();
        Result Token(TokenModel model);
        Result<string> GetClientName(string clientId);
    }
}
