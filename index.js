const check = () => {
	if (!('serviceWorker' in navigator)) {
		throw new Error('No Service Worker support!')
  	}
  	if (!('PushManager' in window)) {
    	throw new Error('No Push API Support!')
  	}
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js'); //notice the file name
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}

const showLocalNotification = (title, body, swRegistration) => {
    const options = {
        body,
        // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
}

const main = async () => { //notice I changed main to async function so that I can use await for registerServiceWorker
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
    showLocalNotification('This is title', 'this is the message', swRegistration);
}

main()