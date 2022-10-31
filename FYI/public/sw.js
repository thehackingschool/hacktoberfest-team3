self.addEventListener('push',(event)=>{
	let body;

	if(event.data){
		body=event.data.text();
	}else{
		body="Default"
	}
    const options = {
    body: body,
    icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'explore', title: 'Go to the site',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Close the notification',
        icon: 'images/xmark.png'},
    ]
  };
	event.waitUntil(self.registration.showNotification('FYI',options));
})