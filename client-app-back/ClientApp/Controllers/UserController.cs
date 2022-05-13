using Microsoft.AspNetCore.Mvc;

namespace ClientApp.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : Controller
    {

        public UserController()
        {

        }

        [HttpPost("authorize")]
        public ActionResult Authorize()
        {
            

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
