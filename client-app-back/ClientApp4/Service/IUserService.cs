using ClientApp4.Common;

namespace ClientApp4.Service
{
    public interface IUserService
    {
        Result GetToken(string code);
        Result GetFriends(string token);
    }
}
