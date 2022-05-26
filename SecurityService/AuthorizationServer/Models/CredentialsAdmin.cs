namespace AuthorizationServer.Models
{
    public class CredentialsAdmin
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public CredentialsAdmin(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
}
