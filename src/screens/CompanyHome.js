import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';

const CompanyHome = ({ navigation, route })=>{
    const [refresh, setRefresh] = useState('');
    const data = route.params.data;
    const Cname = route.params.name;
    const role = route.params.role;
    const key = route.params.key;
    const applyData = route.params.applyData;
    const arr=[];
    var currCompany;

    const fillArrayDataWithCompany = ()=>{
        for(let i=0;i<data.length;i++){
            if(data[i].role=='company'){
                arr.push(data[i])
            }
            else{
                continue
            }
        }
    }

    const declineProfile = (Username,applyField,key)=>{
        for(let i=0;i<applyData.length;i++){
            if(applyData[i].name==Username && applyData[i].appliedField==applyField && applyData[i].companyName==Cname){
                let delData = firebase.database().ref('applieduser/'+ key);
                delData.remove();
                setRefresh('');
            }
        }
    }

    const approveProfile = (Username,applyField,key)=>{
        for(let i=0;i<applyData.length;i++){
            if(applyData[i].name==Username && applyData[i].appliedField==applyField && applyData[i].companyName==Cname){
                let delData = firebase.database().ref('applieduser/'+ key);
                delData.remove();
                setRefresh('');
            }
        }
    }
    
    // const findCurrCompany = (Cname)=>{
    //     for(let i=0;i<data.length;i++){
    //         if(data[i].name==Cname && data[i].role==role){
    //             currCompany={
    //                 name:data[i].name,
    //                 email:data[i].email,
    //                 phone:data[i].phone,
    //                 // hiring:data[i].hiring,
    //                 // key:data[i].key,
    //                 location:data[i].location,
    //                 role:'company'
    //             }
    //         }
    //     }
    // }

    fillArrayDataWithCompany();
    
    return (
        applyData.map((v,i)=>{
            return(
                <View key={i} style={styles.card}>
                    <Text style={styles.textName}><Text style={styles.text}>Name: </Text>{v.name}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Email: </Text>{v.email}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Phone: </Text>{v.phone}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Field: </Text>{v.field}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>College: </Text>{v.college}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>CGPA: </Text>{v.cgpa}</Text>
                    <Text style={styles.textName}><Text style={styles.text}>Applied For: </Text>{v.appliedField}</Text>
                    <View style={{display:'flex', flexDirection:'row'}}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btnApproved} onPress={() => approveProfile(v.name,v.appliedField,v.key)}>
                        <Text style={styles.btnText}>Approved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btnDecline} onPress={() => declineProfile(v.name,v.appliedField,v.key)}>
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