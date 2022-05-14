using Microsoft.AspNetCore.Mvc;
using ResourceApp.Service;

namespace ResourceApp.Controllers
{
    [ApiController]
    [Route("resource")]
    public class ResourceController : Controller
    {
        private readonly IResourceService _resourceService;
        public ResourceController(IResourceService resourceService)
        {
            _resourceService = resourceService;
        }

        [HttpGet("message/{token}")]
        public ActionResult<string> Message(string token)
        {
            //Request.Headers.TryGetValue("Authorization", out var authorization);

            //if (string.IsNullOrEmpty(authorization))
            //    return BadRequest("Empty headers");

            var result = _resourceService.GetMessage(token);

            if (result.IsFailure)
                return BadRequest(result);

            return Ok(result.Value);
        }
    }
}
