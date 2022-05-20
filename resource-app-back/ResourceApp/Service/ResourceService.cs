using ResourceApp.Common;
using ResourceApp.Mocks;

namespace ResourceApp.Service
{
    public class ResourceService : IResourceService
    {
        public Result<string> GetFriends(string authorizationHeader)
        {
            var token = authorizationHeader
                   .Substring("Bearer ".Length)
                   .Trim();

            var userId = TokenHelper.ValidateToken(token)?.FindFirst("UserId")?.Value;

            var scopes = TokenHelper.ValidateToken(token)?.FindFirst("Scopes")?.Value;

            if (scopes == "Friends")
            {
                var result = ExampleUserFriends.UserFriends.FirstOrDefault(x => x.UserId == userId);

                if(result == null)
                    return Result.Fail<string>("User not exists!");

                return string.Join(',', result.Friends);
            }
            else
                return Result.Fail<string>("Scope:Friends is required!");
        }
    }
}
