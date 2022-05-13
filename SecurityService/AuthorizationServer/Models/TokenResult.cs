using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class TokenResult
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
        public List<ScopeEnum> Scope { get; set; }

        public TokenResult(string accessToken, string tokenType, List<ScopeEnum> scope)
        {
            AccessToken = accessToken;
            TokenType = tokenType;
            Scope = scope ?? new List<ScopeEnum>();
        }
    }
}
