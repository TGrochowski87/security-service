using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class ClientItem
    {
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public List<ScopeEnum> Scopes { get; set; }

        public ClientItem(string clientId, string clientName, List<ScopeEnum> scopes)
        {
            ClientId = clientId;
            ClientName = clientName;
            Scopes = scopes;
        }
    }
}
