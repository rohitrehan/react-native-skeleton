import * as React from "react";
import { NavigationContainer, Theme } from "@react-navigation/native";
import PublicStack from "./PublicStack";
import { useAppSelector } from "../store/hook";
import { selectAuthState } from "../store/authSlice";
import DrawerNavigator from "./DrawerNavigator";

const AppNavigator = ({ theme }: { theme: Theme }) => {
  const authState = useAppSelector(selectAuthState);
  return (
    <NavigationContainer>
      {authState?.isLoggedIn ? <DrawerNavigator /> : <PublicStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
