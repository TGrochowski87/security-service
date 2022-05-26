namespace AuthorizationServer.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public User(string userId, string username, string password)
        {
            UserId = userId;
            Username = username;
            Password = password;
        }
    }
}
