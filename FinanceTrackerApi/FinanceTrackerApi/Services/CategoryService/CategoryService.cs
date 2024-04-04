using System;
using FinanceTrackerApi.Models;

namespace FinanceTrackerApi.Services.CategoryService
{
	public class CategoryService : ICategoryService
	{
        private static List<Category> categories = new List<Category>
        {
            new Category{ Id = 1, Title = "Test1"},
            new Category{ Id = 2, Title = "Test2"},
            new Category{ Id = 3, Title = "Test3"}
        };

        public List<Category> AddCategory(Category category)
        {
            categories.Add(category);
            return categories;
        }

        public List<Category> DeleteCategory(int id)
        {
            var category = categories.Find(x => x.Id == id);
            categories.Remove(category);
            return categories;
        }

        public List<Category> GetAllCategories()
        {
            return categories;
        }

        public Category GetSingleCategory(int id)
        {
            var category = categories.Find(x => x.Id == id);
            return category;
        }

        public List<Category> UpdateCategory(int id, Category request)
        {
            var category = categories.Find(x => x.Id == id);
            category.Title = request.Title;

            return categories;
        }
    }
}

