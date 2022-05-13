namespace AuthorizationServer.Models
{
    public class Client
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }

        public Client(string clientId, string clientName)
        {
            ClientId = clientId;
            ClientName = clientName;
        }
    }
}
