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
    }
}

