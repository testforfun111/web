using Models;
using Services;
using Data;
using Microsoft.EntityFrameworkCore;
using Repository;
using Interfaces;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
//builder.Services.AddDbContext<DataContext>(options =>
//{
//    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
//    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
//});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:5173") // URL của frontend
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});
builder.Services.AddHttpContextAccessor();
builder.Services.AddTransient<DbContextFactory>();
builder.Services.AddTransient<DataContext>(provider => provider.GetRequiredService<DbContextFactory>().CreateDbContext());


builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<ProductService>();
builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<OrderService>();
builder.Services.AddTransient<IItemOrderRepository, ItemOrderRepository>();
builder.Services.AddTransient<ItemOrderService>();
builder.Services.AddTransient<ICartRepository, CartRepository>();
builder.Services.AddTransient<CartService>();
builder.Services.AddTransient<IItemCartRepository, ItemCartRepository>();
builder.Services.AddTransient<ItemCartService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAll");
app.MapControllers();

app.Run();
