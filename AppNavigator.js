import { createStackNavigator } from 'react-navigation';
import RegisterScreen from './Screens/RegisterScreen';

const AppNavigator = createStackNavigator({
  Register: { screen: RegisterScreen },
});