using AuthorizationServer.Common;

namespace AuthorizationServer.Models
{
    public class Credentials
    {
        public string ClientId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public Credentials(string clientId, string username, string password)
        {
            ClientId = clientId;
            Username = username;
            Password = password;
        }
    }
}
