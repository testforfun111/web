using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;

namespace BL.RepositoryInterfaces
{
    public interface IOrderRepository
    {
        Order GetOrder(int id);
        List<Order> GetAllOrders();
        List<Order> GetAllOrdersByIdUser(int id_user);
        void AddOrder(Order order);
        void DelOrder(Order order);

        void UpdateOrder(Order order);

        bool IsExistOrder(Order order);

        int GetIdOrder(Status status, DateTime date, int id_user);
    }
}
