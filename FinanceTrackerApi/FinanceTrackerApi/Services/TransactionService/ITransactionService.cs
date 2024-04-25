using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinanceTrackerApi.Models;

namespace FinanceTrackerApi.Services.TransactionService
{
    public interface ITransactionService
    { 
        Task<List<Transaction>> GetAllTransactions();

        Task<Transaction?> GetSingleTransaction(int id);

        Task<Transaction> AddTransaction(Transaction transaction);

        Task<Transaction?> UpdateTransaction(int id, Transaction transaction);

        Task<Transaction?> DeleteTransaction(int id);

        Task<List<Transaction>> GetTransactionsByYearMonth(int year, int month);

        Task<List<CategoryTransactionSummary>> GetTop5CategoriesByTransactionAmount();
    }
}