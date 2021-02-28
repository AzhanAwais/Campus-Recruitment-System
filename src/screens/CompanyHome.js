import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';

const CompanyHome = ({ navigation, route })=>{
    const [refresh, setRefresh] = useState('');
    const data = route.params.data;
    const Cname = route.params.name;
    const role = route.params.role;
    const key = route.params.key;
    const arr=[];
    var User;


    const fillArrayDataWithCompany = ()=>{
        for(let i=0;i<data.length;i++){
            if(data[i].role=='company' && data[i].userKey){
                arr.push(data[i])
            }
            else{
                continue
            }
        }
    }

    const declineProfile = (userkey,key,email,phone,hiring,name,location,password,ph,role)=>{
        for(let i=0;i<data.length;i++){
            if(data[i].role=='company'){
                if(data[i].userKey){
                    if(data[i].userKey==userkey){
                        firebase.database().ref('users/'+ key).set({
                            key,
                            email,
                            phone,
                            hiring,
                            name,
                            location,
                            password,
                            phone:ph,
                            role
                        })
                    }
                }
            }
        }
    }

    fillArrayDataWithCompany();
    
    return (
        arr.map((v,i)=>{
            for(let i=0;i<data.length;i++){
                if(data[i].role=='student' && data[i].key==v.userKey){
                    User={
                        field:data[i].field,
                        college:data[i].college,
                        cgpa:data[i].cgpa,
                        name:data[i].name
                    }
                }
            }

            return(
                <View key={i} style={styles.card}>
                    <Text style={styles.textName}><Text style={styles.text}>Company: </Text>{v.name}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Company Email: </Text>{v.email}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Company Phone: </Text>{v.phone}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Applier Name: </Text>{User.name}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Applier Field: </Text>{User.field}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Applier College: </Text>{User.college}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Applier CGPA: </Text>{User.cgpa}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Applied For: </Text>{v.hiring}</Text>
                    <View style={{display:'flex', flexDirection:'row'}}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btnDecline} onPress={() => declineProfile(v.userKey,v.key,v.email,v.phone,v.hiring,v.name,v.location,v.password,v.phone,v.role)}>
                        <Text style={styles.btnText}>Decline</Text>
                    </TouchableOpacity> 
                    </View>                      
                </View>
            )
        })
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
    btnTextCenter:{
        color:'white',
        fontWeight:'bold',
        letterSpacing:0.5,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    },
    btnApproved:{
        marginTop:10,
        color:'white',
        backgroundColor:'#113358',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        width: '48%',   
        marginRight:4
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

export default CompanyHome; 