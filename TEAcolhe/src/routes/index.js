import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InitialScreen from '../pages/InitialScreen';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import { StackScreen } from 'react-native-screens';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName='InitialScreen'>
            <Stack.Screen
                name='InitialScreen'
                component={InitialScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    // headerBlurEffect: 'regular',
                    headerTransparent: true,
            }}
            />
            <Stack.Screen
                name='RegisterScreen'
                component={RegisterScreen}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    // headerBlurEffect: 'regular',
                    headerTransparent: true,
            }}
            />
        </Stack.Navigator>
    )
}