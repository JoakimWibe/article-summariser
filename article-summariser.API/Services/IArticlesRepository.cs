using article_summariser.API.Models;

namespace article_summariser.API.Services;

public interface IArticlesRepository
{
    public Task<IEnumerable<ArticleSummary>> GetSummariesAsync();
    
    public Task<ArticleSummary> GetSummaryAsync(int id);
    
    public Task<ArticleSummary> CreateSummaryAsync(ArticleRequest request);
    
    public Task<ArticleSummary> DeleteSummaryAsync(int id);
}