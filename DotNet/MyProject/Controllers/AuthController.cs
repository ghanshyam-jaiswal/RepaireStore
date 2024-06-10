using Microsoft.AspNetCore.Mvc;
using MyProject.Models;
using MyProject.Services;
using System.Threading.Tasks;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;

        public AuthController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User user)
        {
            if (await _userService.SignUpAsync(user))
            {
                return Ok("User signed up successfully.");
            }
            else
            {
                return BadRequest("Failed to sign up user.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            if (await _userService.LoginAsync(user.Username, user.Password))
            {
                return Ok("User logged in successfully.");
            }
            else
            {
                return Unauthorized("Invalid username or password.");
            }
        }
    }
}
