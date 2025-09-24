namespace TradeByte.Dtos.Ads
{
    /// <summary>
    /// Hirdetések listázásához használt szűrő + lapozás paraméterek.
    /// </summary>
    public class AdListQuery
    {
        public string? Keyword { get; set; }         // cím / leírás keresés
        public int? CategoryId { get; set; }         // adott kategóriára szűrés
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
