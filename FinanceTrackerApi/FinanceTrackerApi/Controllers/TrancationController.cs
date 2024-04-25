using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceTrackerApi.Models;
using FinanceTrackerApi.Services.TransactionService;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTrackerApi.Controllers
{
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        // GET: api/transaction
        [HttpGet]
        public async Task<ActionResult<List<Transaction>>> GetAllTransactions()
        {
            return await _transactionService.GetAllTransactions();
        }

        // GET api/transaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetSingleTransaction(int id)
        {
            var transaction = await _transactionService.GetSingleTransaction(id);
            if (transaction is null)
            {
                return NotFound("Transaction not found");
            }
            return Ok(transaction);
        }

        // GET: api/transaction/year-month
        [HttpGet("{year}-{month}")]
        public async Task<ActionResult<List<Transaction>>> GetTransactionsByYearMonth(int year, int month)
        {
            // Validate input year and month
            if (year < 1 || month < 1 || month > 12)
            {
                return BadRequest("Invalid year or month.");
            }

            // Get transactions for the specified year and month
            var transactions = await _transactionService.GetTransactionsByYearMonth(year, month);
            if (transactions.Count == 0)
            {
                return NotFound("No transactions found for the specified year and month.");
            }

            return Ok(transactions);
        }

        // POST api/transaction
        [HttpPost]
        public async Task<ActionResult<Transaction>> AddTransaction([FromBody] Transaction request)
        {
            var transaction = await _transactionService.AddTransaction(request);
            return Ok(transaction);
        }

        // PUT api/transaction/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Transaction>> UpdateTransaction(int id, [FromBody] Transaction request)
        {
            var updatedTransaction = await _transactionService.UpdateTransaction(id, request);
            if (updatedTransaction is null)
            {
                return NotFound("Transaction not found");
            }

            return Ok(updatedTransaction);
        }

        // DELETE api/transaction/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Transaction>> DeleteTransaction(int id)
        {
            var deletedTransaction = await _transactionService.DeleteTransaction(id);
            if (deletedTransaction is null)
            {
                return NotFound("Transaction not found");
            }

            return Ok(deletedTransaction);
        }

        [HttpGet("top-categories")]
        public async Task<ActionResult<List<CategoryTransactionSummary>>> GetTop5CategoriesByTransactionAmount()
        {
            var topCategories = await _transactionService.GetTop5CategoriesByTransactionAmount();
            return Ok(topCategories);
        }
    }
}

