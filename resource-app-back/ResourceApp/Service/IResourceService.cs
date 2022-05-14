using ResourceApp.Common;

namespace ResourceApp.Service
{
    public interface IResourceService
    {
        Result<string> GetMessage(string authorizationHeader);
    }
}
