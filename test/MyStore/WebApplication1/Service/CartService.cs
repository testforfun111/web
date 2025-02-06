using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Interfaces;

namespace Services
{
    public class CartService
    {
        private readonly ICartRepository _cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository ?? throw new Exception("Параметр пустой!");
        }

        public ICollection<Cart> GetAllCarts()
        {
            return _cartRepository.GetAllCarts();
        }
        public Cart GetCartById(int id)
        {
            return _cartRepository.GetCart(id);
        }

        public void AddCart(Cart cart)
        {
            if (_cartRepository.IsExistCart(cart) == true)
            {
                throw new Exception("Cart existed");
            }
            else
            {
                _cartRepository.AddCart(cart);
            }
        }

        public void DelCart(int id)
        {
            if (_cartRepository.GetCart(id) == null)
            {
                throw new Exception("Cart didnt exist");
            }
            else
            {
                _cartRepository.DelCart(_cartRepository.GetCart(id));
            }
        }

        public void UpdateCart(int id, Cart cart) 
        {
            cart.Id = id;
            if (_cartRepository.IsExistCart(cart) == false)
            {
                throw new Exception("Cart didn't exist");
            }
            else
            {  
                _cartRepository.UpdateCart(cart);
            }
        }
    }
}
