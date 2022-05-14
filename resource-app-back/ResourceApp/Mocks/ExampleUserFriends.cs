using ResourceApp.Models;

namespace ResourceApp.Mocks
{
    public class ExampleUserFriends
    {
        public static readonly List<UserFriends> UserFriends = new List<UserFriends>
        {
            new UserFriends("36ae70c2-d3dd-4aab-9c3f-2af94bd096ba", new List<string>(){ "Marek", "Tomek", "Beata"})
        };
    }
}
