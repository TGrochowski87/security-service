using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public List<ScopeEnum> Scopes { get; set; }

        public LoginModel(string username, string password, List<ScopeEnum> scopes)
        {
            Username = username;
            Password = password;
            Scopes = scopes;
        }
    }
}
