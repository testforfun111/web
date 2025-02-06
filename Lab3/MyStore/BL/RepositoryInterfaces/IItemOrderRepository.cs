﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;

namespace BL.RepositoryInterfaces
{
    public interface IItemOrderRepository
    {
        ItemOrder GetItemOrder(int id);
        ItemOrder GetItemOrder(int id_order, int id_product);

        void AddItemOrder(ItemOrder itemOrder);

        void DelItemOrder(ItemOrder itemOrder);

        void UpdateItemOrder(ItemOrder itemOrder);

        bool IsExistItemOrder(ItemOrder itemOrder);

        List<ItemOrder> GetItemOrderByIdOrder(int id);
    }
}
