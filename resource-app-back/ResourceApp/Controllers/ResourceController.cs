using System.Net;
using Microsoft.AspNetCore.Cors;
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

    [HttpGet("friends")]
    [EnableCors("public")]
    public ActionResult<string> Friends()
    {
      Request.Headers.TryGetValue("Authorization", out var authorization);

      if (string.IsNullOrEmpty(authorization))
        return BadRequest("Empty headers");

      var result = _resourceService.GetFriends(authorization);

      if (result.IsFailure)
        return result.Error == "Forbidden" ? StatusCode(403) : BadRequest(result);

      return Ok(result.Value);
    }

    [HttpGet("photos")]
    [EnableCors("public")]
    public ActionResult<string> Photos()
    {
      Request.Headers.TryGetValue("Authorization", out var authorization);

      if (string.IsNullOrEmpty(authorization))
        return BadRequest("Empty headers");

      var result = _resourceService.GetPhotos(authorization);

      if (result.IsFailure)
        return result.Error == "Forbidden" ? StatusCode(403) : BadRequest(result);

      return Ok(result.Value);
    }

    [HttpGet("timeline")]
    [EnableCors("public")]
    public ActionResult<string> Timeline()
    {
      Request.Headers.TryGetValue("Authorization", out var authorization);

      if (string.IsNullOrEmpty(authorization))
        return BadRequest("Empty headers");

      var result = _resourceService.GetTimeline(authorization);

      if (result.IsFailure)
        return result.Error == "Forbidden" ? StatusCode(403) : BadRequest(result);

      return Ok(result.Value);
    }
  }
}