using Models;

namespace Dto
{

    public enum Status
    {
        None,
        Init,
        Delivering,
        Delivered,
    }
    public class OrderDto
    {

        private int id;
        private Status status;
        private DateTime data_created;

        public int Id { get => id; set => id = value; }
        public Status Status { get => status; set => status = value; }

        public DateTime Data_created { get => data_created; set => data_created = value; }

        public OrderDto(int id, Status status, DateTime data_created)
        {
            this.id = id;
            this.status = status;
            this.data_created = data_created;
        }
    }
}
