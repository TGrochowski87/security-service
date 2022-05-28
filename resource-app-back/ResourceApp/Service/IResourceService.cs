using ResourceApp.Common;

namespace ResourceApp.Service
{
    public interface IResourceService
    {
        Result<string> GetFriends(string authorizationHeader);
        Result<string> GetPhotos(string authorizationHeader);
        Result<string> GetTimeline(string authorizationHeader);
    }
}
