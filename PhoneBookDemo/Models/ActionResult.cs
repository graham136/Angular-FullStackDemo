using PhoneBookDemoApi.Interfaces;
using PhoneBookDemo.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

///Implementation of the Response factory ActionResult reponse <seealso cref="ResponseFactory"/>
namespace PhoneBookDemoApi.Models
{
    public class ActionResult: IActionResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public ActionResult(bool _success, string _message)
        {
            this.Success = _success;
            this.Message = _message;
        }   
    }
}
