using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using System;
using System.Configuration;
using System.Data.SqlClient;
using PhoneBookDemoApi.Api.SQL;
using PhoneBookDemo.Interfaces;
using PhoneBookDemo.Models;
using System.Collections.Generic;
using Newtonsoft.Json;
using PhoneBookDemoApi.Factories;

namespace PhoneBookDemoAPI.Controllers
{
    /// <summary>
    /// Controller for the phone books in which entries are added <seealso cref="IPhoneBookLogic"/>
    /// </summary>
    public static class PhoneBookController
    {
        /// <summary>
        /// Azure function to add a phonebook item
        /// </summary>
        /// <param name="httpRequestMessage">Https request message to add a phonebook item</param>
        /// <param name="log">Logger to output debug messages</param>
        /// <returns></returns>
        [FunctionName("PhoneBookAddItem")]
        public static async Task<HttpResponseMessage> PhoneBookAddItem([HttpTrigger(AuthorizationLevel.Function, "post", Route = "PhoneBook/PhoneBookAddItem")]HttpRequestMessage httpRequestMessage, TraceWriter log)
        {

            
            
            /* 1st implemententation to add values in the querystring
            // Get query string parameters
            var queryStringParameters = httpRequestMessage.GetQueryNameValuePairs();

            // Get account id 
            string phoneBookName = queryStringParameters.FirstOrDefault(q => string.Compare(q.Key, "phoneBookName", true) == 0).Value;
            if (phoneBookName == null)
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid phoneBookName", "application/json");

           */
            
            /*
             * 2nd implementation to add values in the header 
             */
            String phoneBookName = null;
            PhoneBook tempPhonebook = null;
            try
            {

                tempPhonebook = JsonConvert.DeserializeObject<PhoneBook>(await httpRequestMessage.Content.ReadAsStringAsync());
                if (tempPhonebook == null)
                    return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid phoneBookName", "application/json");
            }
            catch (Exception e)
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, e.Message + ": Invalid phoneBookName", "application/json");
            }

            phoneBookName = tempPhonebook.PhoneBookName;
            
            IDataAccess dataAccess = new DataFactory().GetDataAccess();
            var result = dataAccess.PhoneBook.PhoneBookAddItem(phoneBookName);

            if (result == null) {
                return httpRequestMessage.CreateResponse(HttpStatusCode.NotFound);
            }

            return httpRequestMessage.CreateResponse(HttpStatusCode.OK, result, "application/json");
                
        }

        /// <summary>
        /// Azure function to delete a phonebook item
        /// </summary>
        /// <param name="httpRequestMessage">Https request message to delete an item</param>
        /// <param name="log">Logget to output debug messages</param>
        /// <returns></returns>
        [FunctionName("PhoneBookDeleteItem")]
        public static async Task<HttpResponseMessage> PhoneBookDeleteItem([HttpTrigger(AuthorizationLevel.Function, "delete", Route = "PhoneBook/PhoneBookDeleteItem")]HttpRequestMessage httpRequestMessage, TraceWriter log)
        {
            
            
            // Get query string parameters
            var queryStringParameters = httpRequestMessage.GetQueryNameValuePairs();

            // Get account id 
            string phoneBookName = queryStringParameters.FirstOrDefault(q => string.Compare(q.Key, "phoneBookName", true) == 0).Value;
            if (phoneBookName == null)
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid phoneBookName", "application/json");

            

            /*
            string phoneBookName = null;
            try
            {
                phoneBookName = JsonConvert.DeserializeObject<String>(await httpRequestMessage.Content.ReadAsStringAsync());
                if (phoneBookName == null)
                    return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid phoneBookName", "application/json");
            }
            catch (Exception e)
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, e.Message + ": Invalid phoneBookName", "application/json");
            }

    */

            IDataAccess dataAccess = new DataFactory().GetDataAccess();
            var result = dataAccess.PhoneBook.PhoneBookDeleteItem(phoneBookName);

            if (result == null)
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.NotFound);
            }

            return httpRequestMessage.CreateResponse(HttpStatusCode.OK, result, "application/json");
            
        }

        /// <summary>
        /// Azure function to get all phonebooks
        /// </summary>
        /// <param name="httpRequestMessage">Http request message to get all phonebook items</param>
        /// <param name="log">Logger to output debug messages</param>
        /// <returns></returns>
        [FunctionName("PhoneBookGetAllItems")]
        public static async Task<HttpResponseMessage> PhoneBookGetAllItems([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "PhoneBook/PhoneBookGetAllItems")]HttpRequestMessage httpRequestMessage, TraceWriter log)
        {

            IDataAccess dataAccess = new DataFactory().GetDataAccess();
            var result = dataAccess.PhoneBook.PhoneBookGetAllItems();   
            
            return result != null
                ? httpRequestMessage.CreateResponse(HttpStatusCode.OK, result, "application/json")
                : httpRequestMessage.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}
