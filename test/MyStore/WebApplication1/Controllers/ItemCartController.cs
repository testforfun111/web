using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Dto;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/api/v1/itemcarts/")]
    public class ItemCartController : Controller
    {
        private readonly ItemCartService itemCartService;
        private readonly IMapper _mapper;

        public ItemCartController(ItemCartService itemCartService, IMapper mapper)
        {
            this.itemCartService = itemCartService;
            this._mapper = mapper;
        }
        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<ItemCart>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult getItemCarts([FromQuery] int id_cart)
        {
            //var itemCarts = itemCartService.GetAllItemCartByIdCart(id_cart);
            List<ItemCartDto> itemCarts;
            if (id_cart > 0)
            {
                itemCarts = _mapper.Map<List<ItemCartDto>>(itemCartService.GetAllItemCartByIdCart(id_cart));
            }
            else
            {
                itemCarts = _mapper.Map<List<ItemCartDto>>(itemCartService.GetAllItemCart());
            }

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);
            return Ok(itemCarts);
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ItemCart))]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddItemCart([FromBody] ItemCart itemCart)
        {
            try
            {
                itemCartService.AddItemCart(itemCart);
                return StatusCode(StatusCodes.Status201Created, itemCart);
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ItemCart))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public  IActionResult getItemCart(int id)
        {
            //ItemCart itemCart = itemCartService.GetItemCartById(id);
            var itemCart = _mapper.Map<ItemCartDto>(itemCartService.GetItemCartById(id));
            if (itemCart == null)
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(itemCart);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult updateItemCart([FromBody] ItemCart itemCart)
        {
            try
            {
                itemCartService.UpdateItemCart(itemCart);
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
        public IActionResult DelItemCart(int id)
        {
            try
            {
                itemCartService.DelItemCart(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}