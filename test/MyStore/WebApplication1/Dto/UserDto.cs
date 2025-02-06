using Models;

namespace Dto
{
    public class UserDto
    {
        private int id;
        private string login;
        private string password;
        public int Id { get => id; set => id = value; }
        public string Password { get => password; set => password = value; }
        public string Login { get => login; set => login = value; }

        public UserDto(int id, string login, string password)
        {
            this.id = id;
            this.password = password;
            this.login = login;
        }
    }
}
