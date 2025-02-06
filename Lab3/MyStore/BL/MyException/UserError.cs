using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{

    public class UserNotFoundException : Exception
    {
        public UserNotFoundException() { }
        public UserNotFoundException(string information = "User isn't found!\n") : base(information) { }
        public UserNotFoundException(Exception inner, string information = "User isn't found!\n") : base(information, inner) { }
    }
    public class AddUserErrorException : Exception
    {
        public AddUserErrorException() { }
        public AddUserErrorException(string information = "Can't add user!\n") : base(information) { }
        public AddUserErrorException(Exception inner, string information = "Can't add user!\n") : base(information, inner) { }
    }
    public class UserExistsException : Exception
    {
        public UserExistsException() { }
        public UserExistsException(string information = "User already exists!\n") : base(information) { }
        public UserExistsException(Exception inner, string information = "User already exists!\n") : base(information, inner) { }
    }
}
