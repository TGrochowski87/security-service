﻿using AuthorizationServer.Models;
using AuthorizationServer.Service;
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
            _accountService =   accountService;
        }

        [HttpPost("login")]
        public ActionResult Login(LoginModel model)
        {
            var result = _accountService.Login(model);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("scopes")]
        public ActionResult GetScopes()
        {
            var result = _accountService.GetScopes();

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("token")]
        public ActionResult Token(TokenModel model)
        {
            var result = _accountService.Token(model);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }

    }
}
