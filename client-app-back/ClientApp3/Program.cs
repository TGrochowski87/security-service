using ClientApp3.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IUserService, UserService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("private", builder =>
    {
        builder.WithOrigins("http://localhost:3003").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("private");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
