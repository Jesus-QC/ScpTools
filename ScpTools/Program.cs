var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
#if DEBUG
Console.WriteLine("IMPORTANT: DEBUG MODE ON");
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
#else
builder.Services.AddRazorPages();
#endif

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();