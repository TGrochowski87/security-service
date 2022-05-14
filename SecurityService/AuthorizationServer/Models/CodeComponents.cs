using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
  public class CodeComponents
  {
    public string UserId { get; set; }
    public List<ScopeEnum> Scopes { get; set; }
  }
}
