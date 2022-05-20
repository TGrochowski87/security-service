using AuthorizationServer.Common;
using AuthorizationServer.Models;

namespace AuthorizationServer.Service
{
    public interface IAccountService
    {
        Result<string> Login(Credentials user);
        Result<List<string>> GetScopes();
        string GenerateAuthorizationCode(CodeComponents codeComponents);
        Result<TokenResult> Token(TokenModel model, string authorizationHeader);
        Result<string> GetClientName(string clientId);
    }
}
