using Microsoft.AspNetCore.SignalR;

namespace RealTimeChatApp.Networks
{
    public class VideoCallHub:Hub
    {
        public async Task SendVideoFrame(string id,byte[] frame)
        {
            await Clients.All.SendAsync("BroadcastVideoFrame", id,frame);
        }
    }
}
