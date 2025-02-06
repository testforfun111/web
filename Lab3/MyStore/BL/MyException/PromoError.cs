using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyException
{
    public class AddPromoException : Exception
    {
        public AddPromoException() { }
        public AddPromoException(string information = "Can't add order!\n") : base(information) { }
        public AddPromoException(Exception inner, string information = "Can't add order!\n") : base(information, inner) { }
    }

    public class PromoNotFoundException : Exception
    {
        public PromoNotFoundException() { }
        public PromoNotFoundException(string information = "Order wasn't found!\n") : base(information) { }
        public PromoNotFoundException(Exception inner, string information = "Order wasn't found!\n") : base(information, inner) { }
    }
   
}
