namespace ResourceApp.Models
{
    public class UserPhotos
    {
        public string UserId { get; set; }
        public List<string> Photos { get; set; }

        public UserPhotos(string userId, List<string> photos)
        {
            UserId = userId;
            Photos = photos;
        }
    }
}
