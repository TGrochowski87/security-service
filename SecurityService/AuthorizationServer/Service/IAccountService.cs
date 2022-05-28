using AuthorizationServer.Common;
using AuthorizationServer.Models;

namespace AuthorizationServer.Service
{
    public interface IAccountService
    {
        Result<string> Login(Credentials user);
        Result<TokenResult> LoginAdmin(CredentialsAdmin credentials);
        Result<List<string>> GetScopes();
        Result<TokenResult> Token(TokenModel model, string authorizationHeader);
        Result<string> GetClientName(string clientId);
        Result UpdateClient(string clientId, List<ScopeEnum> scopes, string authorizationHeader);
        Result<IEnumerable<ClientGet>> GetClients(string authorizationHeader);
    }
}
