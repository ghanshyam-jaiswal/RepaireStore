using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Text.Json;

namespace COMMON_PROJECT_STRUCTURE_API.services
{
    public class product
    {
        dbServices ds = new dbServices();

        public async Task<responseData> AddProduct(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreProduct WHERE productName=@ProductName";
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@ProductName", rData.addInfo["productName"])
                };
                var dbData = ds.executeSQL(query, myParam);
                
                if (dbData[0].Count() > 0)
                {
                    resData.rData["rMessage"] = "Duplicate Credentials";
                }
                else
                {
                   var sq = @"INSERT INTO pc_student.RepairStoreProduct
                    (productImage, productName, productPrice, productDemoImages, productDemoText) 
                    VALUES (@ProductImage, @ProductName, @ProductPrice, @ProductDemoImages, @ProductDemoText)";

                    if (!decimal.TryParse(rData.addInfo["productPrice"].ToString(), out decimal productPrice))
                    {
                        resData.rData["rMessage"] = "Invalid product price";
                        return resData;
                    }

                  MySqlParameter[] insertParams = new MySqlParameter[]
                    {
                        // new MySqlParameter("@Id", rData.addInfo["id"]),
                        new MySqlParameter("@ProductImage", rData.addInfo["productImage"]),
                        new MySqlParameter("@ProductName", rData.addInfo["productName"]),
                        // new MySqlParameter("@ProductPrice",  rData.addInfo["productPrice"]),
                        new MySqlParameter("@ProductPrice",  productPrice),
                        new MySqlParameter("@ProductDemoImages", rData.addInfo["productDemoImages"]),
                        new MySqlParameter("@ProductDemoText", rData.addInfo["productDemoText"]),
                    };
                    var insertResult = ds.executeSQL(sq, insertParams);

                    resData.rData["rMessage"] = "Added Successful";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "An error occurred: " + ex.Message;
            }
            return resData;
        }

        public async Task<responseData> GetAllProduct(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreProduct ORDER BY Id DESC";
                var dbData = ds.executeSQL(query, null);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    id = rowData.ElementAtOrDefault(0),
                                    productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(2),
                                    productPrice = rowData.ElementAtOrDefault(3),
                                    productDemoImages = rowData.ElementAtOrDefault(4),
                                    productDemoText = rowData.ElementAtOrDefault(5),
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }
        public async Task<responseData> GetAllProductName(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT productName FROM pc_student.RepairStoreProduct ORDER BY id DESC";
                var dbData = ds.executeSQL(query, null);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    // id = rowData.ElementAtOrDefault(0),
                                    // productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(0),
                                    // productPrice = rowData.ElementAtOrDefault(3),
                                    // productDemoImages = rowData.ElementAtOrDefault(4),
                                    // productDemoText = rowData.ElementAtOrDefault(5),
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }
        public async Task<responseData> GetProductById(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreProduct WHERE id=@ID";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@ID", rData.addInfo["id"]) // Ensure rData contains the id field
                };

                var dbData = ds.executeSQL(query, myParam);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    id = rowData.ElementAtOrDefault(0),
                                    productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(2),
                                    productPrice = rowData.ElementAtOrDefault(3),
                                    productDemoImages = rowData.ElementAtOrDefault(4),
                                    productDemoText = rowData.ElementAtOrDefault(5),
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
                resData.rStatus = 0; // Indicate success
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }

        public async Task<responseData> GetProductByName(requestData rData)
        {
            responseData resData = new responseData();
            try
            {
                var query = @"SELECT * FROM pc_student.RepairStoreProduct WHERE productName=@productName";

                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@productName", rData.addInfo["productName"]) // Ensure rData contains the id field
                };

                var dbData = ds.executeSQL(query, myParam);

                if (dbData == null)
                {
                    resData.rData["rMessage"] = "Database query returned null";
                    resData.rStatus = 1; // Indicate error
                    return resData;
                }

                List<object> usersList = new List<object>();

                foreach (var rowSet in dbData)
                {
                    if (rowSet != null)
                    {
                        foreach (var row in rowSet)
                        {
                            if (row != null)
                            {
                                List<string> rowData = new List<string>();

                                foreach (var column in row)
                                {
                                    if (column != null)
                                    {
                                        rowData.Add(column.ToString());
                                    }
                                }

                                var user = new
                                {
                                    id = rowData.ElementAtOrDefault(0),
                                    productImage = rowData.ElementAtOrDefault(1),
                                    productName = rowData.ElementAtOrDefault(2),
                                    productPrice = rowData.ElementAtOrDefault(3),
                                    productDemoImages = rowData.ElementAtOrDefault(4),
                                    productDemoText = rowData.ElementAtOrDefault(5),
                                };

                                usersList.Add(user);
                            }
                        }
                    }
                }

                resData.rData["users"] = usersList;
                resData.rData["rMessage"] = "Successful";
                resData.rStatus = 0; // Indicate success
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
                resData.rStatus = 1; // Indicate error
            }

            return resData;
        }


        public async Task<responseData> UpdateProductById(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your update query
                var query = @"UPDATE pc_student.RepairStoreProduct
                            SET   productImage = @productImage, 
                                  productName = @productName,
                                  productPrice = @productPrice,
                                  productDemoImages = @productDemoImages, 
                                  productDemoText = @productDemoText
                           WHERE id = @id";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {

                    new MySqlParameter("@id", rData.addInfo["id"]),
                    new MySqlParameter("@productImage", rData.addInfo["productImage"]),
                    new MySqlParameter("@productName", rData.addInfo["productName"]),
                    new MySqlParameter("@productPrice", rData.addInfo["productPrice"]),
                    new MySqlParameter("@productDemoImages", rData.addInfo["productDemoImages"]),
                    new MySqlParameter("@productDemoText", rData.addInfo["productDemoText"]),
                };

                // Condition to execute the update query
                bool shouldExecuteUpdate = true;

                if (shouldExecuteUpdate)
                {
                    // int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "UPDATE SUCCESSFULLY";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Update failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Update query not executed.";
                }
            }
            catch (Exception ex)
            {
                resData.rData["rMessage"] = "Exception occurred: " + ex.Message;
            }
            return resData;
        }


        public async Task<responseData> DeleteProduct(requestData rData)
        {
            responseData resData = new responseData();

            try
            {
                // Your delete query
                var query = @"DELETE FROM pc_student.RepairStoreProduct
                            WHERE id = @Id;";

                // Your parameters
                MySqlParameter[] myParam = new MySqlParameter[]
                {
                    new MySqlParameter("@Id", rData.addInfo["id"])
                };

                // Condition to execute the delete query
                bool shouldExecuteDelete = true;

                if (shouldExecuteDelete)
                {
                    int rowsAffected = ds.ExecuteUpdateSQL(query, myParam);

                    if (rowsAffected > 0)
                    {
                        resData.rData["rMessage"] = "DELETE SUCCESSFULLY.";
                    }
                    else
                    {
                        resData.rData["rMessage"] = "No rows affected. Delete failed.";
                    }
                }
                else
                {
                    resData.rData["rMessage"] = "Condition not met. Delete query not executed.";
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