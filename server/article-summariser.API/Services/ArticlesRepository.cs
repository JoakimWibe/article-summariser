using article_summariser.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using NuGet.Protocol;

namespace article_summariser.API.Services;

public class ArticlesRepository : IArticlesRepository
{
    private readonly ArticleContext _context;

    public ArticlesRepository(ArticleContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ArticleSummary>> GetSummariesAsync()
    {
        return await _context.ArticleSummary.ToListAsync();
    }

    public async Task<ArticleSummary> GetSummaryAsync(int id)
    {
        return (await _context.ArticleSummary
            .FirstOrDefaultAsync(article => article.Id == id))!;
    }

    public async Task<ArticleSummary> CreateSummaryAsync(ArticleRequest articleRequest)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/"),
            Headers =
            {
                { "X-RapidAPI-Key", "81a0120b97mshb9d5464f3ebd938p1469e7jsn8e97aaa79c40" },
                { "X-RapidAPI-Host", "tldrthis.p.rapidapi.com" }
            },
            Content = new StringContent(
                $"{{\"url\": \"{articleRequest.Url}\",\"min_length\": {articleRequest.MinLength},\"max_length\": {articleRequest.MaxLength},\"is_detailed\": false}}"),
        };

        var response = await client.SendAsync(request);
        
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        var data = JsonConvert.DeserializeObject<ApiData>(body);

        var newArticle = new ArticleSummary
        {
            Title = data!.article_title,
            Summary = data.summary[0],
            PublishDate = data.article_pub_date,
            ImageUrl = data.article_image,
            ArticleUrl = data.article_url
        };

        _context.ArticleSummary.Add(newArticle);
        await _context.SaveChangesAsync();
        
        return newArticle;
    }

    public async Task<ArticleSummary> DeleteSummaryAsync(int id)
    {
        var article = GetSummaryAsync(id).Result;

        _context.ArticleSummary.Remove(article);
        await _context.SaveChangesAsync();

        return article;
    }
}