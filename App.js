import React, { useState } from "react";
import { Provider } from "react-redux";

var codePush = require("react-native-code-push")
import store from "./src/store";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { connect } from 'react-redux'
import { Platform, StyleSheet, View, Text } from 'react-native';
import RNRestart from 'react-native-restart';
// Auth Navigator
import HomeScreen from "./src/native/screens/authScreens/HomeScreen";
import SignUpScreen from "./src/native/screens/authScreens/SignUpScreen";
import LoginScreen from "./src/native/screens/authScreens/LoginScreen";

// Common Screens
import OnBoardingScreen from './src/native/screens/onBoardingScreens/OnBoardingScreen';
import SingleRecipeScreen from './src/native/screens/recipeScreens/SingleRecipeScreen';
import SingleWorkoutScreen from './src/native/screens/workoutScreens/SingleWorkoutScreen';

// 
import InitialScreen from './src/native/screens/commonScreens/InitialScreen';


// Tab Navigator Screens
import RecipesScreen from "./src/native/screens/tabScreens/RecipesScreen";

import BlogsScreen from "./src/native/screens/tabScreens/BlogScreen";
import Calendar from "./src/native/screens/tabScreens/Calendar";
import OptionsScreen from "./src/native/screens/tabScreens/OptionsScreen";
import ShoppingListScreen from "./src/native/screens/tabScreens/GroceryListScreen";
import VideosScreen from "./src/native/screens/tabScreens/VideosScreen";
import WorkoutsScreen from "./src/native/screens/tabScreens/WorkoutsScreen";
import { RecipesIcon, WorkoutsIcon, MealPlanIcon, BlogsIcon, VideosIcon, OptionsIcon, ShoppingIcon } from "./src/native/assets/svg";

import { Sentry } from 'react-native-sentry';
import { PRIMARY_RED, SANS_BASE } from "./src/native/constants/styledTheme";
import FeaturedScreen from "./src/native/screens/tabScreens/FeaturedScreen";
import { bindActionCreators } from 'redux';
import { clearObjectStack } from "./src/actions";
import ComposedTabIcon from "./src/native/components/common/ComposedTabIcon";
import TabBarComponent from "./src/native/components/common/TabBarComponent";
import FeaturedListScreen from "./src/native/screens/tabScreens/FeaturedListScreen";
import SingleBlogScreen from "./src/native/screens/blogScreens/SingleBlogScreen";

import BlogFavoritesIndexScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Blog/BlogFavoritesIndexScreen";
import BlogFavoritesScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Blog/BlogFavoritesScreen";
import VideoFavoritesIndexScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Video/VideoFavoritesIndexScreen";
import VideoFavoritesScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Video/VideoFavoritesScreen";
import WorkoutFavoritesIndexScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Workout/WorkoutFavoritesIndexScreen";
import WorkoutFavoritesScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Workout/WorkoutFavoritesScreen";
import RecipeFavoritesScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Recipe/RecipeFavoritesScreen";
import RecipeFavoritesIndexScreen from "./src/native/screens/tabScreens/FeatureFavoritesScreen/Recipe/RecipeFavoritesIndexScreen";
import MealPlanSettingsScreen from "./src/native/screens/tabScreens/MealPlanSettingsScreen";
import PreMadeMealPlanIndexScreen from "./src/native/screens/tabScreens/PreMadeMealPlanIndexScreen";
import PreMadeMealPlanInteriorScreen from "./src/native/screens/tabScreens/PreMadeMealPlanInteriorScreen";
import FAQScreen from "./src/native/screens/faqScreens/FAQScreen";
import AddItemToMealPlanScreen from "./src/native/screens/mealPlanScreens/AddItemToMealPlanScreen";
import SelectPlanScreen from "./src/native/screens/accountScreens/SelectPlanScreen";
import AccountScreen from "./src/native/screens/accountScreens/AccountScreen";
import TestimonialsScreen from "./src/native/screens/testimonials/TestimonialsScreen";
import AboutScreen from "./src/native/screens/about/AboutScreen";
import DishListScreen from "./src/native/screens/accountScreens/DishListScreen";
import UpgradeScreen from "./src/native/screens/tabScreens/UpgradeScreen";
import DailyDishScreen from "./src/native/screens/accountScreens/DailyDishScreen";
import DailyDishInteriorScreen from "./src/native/screens/accountScreens/DailyDishInteriorScreen";
import pushToSentry from "./src/helpers/pushToSentry";
import { height } from "./src/native/constants/singleFeatureConstants";
import { Button } from "react-native-elements";
import ExportScreen from "./src/native/screens/tabScreens/ExportScreen";
import CheckoutScreen from "./src/native/screens/tabScreens/CheckoutScreen";
import NetInfo from "@react-native-community/netinfo";

