using AutoMapper;
using Models;
using Dto;

namespace WebApplication1.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() 
        {
            CreateMap<ItemCart, ItemCartDto>();
            CreateMap<ItemOrder, ItemOrderDto>();
            CreateMap<Cart, CartDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<User, UserDto>();
        }
    }
}
