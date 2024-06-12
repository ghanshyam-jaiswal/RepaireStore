using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class users
    {
        private readonly dbServices ds;

        public users(IConfiguration configuration)
        {
            ds = new dbServices(configuration);
        }

        public async Task<responseData> GetAllUsers(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = "SELECT * FROM pc_student.RepaireStore";
                var dbData = await ds.executeSQLToGetAllUsers(query, null);

                if (dbData != null)
                {
                    // Process the database response directly
                    List<Dictionary<string, object>> users = new List<Dictionary<string, object>>();
                    foreach (var table in dbData)
                    {
                        foreach (var row in table)
                        {
                            // Store user data in a dictionary
                            Dictionary<string, object> userData = new Dictionary<string, object>();

                            // Add the column name and value to the dictionary
                            userData[row.Key] = row.Value.ToString(); // Convert the value to string

                            // Add the user data dictionary to the list of users
                            users.Add(userData);
                        }
                    }


                    // Return the list of user dictionaries in the response data
                    resData.rData["users"] = users;
                    resData.rData["rMessage"] = "Users fetched successfully";
                }
                else
                {
                    resData.rData["rMessage"] = "Failed to fetch users";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }
    }
}
