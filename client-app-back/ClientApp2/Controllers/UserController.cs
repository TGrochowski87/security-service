using ClientApp2.Service;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ClientApp2.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService  = userService;
        }

        [HttpGet("token/{code}")]
        [EnableCors("private")]
    public ActionResult GetToken(string code)
        {
            var result = _userService.GetToken(code);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("friends/{token}")]
        public ActionResult GetFriends(string token)
        {
            var result = _userService.GetFriends(token);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
