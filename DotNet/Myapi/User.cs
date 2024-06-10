using System.ComponentModel.DataAnnotations;

namespace Myapi
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string MobileNumber { get; set; }

        public User(string name, string email, string password, string mobileNumber)
        {
            Name = name;
            Email = email;
            Password = password;
            MobileNumber = mobileNumber;
        }

        // Parameterless constructor for Entity Framework
        public User() {}
    }
}
