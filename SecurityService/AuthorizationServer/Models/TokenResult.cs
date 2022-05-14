using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class TokenResult
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
        public List<ScopeEnum> Scopes { get; set; }

        public TokenResult(string accessToken, string tokenType, List<ScopeEnum> scopes)
        {
            AccessToken = accessToken;
            TokenType = tokenType;
            Scopes = scopes ?? new List<ScopeEnum>();
        }
    }
}
