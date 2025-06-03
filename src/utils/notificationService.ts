import PushNotification, { PushNotificationObject } from 'react-native-push-notification';
import { Platform } from 'react-native';

class NotificationService {
  constructor() {
    this.configure();
    this.createDefaultChannel();
  }

  configure(): void {
    PushNotification.configure({
      onRegister: function () {
        // Token registration for remote notifications (optional)
      },
      onNotification: function (notification) {
        if (typeof notification.finish === 'function') {
          notification.finish('NoData');
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }

  createDefaultChannel(): void {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id',
        channelName: 'Default Channel',
        channelDescription: 'A default channel for general notifications',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }

  showLocalNotification(title: string, message: string): void {
    const options: PushNotificationObject = {
      channelId: 'default-channel-id',
      autoCancel: true,
      largeIcon: 'ic_launcher', // Ensure this exists
      bigText: message,
      subText: '',
      vibrate: true,
      vibration: 300,
      priority: 'high',
      importance: 'high',
      title: title,
      message: message,
      playSound: true,
      soundName: 'default',
      ignoreInForeground: false,
      allowWhileIdle: true,
    };

    PushNotification.localNotification(options);
  }
}

export default new NotificationService();
