using PhoneBookDemo.Interfaces;
using PhoneBookDemoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneBookDemoApi.Api.SQL
{
    /// <summary>
    /// Implementation of the DataAccesss interface to access the database
    /// </summary>
    class SQLDataAccess : IDataAccess
    {

        public String connectionString;
        public String connectionType;

        /// <summary>
        /// Contructor for SQLDataAccess
        /// </summary>
        /// <param name="connectionString">The connection string for the database to be accessed</param>
        public SQLDataAccess(String connectionString)
        {
            this.connectionString = connectionString;
           
            PhoneBook = new SQLPhoneBook(this.connectionString);
            Entry = new SQLEntry(this.connectionString);
        }

        /// <summary>
        /// The IphonebookLogic implementation for Sql access
        /// </summary>
        public IPhoneBookLogic PhoneBook { get; private set; }

        /// <summary>
        /// The IEntryLogic implementation for Sql access
        /// </summary>
        public IEntryLogic Entry { get; private set; }

        /// <summary>
        /// A method to test the current connection. Not implemented yet.
        /// </summary>
        /// <returns></returns>
        public ActionResult TestConnection()
        {
            throw new NotImplementedException();
        }
    }
}
