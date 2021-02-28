import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';

const AdminHome = ({ navigation, route })=>{
    const data = route.params.data;
    const deleteData = (key)=>{
        let delData = firebase.database().ref('users/'+ key);
        delData.remove();
    }

    return (
        <ScrollView>
            {
                data.map((v,i)=>{
                    if(v.role=='student'){
                        return(
                            <View key={i} style={styles.card}>
                                <Text style={styles.textName}><Text style={styles.text}>Name: </Text>{v.name}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Email: </Text>{v.email}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Phone: </Text>{v.phone}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Location: </Text>{v.cgpa}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>College: </Text>{v.college}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Field: </Text>{v.field}</Text>
                                <TouchableOpacity activeOpacity={0.7} style={styles.btnDecline} onPress={() => deleteData(v.key)}>
                                    <Text style={styles.btnText}>Delete</Text>
                                </TouchableOpacity>                       
                            </View>
                        )
                    }
                    else{
                        return(
                            <View key={i} style={styles.card}>
                                <Text style={styles.textName}><Text style={styles.text}>Company: </Text>{v.name}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Email: </Text>{v.email}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Phone: </Text>{v.phone}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Location: </Text>{v.location}</Text>
                                <Text style={styles.textName}><Text style={styles.text}>Hiring: </Text>{v.hiring}</Text>
                                <TouchableOpacity activeOpacity={0.7} style={styles.btnDecline} onPress={() => deleteData(v.key,v.name)}>
                                    <Text style={styles.btnText}>Delete</Text>
                                </TouchableOpacity>                       
                            </View>
                        )
                    }
                })
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        display:'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card:{
        marginTop:4,
        width:"100%",
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        marginBottom:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        borderWidth:0,
        elevation: 6,
        paddingHorizontal:25,
        paddingVertical:15
    },
    text:{
        fontWeight:'bold'
    },
    textName:{
        marginBottom:10,
        fontSize:16
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
        letterSpacing:0.5
    },
    btnDecline:{
        marginTop:10,
        color:'white',
        backgroundColor:'#D60620',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        width: '48%',   
        marginRight:4
    }
});

export default AdminHome; 