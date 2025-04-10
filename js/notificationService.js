// Function to request notification permission
export async function requestNotificationPermission() {
    try {
        if (!("Notification" in window)) {
            console.log("This browser does not support notifications");
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === "granted";
    } catch (error) {
        console.error("Error requesting notification permission:", error);
        return false;
    }
}

// Function to show a notification
function showNotification(note) {
    const options = {
        body: note.description || 'No description provided',
        icon: '/assets/notification-icon.png',
        badge: '/assets/badge-icon.png',
        vibrate: [200, 100, 200],
        tag: note._id
    };

    new Notification(note.name, options);
}

// Schedule notification for a note
export function scheduleNotification(note) {
    const alarmDateTime = new Date(`${note.alarmDate}T${note.alarmTime}`);
    const now = new Date();
    const timeUntilAlarm = alarmDateTime - now;

    if (timeUntilAlarm <= 0) {
        console.log("Alarm time has already passed");
        return;
    }

    // Clear any existing notification for this note
    if (note.notificationTimeout) {
        clearTimeout(note.notificationTimeout);
    }

    // Schedule new notification
    note.notificationTimeout = setTimeout(() => {
        showNotification(note);
    }, timeUntilAlarm);
}

// Check and schedule notifications for all notes
export async function checkAndScheduleNotifications(notes) {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
        console.log("Notification permission not granted");
        return;
    }

    notes.forEach(note => {
        scheduleNotification(note);
    });
} 