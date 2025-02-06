using Models;

namespace Dto
{
    public class ItemCartDto
    {
        private int id;
        private int quantity;
        private int id_product;

        public int Id { get => id; set => id = value; }
        
        public int Quantity { get => quantity; set => quantity = value; }
        public int Id_product { get => id_product; set => id_product = value; }

        public ItemCartDto(int id, int quantity, int id_product)
        {
            this.id = id;
            this.quantity = quantity;
            this.id_product = id_product;
        }
    }
}
