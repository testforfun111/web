using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Dto;
using AutoMapper;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/api/v1/carts/")]
    public class CartController : Controller
    {
        private readonly CartService cartService;
        private readonly IMapper _imapper;
        public CartController(CartService cartService, IMapper mapper)
        {
            this.cartService = cartService;
            _imapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<Cart>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllCarts()
        {
            var carts = cartService.GetAllCarts();
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);
            return Ok(carts);
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Cart))]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddCart([FromBody] Cart cart)
        {
            try
            {
                cartService.AddCart(cart);
                return StatusCode(StatusCodes.Status201Created, cart);
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Cart))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public  IActionResult getCart(int id)
        {
            //Cart cart = cartService.GetCartById(id);
            var cart = _imapper.Map<CartDto>(cartService.GetCartById(id));
            if (cart == null)
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(cart);
        }


        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult updateCart(int id, [FromBody] Cart cart)
        {
            
            try
            {
                cartService.UpdateCart(id, cart);
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
        public IActionResult DelCart(int id)
        {
            try
            {
                cartService.DelCart(id);
                return Ok();
            }
            catch (Exception ex) 
            {
                return NotFound();
            }
        }
    }
}