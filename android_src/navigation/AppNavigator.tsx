import React from 'react';
import { View, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DealsScreen from '../screens/DealsScreen';
import DealDetailScreen from '../screens/DealDetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreateDealScreen from '../screens/CreateDealScreen';

// Define the param list for the navigator
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  DealDetail: { dealId: string };
  Payment: { dealId: string };
  CreateDeal: undefined;
  Deals: undefined;
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabNavigator = () => {
  const theme = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Deals') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Create') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 4,
          height: 60,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 4, // Android-specific elevation
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Jam3a' }} />
      <Tab.Screen name="Deals" component={DealsScreen} options={{ title: 'All Deals' }} />
      <Tab.Screen name="Create" component={CreateDealScreen} options={{ title: 'Create Deal' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Account' }} />
    </Tab.Navigator>
  );
};

// Root navigator
const AppNavigator = () => {
  // Handle Android back button
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Add custom back button handling here if needed
        return false; // Return true to prevent default behavior
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* Set Android status bar color */}
      <StatusBar backgroundColor="#3B8E3F" barStyle="light-content" />
      
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#fff' },
            // Android-specific animations
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen 
            name="DealDetail" 
            component={DealDetailScreen}
            options={{ headerShown: true, title: 'Deal Details' }}
          />
          <Stack.Screen 
            name="Payment" 
            component={PaymentScreen}
            options={{ headerShown: true, title: 'Payment' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
