using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
  public class ClientUpdate
  {
    public string Id { get; set; }
    public List<ScopeEnum> Scopes { get; set; }
  }
}
