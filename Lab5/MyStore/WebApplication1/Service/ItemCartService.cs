using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Interfaces;

namespace Services
{
    public class ItemCartService
    {
        private readonly IItemCartRepository _itemCartRepository;

        public ItemCartService (IItemCartRepository itemCartRepository)
        {
            _itemCartRepository = itemCartRepository;   
        }
        public ItemCart GetItemCartById(int id)
        {
            return _itemCartRepository.GetItemCart(id);
        }

        public void AddItemCart(ItemCart itemCart)
        {
            if (_itemCartRepository.IsExistItemCartWithProduct(itemCart) == true)
            {
                _itemCartRepository.UpdateItemCart(itemCart);
            }
            else
                _itemCartRepository.AddItemCart(itemCart);
        }

        public void DelItemCart(int id)
        {
            if (_itemCartRepository.GetItemCart(id) == null)
            {
                throw new Exception("Деталь корзины не существует");
            }
            else
            {
                ItemCart itemCart = _itemCartRepository.GetItemCart(id);
                ItemCart tmp = new ItemCart(itemCart.Id, itemCart.Id_product, itemCart.Id_cart, -1);
                if (itemCart.Quantity > 1)
                {
                    _itemCartRepository.UpdateItemCart(tmp);
                }
                else 
                    _itemCartRepository.DelItemCart(_itemCartRepository.GetItemCart(id));
            }
        }

        public void UpdateItemCart(ItemCart itemCart)
        {
            if (_itemCartRepository.IsExistItemCart(itemCart) == false)
            {
                throw new Exception("Деталь корзины не существует");
            }
            else
                _itemCartRepository.UpdateItemCart(itemCart);
        }

        public List<ItemCart> GetAllItemCartByIdCart(int id_cart)
        {
            return _itemCartRepository.GetAllItemCartByIdCart(id_cart);
        }
        public List<ItemCart> GetAllItemCart()
        {
            return _itemCartRepository.GetAllItemCart();
        }
    }
}
