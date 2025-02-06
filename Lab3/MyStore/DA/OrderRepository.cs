using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.RepositoryInterfaces;
using BL.Models;
using BL.MyException;
using Microsoft.Extensions.Logging.Abstractions;

namespace DA
{
    public class OrderRepository : IOrderRepository
    {
        private Connector connector;
        public Connector Connector { get => connector; set => connector = value; }
        public OrderRepository(Connector connect)
        {
            Connector = connect;
        }
        public Order GetOrder(int id)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryGetOrder(id);

            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);

            Order order = null;
            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    order = new Order(reader.GetInt32(0), (Status)Enum.Parse(typeof(Status), reader.GetString(1)), reader.GetDateTime(2), reader.GetInt32(3), reader.GetInt32(4));
                }
                reader.Close();
            }
            return order;
        }

        public List<Order> GetAllOrders()
        {
            CheckConnection.checkConnection(Connector);
            string query = queryGetAllOrders();

            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            List<Order> allOrder = new List<Order>();

            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    allOrder.Add(new Order(reader.GetInt32(0),(Status)Enum.Parse(typeof(Status),  reader.GetString(1)), reader.GetDateTime(2),
                                            reader.GetInt32(3), reader.GetInt32(4)));
                }
                reader.Close();
            }

            return allOrder;
        }
        
        public List<Order> GetAllOrdersByIdUser(int id)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryGetAllOrdersByIdUser(id);

            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            List<Order> allOrder = new List<Order>();

            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    allOrder.Add(new Order(reader.GetInt32(0), (Status)Enum.Parse(typeof(Status), reader.GetString(1)), reader.GetDateTime(2),
                                            reader.GetInt32(3), reader.GetInt32(4)));
                }
                reader.Close();
            }

            return allOrder;
        }
        public void AddOrder(Order order)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryAddOrder(order);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            cmd.ExecuteNonQuery();
        }
        
        public void UpdateOrder(Order order)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryUpdateOrder(order);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            cmd.ExecuteNonQuery();
        }
        public void DelOrder(Order order)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryDelOrder(order);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            cmd.ExecuteNonQuery();
        }

        public bool IsExistOrder(Order order)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryIsExistOrder(order);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);

            bool flag = (bool)cmd.ExecuteScalar();
            return flag;
        }

        public int GetIdOrder(Status status, DateTime date, int id_user, int id_promo)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryGetIdOrder(status, date, id_user, id_promo);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);

            int id = (int)cmd.ExecuteScalar();
            return id;
        }

        public string queryGetIdOrder(Status status, DateTime date, int id_user, int id_promo)
        {
            return $"select id from OrderDB where status = '{status}' and data_created = '{date}' and id_user ={id_user} and id_promo = {id_promo} ";
        }
        public string queryGetOrder(int ID)
        {
            return $"select * from OrderDB where id = {ID}";
        }
        public string queryGetAllOrders()
        {
            return $"select * from OrderDB";
        }

        public string queryGetAllOrdersByIdUser(int id)
        {
            return $"select * from OrderDB where id_user = {id}";
        }
        public string queryAddOrder(Order order)
        {
            return $"insert into OrderDB(status, data_created, id_user, id_promo)" +
                $" values ('{order.Status}', '{order.Data_created}', {order.Id_user}, {order.Id_promo})";
        }
        public string queryUpdateOrder(Order order)
        {
            return $"update OrderDB " +
                $"set status = '{order.Status}', data_created = '{order.Data_created}', id_user = {order.Id_user}, id_promo = {order.Id_promo}" +
                $" where id = {order.Id}";
        }
        public string queryDelOrder(Order order)
        {
            return $"delete from OrderDB where id = {order.Id}";
        }

        public string queryIsExistOrder(Order order)
        {
            return $"select exists (select * from OrderDB where status = '{order.Status}' and data_created = '{order.Data_created}' and id_user = {order.Id_user} and id_promo = {order.Id_promo})";
        }

    }
}
