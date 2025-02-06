using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/api/v1/products/")]
    public class ProductController : Controller
    {
        private readonly ProductService productService;
        public ProductController(ProductService productService)
        {
            this.productService = productService;
        }
        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<Product>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllProducts([FromQuery] string? startWith)
        {
            ICollection<Product> products;
            if (startWith == null)
            {
                products = productService.GetAllProducts();
            }
            else
            {
                products = productService.GetProductByName(startWith);
            }
            return Ok(products);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddProduct([FromBody] Product product)
        {
            try
            {
                productService.AddProduct(product);
                return StatusCode(StatusCodes.Status201Created, product);
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public  IActionResult getProduct(int id)
        {
            Product product = productService.GetProductById(id);
            if (product == null)
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(product);
        }
        

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult updateProduct(int id, [FromBody] Product product)
        {
            try
            {
                productService.UpdateProduct(id, product);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DelProduct(int id)
        {
            try
            {
                productService.DelProduct(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}