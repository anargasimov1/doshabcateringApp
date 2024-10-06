import {Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import Panel from '../companents/Panel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6'
import UserLocation from '../companents/UserLocation';


const UserPage = ({ route }) => {

    useEffect(() => {
        getUserData();
    }, []);

    const { id } = route.params;
    const [user, setUser] = useState('');
    const [name, setName] = useState('')

    const navigation = useNavigation();

    async function signUp() {
        await AsyncStorage.removeItem('token');
        navigation.replace('login');
    }

    async function getUserData() {
        try {
            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUser(docSnap.data());
                setName(docSnap.data().name.slice(0, 1))
            } else {
                console.log('Belə bir sənəd mövcud deyil');
            }

        } catch (error) {
            console.error('Xəta baş verdi:', error);
        }
    }




    return (
        <>

            <ScrollView style={{ marginBottom: 50 }}>
                <View style={styles.title}>
                    <View style={styles.headText}>
                        <Text style={styles.name}>
                            {name}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        Xoş gəlmisən  {user.name}
                    </Text>
                </View>
                <Text style={styles.info}>İstifadəçi məlumatları</Text>
                <View style={styles.userInfo}>
                    <Text style={styles.text}>Ad:  {user.name}</Text>
                    <Text style={styles.text}>Email:  {user.email}</Text>
                    <Text style={styles.text}>Nömrə: {user.phone}</Text>

                </View>
                {
                    <UserLocation />
                }


                <Text style={styles.order}>Sifarişləriniz</Text>

                <Pressable Pressable onPress={signUp} style={styles.button}>

                    <FontAwesomeIcon6 style={styles.buttonIcon} name="arrow-right-from-bracket" />
                    <Text style={styles.buttontext}>
                        Hesabdan çıxış
                    </Text>
                </Pressable >


            </ScrollView>

            <Panel />
        </>
    )
}

export default UserPage;

const styles = StyleSheet.create({
    headText: {
        backgroundColor: '#9592a1',
        gap: 20,
        width: 75,
        height: 75,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        fontStyle: 'italic',
        color: '#9592a1',
    },
    button: {
        width: 200,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    info: {
        marginTop: 25,
        fontSize: 20,
        color: 'grey',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    title: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 75,
        paddingHorizontal: 10
    },
    userInfo: {
        gap: 20,
        marginVertical: 50
    },
    buttontext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    buttonIcon: {
        fontSize: 20,
        color: 'red'
    },
    order: {
        fontSize: 28,
        color: 'grey',
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 20
    }

});
