using Rotativa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using crudaspangularjs.Models;

namespace crudaspangularjs.Controllers
{
    public class UserController : Controller
    {
        private CrudAspAngularjsDbEntities db = null;
        public UserController()
        {
            db = new CrudAspAngularjsDbEntities();
        }
        public ActionResult Index()
        {
            var user = db.Users.ToList();
            return Json(user, JsonRequestBehavior.AllowGet);
        }
       

        public JsonResult Details(int id)
        {
            var user = db.Users.Find(id);
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(User user)
        {
            db.Users.Add(user);
            db.SaveChanges();
            return Json(null);
        }

        [HttpPost]
        public JsonResult Edit(User user)
        {
            db.Entry(user).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
            return Json(null);
        }

        public ActionResult PrintViewToPdf()
        {
            var report = new ActionAsPdf("Data") 
                 {
                    FileName = "ReportData.pdf",
                    PageSize = Rotativa.Options.Size.A4
                 };
            return report;
        }
        public ActionResult Data()
        {
            // ViewBag.user = db.Users.ToList();
            var user = db.Users.ToList();
            return View(user);
        }
    }
}