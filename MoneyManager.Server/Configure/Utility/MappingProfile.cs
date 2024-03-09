using AutoMapper;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.User;

namespace MoneyManager.Server.Utility
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMapForUser();
        }

        private void CreateMapForUser()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserForCreationDto, User>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForUpdateDto, User>().ReverseMap();
        }
    }
}
