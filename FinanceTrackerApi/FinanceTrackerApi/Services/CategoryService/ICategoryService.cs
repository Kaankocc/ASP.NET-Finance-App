using System;
using FinanceTrackerApi.Models;

namespace FinanceTrackerApi.Services.CategoryService
{
	public interface ICategoryService
	{
        List<Category> GetAllCategories();

        Category GetSingleCategory(int id);

        List<Category> AddCategory(Category category);

        List<Category> UpdateCategory(int id, Category category);

        List<Category> DeleteCategory(int id);

    }
}

