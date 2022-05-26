using ResourceApp.Models;

namespace ResourceApp.Mocks
{
    public class ExampleUserPhotos
    {
        public static readonly List<UserPhotos> UserPhotos = new List<UserPhotos>
        {
            new UserPhotos("36ae70c2-d3dd-4aab-9c3f-2af94bd096ba", new List<string>(){ "pies.jpg", "kot.jpg", "zakazane.png"}),
            new UserPhotos("88dd7ec9-1cff-4994-873b-99f6feaa3b91", new List<string>(){"tajne.gif"}),
            new UserPhotos("71ff24ef-7472-47ba-af39-89980409e3a3", new List<string>(){"avatar.jpg"}),
            new UserPhotos("2ada51c5-14c5-4dca-8f99-15a174853fe1", new List<string>(){"family.png"})
        };
    }
}
