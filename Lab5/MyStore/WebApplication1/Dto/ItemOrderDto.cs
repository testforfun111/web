using Models;

namespace Dto
{
    public class ItemOrderDto
    {
        private int id;
        private int id_product;
        private int quantity;

        public int Id { get => id; set => id = value; }
        public int Id_product { get => id_product; set => id_product = value; }
        public int Quantity { get => quantity; set => quantity = value; }


        public ItemOrderDto(int id, int id_product, int quantity)
        {
            this.id = id;
            this.id_product = id_product;
            this.quantity = quantity;
        }
    }
}
