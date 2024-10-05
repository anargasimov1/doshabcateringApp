import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import SplashScreen from "./src/screens/SplashScreen";
import Register from "./src/screens/Register";
import UserPage from "./src/screens/UserPage";
import Products from "./src/screens/Products";
import Panel from "./src/companents/Panel";
import Menu from "./src/screens/Menu";
import Wishlist from "./src/screens/Wishlist";

const Stack = createNativeStackNavigator();

export default function App() {


  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="products" component={Products} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="userPage" component={UserPage} />
        <Stack.Screen name="panel" component={Panel} />
        <Stack.Screen name="menu" component={Menu}/> 
        <Stack.Screen name="wishlist" component={Wishlist}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}
