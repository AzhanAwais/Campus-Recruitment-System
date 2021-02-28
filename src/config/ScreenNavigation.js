import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationOrLogin from '../screens/RegistrationOrLogin';
import SignUpAsStudent from '../screens/SignUpAsStudent';
import SignUpAsCompany from '../screens/SignUpAsCompany';
import StudentHome from '../screens/StudentHome';

const Stack = createStackNavigator();


const ScreenNavigation = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="RegisterOrLogin">
                <Stack.Screen name="RegistrationOrLogin" component={RegistrationOrLogin} />
                <Stack.Screen name="SignUpAsStudent" component={SignUpAsStudent} />
                <Stack.Screen name="SignUpAsCompany" component={SignUpAsCompany} />
                <Stack.Screen name="StudentHome" component={StudentHome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
  
  
  export default ScreenNavigation; 