console.disableYellowBox = true;

Sentry.config('https://b3041a691f7842b4a7be4de2524cd681@sentry.io/1460849').install();


const AuthNavigator = createStackNavigator(
  {
    SignUpScreen: SignUpScreen,
    HomeScreen: HomeScreen,
    LoginScreen: LoginScreen,
    OnBoardingScreen: OnBoardingScreen,
    InitialScreen: InitialScreen,
    SelectPlan: SelectPlanScreen,
  },
  {
    initialRouteName: "InitialScreen",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    },
  }
);


const BlogsStack = createStackNavigator(
  {
    BlogsScreen: BlogsScreen,
    BlogScreen: SingleBlogScreen,
    BlogFavoritesIndexScreen: BlogFavoritesIndexScreen,
    BlogFavoritesScreen: BlogFavoritesScreen
  },
  {
    initialRouteName: 'BlogsScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
    defaultNavigationOptions: {
    },
  }
)
BlogsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  return {
    tabBarVisible,
    swipeEnabled: false,
  }
}
const WorkoutsStack = createStackNavigator(
  {
    WorkoutsScreen: WorkoutsScreen,
    WorkoutScreen: SingleWorkoutScreen,
    WorkoutFavoritesIndexScreen: WorkoutFavoritesIndexScreen,
    WorkoutFavoritesScreen: WorkoutFavoritesScreen,
    FeaturedListScreen: FeaturedListScreen
  },
  {
    initialRouteName: 'WorkoutsScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    defaultNavigationOptions: {
    },
  }
)
WorkoutsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  return {
    tabBarVisible,
    swipeEnabled: false,
  }
}

const RecipesStack = createStackNavigator(
  {
    RecipesScreen: RecipesScreen,
    RecipeScreen: SingleRecipeScreen,
    FeaturedScreen: FeaturedScreen,
    RecipeFavoritesScreen: RecipeFavoritesScreen,
    RecipeFavoritesIndexScreen: RecipeFavoritesIndexScreen
  },
  {
    initialRouteName: 'RecipesScreen',
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
    defaultNavigationOptions: {
    },
  }
);

RecipesStack.navigationOptions = ({ navigation }) => {

  let tabBarVisible = true;
  return {
    tabBarVisible,
    swipeEnabled: false,
  }
}

const VideosStack = createStackNavigator(
  {
    VideosScreen: VideosScreen,
    VideoFavoritesIndexScreen: VideoFavoritesIndexScreen,
    VideoFavoritesScreen: VideoFavoritesScreen
  },
  {
    initialRouteName: 'VideosScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
    defaultNavigationOptions: {
    },
  }
);

const MealPlanStack = createStackNavigator(
  {
    Calendar: Calendar,
    MealPlanSettings: MealPlanSettingsScreen,
    PreMadeMealPlanIndex: PreMadeMealPlanIndexScreen,
    PreMadeMealPlanInteriorScreen: PreMadeMealPlanInteriorScreen,
    AddItemToMealPlanScreen: AddItemToMealPlanScreen
  },
  {
    initialRouteName: 'Calendar',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
    defaultNavigationOptions: {
    },
  }
)
MealPlanStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  return {
    tabBarVisible,
    swipeEnabled: false,
  }
}

