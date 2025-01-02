using Microsoft.AspNetCore.SignalR;
namespace RealTimeChatApp.Networks
{
    public class ChatHub : Hub
    {
        
        public async Task Send(string user,string message)
        {
            await Clients.All.SendAsync("BroadcastMessage",user, message);
        }

    }

}
