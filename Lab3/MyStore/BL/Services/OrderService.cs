using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using BL.RepositoryInterfaces;
using MyException;

namespace BL.Services
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
        public void DelOrder(Order order)
        {   
            if (_orderRepository.IsExistOrder(order) != true)
            {
                throw new Exception("Заказ не существует");
            }
            else
                _orderRepository.DelOrder(order);
        }

        public void UpdateOrder(Order order)
        {
            _orderRepository.UpdateOrder(order);
        }

        public List<Order> GetAllOrders()
        {
            return _orderRepository.GetAllOrders();
        }

        public DataTable viewAllUsers()
        {
            List<Order> allOrders = GetAllOrders();
            DataTable table = new DataTable();
            table.Rows.Clear();
            table.Columns.Add("ID");
            table.Columns.Add("Data");
            table.Columns.Add("Id_User");
            table.Columns.Add("Id_promo");
            table.Columns.Add("Status");
            foreach (Order order in allOrders)
            {
                table.Rows.Add(order.Id, order.Data_created, order.Id_user, order.Id_promo, order.Status);
            }
            return table;
        }
        public DataTable viewAllUsersByClient(int id_user)
        {
            List<Order> allOrders = _orderRepository.GetAllOrdersByIdUser(id_user);
            DataTable table = new DataTable();
            table.Rows.Clear();
            table.Columns.Add("ID");
            table.Columns.Add("Data");
            table.Columns.Add("Id_User");
            table.Columns.Add("Id_promo");
            table.Columns.Add("Status");
            foreach (Order order in allOrders)
            {
                table.Rows.Add(order.Id, order.Data_created, order.Id_user, order.Id_promo, order.Status);
            }
            return table;
        }

        public int GetIdOrder(Status status, DateTime date, int id_user, int id_promo)
        {
            return _orderRepository.GetIdOrder(status, date, id_user, id_promo);
        }
    }
}
