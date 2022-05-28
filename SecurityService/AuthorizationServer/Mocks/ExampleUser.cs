using AuthorizationServer.Models;

namespace AuthorizationServer
{
    public class ExampleUser
    {
        public static readonly List<User> Users = new List<User>
        {
            new User("36ae70c2-d3dd-4aab-9c3f-2af94bd096ba","test","test"),
            new User("88dd7ec9-1cff-4994-873b-99f6feaa3b91","test2","test2"),
            new User("71ff24ef-7472-47ba-af39-89980409e3a3","test3","test3"),
            new User("2ada51c5-14c5-4dca-8f99-15a174853fe1","test4","test4"),
        };
    }
}
