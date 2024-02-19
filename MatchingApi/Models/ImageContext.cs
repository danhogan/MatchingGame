using Microsoft.EntityFrameworkCore;

namespace MatchingApi.Models;

public class ImageContext : DbContext
{
    public ImageContext(DbContextOptions<ImageContext> options) : base(options)
    {

    }

    public DbSet<ImageItem> ImageItems { get; set; } = null!;
}