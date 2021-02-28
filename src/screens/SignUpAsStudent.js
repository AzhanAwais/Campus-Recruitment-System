import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';

const SignUpAsStudent = ({ navigation, route })=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [college, setCollege] = useState('');
    const [field, setField] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [password, setPassword] = useState('');
    const {data} =  route.params;

    const isUserRegistered = (name)=>{
        var bool = false;
        for(let i=0;i<data.length;i++){
            if(data[i].name==name && data[i].role=='student'){
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
            const key = firebase.database().ref('users').push().key;
            firebase.database().ref('users/' + key).set({
                key:key,
                name,
                email,
                phone,
                college,
                field,
                cgpa,
                password,
                role:'student'
            })
            navigation.navigate('RegistrationOrLogin',{data})
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View  style={styles.container}>
            <Text style={styles.text}>STUDENT SIGN UP</Text>
            <TextInput value={name} onChangeText={(e)=>setName(e)} style={styles.inputs}  placeholderTextColor="#FFFF" placeholder="Enter your name"></TextInput>
            <TextInput value={email} onChangeText={(e)=>setEmail(e.toLocaleLowerCase())} style={styles.inputs}  placeholderTextColor="#FFFF" placeholder="Enter your email"></TextInput>
            <TextInput value={phone} onChangeText={(e)=>setPhone(e)} style={styles.inputs}  placeholderTextColor="#FFFF" placeholder="Enter your phone"></TextInput>
            <TextInput value={college} onChangeText={(e)=>setCollege(e)} style={styles.inputs}  placeholderTextColor="#FFFF" placeholder="Enter your college name"></TextInput>
            <TextInput value={field} onChangeText={(e)=>setField(e)} style={styles.inputs}  placeholderTextColor="#FFFF" placeholder="Enter your field"></TextInput>
            <TextInput value={cgpa} onChangeText={(e)=>setCgpa(e)} style={styles.inputs}  placeholderTextColor="#FFFF" placeholder="Enter your CGPA"></TextInput>
            <TextInput value={password} onChangeText={(e)=>setPassword(e)} style={styles.inputs} secureTextEntry={true}  placeholderTextColor="#FFFF" placeholder="Enter your password"></TextInput>
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
        backgroundColor:'#0095A9',
        // paddingVertical:10
    },
    
    inputs:{
        width:'90%',
        borderWidth:1,
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0,
        borderBottomColor:"white",
        padding:8,
        marginBottom:10,
        color:'white'
    },
    text:{
        marginVertical:20,
        fontSize:25,
        color:'white',
        fontWeight:"bold"
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',
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

export default SignUpAsStudent; 