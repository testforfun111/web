using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{
    public class OrderError
    {
        public class AddOrderErrorException : Exception
        {
            public AddOrderErrorException() { }
            public AddOrderErrorException(string information = "Can't add order!\n") : base(information) { }
            public AddOrderErrorException(Exception inner, string information = "Can't add order!\n") : base(information, inner) { }
        }

        public class OrderNotFoundException : Exception
        {
            public OrderNotFoundException() { }
            public OrderNotFoundException(string information = "Order wasn't found!\n") : base(information) { }
            public OrderNotFoundException(Exception inner, string information = "Order wasn't found!\n") : base(information, inner) { }
        }
    }
}
