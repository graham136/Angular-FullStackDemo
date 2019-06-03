using PhoneBookDemo.Interfaces;
using PhoneBookDemoApi.Api.SQL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// An implementation of the datafactory pattern. The DataAccess object is instatiated, 
/// by readin the cofiguration strings.
/// </summary>
namespace PhoneBookDemoApi.Factories
{
    public class DataFactory
    {
        String connectionString;
        String connectionType;

        public DataFactory()
        {
            this.connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["Database"].ConnectionString;
            this.connectionType = System.Configuration.ConfigurationManager.ConnectionStrings["Type"].ConnectionString;
        }

        public IDataAccess GetDataAccess()
        {
            switch(this.connectionType)
            {
                // Here the DataAcces object is instatiated, according to the connection type in the config
                case "SQL": return new SQLDataAccess(this.connectionString);
                default: return new SQLDataAccess(this.connectionString);
            }
        }

    }
}
