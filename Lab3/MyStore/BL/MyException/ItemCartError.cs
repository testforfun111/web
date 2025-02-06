using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{
    public class ItemCartError
    {
        public class ItemCartNotFoundException : Exception
        {
            public ItemCartNotFoundException() { }
            public ItemCartNotFoundException(string information = "Item wasn't found!\n") : base(information) { }
            public ItemCartNotFoundException(Exception inner, string information = "Item wasn't found!\n") : base(information, inner) { }
        }
    }
}
