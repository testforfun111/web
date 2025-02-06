using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.RepositoryInterfaces
{
    public interface IItemCartRepository
    {
        ItemCart GetItemCart(int id);
        ItemCart GetItemCart(int id_cart, int id_product);

        void AddItemCart(ItemCart itemCart);

        void DelItemCart(ItemCart itemCart);

        void UpdateItemCart(ItemCart itemCart);

        bool IsExistItemCart(ItemCart itemCart);

        List<ItemCart> GetAllItemCartByIdCart(int id_cart);
    }
}
