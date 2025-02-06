using Models;

namespace Dto
{
    public class CartDto
    {

        private int id;
        private DateTime data_created;

        public int Id { get => id; set => id = value; }
        public DateTime Data_created { get => data_created; set => data_created = value; }

        public CartDto(int id, DateTime data_created, int id_user)
        {
            this.id = id;
            this.data_created = data_created;
        }
    }
}
