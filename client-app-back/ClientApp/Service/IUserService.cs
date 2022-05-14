using ClientApp.Common;

namespace ClientApp.Service
{
    public interface IUserService
    {
        Result GetToken(string code);
    }
}
