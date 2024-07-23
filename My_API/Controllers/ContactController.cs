using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using My_API.Model;
using System.Data.SqlClient;
using System.Data;
using Dapper;

namespace My_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        public static string conStr = "Data Source=DESKTOP-DNDH5VD\\SQLEXPRESS;Initial Catalog=My_DB;Integrated Security=True;Encrypt=false;";

        [HttpGet("GetContact")]
        public async Task<IActionResult> GetContact()
        {
            var connection = new SqlConnection(conStr);
            using (connection)
            {
                await connection.OpenAsync();
                var contacts = await connection.QueryAsync<ContactModel>("SELECT row_id as rowId, first_name as firstName, last_name as lastName, email, phone_number as phoneNumber, address, city, state, country, postal_code as postalCode FROM contacts WHERE active = 'YES'", commandType: CommandType.Text);
                if (contacts != null && contacts.ToList().Count > 0)
                {
                    return Ok(contacts.ToList());
                }
                else
                {
                    return NotFound(new { Message = "No Data Found" });
                }
            }
        }

        [HttpGet("GetContactByID")]
        public async Task<IActionResult> GetContactByID(string rowId)
        {
            var connection = new SqlConnection(conStr);
            using (connection)
            {
                await connection.OpenAsync();
                var contacts = await connection.QueryAsync<ContactModel>("SELECT row_id as rowId, first_name as firstName, last_name as lastName, email, phone_number as phoneNumber, address, city, state, country, postal_code as postalCode FROM contacts WHERE active = 'YES' AND row_id = " + rowId, commandType: CommandType.Text);
                if (contacts != null && contacts.ToList().Count > 0)
                {
                    return Ok(contacts.ToList()[0]);
                }
                else
                {
                    return NotFound(new { Message = "No Data Found" });
                }
            }
        }

        [HttpPost("UpdateContact")]
        public async Task<IActionResult> UpdateContact(ContactModel cm)
        {
            var connection = new SqlConnection(conStr);
            using (connection)
            {
                await connection.OpenAsync();
                string qry = "UPDATE contacts SET first_name = @firstName, last_name = @lastName, email = @email, phone_number = @phoneNumber, address = @address, city = @city, state = @state, country = @country, postal_code = @postalCode WHERE row_id = @rowId";
                var result = await connection.ExecuteAsync(qry, cm, commandType: CommandType.Text);
                if (result > 0)
                {
                    return Ok(new { Message = "Success" });
                }
                else
                {
                    return NotFound(new { Message = "Something went wrong" });
                }
            }
        }

        [HttpPost("DeleteContact")]
        public async Task<IActionResult> DeleteContact(ContactModel cm)
        {
            var connection = new SqlConnection(conStr);
            using (connection)
            {
                await connection.OpenAsync();
                string qry = "DELETE FROM contacts WHERE row_id = " + cm.rowId;
                var result = await connection.ExecuteAsync(qry, commandType: CommandType.Text);
                if (result > 0)
                {
                    return Ok(new { Message = "Success" });
                }
                else
                {
                    return NotFound(new { Message = "Something went wrong" });
                }
            }
        }

        [HttpPost("AddContact")]
        public async Task<IActionResult> AddContact(ContactModel cm)
        {
            var connection = new SqlConnection(conStr);
            using (connection)
            {
                await connection.OpenAsync();
                string qry = "INSERT contacts(first_name, last_name, email, phone_number, address, city, state, country, postal_code, active, created_by, created_on, updated_by, updated_on) VALUES(@firstName, @lastName, @email, @phoneNumber, @address, @city, @state, @country, @postalCode, 'YES', 'admin', SYSDATETIME(), 'admin', SYSDATETIME())";
                var result = await connection.ExecuteAsync(qry, cm, commandType: CommandType.Text);
                if (result > 0)
                {
                    return Ok(new { Message = "Success" });
                }
                else
                {
                    return NotFound(new { Message = "Something went wrong" });
                }
            }
        }
    }
}
