using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class ClientGet
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public List<ScopeEnum> Scopes { get; set; }

        public ClientGet(string id, string name, List<ScopeEnum> scopes)
        {
            Id = id;
            Name = name;
            Scopes = scopes;
        }
    }
}
