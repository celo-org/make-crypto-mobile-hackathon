import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          for (let i = 0; i <= data.length; i++) {
            console.log("ro");
            const contact = await Contacts.getContactByIdAsync(data[i]['id']);
            if (contact) {
              console.log("r");
            }
          }

        }
      }
    })();
  }, []);

  return (
    <View >
      <Text>Contacts Module Example</Text>
    </View>
  );
}

