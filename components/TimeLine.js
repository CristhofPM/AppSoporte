import React from 'react';
import { ActivityIndicator, StyleSheet, TextInput, Button, Alert, View, Text } from 'react-native';

export const TimeLine = ()=>{

    return(
<View  style={styles.timeline}>
  <View style={styles.container}>
    <View style={styles.content}>
      <Text>2017</Text>
      <Text>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</Text>
    </View>
  </View>
  <View style={styles.container}>
    <View style={styles.content}>
      <Text>2017</Text>
      <Text>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</Text>
    </View>
  </View>
  <View style={styles.container}>
    <View style={styles.content}>
      <Text>2017</Text>
      <Text>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</Text>
    </View>
  </View>
  <View style={styles.container}>
    <View style={styles.content}>
      <Text>2017</Text>
      <Text>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</Text>
    </View>
  </View>
</View>
    )
}

const styles = StyleSheet.create({
    timeline:{
        position:'relative',
        maxWidth: 1200,
        margin:0,
        
    },
    container: {
        
        position: 'absolute',
        width: 25,
        height: 25,
        right: -17,
        backgroundColor: 'white',
        borderStyle:'solid',
        borderColor:'#FF9F55',
        top:15,
        borderRadius: 50,
        zIndex:1
      },
      content: {
        padding: 20,
        backgroundColor:'white',
        position:'relative',
        borderRadius:6
      }
    


});