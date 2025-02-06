using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using BL.RepositoryInterfaces;

namespace BL.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository ?? throw new Exception("Параметр пустой!");
        }

        public Product GetProductById(int id)
        {
            return _productRepository.GetProduct(id);
        }

        public Product GetProductByName(string name)
        {
            return _productRepository.GetProduct(name);
        }

        public void AddProduct(Product product)
        {
            if (_productRepository.IsExistProduct(product) == true)
            {
                throw new Exception("Уже существует это продукт!");
            }
            else 
                _productRepository.AddProduct(product);
        }

        public void DelProduct(Product product)
        {
            if (_productRepository.IsExistProduct(product) == false)
            {
                throw new Exception("не существует это продукт!");
            }
            else
                _productRepository.DelProduct(product);
        }
        public void UpdateProduct(Product _product) 
        {
            Product product = _productRepository.GetProduct(_product.Id);
            if (product == null)
            {
                throw new Exception("нет такой продукт");
            }
            else
                _productRepository.UpdateProduct(_product);
        }

        public List<Product> GetAllProducts()
        {
            return _productRepository.GetAllProducts();
        }

        public DataTable viewAllProducts()
        {
            List<Product> allProducts = _productRepository.GetAllProducts();
            DataTable table = new DataTable();
            table.Rows.Clear();
            table.Columns.Add("ID");
            table.Columns.Add("Name");
            table.Columns.Add("Price");
            table.Columns.Add("Quantity");
            table.Columns.Add("Manufacturer");
            table.Columns.Add("Description");

            foreach (Product product in allProducts)
            {
                table.Rows.Add(product.Id, product.Name, product.Price, product.Quantity, product.Manufacturer, product.Description);
            }
            return table;
        }
    }
}
