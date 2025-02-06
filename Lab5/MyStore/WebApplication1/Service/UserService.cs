using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using Interfaces;

namespace Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new Exception("Параметр пустой!");
        }

        public User Register(string name, string phone, string address, string email, string login, string password, string role, string avatar)
        {
            User user = _userRepository.GetUser(login);
            if (user == null)
            {
                int countUsers = _userRepository.CountAllUsers();
                user = new User(countUsers + 1, name, phone, address, email, login, password, role, avatar);
                _userRepository.AddUser(user);
            }
            else
            {
                throw new Exception("Пользователь с таким логином уже существует.");
            }
            return user;
        }

        public User LogIn(string login, string password)
        {
            User user = _userRepository.GetUser(login);
            if (user != null)
            {
                if (user.Password != password)
                {
                    throw new Exception("Неверный пароль.");
                }
            }
            else
            {
                throw new Exception("Не существует пользователя с таким логином.");
            }

            return user;
        }

        public User ChangePassword(string login, string newPassword)
        {
            User user = _userRepository.GetUser(login);
            user.Password = newPassword;
            _userRepository.UpdateUser(user);
            return user;
        }

        public void DeleteUser(int id)
        {
            if (GetUser(id) != null)
                _userRepository.DelUser(GetUser(id));
            else
                throw new Exception("Пользователь не существует");
        }

        public void AddUser(User user)
        {
            ICollection<User> allUser = _userRepository.GetAll();
            foreach (User elem in allUser)
                if (elem.Login == user.Login)
                    throw new Exception("Пользователь уже существует");
            _userRepository.AddUser(user);
        }

        public User GetUser(int id)
        {
            User user = _userRepository.GetUser(id);
            if (user == null)
            {
                throw new Exception("User isn't found!");
            }
            else
                return user;
        }

        public void UpdateUser(int id, User user)
        {
            User user_ = _userRepository.GetUser(id);
            if (user_ == null)
            {
                throw new Exception("User isn't found!");
            }
            else
            {
                user.Id = id;
                _userRepository.UpdateUser(user);
            }

        }

        public ICollection<User> getAllUsers()
        {
            ICollection<User> users = _userRepository.GetAll();
            return users;
        }
        public ICollection<User> GetUserByName(string startWith)
        {
            ICollection<User> users = _userRepository.GetUserByName(startWith);
            return users;
        }

        public User getUserByLogin(string login)
        {
            return _userRepository.GetUser(login);
         
        }
    }
}
