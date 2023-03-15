using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace article_summariser.API.Models;

public class ArticleSummary
{
    [Required] public int Id { get; set; }
    
    [Required] public string? Title { get; set; }
    
    [Required] public string? Summary { get; set; }
    
    public string? PublishDate { get; set; }

    public string? ImageUrl { get; set; }

    [Required] public string? ArticleUrl { get; set; }
}