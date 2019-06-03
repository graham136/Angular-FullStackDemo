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

namespace EntryDemoAPI.Controllers
{
    /// <summary>
    /// Controller for Phone number entries <seealso cref="IEntryLogic"/>
    /// </summary>
    public static class EntryController
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpRequestMessage">The http request message that adds an entry</param>
        /// <param name="log">The log writer that outputs debug info for azure functions</param>
        /// <returns></returns>
        [FunctionName("EntryAddItem")]
        public static async Task<HttpResponseMessage> EntryAddItem([HttpTrigger(AuthorizationLevel.Function, "post", Route = "Entry/EntryAddItem")]HttpRequestMessage httpRequestMessage, TraceWriter log)
        {

            /* 1st implementation to send data in query string strings.
            
            // Get query string parameters
            var queryStringParameters = httpRequestMessage.GetQueryNameValuePairs();

            // Get EntryName 
            string EntryName = queryStringParameters.FirstOrDefault(q => string.Compare(q.Key, "EntryName", true) == 0).Value;
            if (EntryName == null)
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid EntryName", "application/json");

            // Get EntryNumber 
            string EntryNumber = queryStringParameters.FirstOrDefault(q => string.Compare(q.Key, "EntryNumber", true) == 0).Value;
            if (EntryNumber == null)
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid EntryNumber", "application/json");

            // Get EntryNumber 
            string tempPhoneBookId = queryStringParameters.FirstOrDefault(q => string.Compare(q.Key, "PhoneBookId", true) == 0).Value;
            if (tempPhoneBookId == null)
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid PhoneBookId", "application/json");

            Guid PhoneBookId;

            try
            {
                PhoneBookId = Guid.Parse(tempPhoneBookId);
            }
            catch
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid PhoneBookId", "application/json");
            }

    */

            /*
             * 2nd implementation to send/receive data in the httpresponse message header
             * */
            Entry tempEntry = null;
            try
            {

                tempEntry = JsonConvert.DeserializeObject<Entry>(await httpRequestMessage.Content.ReadAsStringAsync());
                if (tempEntry == null)
                    return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid Entry", "application/json");
            }
            catch (Exception e)
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, e.Message + "Invalid Invalid Entry", "application/json");
            }

            IDataAccess dataAccess = new DataFactory().GetDataAccess();
            var result = dataAccess.Entry.EntryAddItem(tempEntry.PhoneBookId, tempEntry.EntryName, tempEntry.EntryNumber);

            if (result == null)
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.NotFound);
            }

            return httpRequestMessage.CreateResponse(HttpStatusCode.OK, result, "application/json");

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpRequestMessage">Http response message to delete an item</param>
        /// <param name="log">Logger to output debug messages</param>
        /// <returns></returns>
        [FunctionName("EntryDeleteItem")]
        public static async Task<HttpResponseMessage> EntryDeleteItem([HttpTrigger(AuthorizationLevel.Function, "delete", Route = "Entry/EntryDeleteItem")]HttpRequestMessage httpRequestMessage, TraceWriter log)
        {

            // Get query string parameters
            var queryStringParameters = httpRequestMessage.GetQueryNameValuePairs();

            // Get account id 
            
            string tempEntryId = queryStringParameters.FirstOrDefault(q => string.Compare(q.Key, "EntryId", true) == 0).Value;
            if (tempEntryId == null)
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid EntryId", "application/json");

            Guid EntryId;
            try
            {
                EntryId = Guid.Parse(tempEntryId);
            }
            catch
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.BadRequest, "Invalid EntryId", "application/json");
            }


            IDataAccess dataAccess = new DataFactory().GetDataAccess();
            var result = dataAccess.Entry.EntryDeleteItem(EntryId);

            if (result == null)
            {
                return httpRequestMessage.CreateResponse(HttpStatusCode.NotFound);
            }

            return httpRequestMessage.CreateResponse(HttpStatusCode.OK, result, "application/json");

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpRequestMessage">Http response message to get all the items</param>
        /// <param name="log">Logger to output debug messages</param>
        /// <returns></returns>
        [FunctionName("EntryGetAllItems")]
        public static async Task<HttpResponseMessage> EntryGetAllItems([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "Entry/EntryGetAllItems")]HttpRequestMessage httpRequestMessage, TraceWriter log)
        {

            IDataAccess dataAccess = new DataFactory().GetDataAccess();
            var result = dataAccess.Entry.EntryGetAllItems();

            return result != null
                ? httpRequestMessage.CreateResponse(HttpStatusCode.OK, result, "application/json")
                : httpRequestMessage.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}
