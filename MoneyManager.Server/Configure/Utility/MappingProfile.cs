using AutoMapper;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.User;
using MoneyManager.Server.Shared.DataTransferObjects.Wallet;

namespace MoneyManager.Server.Utility
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMapForUser();
            CreateMapForWallet();
        }

        private void CreateMapForUser()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserForCreationDto, User>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForUpdateDto, User>().ReverseMap();
        }

        private void CreateMapForWallet()
        {
            CreateMap<Tuple<Wallet, UserWallet>, WalletDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(source => source.Item1.Id))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(source => source.Item1.Name))
                .ForMember(dto => dto.Balance, opt => opt.MapFrom(source => source.Item1.Balance))
                .ForMember(dto => dto.InitBalance, opt => opt.MapFrom(source => source.Item1.InitBalance))
                .ForMember(dto => dto.UserBalance, opt => opt.MapFrom(source => source.Item2.Balance))
                .ForMember(dto => dto.IsOwner, opt => opt.MapFrom(source => source.Item2.IsOwner));
          
            CreateMap<WalletForCreationDto, Wallet>()
                .ForMember(w => w.Balance, opt => opt.MapFrom(source => source.InitBalance));
        }
    }
}
