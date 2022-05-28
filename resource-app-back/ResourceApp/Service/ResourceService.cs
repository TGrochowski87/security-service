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

            if (!string.IsNullOrEmpty(scopes) && scopes.Contains("Friends"))
            {
                var result = ExampleUserFriends.UserFriends.FirstOrDefault(x => x.UserId == userId);

                if(result == null)
                    return Result.Fail<string>("User not exists!");

                return string.Join(',', result.Friends);
            }
            else
                return Result.Fail<string>("Forbidden");
        }

        public Result<string> GetPhotos(string authorizationHeader)
        {
            var token = authorizationHeader
                   .Substring("Bearer ".Length)
                   .Trim();

            var userId = TokenHelper.ValidateToken(token)?.FindFirst("UserId")?.Value;

            var scopes = TokenHelper.ValidateToken(token)?.FindFirst("Scopes")?.Value;

            if (!string.IsNullOrEmpty(scopes) && scopes.Contains("Photos"))
            {
                var result = ExampleUserPhotos.UserPhotos.FirstOrDefault(x => x.UserId == userId);

                if (result == null)
                    return Result.Fail<string>("User not exists!");

                return string.Join(',', result.Photos);
            }
            else
                return Result.Fail<string>("Forbidden");
        }

        public Result<string> GetTimeline(string authorizationHeader)
        {
            var token = authorizationHeader
                   .Substring("Bearer ".Length)
                   .Trim();

            var userId = TokenHelper.ValidateToken(token)?.FindFirst("UserId")?.Value;

            var scopes = TokenHelper.ValidateToken(token)?.FindFirst("Scopes")?.Value;

            if (!string.IsNullOrEmpty(scopes) && scopes.Contains("Timeline"))
            {
                var result = ExampleUserTimeline.UserTimeline.FirstOrDefault(x => x.UserId == userId);

                if (result == null)
                    return Result.Fail<string>("User not exists!");

                return string.Join(',', result.Posts);
            }
            else
                return Result.Fail<string>("Forbidden");
        }
    }
}
