using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{
    public class InputError : Exception
    {
        public InputError() { }
        public InputError(string information = "Error Input!\n") : base(information) { }
        public InputError(Exception inner, string information = "Error Input!\n") : base(information, inner) { }
    }
}
