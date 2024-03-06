using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.LoggerService;
using MoneyManager.Server.Repository;

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
    }
}
