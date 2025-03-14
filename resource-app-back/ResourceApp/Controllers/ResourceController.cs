﻿using Microsoft.AspNetCore.Cors;
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
                return BadRequest(result);

            return Ok(result.Value);
        }
    }
}
