namespace ResourceApp.Models
{
    public class UserTimeline
    {
        public string UserId { get; set; }
        public List<string> Posts { get; set; }

        public UserTimeline(string userId, List<string> posts)
        {
            UserId = userId;
            Posts = posts;
        }
    }
}
