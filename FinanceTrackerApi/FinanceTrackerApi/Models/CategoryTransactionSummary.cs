using System;
namespace FinanceTrackerApi.Models
{
	
        public class CategoryTransactionSummary
        {
            public string CategoryTitle { get; set; }
            public int TotalTransactionAmount { get; set; }
            public string Icon { get; set; } // Add a property for the icon
        }
 
}

