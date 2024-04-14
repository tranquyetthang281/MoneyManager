using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using AutoMapper;
using MoneyManager.Server.Shared.DataTransferObjects.Category;
using System.Collections;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Entities.Exceptions;

namespace MoneyManager.Server.Service
{
    internal sealed class CategoryService : ICategoryService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;

        public CategoryService(IRepositoryManager repository, ILoggerManager logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync(bool trackChanges)
        {
            var categories = await _repository.Category.GetAllCategoriesAsync(trackChanges);
            var categoriesDto = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return categoriesDto;
        }

        public async Task<CategoryDto> GetCategoryAsync(Guid id, bool trackChanges)
        {
            var category = await _repository.Category.GetCategoryAsync(id, trackChanges);
            if (category is null)
                throw new CategoryNotFoundException(id);
            var categoyDto = _mapper.Map<CategoryDto>(category);
            return categoyDto;
        }

        public async Task<CategoryDto> CreateCategoryAsync(CategoryForCreationDto creationDto)
        {
            var category = _mapper.Map<Category>(creationDto);
            _repository.Category.CreateCategory(category);
            await _repository.SaveAsync();
            var categoryToReturn = _mapper.Map<CategoryDto>(category);
            return categoryToReturn;
        }

        public async Task DeleteCategoryAsync(Guid id, bool trackChanges)
        {
            var category = await _repository.Category.GetCategoryAsync(id, trackChanges);
            if (category is null)
                throw new CategoryNotFoundException(id);
            _repository.Category.DeleteCategory(category);
            await _repository.SaveAsync();  
        }
    }
}
