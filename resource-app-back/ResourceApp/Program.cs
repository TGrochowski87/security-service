using ResourceApp.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IResourceService, ResourceService>();

builder.Services.AddCors(options =>
{
  // Clients
  options.AddPolicy("public", builder =>
  {
    builder.WithOrigins("http://localhost:3001", "https://localhost:3001").AllowAnyHeader().WithMethods(HttpMethod.Get.Method);
    builder.WithOrigins("http://localhost:3002", "https://localhost:3002").AllowAnyHeader().WithMethods(HttpMethod.Get.Method);
    builder.WithOrigins("http://localhost:3003", "https://localhost:3003").AllowAnyHeader().WithMethods(HttpMethod.Get.Method);
    builder.WithOrigins("http://localhost:3004", "https://localhost:3004").AllowAnyHeader().WithMethods(HttpMethod.Get.Method);
  });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("public");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
