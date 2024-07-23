using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using My_API.Model;
using System.Data.SqlClient;
using System.Data;
using Dapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Eventing.Reader;

namespace My_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static string conStr = "Data Source=DESKTOP-DNDH5VD\\SQLEXPRESS;Initial Catalog=My_DB;Integrated Security=True;Encrypt=false;";

        [HttpPost("UserLogin")]
        public async Task<IActionResult> UserLogin(UserModel um)
        {
            var connection = new SqlConnection(conStr);
            using (connection)
            {
                await connection.OpenAsync();
                var users = await connection.QueryAsync<UserModel>("USER_LOGIN", new {username = um.userName, password = um.passWord}, commandType: CommandType.StoredProcedure);
                if(users != null)
                {
                    if (users.ToList().Count > 0) 
                    {
                        UserModel usr = users.ToList()[0];
                        string token = await CreateJWT(usr);
                        return Ok(new { Tokken = token, Message = "Login Success" });
                    }
                    else
                    {
                        return NotFound(new { Message = "Username or Password Incorrect" });
                    }
                }
                else
                {
                    return NotFound(new {Message = "Username or Password Incorrect"});
                }
            }            
        }

        private async Task<string> CreateJWT(UserModel userModel)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("NEWKEYFORJWTCREATIONON202407201100AM");

            var sub = new ClaimsIdentity(new Claim[]
            {
                new Claim("Flag", userModel.flag),
                new Claim("Role", userModel.role)
            });

            var cred = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = sub,
                Expires = DateTime.UtcNow.AddSeconds(10),
                SigningCredentials = cred
            };

            var token = tokenHandler.CreateToken(tokenDesc);
            return tokenHandler.WriteToken(token);
        }
    }
}
