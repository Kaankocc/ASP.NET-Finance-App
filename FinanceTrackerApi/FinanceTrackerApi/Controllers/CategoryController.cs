using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceTrackerApi.Models;
using FinanceTrackerApi.Services.CategoryService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceTrackerApi.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this._categoryService = categoryService;
        }

        // GET: api/values
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetAllCategories()
        {
            return await _categoryService.GetAllCategories();
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetSingleCategory(int id)
        {
            var category =  await _categoryService.GetSingleCategory(id);
            if(category is null)
            {
                return NotFound("Sorry, but this category doesn't exitt");
            }
            return Ok(category);
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory([FromBody]Category request)
        {
            var category = await _categoryService.AddCategory(request);
            return Ok(category);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> UpdateCategory(int id, [FromBody] Category request)
        {
            var categories = await _categoryService.UpdateCategory(id, request);
            if (categories is null)
            {
                return NotFound("Sorry, but this category doesn't exitt");
            }

            return Ok(categories);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var result = await _categoryService.DeleteCategory(id);
            if (result is null)
                return NotFound("Not found");

            return Ok(result);
        }
    }
}

