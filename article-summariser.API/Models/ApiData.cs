namespace article_summariser.API.Models;

public class ApiData
{
    public List<string> summary { get; set; }
    public string article_text { get; set; }
    public string article_title { get; set; }
    public string article_image { get; set; }
    public string article_pub_date { get; set; }
    public string article_url { get; set; }
    public string article_html { get; set; }
    public object article_abstract { get; set; }
}