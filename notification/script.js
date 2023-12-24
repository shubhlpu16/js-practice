function createNotification(imageUrl, title, message) {
    const notificationContainer = document.getElementById('notification-container');

    const notification = document.createElement('div');
    notification.classList.add('notification');

    const image = document.createElement('img');
    image.src = imageUrl;

    const content = document.createElement('div');
    content.classList.add('notification-content');

    const titleElement = document.createElement('h4');
    titleElement.innerText = title;

    const messageElement = document.createElement('p');
    messageElement.innerText = message;

    content.appendChild(titleElement);
    content.appendChild(messageElement);

    notification.appendChild(image);
    notification.appendChild(content);

    notificationContainer.appendChild(notification);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Usage Example:

createNotification('user1.jpg', 'John Doe', 'Sent you a message.');
createNotification('user2.jpg', 'Jane Doe', 'Liked your post.');
