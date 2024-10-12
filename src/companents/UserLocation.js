import { StyleSheet, View, Alert, ActivityIndicator, Linking, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const UserLocation = () => {

  const [location, setLocation] = useState(null);
  const [toogle, setToogle] = useState(false)

  useEffect(() => {
    getLocation();
  }, [toogle])


  const getLocation = async () => {
    try {
      // geolokasiyanın təyin üçün icazə almaq
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sizin icazəni ləğv etmisiniz');
        return;
      }
      //geolokasiyanın aktiv olub-olmadığını yoxlayırıq
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        Alert.alert(
          'Geolokasiya deaktivdir',
          'Telefonunuzda geolokasiya deaktivdir. Zəhmət olmasa onu aktiv edin və yenidən cəhd edin',
          [{
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
            }
          }]
        );
        return;
      }

      let currentPosition = await Location.getCurrentPositionAsync({})
      // setLocation(currentPosition.coords.latitude);
      console.log(location)

    } catch (error) {
      console.log("Error:", error)
    }

  };


  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setLocation(coordinate)
    setToogle(!toogle)
  };

  return (
    <>
      <View>

        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          onPress={handleMapPress}
        >
          {location && location !== null ? < Marker coordinate={location} pinColor='#3e14de' /> : null}
        </MapView>

      </View>

    </>
  )
}

export default UserLocation

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.33
  }
})