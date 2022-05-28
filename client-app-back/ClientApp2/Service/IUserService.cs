using ClientApp2.Common;

namespace ClientApp2.Service
{
    public interface IUserService
    {
        Result GetToken(string code);
        Result GetFriends(string token);
    }
}
