import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';

const SignUpAsCompany = ({ navigation, route })=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [hiring, setHiring] = useState('');
    const [password, setPassword] = useState('');
    const {data} =  route.params;

    const isUserRegistered = (name)=>{
        bool = false;
        for(let i=0;i<data.length;i++){
            if(data[i].name==name && data[i].role=='company'){
                bool = true;
                return bool;
            }
            else{
                bool = false;
            }
        }
        return bool;
    }

    const insertUser = ()=>{
        let found = isUserRegistered(name);
        if(found==true){
            console.log("User already registered")
        }
        else{
            firebase.database().ref('users').push({
                name,
                email,
                phone,
                location,
                hiring,
                password,
                role:'company'
            })
            navigation.navigate('RegistrationOrLogin',{data})
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View  style={styles.container}>
            <Text style={styles.text}>COMPANY SIGN UP</Text>
            <TextInput value={name} onChangeText={(e)=>setName(e)} style={styles.inputs} placeholder="Enter company name"></TextInput>
            <TextInput value={email} onChangeText={(e)=>setEmail(e.toLocaleLowerCase())} style={styles.inputs} placeholder="Enter company email"></TextInput>
            <TextInput value={phone} onChangeText={(e)=>setPhone(e)} style={styles.inputs} placeholder="Enter company phone"></TextInput>
            <TextInput value={location} onChangeText={(e)=>setLocation(e)} style={styles.inputs} placeholder="Enter company location"></TextInput>
            <TextInput value={hiring} onChangeText={(e)=>setHiring(e)} style={styles.inputs} placeholder="Hiring"></TextInput>
            <TextInput value={password} onChangeText={(e)=>setPassword(e)} style={styles.inputs} secureTextEntry={true} placeholder="Enter your password"></TextInput>
            <TouchableOpacity activeOpacity={0.7} style={styles.btnLogin} onPress={()=>insertUser()}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0095A9'
    },
    inputs:{
        width:'90%',
        borderColor:"gray",
        borderWidth:1,
        padding:8,
        marginBottom:10,
        color:'white'
    },
    text:{
        marginVertical:20,
        fontSize:25,
        fontWeight:"bold"
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
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

export default SignUpAsCompany; 