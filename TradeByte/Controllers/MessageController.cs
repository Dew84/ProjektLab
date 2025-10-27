using Microsoft.AspNetCore.Mvc;
using TradeByte.Dtos.Message;
using TradeByte.Models;
using TradeByte.Services.Interfaces;

namespace TradeByte.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IUserService _userService;

        public MessageController(IMessageService messageService, IUserService userService)
        {
            _messageService = messageService;
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetById(int id, CancellationToken cancellationToken = default)
        {
            MessageDto? message = await _messageService.GetMessageByIdAsync(id, cancellationToken);
            if (message == null)
            {
                return NotFound();
            }

            return Ok(message);
        }

        [HttpPost]
        public async Task<ActionResult> SendMessage([FromBody] CreateMessageDto messageDto, CancellationToken cancellationToken = default)
        {
            try
            {
                MessageDto message = await _messageService.SendMessageAsync(messageDto, cancellationToken);
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }                         
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateMessageDto updateDto, CancellationToken cancellationToken = default)
        {
            try
            {
                await _messageService.EditMessageAsync(updateDto, cancellationToken);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken = default)
        {
            try
            {
                await _messageService.DeleteMessageAsync(id, cancellationToken);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}