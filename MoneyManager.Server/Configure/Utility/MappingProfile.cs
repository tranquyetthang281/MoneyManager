using AutoMapper;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.Category;
using MoneyManager.Server.Shared.DataTransferObjects.Friend;
using MoneyManager.Server.Shared.DataTransferObjects.Transaction;
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
            CreateMapForFriend();
            CreateMapForTransaction();
            CreateMapForCategory();
        }

        private void CreateMapForUser()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserForRegistrationDto, User>()
                .ForMember(user => user.UserName, opt => opt.MapFrom(source => source.Email));
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForUpdateDto, User>().ReverseMap();
        }

        private void CreateMapForWallet()
        {
            CreateMap<UserWallet, WalletDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(source => source.Wallet!.Id))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(source => source.Wallet!.Name))
                .ForMember(dto => dto.Balance, opt => opt.MapFrom(source => source.Wallet!.Balance))
                .ForMember(dto => dto.InitBalance, opt => opt.MapFrom(source => source.Wallet!.InitBalance))
                .ForMember(dto => dto.UserBalance, opt => opt.MapFrom(source => source.Balance))
                .ForMember(dto => dto.IsOwner, opt => opt.MapFrom(source => source.IsOwner));
          
            CreateMap<WalletForCreationDto, Wallet>()
                .ForMember(w => w.Balance, opt => opt.MapFrom(source => source.InitBalance));
        }

        private void CreateMapForFriend()
        {
            CreateMap<(User user, int status), FriendDto>()
                .ForMember(dto => dto.Id, opt => opt.MapFrom(source => source.user.Id))
                .ForMember(dto => dto.Name, opt => opt.MapFrom(source => source.user.Name))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(source => source.user.Email))
                .ForMember(dto => dto.BirthDate, opt => opt.MapFrom(source => source.user.BirthDate))
                .ForMember(dto => dto.Avatar, opt => opt.MapFrom(source => source.user.Avatar))
                .ForMember(dto => dto.status, opt => opt.MapFrom(source => source.status));
        }

        private void CreateMapForTransaction()
        {
            CreateMap<Transaction, TransactionDto>();
            CreateMap<TransactionForCreationDto, Transaction>();
            CreateMap<TransactionForUpdateDto, Transaction>();
            CreateMap<TransactionForUpdateDto, Transaction>().ReverseMap();
        }

        private void CreateMapForCategory()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryForCreationDto, Category>();
        }
    }
}
