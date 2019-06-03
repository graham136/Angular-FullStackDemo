using Moq;
using PhoneBookDemo.Interfaces;
using PhoneBookDemoApi.Api.SQL;
using PhoneBookDemoApi.Models;
using System;
using Xunit;
using System.Data.SqlClient;

namespace LogicTests
{
    public class SQLLogicTests
    {
        [Fact]
        public void TestPhoneBookAddItemNoDataBase()
        {
            // Arrange

            /*
            var accessMock = new Mock<IDataAccess>();
            var phoneBookMock = new Mock<IPhoneBookLogic>();
            
            accessMock.SetupGet(a => a.PhoneBook).Returns(phoneBookMock.Object);
            phoneBookMock.Setup(a => a.PhoneBookAddItem(It.IsAny<String>()))
                .Returns(new ActionResult(true,"") { Success = true, Message = string.Empty });

            */

            SQLPhoneBook sqlPhoneBook = new SQLPhoneBook("");
            string phoneBookName = "PhoneBook1";

            // Act
            var returnvalue = sqlPhoneBook.PhoneBookAddItem(phoneBookName);

            // Assert
            Assert.False(returnvalue.Success);
            Assert.Equal("The ConnectionString property has not been initialized.", returnvalue.Message);

        }

        [Fact]
        public void TestEntryPHnoneBookAddItemSuccess()
        {
            // Arrange

            SQLPhoneBook sqlPhoneBook = new SQLPhoneBook("Data Source=GRAHAMP\\SQLEXPRESS;Initial Catalog=PhoneBookDB;Integrated Security=True;");
            string phoneBookName = "PhoneBook1";

            // Act
            var returnvalue = sqlPhoneBook.PhoneBookAddItem(phoneBookName);

            // Assert
            Assert.True(returnvalue.Success);
            Assert.Equal("Row inserted", returnvalue.Message);

        }

        [Fact]
        public void TestPhoneBookDuplicateExists()
        {
            // Arrange

            SQLPhoneBook sqlPhoneBook = new SQLPhoneBook("Data Source=GRAHAMP\\SQLEXPRESS;Initial Catalog=PhoneBookDB;Integrated Security=True;");
            string phoneBookName = "PhoneBook1";

            // Act
            var returnvalue = sqlPhoneBook.PhoneBookDuplicateExists(phoneBookName);

            // Assert
            Assert.True(returnvalue.Success);
            Assert.Equal("Duplicate found", returnvalue.Message);

        }

        [Fact]
        public void TestPhoneBookDeleteItemSuccess()
        {

            // Arrange


            SQLPhoneBook sqlPhoneBook = new SQLPhoneBook("Data Source=GRAHAMP\\SQLEXPRESS;Initial Catalog=PhoneBookDB;Integrated Security=True;");
            string phoneBookName = "PhoneBook1";

            // Act
            var returnvalue = sqlPhoneBook.PhoneBookDeleteItem(phoneBookName);

            // Assert
            Assert.True(returnvalue.Success);
            Assert.Equal("Row deleted", returnvalue.Message);

        }
    }
}
