using MySql.Data.MySqlClient;
using MyProject.Models;
using System;
using System.Threading.Tasks;

namespace MyProject.Services
{
    public class UserService
    {
        private readonly string _connectionString;

        public UserService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> SignUpAsync(User user)
        {
            try
            {
                using MySqlConnection connection = new MySqlConnection(_connectionString);
                await connection.OpenAsync();

                string query = "INSERT INTO shyam (Username, Password) VALUES (@Username, @Password)";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", user.Username);
                command.Parameters.AddWithValue("@Password", user.Password);

                await command.ExecuteNonQueryAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> LoginAsync(string username, string password)
        {
            try
            {
                using MySqlConnection connection = new MySqlConnection(_connectionString);
                await connection.OpenAsync();

                string query = "SELECT COUNT(*) FROM Users WHERE Username = @Username AND Password = @Password";
                MySqlCommand command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@Username", username);
                command.Parameters.AddWithValue("@Password", password);

                long count = (long)await command.ExecuteScalarAsync();

                return count > 0;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
