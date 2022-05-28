using AuthorizationServer.Common;
using AuthorizationServer.Mocks;
using AuthorizationServer.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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

    public Result<string> Login(Credentials credentials)
    {
      try
      {
        var user = ExampleUser.Users
          .FirstOrDefault(x => x.Username == credentials.Username && x.Password == credentials.Password);

        if (user == null)
          return Result.Fail<string>("User does not exist!");


        var code = string.Join(":", ExampleClient.Clients.First(c => c.ClientId == credentials.ClientId).Scopes
          .Select(x => x.ToString())
          .ToArray());

        code = $"{user.UserId}:{code}";

        code = Base64Helper.Encode(code);

        return Result.Success(code);
      }
      catch (Exception e)
      {
        return Result.Fail<string>(e.Message);
      }
    }

    public Result<TokenResult> LoginAdmin(CredentialsAdmin credentials)
    {
      try
      {
        var admin = ExampleAdmin.Admins
          .FirstOrDefault(x => x.Username == credentials.Username && x.Password == credentials.Password);

        if (admin == null)
          return Result.Fail<TokenResult>("Admin does not exist!");

        var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("AdminId", admin.AdminId),
                };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
          _configuration["Jwt:Issuer"],
          _configuration["Jwt:Audience"],
          claims,
          expires: DateTime.UtcNow.AddMinutes(10),
          signingCredentials: signIn);

        var result = new TokenResult(new JwtSecurityTokenHandler().WriteToken(token), "Bearer");

        return Result.Success(result);
      }
      catch (Exception e)
      {
        return Result.Fail<TokenResult>(e.Message);
      }
    }

    public Result<List<string>> GetScopes()
      => Enum.GetNames(typeof(ScopeEnum)).ToList();

    public Result<TokenResult> Token(TokenModel model, string authorizationHeader)
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

        var header = authorizationHeader
            .Substring("Basic ".Length)
            .Trim();

        var headerParams = Base64Helper.Decode(header).Split(":");

        var clientId = headerParams[0];
        var clientSecret = headerParams[1];

        var client = ExampleClient.Clients
            .FirstOrDefault(x => x.ClientId == clientId && x.ClientSecret == clientSecret);

        if (client == null)
          return Result.Fail<TokenResult>("Client not exists!");

        var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", userId),
                        new Claim("Scopes", string.Join(":",scopes.Select(x=>x.ToString()))),
                        new Claim("ClientSecret", clientSecret)
                };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
          _configuration["Jwt:Issuer"],
          _configuration["Jwt:Audience"],
          claims,
          expires: DateTime.UtcNow.AddMinutes(10),
          signingCredentials: signIn);

        var result = new TokenResult(new JwtSecurityTokenHandler().WriteToken(token), "Bearer");

        return Result.Success(result);
      }
      catch (Exception e)
      {
        return Result.Fail<TokenResult>(e.Message);
      }
    }

    public Result<string> GetClientName(string clientId)
    {
      try
      {
        var client = ExampleClient.Clients
          .FirstOrDefault(x => x.ClientId == clientId);

        if (client == null)
          return Result.Fail<string>("Client not exists!");

        return Result.Success(client.ClientName);
      }
      catch (Exception e)
      {
        return Result.Fail<string>(e.Message);
      }
    }

    public Result<IEnumerable<ClientGet>> GetClients(string authorizationHeader)
    {
      try
      {
        if (!ValidateToken(authorizationHeader))
          return Result.Fail<IEnumerable<ClientGet>>("Admin not exists!");

        var result = ExampleClient.Clients.Select(c => new ClientGet(c.ClientId, c.ClientName, c.Scopes));

        return Result.Success(result);
      }
      catch (Exception e)
      {
        return Result.Fail<IEnumerable<ClientGet>>(e.Message);
      }
    }

    public Result UpdateClient(string clientId, List<ScopeEnum> scopes, string authorizationHeader)
    {
      try
      {
        if (!ValidateToken(authorizationHeader))
          return Result.Fail<string>("Admin not exists!");

        var client = ExampleClient.Clients
          .FirstOrDefault(x => x.ClientId == clientId);

        if (client == null)
          return Result.Fail<string>("Client not exists!");

        client.Scopes = scopes;

        return Result.Success();
      }
      catch (Exception e)
      {
        return Result.Fail(e.Message);
      }
    }

    public bool ValidateToken(string authorizationHeader)
    {
      var token = authorizationHeader
                 .Substring("Bearer ".Length)
                 .Trim();

      var adminId = TokenHelper.ValidateToken(token)?.FindFirst("AdminId")?.Value;


      var admin = ExampleAdmin.Admins
          .FirstOrDefault(x => x.AdminId == adminId);

      return admin != null;
    }
  }
}