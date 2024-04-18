using System;
using FinanceTrackerApi.Models;
using FinanceTrackerApi.Persistence;

namespace FinanceTrackerApi.Services.CategoryService
{
	public class CategoryService : ICategoryService
	{
      
        private readonly FinanceAppDbContext _context;

        public CategoryService(FinanceAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            var categories = await _context.Categories.OrderBy(c => c.Id).ToListAsync();
            return categories;
        }

        public async Task<Category?> GetSingleCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category is null)
                return null;

            return category;
        }


        public async Task<Category> AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> UpdateCategory(int id, Category request)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category is null)
                return null;

            category.Icon = request.Icon;
            category.Title = request.Title;
            category.Type = request.Type;

            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category is null)
                return null;

            _context.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }
    }
}

