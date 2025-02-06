using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/api/v1/users/")]
    public class UserController : Controller
    {
        private readonly UserService userService;
        public UserController(UserService userService)
        {
            this.userService = userService;
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ICollection<User>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult getAllUsers([FromQuery] string? startWith)
        {
            if (startWith == null)
            {
                var users = userService.getAllUsers();
                if (!ModelState.IsValid) 
                    return BadRequest(ModelState);
                return Ok(users);
            }
            else
            {
                var users = userService.GetUserByName(startWith);
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                return Ok(users);
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public  IActionResult getUser(int id)
        {
            try
            {
                User user = userService.GetUser(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
        
        [HttpGet("logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult logout()
        {
            return Ok();
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult AddUser([FromBody] User user)
        {
            User newUser = new User();
            newUser.Name = user.Name;
            newUser.Email = user.Email;
            newUser.Password = user.Password;
            newUser.Phone = user.Phone;
            newUser.Address = user.Address;
            newUser.Login = user.Login;
            newUser.Role = user.Role;
            newUser.Avatar = user.Avatar;
            try
            {
                userService.AddUser(user);
                return StatusCode(StatusCodes.Status201Created, user);
            }
            catch
            {
                return StatusCode(StatusCodes.Status409Conflict);
            }
        }

        [HttpGet("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult login(string login, string password)
        {
            try
            {
                User user = userService.LogIn(login, password);
                return Ok(user);
            }
            catch
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult updateUser(int id, [FromBody] User user)
        {
            try
            {
                userService.UpdateUser(id, user);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult changePassword(string username, string newpassword)
        {
            try
            {
                User user = userService.ChangePassword(username, newpassword);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DelUser(int id)
        {
            try
            {
                userService.DeleteUser(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}