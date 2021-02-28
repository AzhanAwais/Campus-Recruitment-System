import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity,TextInput, ScrollView} from 'react-native';
import firebase from 'firebase';
import logo from '../../assets/logo.png';


const SignInAsAdmin = ({ navigation, route })=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState();

    const [data, setData] = useState();

    useEffect(() => {
        const arr = []
        firebase.database().ref('users').on("value",snapshot=>{
            snapshot.forEach((snap)=>{
            arr.push(snap.val());
            })
            setData(arr);
        })  
    },[])

    const AdminLogin = ()=>{
        if(name=="admin" && password=='admin'){
            navigation.navigate('AdminHome',{data})
        }else{
            console.log('invalid name or password');
            navigation.navigate('SignInAsAdmin')
        }
    }
    
    return(
        <View  style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <TextInput value={name} onChangeText={(e)=>setName(e)} style={styles.inputs} placeholderTextColor="#FFFF" placeholder="Enter Admin name"></TextInput>
            <TextInput value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={true} style={styles.inputs} placeholderTextColor="#FFFF" placeholder="Enter your password"></TextInput>
            <TouchableOpacity activeOpacity={0.7} style={styles.btnLogin} onPress={()=>AdminLogin()}>
                <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        display:'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputs:{
        width:'90%',
        paddingVertical:10,
        paddingHorizontal:20,
        marginBottom:10,
        backgroundColor: '#0C4968',
        borderRadius:25,
        color:'white'
    },
    logo:{
        width:'100%',
        height:100,
        resizeMode:'contain',
        marginTop:8
    },
    btnLogin:{
        backgroundColor:"#113358",
        paddingVertical:18,
        width:"50%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        borderRadius:25
    },
    btnText:{
        color:'white'
    },
});

export default SignInAsAdmin; 