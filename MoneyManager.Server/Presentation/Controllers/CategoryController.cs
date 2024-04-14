using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Presentation.ActionFilters;
using MoneyManager.Server.Shared.DataTransferObjects.Category;

namespace MoneyManager.Server.Presentation.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IServiceManager _service;
        public CategoryController(IServiceManager service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _service.CategoryService.GetAllCategoriesAsync(trackChanges: false);
            return Ok(categories);
        }

        [HttpGet("{categoryId:guid}", Name = "GetCategory")]
        public async Task<IActionResult> GetCategory(Guid categoryId)
        {
            var category = await _service.CategoryService.GetCategoryAsync(categoryId, trackChanges: false);
            return Ok(category);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [ServiceFilter(typeof(ValidationDtoFilterAttribute))]
        public async Task<IActionResult> CreateCategoty([FromBody] CategoryForCreationDto categoryDto)
        {
            var createdCategory = await _service.CategoryService.CreateCategoryAsync(categoryDto);
            return CreatedAtRoute("GetCategory", new { categoryId = createdCategory.Id }, createdCategory);
        }

        [HttpDelete("{categoryId:guid}")]
        public async Task<IActionResult> DeleteCategory(Guid categoryId)
        {
            await _service.CategoryService.DeleteCategoryAsync(categoryId, trackChanges: false);
            return NoContent();
        }
    }
}
