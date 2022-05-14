namespace AuthorizationServer.Models
{
    public class TokenModel
    {
        public string Code { get; set; }

        public TokenModel(string code)
        {
            Code = code;
        }
    }
}
