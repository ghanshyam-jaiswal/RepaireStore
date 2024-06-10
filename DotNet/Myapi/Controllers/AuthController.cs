using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Myapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly ApplicationDbContext _context;

        public AuthController(ILogger<AuthController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            // Authentication logic
            if (model.Name == "exampleuser" && model.Password == "password")
            {
                // Mock JWT token generation
                var token = "mock_jwt_token";
                return Ok(new { Token = token });
            }
            else
            {
                return BadRequest(new { Error = "Invalid username or password" });
            }
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest model)
        {
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password,
                MobileNumber = model.MobileNumber
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "User registered successfully", UserId = user.Id });
        }
    }
}
