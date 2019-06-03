using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PhoneBookDemo.Factories;
using PhoneBookDemo.Models;
using PhoneBookDemoApi.Models;

/// <summary>
/// An implementation of the sql IEntrylogic interface
/// </summary>
namespace PhoneBookDemoApi.Api.SQL
{
    public class SQLEntry : PhoneBookDemo.Interfaces.IEntryLogic
    {

        private String connectionString;

        /// <summary>
        /// Constructor for SQLEntry
        /// </summary>
        /// <param name="tempConnectionString"></param>
        public SQLEntry(String tempConnectionString)
        {
            this.connectionString = tempConnectionString;
        }

        /// <summary>
        /// Function to add an entryItem viq SQL
        /// </summary>
        /// <param name="_PhoneBookId">The phonbebook id or foreign key of the phonebook</param>
        /// <param name="_EntryName">The name of the entry to be added</param>
        /// <param name="_EntryNumber">The number of the entry to be added</param>
        /// <returns></returns>
        public ActionResult EntryAddItem(Guid _PhoneBookId, string _EntryName, string _EntryNumber)
        {
            ResponseFactory response = new ResponseFactory();

            try
            {
                var sqlQuery = @"INSERT INTO Entry(PhoneBookId, EntryName, EntryNumber) VALUES(@PhoneBookId, @EntryName, @EntryNumber)";

                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@PhoneBookId", _PhoneBookId);
                command.Parameters.AddWithValue("@EntryName", _EntryName);
                command.Parameters.AddWithValue("@EntryNumber", _EntryNumber);

                connection.Open();
                int inserted = command.ExecuteNonQuery();

                if (inserted > 0)
                {
                    return response.SuccessResponse("Row inserted");
                }
                else
                {
                    return response.ErrorResponse("Row not inserted");
                }
            }
            catch (Exception ex)
            {
                return response.ErrorResponse(ex.Message);
            }
        }

        /// <summary>
        /// A function to delete an entry item via SQL
        /// </summary>
        /// <param name="_EntryId">The id of the entry to de deleted</param>
        /// <returns></returns>
        public ActionResult EntryDeleteItem(Guid _EntryId)
        {
            ResponseFactory response = new ResponseFactory();

            try
            {
                var sqlQuery = "Delete from Entry where EntryId = @EntryId";

                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@EntryId", _EntryId);

                connection.Open();
                int deleted = command.ExecuteNonQuery();

                if (deleted > 0)
                {
                    return response.SuccessResponse("Row deleted");
                }
                else
                {
                    return response.ErrorResponse("No Phonebook found");
                }
            }
            catch (Exception ex)
            {
                return response.ErrorResponse(ex.Message);
            }
        }

        /// <summary>
        /// A function to check if a duplicate exists in the entries
        /// </summary>
        /// <param name="_PhoneBookId">The foreign key of the entry checked</param>
        /// <param name="_EntryNumber">The phone number of the entry to be checked</param>
        /// <returns></returns>
        public ActionResult EntryDuplicateExists(Guid _PhoneBookId, string _EntryNumber)
        {
            SqlDataReader reader;
            List<Entry> entries = new List<Entry>();
            ResponseFactory response = new ResponseFactory();

            try
            {
                var sqlQuery = "SELECT * from Entry where EntryNumber = @EntryNumber";
                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@EntryPhoneNumber", _EntryNumber);

                connection.Open();
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    entries.Add(new Entry((Guid)reader.GetValue(0), (Guid)reader.GetValue(1), reader.GetString(2), reader.GetString(3)));
                }

                if (entries.Any(x => x.PhoneBookId == _PhoneBookId))
                {
                    return response.SuccessResponse("Duplicate found");
                }
                else
                {
                    return response.ErrorResponse("Duplicate not found");
                }
            }
            catch
            {
                return response.ErrorResponse("Duplicate not found");
            }
        }
        /// <summary>
        /// A function to retrieve all the entries
        /// </summary>
        /// <returns></returns>
        public List<Entry> EntryGetAllItems()
        {
            SqlDataReader reader;
            List<Entry> result = new List<Entry>();

            try
            {
                var sqlQuery = "SELECT * from Entry";
                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);

                connection.Open();
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    result.Add(new Entry((Guid)reader.GetValue(0), (Guid)reader.GetValue(1), reader.GetString(2), reader.GetString(3)));
                }

                return result;
            }
            catch
            {
                return result;
            }
        }

        /// <summary>
        /// A function to update an Entry item.
        /// </summary>
        /// <param name="_EntryId"></param>
        /// <param name="new_EntryPhoneNumber"></param>
        /// <returns></returns>
        public ActionResult EntryUpdateItem(string _EntryId, string new_EntryPhoneNumber)
        {
            throw new NotImplementedException();
        }
    }
}
