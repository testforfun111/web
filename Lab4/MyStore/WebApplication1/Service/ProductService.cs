using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Interfaces;
using Repository;

namespace Services
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


        public void AddProduct(Product product)
        {
            if (_productRepository.IsExistProduct(product) == true)
            {
                throw new Exception("Уже существует это продукт!");
            }
            else 
                _productRepository.AddProduct(product);
        }

        public void DelProduct(int id)
        {
            if (GetProductById(id) != null)
                _productRepository.DelProduct(GetProductById(id));
            else
                throw new Exception("Пользователь не существует");
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

        public ICollection<Product> GetAllProducts()
        {
            return _productRepository.GetAllProducts();
        }
        public ICollection<Product> GetProductByName(string name)
        {
            return _productRepository.GetProduct(name);
        }
    }
}