const OptionsStack = createStackNavigator(
  {
    Options: OptionsScreen,
    FAQScreen: FAQScreen,
    AccountScreen: AccountScreen,
    TestimonialsScreen: TestimonialsScreen,
    AboutScreen: AboutScreen,
    DishList: DishListScreen,
    DailyDish: DailyDishScreen,
    DailyDishInterior: DailyDishInteriorScreen,
    UpgradeScreen: UpgradeScreen
  },
  {
    initialRouteName: 'Options',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
    defaultNavigationOptions: {
    },
  }
)


const GroceryStack = createStackNavigator(
  {
    Groceries: ShoppingListScreen,
    Checkout: CheckoutScreen,
    ExportScreen: ExportScreen
  },
  {
    initialRouteName: 'Groceries',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    },
    defaultNavigationOptions: {
    },
  }
)

const AppTabNavigator = createBottomTabNavigator(
  {
    Recipes: RecipesStack,
    Workouts: WorkoutsStack,
    Blogs: BlogsStack,
    MealPlan: MealPlanStack,
    Groceries: GroceryStack,
    Videos: VideosStack,
    More: OptionsStack,
  },
  {
    tabBarComponent: props =>
      <TabBarComponent
        {...props}
      />,
  },
  {
    initialRouteName: 'Recipes'
  }
);


const AppNavigator = createSwitchNavigator(
  {
    AuthNavigator,
    AppTabNavigator,
  },
  {
    initialRouteName: "AuthNavigator"
  }
);

const AppContainer = createAppContainer(AppNavigator);

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
}

codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });

const CodePushedAppContainer = codePush(codePushOptions)(AppContainer);


class ErrorBoundary extends React.Component {
  constructor(props) {
    let unsubscribe;
    super(props);
    this.state = {
      hasError: false,
      hasInternet: true
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected && !state.isInternetReachable) {
        this.setState({
          ...state,
          hasInternet: state.isConnected && state.isInternetReachable
        })
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    pushToSentry(error)
  }
  render() {
    if (!this.state.hasInternet) {
      return (
        <View style={[
          {
            display: 'flex',
            height: height,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: "center",
            alignItems: 'center'
          }
        ]}>
          <Text style={{
            fontSize: 30
          }}>😔</Text>
          <Text style={{
            fontFamily: SANS_BASE.FONT_REGULAR,
            fontSize: 24,
            textAlign: 'center',
            width: 250
          }}>
            Uh oh. You’re offline. Please connect to the Internet.</Text>
          <Button
            buttonStyle={{
              padding: 13,
              borderRadius: 25,
              width: 170,
              marginTop: 20,
              backgroundColor: PRIMARY_RED
            }}
            title='Retry'
            onPress={() => RNRestart.Restart()} />
        </View>
      );
    }
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={[
          {
            display: 'flex',
            height: height,
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: "center",
            alignItems: 'center'
          }
        ]}>
          <Text style={{
            fontSize: 30
          }}>😔</Text>
          <Text style={{
            fontFamily: SANS_BASE.FONT_REGULAR,
            fontSize: 24,
            textAlign: 'center',
            width: 250
          }}>
            Something went wrong.</Text>
          <Button
            buttonStyle={{
              padding: 13,
              borderRadius: 25,
              width: 170,
              marginTop: 20,
              backgroundColor: PRIMARY_RED
            }}
            title='Restart'
            onPress={() => RNRestart.Restart()} />
        </View>
      );
    }

    return (
      this.props.children
    );
  }
}


export default class App extends React.Component {
  componentDidCatch(error, errorInfo) {
  }
  render() {
    return (
      <ErrorBoundary>
        <Provider style={{ flex: 1 }} store={store}>
          <AppContainer />
        </Provider>
      </ErrorBoundary>
    );
  }
}



const styles = StyleSheet.create({
  tabIconWrapper: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    minWidth: '20%'
  },
  tabIconText: {
    fontFamily: 'MierB-Regular',
    fontSize: 14
  }
})
