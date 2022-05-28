namespace ClientApp4.Models
{
    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public string TokenType { get; set; }
        public List<string> Scopes { get; set; }

        public TokenResponse()
        {

        }

        public TokenResponse(string accessToken, string tokenType, List<string> scopes)
        {
            AccessToken = accessToken;
            TokenType = tokenType;
            Scopes = scopes ?? new List<string>();
        }
    }
}
