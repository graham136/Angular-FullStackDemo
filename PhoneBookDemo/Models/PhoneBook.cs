using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
///  The main object in which the phonebooks are stored.
/// </summary>
namespace PhoneBookDemo.Models
{
    public class PhoneBook
    {
        public Guid PhoneBookId { get; set; }
        public String PhoneBookName { get; set; }

        public PhoneBook(Guid PhoneBookId, String PhoneBookName)
        {
            this.PhoneBookId = PhoneBookId;
            this.PhoneBookName = PhoneBookName;
        }
    }
}
