using System.ComponentModel.DataAnnotations;

namespace article_summariser.API.Models;

public class ArticleRequest
{
    [Required] public string? Url { get; set; }

    [Required] public int MinLength { get; set; }

    [Required] public int MaxLength { get; set; }
}