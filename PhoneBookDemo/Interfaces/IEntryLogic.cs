using PhoneBookDemo.Models;
using System.Collections.Generic;
using PhoneBookDemoApi.Models;
using System;

/// <summary>
/// Interface for the Entry object.
/// </summary>
namespace PhoneBookDemo.Interfaces
{
    public interface IEntryLogic
    {
        ActionResult EntryAddItem(Guid _PhoneBookId, string _EntryName, string EntryNumber);
        ActionResult EntryDeleteItem(Guid _EntryId);
        ActionResult EntryUpdateItem(string _EntryId, string new_EntryNumber);
        List<Entry> EntryGetAllItems();
        ActionResult EntryDuplicateExists(Guid PhoneBookId, string _EntryNumber);
    }
}
