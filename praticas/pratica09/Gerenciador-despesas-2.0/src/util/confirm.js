import { Alert, Platform } from 'react-native';

export function confirmAction({ title, message, confirmText, onConfirm }) {
  if (Platform.OS === 'web') {
    const accepted = window.confirm(`${title}\n\n${message}`);
    if (accepted) {
      onConfirm();
    }
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancelar', style: 'cancel' },
    {
      text: confirmText,
      style: 'destructive',
      onPress: onConfirm,
    },
  ]);
}
