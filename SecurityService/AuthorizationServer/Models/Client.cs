namespace AuthorizationServer.Models
{
    public class Client
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string ClientName { get; set; }

        public Client(string clientId, string clientSecret, string clientName)
        {
            ClientId = clientId;
            ClientName = clientName;
            ClientSecret = clientSecret;
        }
    }
}
