import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import firebase from 'firebase';

const StudentHome = ({ navigation, route })=>{
    
    const data = route.params.data;
    const name = route.params.name;
    const role = route.params.role;
    const applyData = route.params.applyData;
    const arr=[];
    var currUser;

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

    for(let i=0;i<data.length;i++){
        if(data[i].name==name && data[i].role==role){
            currUser={
                name: data[i].name,
                role:data[i].role,
                email:data[i].email,
                phone:data[i].phone,
                field:data[i].field,
                college:data[i].college,
                cgpa:data[i].cgpa,
            }
        }
    }

    const saveData = (currUser,companyName,appliedField)=>{
        const {name,role,email,phone,field,college,cgpa} = currUser
        firebase.database().ref('applieduser').push({
            name,
            role,
            email,
            phone,
            field,
            college,
            cgpa,
            companyName,
            appliedField
        })
        navigation.navigate('StudentHome')
    }

    fillArrayDataWithCompany();

    const isUserAlreadyApplied = (name,company,hiring)=>{
        for(let i=0;i<applyData.length;i++){
            if(applyData[i].companyName==company && applyData[i].name==name && applyData[i].appliedField==hiring){
                return true
            }else{
                return false
            }
        }
    }

    return (
        arr.map((v,i)=>{
            const ans = isUserAlreadyApplied(name,v.name)
            console.log(ans)
                if(ans==false){
                    return(
                        <View key={i} style={styles.card}>
                            <Text style={styles.textName}><Text style={styles.text}>Company: </Text>{v.name}</Text>
                            <Text style={styles.textName}><Text style={styles.text}>Email: </Text>{v.email}</Text>
                            <Text style={styles.textName}><Text style={styles.text}>Phone: </Text>{v.phone}</Text>
                            <Text style={styles.textName}><Text style={styles.text}>Location: </Text>{v.location}</Text>
                            <Text style={styles.textName}><Text style={styles.text}>Hiring: </Text>{v.hiring}</Text>
                            <TouchableOpacity activeOpacity={0.7} style={styles.btnIcon} onPress={() => saveData(currUser,v.name,v.hiring)}>
                                <Text style={styles.btnText}>Apply</Text>
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
                            <TouchableOpacity disabled activeOpacity={0.7} style={styles.btnIcon} onPress={() => saveData(currUser,v.name)}>
                                <Text style={styles.btnTextCenter}>You have already applied</Text>
                            </TouchableOpacity>                       
                        </View>
                    )  
                } 
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
    btnIcon:{
        marginTop:10,
        color:'white',
        backgroundColor:'#113358',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        width: '50%',   
    }
});

export default StudentHome; 