namespace TradeByte.Dtos.Rating
{
    public class RatingDtos
    {
        public class CreateRatingDto
        {
            public int RatedUserId { get; set; }
            public int Value { get; set; } // 1–5

            // public string? Comment { get; set; }
        }

        public class RatingSummaryDto
        {
            public double Average { get; set; }
            public int Count { get; set; }
        }

    }
}
