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
        public async Task<IActionResult> GetConversation(int user1id, int user2id)
        {
            ConversationDto? conversation = await _conversationService.GetConversationByParticipantsAsync(user1id, user2id);
            if (conversation == null)
            {
                return NotFound();
            }
            return Ok(conversation);
        }

        [HttpPost]
        public async Task<IActionResult> CreateConversation([FromBody] CreateConversationDto conversationDto)
        {
            try
            {
                ConversationDto createdConversation = await _conversationService.CreateConversationAsync(conversationDto);
                return Ok(createdConversation);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}