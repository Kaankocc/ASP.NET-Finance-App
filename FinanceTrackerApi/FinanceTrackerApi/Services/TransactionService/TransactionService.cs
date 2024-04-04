using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceTrackerApi.Models;
using FinanceTrackerApi.Persistence;

namespace FinanceTrackerApi.Services.TransactionService
{
    public class TransactionService : ITransactionService
    {
        private readonly FinanceAppDbContext _context;

        public TransactionService(FinanceAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Transaction>> GetAllTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return transactions;
        }

        public async Task<Transaction?> GetSingleTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null)
                return null;

            return transaction;
        }

        public async Task<Transaction> AddTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task<Transaction?> UpdateTransaction(int id, Transaction request)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null)
                return null;

            transaction.CategoryId = request.CategoryId;
            transaction.Amount = request.Amount;
            transaction.Note = request.Note;
            transaction.Date = request.Date;

            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task<Transaction?> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null)
                return null;

            _context.Remove(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }
    }
}
