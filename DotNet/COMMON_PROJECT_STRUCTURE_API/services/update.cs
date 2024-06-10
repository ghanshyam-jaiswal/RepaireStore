using System;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Logging;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class Update
    {
        private readonly dbServices _dbServices;
        private readonly ILogger<Update> _logger;

        public Update(dbServices dbServices, ILogger<Update> logger)
        {
            _dbServices = dbServices;
            _logger = logger;
        }

        public async Task<string> UpdateByEmailAndPassword(requestData rData)
        {
            try
            {
                if (!rData.addInfo.ContainsKey("email") || !rData.addInfo.ContainsKey("password"))
                {
                    return "Invalid request data";
                }

                var email = rData.addInfo["email"].ToString();
                var password = rData.addInfo["password"].ToString();

                var query = @"UPDATE pc_student.RepaireStore 
                              SET first_name = @FIRST_NAME, 
                                  last_name = @LAST_NAME, 
                                  contact = @CONTACT, 
                                  street_address1 = @STREET_ADDRESS1, 
                                  street_address2 = @STREET_ADDRESS2, 
                                  city = @CITY, 
                                  state = @STATE, 
                                  pincode = @PINCODE, 
                                  country = @COUNTRY
                              WHERE email = @EMAIL AND password = @PASSWORD";

                MySqlParameter[] parameters = new MySqlParameter[]
                {
                    new MySqlParameter("@FIRST_NAME", rData.addInfo["first_name"]),
                    new MySqlParameter("@LAST_NAME", rData.addInfo["last_name"]),
                    new MySqlParameter("@EMAIL", email),
                    new MySqlParameter("@PASSWORD", password),
                    new MySqlParameter("@CONTACT", rData.addInfo["contact"]),
                    new MySqlParameter("@STREET_ADDRESS1", rData.addInfo["street_address1"]),
                    new MySqlParameter("@STREET_ADDRESS2", rData.addInfo["street_address2"]),
                    new MySqlParameter("@CITY", rData.addInfo["city"]),
                    new MySqlParameter("@STATE", rData.addInfo["state"]),
                    new MySqlParameter("@PINCODE", rData.addInfo["pincode"]),
                    new MySqlParameter("@COUNTRY", rData.addInfo["country"])
                };

                var (affectedRows, _) = await _dbServices.executeSQLForUpdate(query, parameters);
                if (affectedRows > 0)
                {
                    return "Update successful";
                }
                else
                {
                    return "No record found with the given email and password";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception during update operation: {ex.Message}");
                return $"An error occurred: {ex.Message}";
            }
        }
    }
}
