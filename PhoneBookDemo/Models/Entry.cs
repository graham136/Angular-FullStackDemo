using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// The main object in which  entries are stored
namespace PhoneBookDemo.Models
{
    public class Entry
    {
             
        public Guid EntryId { get; set; }
        public Guid PhoneBookId { get; set; }
        public String EntryName { get; set; }        
        public String EntryNumber { get; set; }

        public Entry(Guid EntryId, Guid PhoneBookId, String EntryName, String EntryNumber)
        {
            this.EntryId = EntryId;
            this.PhoneBookId = PhoneBookId;
            this.EntryName = EntryName;
            this.EntryNumber = EntryNumber;
        }

    }
}
