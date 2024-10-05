import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const Wishlist = () => {

    const [datas, setDatas] = useState([]);
    const [count, setCount] = useState(1);
    const [prince, setPrince] = useState(0)

    async function getData() {
        let data = await AsyncStorage.getItem('wishlist')
        let datasArray = JSON.parse(data);

        setDatas(datasArray)
    }

    useEffect(() => {
        getData()

    }, [])

    const countPlus = () => {
        setCount(count + 1)

    }


    const countMinus = (par) => {
        for (let i of datas) {

            if (count < 12 && par.title === i.title)
                setCount(count - 1)
        }
    }

    return (
        <ScrollView>
            {
                datas.map((i, index) => {
                    return (
                        <View style={styles.container} key={index}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Image style={styles.img} source={{ uri: i.url }} />
                                <View>
                                    <Text style={styles.text}>
                                        {
                                            i.title
                                        }
                                    </Text>
                                    <Text style={[styles.text, { color: 'red' }]}>
                                        {i.prince * count} ₼

                                    </Text>
                                </View>
                            </View>
                            <View style={styles.count}>
                                <Pressable onPress={() => countPlus()}>
                                    <FontAwesome name='plus' style={{ fontSize: 20 }} />
                                </Pressable>

                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>
                                    {
                                        count
                                    }
                                </Text>

                                <Pressable onPress={() => countMinus(i.title, i.prince)}>
                                    <FontAwesome name='minus' style={{ fontSize: 20 }} />
                                </Pressable>
                            </View>

                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export default Wishlist

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
        borderBottomWidth: 0.2,
        backgroundColor: '#f3edf1',
        borderColor: 'blue'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
        fontStyle: 'italic',
        width: 100
    },
    img: {
        width: 100,
        height: 100,
        objectFit: 'cover'
    },
    count: {
        borderWidth: 0.3,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: 'grey',

    }
})