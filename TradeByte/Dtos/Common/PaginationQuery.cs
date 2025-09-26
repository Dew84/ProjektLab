namespace TradeByte.Dtos.Common
{
    /// <summary>
    /// Egyszerű lapozási paraméterek (1-alapú oldalszám).
    /// </summary>
    public record PaginationQuery(int Page = 1, int PageSize = 20);
}
