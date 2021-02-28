import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationOrLogin from '../screens/RegistrationOrLogin';
import SignUpAsStudent from '../screens/SignUpAsStudent';
import SignUpAsCompany from '../screens/SignUpAsCompany';
import StudentHome from '../screens/StudentHome';
import CompanyHome from '../screens/CompanyHome';
import AdminHome from '../screens/AdminHome';
import SignInAsAdmin from '../screens/SignInAsAdmin';

const Stack = createStackNavigator();


const ScreenNavigation = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="RegisterOrLogin">
                <Stack.Screen name="RegistrationOrLogin" component={RegistrationOrLogin} />
                <Stack.Screen name="SignUpAsStudent" component={SignUpAsStudent} />
                <Stack.Screen name="SignUpAsCompany" component={SignUpAsCompany} />
                <Stack.Screen name="StudentHome" component={StudentHome} />
                <Stack.Screen name="CompanyHome" component={CompanyHome} />
                <Stack.Screen name="AdminHome" component={AdminHome} />
                <Stack.Screen name="SignInAsAdmin" component={SignInAsAdmin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
  
  
  export default ScreenNavigation; 