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
    public class ProductRepository : IProductRepository
    {
        private Connector connector;
        public Connector Connector { get { return connector; } set { connector = value; } }
        public ProductRepository(Connector connector)
        {
            Connector = connector;
        }
        public Product GetProduct(int id)
        {
            CheckConnection.checkConnection(connector);
            string query = queryGetProduct(id);

            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);

            Product product = null;
            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    product = new Product(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2), reader.GetInt32(3),
                        reader.GetString(4), reader.GetString(5));    
                }
                reader.Close();
            }
            return product;
        }

        public Product GetProduct(string name)
        {
            CheckConnection.checkConnection(connector);
            string query = queryGetProduct(name);

            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            Product product = null;

            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.Read())
                {
                    product = new Product(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2), reader.GetInt32(3),
                        reader.GetString(4), reader.GetString(5));
                }
                reader.Close();
            }
            return product;
        }

        public void AddProduct(Product product)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryAddProduct(product);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            cmd.ExecuteNonQuery();
        }

        public void DelProduct(Product product)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryDelProduct(product);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            cmd.ExecuteNonQuery();
        }
        public void UpdateProduct(Product product)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryUpdateProduct(product);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            cmd.ExecuteNonQuery();
        }

        public bool IsExistProduct(Product product)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryIsExistProduct(product);
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);

            bool flag = (bool)cmd.ExecuteScalar();
            return flag;
        }

        public List<Product> GetAllProductByIdSeller(int id_seller)
        {
            CheckConnection.checkConnection(Connector);
            string query = queryGetAllByIdSeller(id_seller);
            List<Product> allProducts = new List<Product>();
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    allProducts.Add(new Product(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2),
                        reader.GetInt32(3), reader.GetString(4), reader.GetString(5)));
                }
                reader.Close();
            }
            return allProducts;
        }

        public List<Product> GetAllProducts()
        {
            CheckConnection.checkConnection(Connector);
            string query = queryGetAll();
            List<Product> allProducts = new List<Product>();
            NpgsqlCommand cmd = new NpgsqlCommand(query, Connector.Connect);
            using (NpgsqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    allProducts.Add(new Product(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2),
                        reader.GetInt32(3), reader.GetString(4), reader.GetString(5)));
                }
                reader.Close();
            }
            return allProducts;
        }

        public string queryGetAllByIdSeller(int id_seller)
        {
            return $"select * from ProductDB where id_seller = {id_seller}";
        }
        public string queryGetAll()
        {
            return $"select * from ProductDB";
        }

        public string queryGetProduct(int id)
        {
            return $"select * from ProductDB where id = {id}";
        }

        public string queryGetProduct(string name)
        {
            return $"select * from ProductDB where name = '{name}'";
        }
        public string queryAddProduct(Product product)
        {
            return $"insert into ProductDB(name, price, quantity, manufacturer, description) " + 
                   $"values ('{product.Name}', {product.Price}, {product.Quantity}, '{product.Manufacturer}', '{product.Description}')";
        }

        public string queryDelProduct(Product product)
        {
            return $"delete from ProductDB where id = {product.Id}";
        }

        public string queryUpdateProduct(Product product)
        {
            return $"UPDATE ProductDB " +
                   $"SET name = '{product.Name}', price = {product.Price}, quantity = {product.Quantity}, manufacturer = '{product.Manufacturer}', description = '{product.Description}'" +
                   $"WHERE id = {product.Id}";
        }

        public string queryIsExistProduct(Product product)
        {
            return $"select exists (select * from ProductDB where name = '{product.Name}' and price = {product.Price} and manufacturer = '{product.Manufacturer}' and description = '{product.Description}')";
        }
    }
}
