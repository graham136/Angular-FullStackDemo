using PhoneBookDemo.Interfaces;
using PhoneBookDemoApi.Models;

/// <summary>
/// An implementation of the repsonse factory pattern. 
/// The IresponseFactory is implemented.
/// Responses for http is standardised.
/// </summary>
namespace PhoneBookDemo.Factories
{
    public class ResponseFactory: IResponseFactory
    {
        /// <summary>
        /// Function that returns an Actionresult <seealso cref="ActionResult">
        /// </summary>
        /// <param name="error"></param>
        /// <returns></returns>
        public ActionResult ErrorResponse(string error)
        {
            ActionResult result = new ActionResult(false,error);
            return result;
        }

        /// <summary>
        /// Function that returns an ActionResult <seealso cref="ActionResult"/>
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public ActionResult SuccessResponse(string message)
        {
            ActionResult result = new ActionResult(true, message);
            return result;
        }
        
    }
}
