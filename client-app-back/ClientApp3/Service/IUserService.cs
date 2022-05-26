using ClientApp3.Common;

namespace ClientApp3.Service
{
    public interface IUserService
    {
        Result GetToken(string code);
        Result GetFriends(string token);
    }
}
