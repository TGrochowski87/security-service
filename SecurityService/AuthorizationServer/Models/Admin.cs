namespace AuthorizationServer.Models
{
    public class Admin
    {
        public string AdminId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public Admin(string adminId, string username, string password)
        {
            AdminId = adminId;
            Username = username;
            Password = password;
        }
    }
}
