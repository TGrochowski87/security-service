using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class TokenResult
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }

        public TokenResult(string accessToken, string tokenType)
        {
            AccessToken = accessToken;
            TokenType = tokenType;
        }
    }
}
