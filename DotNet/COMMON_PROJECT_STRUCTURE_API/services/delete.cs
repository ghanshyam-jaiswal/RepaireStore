using System;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Logging;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class delete
    {
        private readonly dbServices _dbServices;
        private readonly ILogger<delete> _logger;

        public delete(dbServices dbServices, ILogger<delete> logger)
        {
            _dbServices = dbServices;
            _logger = logger;
        }

        public async Task<string> Delete(requestData rData)
        {
            try
            {
                if (!rData.addInfo.ContainsKey("email") || !rData.addInfo.ContainsKey("password"))
                {
                    return "Invalid request data";
                }

                var email = rData.addInfo["email"].ToString();
                var password = rData.addInfo["password"].ToString();

                var query = @"DELETE FROM pc_student.RepaireStore WHERE email = @Email AND password = @Password";
                MySqlParameter[] parameters = new MySqlParameter[]
                {
                    new MySqlParameter("@Email", email),
                    new MySqlParameter("@Password", password)
                };

                var (affectedRows, _) = await _dbServices.executeSQLForDelete(query, parameters);
                if (affectedRows > 0)
                {
                    return "Delete successful";
                }
                else
                {
                    return "No record found with the given email and password";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception during delete operation: {ex.Message}");
                return $"An error occurred: {ex.Message}";
            }
        }
    }
}
