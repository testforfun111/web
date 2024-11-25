using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Dto;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/api/v1/itemorders/")]
    public class ItemOrderController : Controller
    {
        private readonly ItemOrderService itemOrderService;
        private readonly IMapper _mapper;
        public ItemOrderController(ItemOrderService itemOrderService, IMapper iMapper)
        {
            this.itemOrderService = itemOrderService;
            _mapper = iMapper;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<ItemOrder>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult getItemOrders([FromQuery] int id_order)
        {
            List<ItemOrderDto> itemorders = null;
            if (id_order > 0) {
                itemorders = _mapper.Map<List<ItemOrderDto>>(itemOrderService.GetItemOrderByIdOrder(id_order));
            }
            else
            {
                itemorders= _mapper.Map<List<ItemOrderDto>>(itemOrderService.GetItemOrders());
            }
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);
            return Ok(itemorders);
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ItemOrder))]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddItemOrder([FromBody] ItemOrder itemOrder)
        {
            try
            {
                itemOrderService.AddItemOrder(itemOrder);
                return StatusCode(StatusCodes.Status201Created, itemOrder);
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ItemOrder))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public  IActionResult getItemOrder(int id)
        {
            //ItemOrder itemOrder = itemOrderService.GetItemOrderById(id);
            var itemOrder = _mapper.Map<ItemOrderDto>(itemOrderService.GetItemOrderById(id));
            if (itemOrder == null)
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(itemOrder);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult updateItemOrder([FromBody] ItemOrder itemOrder)
        {
            try
            {
                itemOrderService.UpdateItemOrder(itemOrder);
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
        public IActionResult DelItemOrder(int id)
        {
            try
            {
                itemOrderService.DelItemOrder(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}