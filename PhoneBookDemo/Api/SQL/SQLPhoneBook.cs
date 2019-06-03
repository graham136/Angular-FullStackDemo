using PhoneBookDemo.Factories;
using PhoneBookDemo.Interfaces;
using PhoneBookDemo.Models;
using PhoneBookDemoApi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// A sql implementation of the IphonebookLogic interface
/// </summary>
namespace PhoneBookDemoApi.Api.SQL
{
    public class SQLPhoneBook : IPhoneBookLogic
    {
        private String connectionString;
        private object[] temp;

        /// <summary>
        /// Contructor for SQLPhonebook
        /// </summary>
        /// <param name="tempConnectionString">The connection string to the database</param>
        public SQLPhoneBook(String tempConnectionString)
        {
            this.connectionString = tempConnectionString;
        }

        /// <summary>
        /// The function to add a phonebook
        /// </summary>
        /// <param name="_PhoneBookName">Phonebook name to be added</param>
        /// <returns></returns>
        public ActionResult PhoneBookAddItem(string _PhoneBookName)
        {
            ResponseFactory response = new ResponseFactory();

            try
            {
                var sqlQuery =  @"INSERT INTO PhoneBook(PhoneBookName) VALUES(@PhoneBookName)";

                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@PhoneBookName", _PhoneBookName);
                               
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
            catch(Exception ex)
            {
                return response.ErrorResponse(ex.Message);
            }
        }

        /// <summary>
        /// The function to delete an item
        /// </summary>
        /// <param name="_PhoneBookName">Phonebook name to be deleted</param>
        /// <returns></returns>
        public ActionResult PhoneBookDeleteItem(string _PhoneBookName)
        {
            
            ResponseFactory response = new ResponseFactory();           

            try
            {
                var sqlQuery = "Delete from PhoneBook where PhoneBookName = @PhoneBookName";

                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@PhoneBookName", _PhoneBookName);
                
                connection.Open();
                int deleted = command.ExecuteNonQuery();

                if (deleted>0)
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
        /// Function to check for duplicates
        /// </summary>
        /// <param name="_PhoneBookName">The name of the phonebook to be checked for duplicates</param>
        /// <returns></returns>
        public ActionResult PhoneBookDuplicateExists(string _PhoneBookName)
        {
            SqlDataReader reader;
            List<PhoneBook> phoneBooks = new List<PhoneBook>();
            ResponseFactory response = new ResponseFactory();

            try
            {
                var sqlQuery = "SELECT * from PhoneBook";
                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);

                connection.Open();
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    phoneBooks.Add(new PhoneBook((Guid)reader.GetValue(0), reader.GetString(1)));
                }

                 if(phoneBooks.Any(x => x.PhoneBookName == _PhoneBookName))
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
        /// The function to get all phonebook items
        /// </summary>
        /// <returns></returns>
        public List<PhoneBook> PhoneBookGetAllItems()
        {
            SqlDataReader reader;
            List<PhoneBook> result = new List<PhoneBook>();

            try
            {
                var sqlQuery = "SELECT * from PhoneBook";
                var connection = new SqlConnection(this.connectionString);
                var command = new SqlCommand(sqlQuery, connection);

                connection.Open();
                reader = command.ExecuteReader();
                while (reader.Read())
                {
                    result.Add(new PhoneBook((Guid)reader.GetValue(0), reader.GetString(1)));
                }

                return result;
            }
            catch
            {
                return result;
            }
           
        }

        /// <summary>
        /// The function to update phonebooks
        /// </summary>
        /// <param name="old_PhoneBookName">The name of the old phonebook to be updated</param>
        /// <param name="new_PhoneBookName">The name of the new phonebook</param>
        /// <returns></returns>
        public ActionResult PhoneBookUpdateItem(string old_PhoneBookName, string new_PhoneBookName)
        {
            throw new NotImplementedException();
        }
    }
}
