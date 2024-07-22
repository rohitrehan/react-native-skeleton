import React, { memo, useState } from "react";
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Snackbar,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  ToastAndroid,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { useAppDispatch } from "../store/hook";
import { ImageOverlay } from "../components/image-overlay";
import { useAuth } from "../hooks/useAuth";
import { IAuthState } from "../interfaces/IAuthentication";
import { userLoggedIn } from "../store/authSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PublicStackParamList } from "../navigation/PublicStack";
import useLanguage from "../hooks/useLanguage";
import images from "../core/images";

type SignInFormData = {
  emailAddress: string;
  password: string;
};

const SignInScreen = ({
  navigation,
}: NativeStackScreenProps<PublicStackParamList, "SignIn">) => {
  const theme = useTheme();
  const language = useLanguage();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { signinUser, getProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
    handleSignIn(data.emailAddress, data.password);
  };

  const handleSignIn = async (email: string, password: string) => {
    let parsedResponse = null;
    let firebaseToken = null;
    setLoading(true);
    await signinUser(email, password).then((fbResponse) => {
      parsedResponse = JSON.parse(fbResponse);
      // error response
      if (parsedResponse.error.code) {
        ToastAndroid.show(parsedResponse.error.message, ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      // response
      if (parsedResponse.result) {
        firebaseToken = parsedResponse.result.user.stsTokenManager.accessToken;
        const firebaseUserName = parsedResponse.result.user.displayName;
        if (firebaseToken != null) {
          // Get firebase profile
          const profile = getProfile();
          const user: IAuthState = {
            firebaseUID: profile?.firebaseUID,
            userName: profile?.displayName ?? firebaseUserName,
            userToken: firebaseToken,
            userEmail: profile?.email ?? email,
            sessionTimedOut: false,
            isLoading: false,
            isLoggedIn: true,
          };
          // Redux action
          dispatch(userLoggedIn(user));
          setLoading(false);
          // React navigation will handle Redirect to home, if login worked
        }
      }
    });
  };

  return (
    <ImageOverlay
      style={styles.container}
      source={theme.dark ? images.WelcomeDark : images.Welcome}
    >
      <StatusBar barStyle="light-content" />
      <Animatable.View style={[styles.contentContainer]}>
        <Surface style={styles.surface} elevation={1}>
          <Text variant="headlineSmall" style={{ textAlign: "center" }}>
            {language.TITLE_Login}
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={language.LABEL_EmailAddress}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                mode="outlined"
                placeholder="Email Address"
                textContentType="emailAddress"
                style={styles.textInput}
              />
            )}
            name="emailAddress"
          />
          {errors.emailAddress && (
            <Text style={{ color: theme.colors.error }}>
              {language.ERROR_EmailIsRequired}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={language.LABEL_Password}
                mode="outlined"
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                textContentType="password"
                style={styles.textInput}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{ color: theme.colors.error }}>
              {language.ERROR_PasswordIsRequired}
            </Text>
          )}

          <Button
            mode="contained"
            compact
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
            loading={loading}
          >
            Submit
          </Button>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <Text>Or Connect with</Text>
            {/* <GoogleSignInButton style={{ marginTop: 20 }} /> */}
          </View>
          <Button
            mode="text"
            compact
            onPress={() => navigation.navigate("SignUp")}
            style={styles.button}
            loading={loading}
          >
            {language.LABEL_NotAUser}
          </Button>
          <ActivityIndicator
            animating={loading}
            color={theme.colors.onPrimaryContainer}
            size="large"
          />
        </Surface>
      </Animatable.View>
      {/* <Snackbar
        visible={showSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Close",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {snackMessage}
      </Snackbar> */}
    </ImageOverlay>
  );
};

// const { height } = Dimensions.get("screen");
// const container_height = height * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
    // height: container_height,
  },
  surface: {
    paddingTop: 30,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    // height: container_height,
  },
  button: {
    marginVertical: 20,
  },
  textInput: {
    marginVertical: 10,
  },
});

export default memo(SignInScreen);
