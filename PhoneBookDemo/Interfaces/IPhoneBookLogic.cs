using PhoneBookDemo.Models;
using PhoneBookDemoApi.Models;
using System.Collections.Generic;

/// <summary>
/// Interface for the phonebook object
/// </summary>
namespace PhoneBookDemo.Interfaces
{
    public interface IPhoneBookLogic
    {
        ActionResult PhoneBookAddItem(string _PhoneBookName);
        ActionResult PhoneBookDeleteItem(string _PhoneBookName);
        ActionResult PhoneBookUpdateItem(string old_PhoneBookName, string new_PhoneBookName);
        List<PhoneBook> PhoneBookGetAllItems();
        ActionResult PhoneBookDuplicateExists(string _PhoneBookName);
    }
}
