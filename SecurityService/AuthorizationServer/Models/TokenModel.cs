namespace AuthorizationServer.Models
{
    public class TokenModel
    {
        public string Code { get; set; }
        public string ClientSecret { get; set; }

        public TokenModel(string code, string clientSecret)
        {
            Code = code;
            ClientSecret = clientSecret;
        }
    }
}
