import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import Panel from '../companents/Panel'


const Menu = () => {
  return (
    <>


      <ScrollView style={{ flex: 1, marginBottom: 50 }}>
        <View style={styles.container}>
          <Image style={styles.img} source={require('../../assets/menu.png')} />
        </View>
        <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Əlaqə: (099) 908-88-98</Text>
        <Text>z;llkfv;ofjv</Text>
        <Text>dfvjdoij[oi</Text>
        <Text>dgdpokgopktk</Text>
      </ScrollView>


      <Panel />
    </>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

  }
  ,
  img: {
    width: 395,
    height: 1000,
    objectFit: 'fill'
  }
})