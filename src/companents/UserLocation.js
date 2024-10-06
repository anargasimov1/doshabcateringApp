import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const UserLocation = () => {

  useEffect(() => {
    getLocation()
  }, []);


  const [location, setLocation] = useState({});
  const [enableServis, setEnableServis] = useState(false);
  const [indicator, setIndicator] = useState(false)

  const getLocation = async () => {
    try {
      setIndicator(true)
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
          [{ text: 'OK' }]
        );
        setEnableServis(false)
        return;
      }
      else {

        let coords = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setLocation({
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        });

        setEnableServis(true)
      }
    } catch (error) {
      console.log("Error:", error)
    }
    setIndicator(false)
  };

  return (
    <>
      <View>
        {indicator && <ActivityIndicator size="large" style={styles.indicator} />}
        {enableServis && <MapView style={styles.map} region={location}>
          {
            <Marker coordinate={location} title='marker' pinColor='red' />
          }
        </MapView>}
        
      </View>

    </>
  )
}

export default UserLocation

const styles = StyleSheet.create({
  map: {
    width: 384,
    height: 300
  },
  indicator: {
    position: 'absolute',
    zIndex: 12,
    backgroundColor: 'lightgrey',
    width: 384,
    height: 300,
    opacity: 0.5
  }
})