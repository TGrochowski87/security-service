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

        [HttpPost("login")]
        [EnableCors("private")]
        public ActionResult<string> Login(LoginModel model)
        {
            var result = _accountService.Login(model);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("scopes")]
        [EnableCors("private")]
        public ActionResult<List<ScopeEnum>> GetScopes()
        {
            var result = _accountService.GetScopes();

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("token")]
        [EnableCors("public")]
        public ActionResult<TokenResult> Token(TokenModel model)
        {
            Request.Headers.TryGetValue("Authorization", out var authorization);

            if(string.IsNullOrEmpty(authorization))
                return BadRequest("Empty headers");

            var result = _accountService.Token(model, authorization);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }

        [HttpGet("client/{clientId}")]
        [EnableCors("private")]
        public ActionResult<string> GetClient(string clientId)
        {
            var result = _accountService.GetClientName(clientId);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }
    }
}