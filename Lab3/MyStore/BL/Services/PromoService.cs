using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Models;
using BL.RepositoryInterfaces;

namespace BL.Services
{
    public class PromoService
    {
        private readonly IPromoRepository _promoRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserPromoRepository _userPromoRepository;

        public PromoService (IPromoRepository promoRepository, IUserRepository userRepository, IUserPromoRepository userPromoRepository)
        {
            _promoRepository = promoRepository;
            _userRepository = userRepository;
            _userPromoRepository = userPromoRepository;
        }
        public Promo GetPromo(int id)
        {
            return _promoRepository.GetPromo(id);
        }

        public Promo GetPromoByCode(string code)
        {
            return _promoRepository.GetPromo(code);
        }

        public List<Promo> GetAllPromos()
        {
            return _promoRepository.GetAllPromos();
        }

        public DataTable viewAllPromos()
        {
            List<Promo> allPromos = _promoRepository.GetAllPromos();
            DataTable table = new DataTable();
            table.Rows.Clear();
            table.Columns.Add("ID");
            table.Columns.Add("Code");
            table.Columns.Add("Discount");
            table.Columns.Add("Start");
            table.Columns.Add("End");

            foreach (Promo promo in allPromos)
            {
                table.Rows.Add(promo.Id, promo.Code, promo.Discount, Convert.ToString(promo.Data_start), Convert.ToString(promo.Data_end));
            }
            return table;
        }

        public List<Promo> GetPromoByIdUser(int id)
        {
            List<UserPromo> userPromo = _userPromoRepository.GetUserPromoByIdUser(id);
            List<Promo> promoList = new List<Promo>();
            if (userPromo.Count != 0)
            {
                foreach (UserPromo userPromoItem in userPromo)
                {
                    promoList.Add(_promoRepository.GetPromo(userPromoItem.Id_promo));
                }
            }
            return promoList;
        }

        public void AddPromo(Promo promo)
        {
            if (_promoRepository.IsExistPromo(promo) == true)
            {
                throw new Exception("Promo is existed");
            }
            else
                _promoRepository.AddPromo(promo);
        }
        public void UpdatePromo(Promo promo)
        {
            _promoRepository.UpdatePromo(promo);
        }
        public void DelPromo(Promo promo)
        {
            if (_promoRepository.IsExistPromo(promo) == false)
            {
                throw new Exception("Promo isn't existed");
            }
            else
                _promoRepository.DelPromo(promo);
        }

        public void AddUserPromo(UserPromo userPromo)
        {
            if (_userPromoRepository.IsExistUserPromo(userPromo) == true)
            {
                throw new Exception("UserPromo is existed");
            }
            else
                _userPromoRepository.AddUserPromo(userPromo);
        }
        public void DelUserPromo(UserPromo userPromo)
        {
            if (_userPromoRepository.IsExistUserPromo(userPromo) == false)
            {
                throw new Exception("UserPromo isn't existed");
            }
            else
                _userPromoRepository.DelUserPromo(userPromo);
        }

        public DataTable GetUserPromoByPromo(int id_promo)
        {
            List<UserPromo> all = _userPromoRepository.GetUserPromoByIdPromo(id_promo);
            DataTable table = new DataTable();
            table.Rows.Clear();
            table.Columns.Add("ID");
            table.Columns.Add("Id_user");
            table.Columns.Add("Id_Promo");

            foreach (UserPromo userPromo in all)
            {
                table.Rows.Add(userPromo.Id, userPromo.Id_user, userPromo.Id_promo);
            }
            return table;
        }

    }
}
