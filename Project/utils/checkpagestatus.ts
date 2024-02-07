function sendNotification(message: string) {
    const notification = new Notification("New message from Open Chat", {
        icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
        body: `${message}`
    })
    notification.onclick = () => function () {
        window.open("http://localhost:3000/")
    }
}


export default function checkPageStatus(message: string) {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications!")
    }
    else if (Notification.permission === "granted") {
        sendNotification(message)
    }
    else if (Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
            if (permission === "granted") {
                sendNotification(message)
            }
        })
    }
}