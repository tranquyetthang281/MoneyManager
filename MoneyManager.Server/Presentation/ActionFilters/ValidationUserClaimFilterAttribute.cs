using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MoneyManager.Server.Presentation.ActionFilters
{
    public class ValidationUserClaimFilterAttribute : IActionFilter
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ValidationUserClaimFilterAttribute(IHttpContextAccessor httpContextAccessor)
            => _httpContextAccessor = httpContextAccessor;

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var userId = context.RouteData.Values["userId"];

            if (userId != null && _httpContextAccessor.HttpContext != null)
            {
                var userIdClaim = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                var userRoleClaim = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);
                if (userId.ToString() != userIdClaim 
                    && !userRoleClaim.Equals("Administrator", StringComparison.OrdinalIgnoreCase))
                {
                    context.Result = context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
