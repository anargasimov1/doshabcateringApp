import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import { db } from '../config/firebaseConfig';
import Panel from '../companents/Panel';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Home = ({ navigation }) => {


    const [ids, setIds] = useState([])


    let idse = []


    async function datas() {

        try {
            const querySnapshot = await getDocs(collection(db, "categories"));
            querySnapshot.forEach((doc) => { idse.push(doc.id) });
            setIds(idse)
        } catch (error) {
            console.error("Error fetching documents:", error.message);
        }
    }

    useEffect(() => {
        datas()
    }, []
    )

    return (

        <>
            <Image style={styles.img} source={{ uri: 'https://media.istockphoto.com/id/1359860542/photo/food-and-drink-background.jpg?s=170667a&w=0&k=20&c=XXzfecODhXDfD5tO9jQ32IJ4Jie4ePU0jTlEAHBzDMY=' }} />
            <View style={styles.title}>
                <Text style={styles.titleText}>
                    <Text style={{ fontSize: 28, color: '#d5115f' }}> Doshabcateringe</Text> xoş gəlmisiz!
                </Text>
                <Text style={styles.titleText}>
                    Ləzzət seçiminizi edin...
                </Text>

            </View>
            <ScrollView style={styles.contanier}>
                {
                    ids.map((i, index) => {
                        return (

                            <View style={{ paddingBottom: 25 }} key={index}>

                                <Pressable onPress={() => navigation.navigate('products', { id: i })} style={styles.button}>
                                    <Text style={styles.headText}>
                                        {
                                            i.toUpperCase()
                                        }
                                    </Text>
                                    <FontAwesomeIcon style={styles.icon} name='angle-double-right' />
                                </Pressable>

                            </View>

                        )
                    })
                }

            </ScrollView>


            <Panel />

        </>
    )
}

export default Home

const styles = StyleSheet.create({
    contanier: {
        padding: 20,
        marginBottom: 60,
        marginTop: 30
    },
    title: {
        marginTop: 50
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#be5931',
        marginBottom: 8
    }
    ,
    img: {
        width: 350,
        height: 160,
        borderRadius: 25,
        objectFit: 'fill'
    },

    button: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    icon: {
        fontSize: 28,
        color: '#3a1143'
    }
    ,
    headText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3a1143'
    },
    img: {
        width: '100%',
        height: '100%',
        zIndex: -5,
        position: 'absolute',
        opacity: 0.2
    }

})  