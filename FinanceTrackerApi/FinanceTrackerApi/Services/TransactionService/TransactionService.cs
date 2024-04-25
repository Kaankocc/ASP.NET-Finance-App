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
            var transactions = await _context.Transactions.Include(t => t.Category).ToListAsync();
            return transactions;
        }

        public async Task<Transaction?> GetSingleTransaction(int id)
        {
            var transaction = await _context.Transactions.Include(t => t.Category).FirstOrDefaultAsync(t => t.Id == id);    
            if (transaction is null)
                return null;

            return transaction;
        }

        public async Task<List<Transaction>> GetTransactionsByYearMonth(int year, int month)
        {
            // Filter transactions by year and month
            var transactions = await _context.Transactions
                .Include(t => t.Category)
                .Where(t => t.Date.Year == year && t.Date.Month == month)
                .ToListAsync();

            return transactions;
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

        public async Task<List<CategoryTransactionSummary>> GetTop5CategoriesByTransactionAmount()
        {
            var topCategories = await _context.Transactions
                .Where(t => t.Category.Type == "Expense") // Filter by expense category
                .GroupBy(t => t.Category.Title)
                .Select(group => new CategoryTransactionSummary
                {
                    CategoryTitle = group.Key,
                    TotalTransactionAmount = group.Sum(t => t.Amount),
                    Icon = group.FirstOrDefault().Category != null ? group.FirstOrDefault().Category.Icon : "" // Check if Category is not null before accessing Icon
                })
                .OrderByDescending(summary => summary.TotalTransactionAmount)
                .Take(5)
                .ToListAsync();

            return topCategories;
        }





    }
}
