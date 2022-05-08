using AuthorizationServer.Common;
using AuthorizationServer.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthorizationServer.Service
{
    public class AccountService : IAccountService
    {
        public IConfiguration _configuration;

        public AccountService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Result Login(LoginModel model)
        {
            try
            {
                var user = ExampleUser.Users
                    .FirstOrDefault(x => x.Username == model.Username && x.Password == model.Password);

                if (user == null)
                    return Result.Fail("User not exists!");

                var code = string.Join(":", model.Scopes
                    .Select(x => x.ToString())
                    .ToArray());

                code = $"{user.UserId}:{code}";

                code = Base64Helper.Encode(code);

                return Result.Success(code);
            }
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }

        public Result<Dictionary<int, string>> GetScopes()
        {
            return Enum
               .GetValues(typeof(ScopeEnum))
               .Cast<ScopeEnum>()
               .ToDictionary(x => (int)x, x => x.ToString());
        }

        public Result Token(TokenModel model)
        {
            try
            {
                var codeParams = Base64Helper.Decode(model.Code).Split(":");

                var userId = codeParams[0];

                List<ScopeEnum> scopes = new List<ScopeEnum>();

                for (int i = 1; i < codeParams.Length; i++)
                {
                    scopes.Add(Enum.Parse<ScopeEnum>(codeParams[i]));
                }

                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", userId),
                        new Claim("Scopes", string.Join(":",scopes.Select(x=>x.ToString()))),
                        new Claim("ClientSecret", model.ClientSecret)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                return Result.Success(new JwtSecurityTokenHandler().WriteToken(token));
            }
            catch (Exception e)
            {
                return Result.Fail(e.Message);
            }
        }
    }
}
