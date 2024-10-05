import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Panel from '../companents/Panel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6';

const UserPage = ({ route }) => {

    const [loc, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);


    useEffect(() => {
        getLocation();
    }, []);


   const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Location permission denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }


    const { id } = route.params;


    const [user, setUser] = useState('')

    const navigation = useNavigation()

    async function singUp() {
        await AsyncStorage.removeItem('token')
        navigation.replace('login')
    }

    async function getUserData() {


        try {
            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                setUser(docSnap.data())

            } else {

                console.log('Belə bir sənəd mövcud deyil');
            }
        } catch (error) {
            console.error('Xəta baş verdi:', error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [loc])

    return (
        <>

            <View style={styles.contanier} >
            </View>
            <Text style={styles.text}>
                xoş gelmisen  {user.name}
            </Text>


            <Text style={styles.text}>
                adi:  {user.name}
            </Text>
            <Text style={styles.text}>
                email:  {user.email}
            </Text>
            <Text style={styles.text}>
                nomre: {user.phone}
            </Text>

            <MapView
                style={styles.map}
                region={loc}
            >
                {/* {<Marker coordinate={{ latitude: loc.latitude, longitude: loc.longitude }} title="My Marker" style={{ color: 'red' }} />} */}
            </MapView>




            <Pressable onPress={() => singUp()} style={styles.button}>
                <Text style={styles.text}>
                    Çıxış
                </Text>
            </Pressable>
            <Pressable onPress={() => { getLocation() }} style={styles.buttonLocation}>
                <FontAwesomeIcon6 style={styles.icon} name="location-crosshairs" />
            </Pressable>

            <Panel />

        </>
    )
}

export default UserPage

const styles = StyleSheet.create({
    contanier: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30
    },
    button: {
        width: 200,
        height: 50,
        backgroundColor: 'red'
    },
    map: {
        width: 380,
        height: 300
    },
    icon: {
        fontSize: 30,
        color: 'blue'
    },
    buttonLocation: {
        marginTop: 50,
        marginLeft: 50
    }
})