import { Pressable, StyleSheet, Text, View, TextInput, Image, Alert, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Panel from '../companents/Panel'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';



const Login = ({ navigation }) => {

    const [toogle, setToggle] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => { setToggle(false) });
        Keyboard.addListener('keyboardDidHide', () => { setToggle(true) });
    }, []);

    async function getToken() {

        let token = await AsyncStorage.getItem('token')
        if (token !== null)
            navigation.replace('userPage', { id: token })

    }
    useEffect(() => {
        getToken();
    }, [])

    async function logIn() {
        const auth = getAuth();
        let token = await AsyncStorage.getItem('token')
        if (token !== null) {
            navigation.replace('userPage', { id: token })
        }
        await signInWithEmailAndPassword(auth, email, password)
            .then((userDetails) => {
                const user = userDetails.user
                let userToken = user.uid

                AsyncStorage.setItem('token', userToken)
                navigation.replace('userPage', { id: user.uid });


            }).catch((err) => {

                console.log(err)
            })
    }




    return (
        <View style={styles.contenier}>
            <Image style={styles.background} source={require('../../assets/background.jpg')} />
            <View style={{ position: 'absolute', zIndex: 21, margin: 'auto', alignItems: 'center' }}>

                <Image style={styles.img} source={require('../../assets/login.png')} />
                <TextInput onChangeText={value => setEmail(value)} style={styles.input} placeholder='Emalnizi daxil edin' />
                <TextInput onChangeText={value => setPassword(value)} style={styles.input} placeholder='Şifrənizini daxil edin' secureTextEntry />

                <Pressable onPress={() => logIn()} style={styles.button}>
                    <Text style={{
                        fontWeight: 'bold', fontSize: 18, color: 'white'
                    }}>
                        Daxil ol
                    </Text>
                </Pressable>


                <Pressable style={styles.buttonRegister} onPress={() => {
                    navigation.navigate('register')
                }}>
                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                        Qeydiyyatdan keç
                    </Text>
                </Pressable>

            </View>

            {
                toogle ? <Panel /> : null
            }
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    contenier: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold'
    }
    ,
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#4682B4',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15

    },

    buttonRegister: {
        width: 250,
        height: 40,
        backgroundColor: 'lightgrey',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    input: {
        width: 280,
        borderBottomWidth: 0.8,
        borderColor: 'lightblue',
        marginTop: 29,
        borderRadius: 25,
        height: 45,
        textAlign: 'center'

    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 75,

    },
    background: {
        width: '100%',
        height: '100%'
    }
})


