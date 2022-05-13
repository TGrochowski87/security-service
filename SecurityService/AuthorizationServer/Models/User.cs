using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class User
    {
        public string ClientId { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<ScopeEnum> Scopes { get; set; }

        public User(string clientId, string userId, string username, string password, List<ScopeEnum> scopes)
        {
            ClientId = clientId;
            UserId = userId;
            Username = username;
            Password = password;
            Scopes = scopes;
        }
    }
}
