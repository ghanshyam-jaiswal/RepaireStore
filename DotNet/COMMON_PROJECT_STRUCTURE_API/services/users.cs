using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MySql.Data.MySqlClient;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class users
    {
        dbServices ds = new dbServices();
        public async Task<responseData> GetAllUsers(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepaireStore";
                MySqlParameter[] myParam = new MySqlParameter[] { };

                var dbData = ds.executeSQL(query, myParam); 
                if (dbData.Any())
                {
                    List<string> messages = new List<string>();

                    foreach (var rowSet in dbData)
                    {
                        foreach (var row in rowSet)
                        {
                            List<string> rowData = new List<string>();

                            foreach (var column in row)
                            {
                                rowData.Add(column.ToString());
                            }

                            // Now rowData contains all values from the current row
                            string rowDataString = string.Join(" - ", rowData);
                            messages.Add(rowDataString);
                        }
                    }

                    
                    string allUsers = string.Join(Environment.NewLine, messages);

                    resData.rData["rMessage"] = $"Retrieved All Users:\n{allUsers}";
                }
                else
                {
                    resData.rData["rMessage"] = "No any details here...";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            
            
            return resData;
        }
    }
}

