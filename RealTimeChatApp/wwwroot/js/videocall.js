document.addEventListener('DOMContentLoaded', function () {

    var connection = new signalR.HubConnectionBuilder()
        .withUrl('/videoCallHub')
        .withAutomaticReconnect()
        .build();

    var _id = connection.connectionId;

    connection.on('BroadcastVideoFrame', function (id, frame) {
        
        if (id != _id) {

            var encodedblob = new Blob([frame], { type: 'video/mp4' });

            var video = document.getElementById('remoteVideo');

            video.src = URL.createObjectURL(encodedblob);

            video.onended = function () {
                URL.revokeObjectURL(video.src);
            };

        }

    });

            connection.start()
                .then(function () {
                    console.log('connection started');

                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then((stream) => {
                            videoPlayer.srcObject = stream;

                            const videoTrack = stream.getVideoTracks()[0];
                            const videoStream = new MediaStream([videoTrack]);

                            var video = document.getElementById('localVideo');

                            video.srcObject = videoStream; 

                        // Capture video frames and send them to the SignalR server
                        setInterval(() => {
                            // Draw the current video frame to the canvas
                            ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

                            // Convert the current frame to a Blob
                            canvas.toBlob((blob) => {
                                // Send the frame as binary data via SignalR
                                connection.invoke("SendVideoFrame", _id, blob)
                                    .catch(err => console.error("Error sending frame:", err));
                            }, 'image/jpeg', 0.5);
                        }, 100);

                        }).catch((error) => console.error("Error accessing webcam:", error));

                })
                .catch(error => {
                    console.error(error.message);
                });

        
});
