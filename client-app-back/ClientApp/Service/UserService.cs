using ClientApp.Common;
using ClientApp.Models;
using RestSharp;

namespace ClientApp.Service
{
    public class UserService : IUserService
    {
        public IConfiguration _configuration;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public Result GetToken(string code)
        {
            try
            {
                var clientSecret = _configuration["App:ClientSecret"];
                var clientId = _configuration["App:ClientId"];

                var base64 = Base64Helper.Encode($"{clientId}:{clientSecret}");

                var client = new RestClient("https://localhost:7094");

                var request = new RestRequest("/accounts/token", Method.Post);
                request.RequestFormat = DataFormat.Json;
                request.AddParameter("Authorization", $"Basic {base64}", ParameterType.HttpHeader);
                request.AddBody(new TokenRequest(code));

                var response = client.ExecuteAsync(request).Result;


                return Result.Success(code);
            }
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }
    }
}
