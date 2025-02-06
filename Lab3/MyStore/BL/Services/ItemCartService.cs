using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using BL.RepositoryInterfaces;

namespace BL.Services
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

        public ItemCart GetItemCartByIds(int id_cart, int id_product)
        {
            return _itemCartRepository.GetItemCart(id_cart, id_product);
        }

        public void AddProductToCart(int id_cart, int id_product)
        {
            ItemCart itemCart = GetItemCartByIds(id_cart, id_product);
            if (itemCart == null)
            {
                _itemCartRepository.AddItemCart(new ItemCart(-1, id_product, id_cart, 1));
            }
            else
            {
                itemCart.Quantity += 1;
                _itemCartRepository.UpdateItemCart(itemCart);
            }
        }
        public void AddItemCart(ItemCart itemCart)
        {
            if (_itemCartRepository.IsExistItemCart(itemCart) == true)
            {
                throw new Exception("Деталь корзины существует");
            }
            else
                _itemCartRepository.AddItemCart(itemCart);
        }

        public void DelItemCart(ItemCart itemCart)
        {
            if (_itemCartRepository.IsExistItemCart(itemCart) == false)
            {
                throw new Exception("Деталь корзины не существует");
            }
            else
                _itemCartRepository.DelItemCart(itemCart);
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
    }
}
