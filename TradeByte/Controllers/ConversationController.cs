using Microsoft.AspNetCore.Mvc;
using TradeByte.Services.Interfaces;
using TradeByte.Dtos.Conversation;

namespace TradeByte.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ConversationController : ControllerBase
    {
        private readonly IConversationService _conversationService;

        public ConversationController(IConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpGet("{user1id}/{user2id}")]
        public async Task<IActionResult> GetConversation(int user1id, int user2id, [FromQuery] bool createIfNotExists)
        {
            try
            {
                ConversationDto? conversation = await _conversationService.GetConversationByParticipantsAsync(user1id, user2id, createIfNotExists);
                if (conversation == null)
                {
                    return NotFound();
                }
                return Ok(conversation);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllConversationsByUserId(int userId)
        {
            try
            {
                IEnumerable<ConversationDto> conversations = await _conversationService.GetAllConversationsByUserIdAsync(userId);
                return Ok(conversations);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}