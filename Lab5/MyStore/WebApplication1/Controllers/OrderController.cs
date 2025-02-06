using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Dto;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/api/v1/orders/")]
    public class OrderController : Controller
    {
        private readonly OrderService orderService;
        private readonly IMapper _mapper;
        public OrderController(OrderService orderService, IMapper imapper)
        {
            this.orderService = orderService;
            _mapper = imapper;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<Order>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllOrders([FromQuery] int id_user)
        {
            List<Order> orders;

            if (id_user > 0) 
            {
                orders = _mapper.Map<List<Order>>(orderService.GetOrdersByIdUser(id_user));
            }
            else
            {
                orders = _mapper.Map<List<Order>>(orderService.GetAllOrders()); 
            }

            if (!ModelState.IsValid) 
                return BadRequest(ModelState);
            return Ok(orders);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Order))]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddOrder([FromBody] Order order)
        {
            try
            {
                orderService.AddOrder(order);
                return StatusCode(StatusCodes.Status201Created, order);
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Order))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public  IActionResult getOrder(int id)
        {
            //Order order = orderService.GetOrderById(id);
            var order = _mapper.Map<OrderDto>(orderService.GetOrderById(id));
            if (order == null)
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(order);
        }

        

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult updateOrder(int id, [FromBody] Order order)
        {
            
            try
            {
                orderService.UpdateOrder(id, order);
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
        public IActionResult DelOrder(int id)
        {
            
            try
            {
                orderService.DelOrder(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}