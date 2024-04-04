global using Microsoft.EntityFrameworkCore;
using FinanceTrackerApi.Models;

namespace FinanceTrackerApi.Persistence
{
    public class FinanceAppDbContext : DbContext
	{
		public FinanceAppDbContext(DbContextOptions<FinanceAppDbContext> options) : base(options)
		{
		}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=FinanceAppdb;Username=postgres;Password=admin123;");
        }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<Category> Categories { get; set; } 



    }
}

