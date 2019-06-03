using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// Interface for the ActionResult ResponseFactory
/// </summary>
namespace PhoneBookDemoApi.Interfaces
{
    interface IActionResult
    {
        bool Success { get; set; }
        string Message { get; set; }
    }
}
