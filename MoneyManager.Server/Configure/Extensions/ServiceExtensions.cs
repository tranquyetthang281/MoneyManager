using Microsoft.EntityFrameworkCore;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Repository;
using MoneyManager.Server.Service;
using MoneyManager.Server.Service.LoggerService;

namespace MoneyManager.Server.Configure.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureIISIntegration(this IServiceCollection services) =>
            services.Configure<IISOptions>(options => { });

        public static void ConfigureLoggerService(this IServiceCollection services) =>
            services.AddSingleton<ILoggerManager, LoggerManager>();

        public static void ConfigureRepositoryManager(this IServiceCollection services) =>
            services.AddScoped<IRepositoryManager, RepositoryManager>();

        public static void ConfigureServiceManager(this IServiceCollection services) =>
            services.AddScoped<IServiceManager, ServiceManager>();

        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration) =>
            services.AddDbContext<RepositoryContext>(opts =>
                opts.UseSqlServer(configuration.GetConnectionString("sqlConnection")));

    }
}
