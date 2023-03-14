using Microsoft.AspNetCore.Mvc;
using article_summariser.API.Models;
using article_summariser.API.Services;

namespace article_summariser.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticlesRepository _db;

        public ArticlesController(IArticlesRepository db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticleSummary>>> GetSummaries()
        {
            var summaries = await _db.GetSummariesAsync();

            return Ok(summaries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleSummary>> GetSummary(int id)
        {
            var summary = await _db.GetSummaryAsync(id);

            return Ok(summary);
        }

        [HttpPost]
        public async Task<ActionResult<ArticleSummary>> CreateSummary(ArticleRequest request)
        {
            var newSummary = await _db.CreateSummaryAsync(request);

            return CreatedAtAction("GetSummary", new { id = newSummary.Id }, newSummary);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSummary(int id)
        {
            await _db.DeleteSummaryAsync(id);

            return NoContent();
        }
    }
}