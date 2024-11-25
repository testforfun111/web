using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Interfaces;

namespace Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository; 
        public OrderService (IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Order GetOrderById(int id)
        {
            return _orderRepository.GetOrder(id);
        }

        public void AddOrder(Order order)
        {
            _orderRepository.AddOrder(order);
        }
        public void DelOrder(int id)
        {   
            if (_orderRepository.GetOrder(id) == null)
            {
                throw new Exception("Заказ не существует");
            }
            else
                _orderRepository.DelOrder(GetOrderById(id));
        }
        public ICollection<Order> GetOrdersByIdUser(int id_user)
        {
            return _orderRepository.GetAllOrdersByIdUser(id_user);
        }

        public void UpdateOrder(int id, Order order)
        {
            order.Id = id;
            _orderRepository.UpdateOrder(order);
        }

        public ICollection<Order> GetAllOrders()
        {
            return _orderRepository.GetAllOrders();
        }
    }
}
