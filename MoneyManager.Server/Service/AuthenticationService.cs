﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MoneyManager.Server.Contracts;
using MoneyManager.Server.Contracts.RepositoryContracts;
using MoneyManager.Server.Contracts.ServiceContracts;
using MoneyManager.Server.Entities.Exceptions;
using MoneyManager.Server.Entities.Models;
using MoneyManager.Server.Shared.DataTransferObjects.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MoneyManager.Server.Service
{
    internal sealed class AuthenticationService : IAuthenticationService
    {
        private readonly ILoggerManager _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        private readonly IRepositoryManager _repository;
        private readonly UserManager<User> _userManager;
        private User? _user;

        public AuthenticationService(ILoggerManager logger, IMapper mapper,
                IConfiguration configuration, IRepositoryManager repository,
                UserManager<User> userManager)
        {
            _logger = logger;
            _mapper = mapper;
            _configuration = configuration;
            _userManager = userManager;
            _repository = repository;
        }

        public async Task<(IdentityResult result, string token)> RegisterUserAsync(UserForRegistrationDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var result = await _userManager.CreateAsync(user, userDto.Password);
            var token = string.Empty;
            if (result.Succeeded)
            {
                await _userManager.AddToRolesAsync(user, new string[] { "ApplicationUser" });
                token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                await CreateFirstWalletForUserAsync(user.Email);
            }
            return (result, token);
        }

        public async Task<bool> ConfirmEmailAsync(string token, string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user is null)
                throw new UserNotFoundException(email);
            var result = await _userManager.ConfirmEmailAsync(user, token);
            return result.Succeeded;
        }

        public async Task<Guid> ValidateUser(UserForAuthenticationDto userDto)
        {
            _user = await _userManager.FindByEmailAsync(userDto.Email);
            var result = _user != null && await _userManager.CheckPasswordAsync(_user, userDto.Password);
            if (!result)
                throw new WrongEmailOrPasswordBadRequestException();
            if (!_user!.EmailConfirmed)
                throw new UnconfirmedEmailBadRequestException();
            return _user!.Id;
        }

        public async Task<string> CreateToken()
        {
            var signingCredentials = GetSigningCredentials();
            var claims = await GetClaims();
            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var secretVariable = Environment.GetEnvironmentVariable("SECRET");
            if (secretVariable is null)
                throw new Exception("SECRET variable is null");
            var key = Encoding.UTF8.GetBytes(secretVariable);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>();
            if (_user != null)
            {
                claims.Add(new Claim(ClaimTypes.NameIdentifier, _user.Id.ToString()));
                var roles = await _userManager.GetRolesAsync(_user);
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
            }
            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var tokenOptions = new JwtSecurityToken
            (
                issuer: jwtSettings["validIssuer"],
                audience: jwtSettings["validAudience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["expires"])),
                signingCredentials: signingCredentials
            );
            return tokenOptions;
        }

        private async Task CreateFirstWalletForUserAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null) {
                var wallet = new Wallet()
                {
                    Name = "Wallet1",
                    Avatar = "/wallet1.png",
                    Balance = 0,
                    InitBalance = 0,
                };

                _repository.Wallet.CreateWallet(wallet);

                var userWallet = new UserWallet
                {
                    UserId = user.Id,
                    WalletId = wallet.Id,
                    Balance = wallet.Balance,
                    IsOwner = true
                };
                _repository.UserWallet.CreateUserWallet(userWallet);

                await _repository.SaveAsync();
            }
        }
    }
}
