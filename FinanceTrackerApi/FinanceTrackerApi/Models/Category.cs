using System;
namespace FinanceTrackerApi.Models
{
	public class Category
	{
		public int Id { get; set; }

		public string Title { get; set; }

		public string Icon { get; set; } = "";

		public string Type { get; set; } = "Expense";

	}
}

