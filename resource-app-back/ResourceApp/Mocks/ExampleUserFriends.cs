using ResourceApp.Models;

namespace ResourceApp.Mocks
{
    public class ExampleUserFriends
    {
        public static readonly List<UserFriends> UserFriends = new List<UserFriends>
        {
            new UserFriends("36ae70c2-d3dd-4aab-9c3f-2af94bd096ba", new List<string>(){ "Marek", "Tomek", "Beata"}),
            new UserFriends("88dd7ec9-1cff-4994-873b-99f6feaa3b91", new List<string>(){"Beata"}),
            new UserFriends("71ff24ef-7472-47ba-af39-89980409e3a3", new List<string>(){"Mateusz"}),
            new UserFriends("2ada51c5-14c5-4dca-8f99-15a174853fe1", new List<string>(){"Kasia"})
        };
    }
}
