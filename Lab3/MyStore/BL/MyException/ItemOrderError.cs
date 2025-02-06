using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{
    public class ItemOrderError
    {
        public class ItemOrderNotFoundException : Exception
        {
            public ItemOrderNotFoundException() { }
            public ItemOrderNotFoundException(string information = "Item wasn't found!\n") : base(information) { }
            public ItemOrderNotFoundException(Exception inner, string information = "Item wasn't found!\n") : base(information, inner) { }
        }
    }
}
