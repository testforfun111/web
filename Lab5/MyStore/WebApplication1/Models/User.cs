﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public enum Role
    {
        None,
        Admin,
        Seller,
        Client, 
        Guest
    }
    public class User
    {
        private int id;
        private string name;
        private string phone;
        private string address;
        private string email;
        private string login;
        private string password;
        private string role;
        private string avatar;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Address { get => address; set => address = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Login { get => login; set => login = value; }
        public string Role { get => role; set => role = value; }
        public string Avatar { get =>  avatar; set => avatar = value; }

        public User(int id, string name, string phone, string address, string email, string login, string password, string role, string avatar)
        {
            this.id = id;
            this.name = name;
            this.phone = phone;
            this.address = address;
            this.email = email;
            this.password = password;
            this.role = role;
            this.login = login;
            this.avatar = avatar;
        }

        public User()
        {
            this.name = "";
            this.phone = "";
            this.address = "";
            this.email = "";
            this.password = "";
            this.role = "";
            this.login = "";
            this.Avatar = "";
        }

    }
}
