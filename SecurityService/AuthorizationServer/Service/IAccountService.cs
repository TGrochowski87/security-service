using AuthorizationServer.Common;
using AuthorizationServer.Models;

namespace AuthorizationServer.Service
{
    public interface IAccountService
    {
        Result Login(LoginModel user);
        Result<Dictionary<int, string>> GetScopes();
        Result Token(TokenModel model);
    }
}
