using System.Collections.Generic;

namespace TradeByte.Dtos.Common
{
    /// <summary>
    /// Lapozott eredmény visszaadására szolgáló generikus DTO.
    /// </summary>
    public class PagedResult<T>
    {
        public IReadOnlyList<T> Items { get; set; } = new List<T>();
        public int Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
