using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{
    public class CartError
    {
        public class AddCartException : Exception
        {
            public AddCartException() { }
            public AddCartException(string information = "Can't add order!\n") : base(information) { }
            public AddCartException(Exception inner, string information = "Can't add order!\n") : base(information, inner) { }
        }

        public class CartNotFoundException : Exception
        {
            public CartNotFoundException() { }
            public CartNotFoundException(string information = "Order wasn't found!\n") : base(information) { }
            public CartNotFoundException(Exception inner, string information = "Order wasn't found!\n") : base(information, inner) { }
        }
    }
}
