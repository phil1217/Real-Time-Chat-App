using Microsoft.AspNetCore.Mvc;

namespace RealTimeChatApp.Controllers
{
    public class VideoCallController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
