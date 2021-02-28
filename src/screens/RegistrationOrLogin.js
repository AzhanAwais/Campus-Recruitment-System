import React,{useState, useEffect} from 'react';
import logo from '../../assets/logo.png';
import {View, Text, Image, StyleSheet, Button, TouchableOpacity,TextInput} from 'react-native';
import firebase from 'firebase';
import { color } from 'react-native-reanimated';

const RegistrationOrLogin = ({navigation})=>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
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

    const [applyData, setApplyData] = useState();
    useEffect(() => {
        let newArr = []
        firebase.database().ref('applieduser').on("value",snapshot=>{
            snapshot.forEach((snap)=>{
                newArr.push(snap.val());
            })
            setApplyData(newArr);
        })  
    },[])

    function isUserExist(name,password,role){
        let obj = {};
        for(let i=0;i<data.length;i++){
            if(data[i].name==name && data[i].password==password && data[i].role==role){
                var {group, name} = data[i];
                obj = {
                    name,
                    role,
                    bool : true 
                }
                return obj;
            }else{
                obj = {
                    name,
                    role,
                    bool : false 
                }
            }
        }
        return obj;
    }

    function userLogin(){
       let obj = isUserExist(name,password,role) ;
       if(obj.bool==false){
            console.log("Invalid username or password")
       }
       else{
           if(role == 'student'){
            let name = obj.name;
            let role = obj.role;
            navigation.navigate('StudentHome',{name,role,data,applyData})
           }
           else{
               console.log("copany")
           }
       }
    }

  return (
      <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <TextInput value={name} onChangeText={(e)=>setName(e)} style={styles.inputs} placeholderTextColor="#FFFF" placeholder="Enter your username"></TextInput>
            <TextInput value={role} onChangeText={(e)=>setRole(e.toLocaleLowerCase())} style={styles.inputs} placeholderTextColor="#FFFF"  placeholder="Enter your Role (student/company)"></TextInput>
            <TextInput value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={true} style={styles.inputs} placeholderTextColor="#FFFF" placeholder="Enter your password"></TextInput>

            <TouchableOpacity activeOpacity={0.7} style={styles.btnLogin} onPress={()=>userLogin()}>
                <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.or}>OR</Text>

            <TouchableOpacity activeOpacity={0.7} style={styles.btnRegister} onPress={() => navigation.navigate('SignUpAsStudent',{data})}>
                <Text style={styles.text}>Sign Up as a Student</Text>
            </TouchableOpacity> 

            <TouchableOpacity activeOpacity={0.7} style={styles.btnRegister} onPress={() => navigation.navigate('SignUpAsCompany',{data})}>
                <Text style={styles.text}>Sign Up as a Company</Text>
            </TouchableOpacity>  

            <TouchableOpacity activeOpacity={0.7} style={styles.btnRegister} onPress={() => navigation.navigate('SignUpAsAdin',{data})}>
                <Text style={styles.text}>Sign Up as a Admin</Text>
            </TouchableOpacity>  
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor:'#0095A9'
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
    text:{
        color:"white",
        fontWeight:"bold"
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
    btnRegister:{
        width:'50%',
        textAlign:'center',
        backgroundColor:'#0095A9',
        color:'white',
        marginVertical:5,
        paddingVertical:15,
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    or:{
        fontSize:14,
        fontWeight:'bold',
        marginBottom:5
    }

});

export default RegistrationOrLogin; 