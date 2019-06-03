using PhoneBookDemoApi.Models;

/// <summary>
/// Interface for the response factory
/// </summary>
namespace PhoneBookDemo.Interfaces
{
    interface IResponseFactory
    {
        ActionResult ErrorResponse(string error);
        ActionResult SuccessResponse(string message);        
    }
}
