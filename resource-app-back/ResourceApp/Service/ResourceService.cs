using ResourceApp.Common;

namespace ResourceApp.Service
{
    public class ResourceService : IResourceService
    {
        public Result<string> GetMessage(string authorizationHeader)
        {
            var token = authorizationHeader
                   .Substring("Bearer ".Length)
                   .Trim();

            var userId = TokenHelper.ValidateToken(authorizationHeader)?.FindFirst("UserId")?.Value;

            var scopes = TokenHelper.ValidateToken(authorizationHeader)?.FindFirst("Scopes")?.Value;

            return "";
        }
    }
}
