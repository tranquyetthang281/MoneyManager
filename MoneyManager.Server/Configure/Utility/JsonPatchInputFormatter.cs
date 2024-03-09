using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MoneyManager.Server.Utility
{
    public static class JsonPatchInputFormatter
    {
        public static NewtonsoftJsonPatchInputFormatter GetJsonPatchInputFormatter()
            => new ServiceCollection()
            .AddLogging()
            .AddMvc()
            .AddNewtonsoftJson().Services
            .BuildServiceProvider()
            .GetRequiredService<IOptions<MvcOptions>>().Value.InputFormatters
            .OfType<NewtonsoftJsonPatchInputFormatter>()
            .First();
    }
}
