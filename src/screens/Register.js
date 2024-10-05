import { Pressable, StyleSheet, Text, View, Keyboard, TextInput, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Panel from '../companents/Panel'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';


const Register = () => {

  const navigation = useNavigation();

  const [toogle, setToggle] = useState(true)



  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => { setToggle(false) });
    Keyboard.addListener('keyboardDidHide', () => { setToggle(true) });
  }, []);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')




  async function create() {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        addUser(user.uid)
        setToken(user.uid)
        Alert.alert('ugurlu qeydiyyat', 'sehifeye kecid', [{
          text: 'daxil ol',
          onPress: () => {
            navigation.replace('login')
          }
        }])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
          Alert.alert('Daxil etdiyiniz email artiq movcuddur');
          return
        }
        Alert.alert(errorMessage)

      });
  }

  async function setToken(id) {
    await AsyncStorage.setItem('token', id)
  }

  async function addUser(id) {
    try {
      await setDoc(doc(db, 'users', id), {
        name: name,
        phone: phone,
        email: email,
        id: id
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <View style={styles.contenier}>
        <Image style={styles.img} source={require('../../assets/background.jpg')} />

        <Image style={{ width: 150, height: 150 }} source={require('../../assets/register.png')} />

        <TextInput onChangeText={value => setName(value)} style={styles.input} placeholder='Adınızı daxil edin' />
        <TextInput keyboardType='numeric' onChangeText={value => setPhone(value)} style={styles.input} placeholder='Telefon nömrəsini daxil edin' />
        <TextInput onChangeText={value => setEmail(value)} style={styles.input} placeholder='Emalnizi daxil edin' />
        <TextInput onChangeText={value => setPassword(value)} style={styles.input} placeholder='Şifrənizini daxil edin' secureTextEntry />
        <Pressable onPress={create} style={styles.button}>
          <Text style={styles.buttonText}>
            Qeydiyyatdan keç
          </Text>
        </Pressable>

      </View>

      {toogle ? <Panel /> : null}
    </>

  )
}

export default Register

const styles = StyleSheet.create({
  contenier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    gap: 30,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#E6E6FA',
    width: 285,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20
  },
  input: {
    width: 280,
    borderBottomWidth: 0.8,
    borderColor: 'blue',
    marginTop: 15,
    borderRadius: 25,
    height: 45,
    textAlign: 'center',
    color: 'white'
  },
  img: {
    width: '100%',
    height: "100%",
    zIndex: -5,
    position: 'absolute'
  }
})