import React from 'react';
import {StyleSheet,Text} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Icon } from 'react-native-elements';

export const CardItem = ({title,color,colorI,icono,subtitle,tipo})=>{
    return(
        <Card wrapperStyle={styles.card} containerStyle={{backgroundColor:color,borderRadius:5,borderStyle:'solid'}}>
        <Card.Title style={styles.text,{color:colorI}}>{title}</Card.Title>
        <Card.Divider />
        <Text style={styles.subtitle,{color:colorI}}>{subtitle}</Text>
        <Icon
            size={30}
            
            name={icono}
            type={tipo}
            color={colorI}
        />
    </Card>
    )
}

export const styles = StyleSheet.create({
    container: { flex: 0 },
    row: {
        flexDirection: 'row',

    },
    card: {
        flexDirection: 'column',
        height: hp('20%'), // 70% of height device screen
        width: wp('33%'),
        
    },
    text: {

        fontSize: hp('3%'),
    },
    subtitle:{
        fontSize: hp('5%')

    }
});
