namespace ClientApp.Models
{
    public class TokenRequest
    {
        public string Code { get; set; }

        public TokenRequest(string code)
        {
            Code = code;
        }
    }
}
