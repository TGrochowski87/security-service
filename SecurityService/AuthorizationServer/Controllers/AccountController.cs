using AuthorizationServer.Common;
using AuthorizationServer.Models;
using AuthorizationServer.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizationServer.Controllers
{
    [ApiController]
    [Route("accounts")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login/admin")]
        [EnableCors("private")]
        public ActionResult<TokenResult> LoginAdmin([FromBody] CredentialsAdmin model)
        {
            var result = _accountService.LoginAdmin(model);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }

        [HttpPost("login")]
        [EnableCors("private")]
        public ActionResult<string> Login([FromBody] Credentials model)
        {
            var result = _accountService.Login(model);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }

        [HttpGet("scopes")]
        [EnableCors("private")]
        public ActionResult<List<ScopeEnum>> GetScopes()
        {
            var result = _accountService.GetScopes();

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }

        [HttpPost("token")]
        [EnableCors("public")]
        public ActionResult<TokenResult> Token([FromBody] TokenModel model)
        {
            Request.Headers.TryGetValue("Authorization", out var authorization);

            if (string.IsNullOrEmpty(authorization))
                return BadRequest("Empty headers");

            var result = _accountService.Token(model, authorization);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }

        [HttpGet("client/{clientId}")]
        [EnableCors("private")]
        public ActionResult<string> GetClient([FromRoute] string clientId)
        {
            var result = _accountService.GetClientName(clientId);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }

        [HttpPut("client/{clientId}")]
        [EnableCors("private")]
        public ActionResult UpdateClient([FromRoute] string clientId, [FromBody] List<ScopeEnum> scopes)
        {
            Request.Headers.TryGetValue("Authorization", out var authorization);

            if (string.IsNullOrEmpty(authorization))
                return BadRequest("Empty headers");

            var result = _accountService.UpdateClient(clientId, scopes, authorization);

            if (result.IsFailure)
                return BadRequest();

            return Ok();
        }

        [HttpGet("clients")]
        [EnableCors("private")]
        public ActionResult<IEnumerable<ClientItem>> GetClients()
        {
            Request.Headers.TryGetValue("Authorization", out var authorization);

            if (string.IsNullOrEmpty(authorization))
                return BadRequest("Empty headers");

            var result = _accountService.GetClients(authorization);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }
    }
}