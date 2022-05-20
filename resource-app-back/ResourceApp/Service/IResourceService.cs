using ResourceApp.Common;

namespace ResourceApp.Service
{
    public interface IResourceService
    {
        Result<string> GetFriends(string authorizationHeader);
    }
}
