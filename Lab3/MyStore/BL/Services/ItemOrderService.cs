using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using BL.RepositoryInterfaces;

namespace BL.Services
{
    public class ItemOrderService
    {
        private readonly IItemOrderRepository _itemOrderRepository;

        public ItemOrderService(IItemOrderRepository itemOrderRepository)
        {
            _itemOrderRepository = itemOrderRepository;
        }

        public ItemOrder GetItemOrderById(int id)
        {
            return _itemOrderRepository.GetItemOrder(id);
        }

        public ItemOrder GetItemOrderByIds(int id_order, int id_product)
        {
            return _itemOrderRepository.GetItemOrder(id_order, id_product);
        }

        public List<ItemOrder> GetItemOrderByIdOrder(int id)
        {
            return _itemOrderRepository.GetItemOrderByIdOrder(id);
        }

        public void AddItemOrder(ItemOrder itemOrder)
        {
            if (_itemOrderRepository.IsExistItemOrder(itemOrder) == true)
            {
                throw new Exception("Деталь корзины существует");
            }
            else
                _itemOrderRepository.AddItemOrder(itemOrder);
        }

        public void DelItemOrder(ItemOrder itemOrder)
        {
            if (_itemOrderRepository.IsExistItemOrder(itemOrder) == false)
            {
                throw new Exception("Деталь корзины не существует");
            }
            else
                _itemOrderRepository.DelItemOrder(itemOrder);
        }

        public void UpdateItemOrder(ItemOrder itemOrder)
        {
            if (_itemOrderRepository.IsExistItemOrder(itemOrder) == false)
            {
                throw new Exception("Деталь корзины не существует");
            }
            else
                _itemOrderRepository.UpdateItemOrder(itemOrder);
        }
    }
}
