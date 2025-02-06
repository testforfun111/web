using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class DbContextFactory 
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public DbContextFactory(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }

        public DataContext CreateDbContext()
        {
            var request = _httpContextAccessor.HttpContext.Request;
            var port = request.Host.Port;

            if (port == 8084)
            {
                return new DataContext(new DbContextOptionsBuilder<DataContext>()
                    .UseNpgsql(_configuration.GetConnectionString("SlaveConnection"))
                    .Options);
            }

            // Trường hợp không xác định, mặc định là master
            return new DataContext(new DbContextOptionsBuilder<DataContext>()
                .UseNpgsql(_configuration.GetConnectionString("MasterConnection"))
                .Options);
        }

    }
}
