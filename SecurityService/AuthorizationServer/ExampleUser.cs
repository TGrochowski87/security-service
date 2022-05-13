using AuthorizationServer.Common;
using AuthorizationServer.Models;

namespace AuthorizationServer
{
    public class ExampleUser
    {
        public static readonly List<User> Users = new List<User>
        {
            new User("774a0068e9c04e97ba6a96f85f61c05c","774a0068e9c04e97ba6a96f85f61c05c","test","test", new List<ScopeEnum>{ ScopeEnum.Photos})
        };
    }
}
