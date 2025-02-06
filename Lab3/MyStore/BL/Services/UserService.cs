using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using BL.RepositoryInterfaces;
using MyException;

namespace BL.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new Exception("Параметр пустой!");
        }

        public User Register(string name, string phone, string address, string email, string login, string password, Role role)
        {
            User user = _userRepository.GetUser(login);
            if (user == null)
            {
                int countUsers = _userRepository.CountAllUsers();
                user = new User(countUsers + 1, name, phone, address, email, login, password, role);
                _userRepository.AddUser(user);
            }
            else
            {
                throw new Exception("Пользователь с таким логином уже существует.");
            }
            return user;
        }

        public User LogIn (string login, string password)
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

        public void DeleteUser(User user)
        {
            _userRepository.DelUser(user);
        }

        public void AddUser(User user)
        {
            List<User> allUser = _userRepository.GetAll();
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

        public void UpdateUser(User user)
        {
            User user_ = _userRepository.GetUser(user.Id);
            if (user_ == null)
            {
                throw new Exception("User isn't found!");
            }
            else
                _userRepository.UpdateUser(user);
        }

        public List<User> getAllUsers()
        {
            List<User> users = _userRepository.GetAll();
            return users;
        }

        public DataTable viewAllUsers()
        {
            List<User> allUsers = _userRepository.GetAll();
            DataTable table = new DataTable();
            table.Rows.Clear();
            table.Columns.Add("ID");
            table.Columns.Add("Login");
            table.Columns.Add("Password");
            table.Columns.Add("Name");
            table.Columns.Add("Address");
            table.Columns.Add("Phone");
            table.Columns.Add("Email");
            table.Columns.Add("Role");
            foreach (User user in allUsers)
            {
                table.Rows.Add(user.Id, user.Login, user.Password, user.Name, user.Address, user.Phone, user.Email, user.Role.ToString());
            }
            return table;
        }

        public User getUserByLogin(string login)
        {
            return _userRepository.GetUser(login);
         
        }
    }
}
