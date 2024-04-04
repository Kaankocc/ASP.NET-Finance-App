using System;
namespace FinanceTrackerApi.Models
{
	public class Transaction
	{
		public int Id { get; set; }

		public int CategoryId { get; set; }
		public Category Category { get; set; }

		public int Amount { get; set; }

		public string? Note { get; set; }

		public DateTime Date { get; set; } = DateTime.Now;
	}
}

