
using System.ComponentModel.DataAnnotations;
using System.Net.Sockets;
using System.Text.Json;
using COMMON_PROJECT_STRUCTURE_API.services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebHost.CreateDefaultBuilder(args)
    .ConfigureServices(s =>
    {
        IConfiguration appsettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        s.AddSingleton<login>();
        s.AddSingleton<signup>();
        s.AddSingleton<Update>();
        s.AddSingleton<LoginService>();
        s.AddSingleton<delete>();
        s.AddSingleton<contact>();
        s.AddSingleton<users>();
        s.AddSingleton<getUserByEmail>();
        s.AddSingleton<dbServices>();


        s.AddAuthorization();
        s.AddControllers();
        s.AddCors();


        // s.AddAuthentication("SourceJWT").AddScheme<SourceJwtAuthenticationSchemeOptions, SourceJwtAuthenticationHandler>("SourceJWT", options =>
        // {
        //     options.SecretKey = appsettings["jwt_config:Key"].ToString();
        //     options.ValidIssuer = appsettings["jwt_config:Issuer"].ToString();
        //     options.ValidAudience = appsettings["jwt_config:Audience"].ToString();
        //     options.Subject = appsettings["jwt_config:Subject"].ToString();
        // });
        
    })
    .Configure(app =>
    {
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors(options =>
            options.WithOrigins("https://localhost:5002", "http://localhost:5001","http://localhost:5173")
            // .AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            .AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
        app.UseRouting();
        app.UseStaticFiles();
        

        app.UseEndpoints(e =>
        {
            var login = e.ServiceProvider.GetRequiredService<login>();
            var loginService = e.ServiceProvider.GetRequiredService<LoginService>();
            var signup = e.ServiceProvider.GetRequiredService<signup>();
            var update = e.ServiceProvider.GetRequiredService<Update>();
            var contact = e.ServiceProvider.GetRequiredService<contact>();
            var users = e.ServiceProvider.GetRequiredService<users>();
            var deleteService = e.ServiceProvider.GetRequiredService<delete>();
            var getUserByEmail = e.ServiceProvider.GetRequiredService<getUserByEmail>();

            e.MapPost("login",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // update
                    await http.Response.WriteAsJsonAsync(await login.Login(rData));
            });

            e.MapPost("loginservice",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);

                if (rData.eventID == "1001") // LoginService
                {
                    var email = rData.addInfo["email"].ToString();
                    var password = rData.addInfo["password"].ToString();
                    var result = await loginService.Authenticate(email, password);
                    await http.Response.WriteAsJsonAsync(result);
                }
            });

            e.MapPost("getUserByEmail",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);

                if (rData.eventID == "1001") // getUserByEmail
                {
                    var email = rData.addInfo["email"].ToString();
                    var result = await getUserByEmail.GetUserByEmail(email);
                    await http.Response.WriteAsJsonAsync(result);
                }
            });


            e.MapPost("signup",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received signup request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // signup
                    await http.Response.WriteAsJsonAsync(await signup.Signup(rData));
            });
            e.MapPost("contact",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received contact request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // contact
                    await http.Response.WriteAsJsonAsync(await contact.Contact(rData));
            });

            e.MapPost("getUsers",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                Console.WriteLine($"Received get users request: {JsonSerializer.Serialize(rData)}");
                if (rData.eventID == "1001") // getUsers
                {
                    // Call the GetAllUsers method directly and return its result as JSON response
                    await http.Response.WriteAsJsonAsync(await users.GetAllUsers(rData));
                }
            });


            e.MapPost("update",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // update
                    await http.Response.WriteAsJsonAsync(await update.UpdateByEmailAndPassword(rData));
            });

            e.MapPost("delete",
            [AllowAnonymous] async (HttpContext http) =>
            {
                var body = await new StreamReader(http.Request.Body).ReadToEndAsync();
                requestData rData = JsonSerializer.Deserialize<requestData>(body);
                if (rData.eventID == "1001") // delete
                    await http.Response.WriteAsJsonAsync(await deleteService.Delete(rData));
            });

            IConfiguration appsettings = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            e.MapGet("/dbstring",
                async c =>
                {
                    dbServices dspoly = new();
                    await c.Response.WriteAsJsonAsync("{'mongoDatabase':" + appsettings["mongodb:connStr"] + "," + " " + "MYSQLDatabase" + " =>" + appsettings["db:connStrPrimary"]);
                });

            e.MapGet("/bing",
                async c => await c.Response.WriteAsJsonAsync("{'Name':'Anish','Age':'26','Project':'COMMON_PROJECT_STRUCTURE_API'}"));
        });
    });

builder.Build().Run();

public record requestData
{
    [Required]
    public string eventID { get; set; }
    [Required]
    public IDictionary<string, object> addInfo { get; set; }
}

public record responseData
{
    public responseData()
    {
        eventID = "";
        rStatus = 0;
        rData = new Dictionary<string, object>();
    }
    [Required]
    public int rStatus { get; set; } = 0;
    public string eventID { get; set; }
    public IDictionary<string, object> addInfo { get; set; }
    public IDictionary<string, object> rData { get; set; }
}
