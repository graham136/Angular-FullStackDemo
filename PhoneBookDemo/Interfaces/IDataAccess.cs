using PhoneBookDemoApi.Models;

/// <summary>
/// Interface for the Datafactory DataAccess object
/// </summary>
namespace PhoneBookDemo.Interfaces
{
    public interface IDataAccess
    {
        IPhoneBookLogic PhoneBook { get; }
        IEntryLogic Entry { get; }
        ActionResult TestConnection();
    }
}
