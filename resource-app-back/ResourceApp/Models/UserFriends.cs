namespace ResourceApp.Models
{
    public class UserFriends
    {
        public string UserId { get; set; }
        public List<string> Friends { get; set; }

        public UserFriends(string userId, List<string>  friends)
        {
            UserId = userId;
            Friends = friends;
        }
    }
}
