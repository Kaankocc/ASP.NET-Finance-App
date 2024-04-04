using System;
using FinanceTrackerApi.Models;

namespace FinanceTrackerApi.Services.CategoryService
{
	public interface ICategoryService
	{
        Task<List<Category>> GetAllCategories();

        Task<Category?> GetSingleCategory(int id);

        Task<Category> AddCategory(Category category);

        Task<Category?> UpdateCategory(int id, Category category);

        Task<Category?> DeleteCategory(int id);

    }
}

