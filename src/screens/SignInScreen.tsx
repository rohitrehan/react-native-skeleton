import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import {
  StyleSheet,
  StatusBar,
  View,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '../store/hook';
import { ImageOverlay } from '../components/image-overlay';
import { useAuth } from '../hooks/useAuth';
import { IAuthState } from '../interfaces/IAuthentication';
import { userLoggedIn } from '../store/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../navigation/PublicStack';
import useLanguage from '../hooks/useLanguage';
import images from '../core/images';
import PhoneInput, {
  IPhoneInput,
} from '@rohitrehan/react-native-phone-number-input';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type EmailSignInFormData = {
  emailAddress: string;
  password: string;
};
type PhoneSignInFormData = {
  phoneNumber: string;
};

const SignInScreen = ({
  navigation,
}: NativeStackScreenProps<PublicStackParamList, 'SignIn'>) => {
  const theme = useTheme();
  const language = useLanguage();
  const [loading, setLoading] = useState(false);
  const [useEmail, setUseEmail] = useState(true);
  const dispatch = useAppDispatch();
  const { signinEmailUser, getProfile, signinPhoneUser } = useAuth();
  const phoneInput = useRef<IPhoneInput>(null);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [otp, setOtp] = useState('');

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailSignInFormData>();
  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
  } = useForm<PhoneSignInFormData>();

  const onEmailSubmit = async (data: EmailSignInFormData) => {
    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
    const email = data.emailAddress;
    const password = data.password;
    // let parsedResponse = null;
    // let firebaseToken = null;
    setLoading(true);
    await signinEmailUser(email, password).then(async (fbResponse) => {
      // error response
      if (fbResponse.error.code) {
        console.error(fbResponse.error.message);
        ToastAndroid.show(fbResponse.error.message, ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      // response
      if (fbResponse.result) {
        console.log(fbResponse.result);
        // firebaseToken = fbResponse.result.user.stsTokenManager.accessToken;
        const firebaseUserName = fbResponse.result.user.displayName;
        // if (firebaseToken != null) {
        // Get firebase profile
        const profile = await getProfile();
        const user: IAuthState = {
          firebaseUID: profile?.firebaseUID,
          userName: profile?.displayName ?? firebaseUserName,
          // userToken: firebaseToken,
          userEmail: profile?.email ?? email,
          sessionTimedOut: false,
          isLoading: false,
          isLoggedIn: true,
        };
        // Redux action
        dispatch(userLoggedIn(user));
        setLoading(false);
        // React navigation will handle Redirect to home, if login worked
        // }
      }
    });
  };

  const onPhoneSubmit = async (data: PhoneSignInFormData) => {
    if (confirm) {
      confirmOTP();
    } else {
      await signinPhoneUser(
        `+${phoneInput.current?.getCallingCode()}${data.phoneNumber}`,
      ).then(async (fbResponse) => {
        // error response
        if (fbResponse.error.code) {
          console.log(fbResponse.error.message);
          ToastAndroid.show(fbResponse.error.message, ToastAndroid.SHORT);
          setLoading(false);
          return;
        }
        // response
        if (fbResponse.result) {
          setConfirm(fbResponse.result);
        }
      });
    }
  };
  const confirmOTP = useCallback(async () => {
    if (!confirm) return;
    try {
      await confirm.confirm(otp);
    } catch (error) {
      console.log('Invalid code.');
    }
  }, [confirm, otp]);

  const isValidPhoneNumber = (value: string) => {
    return phoneInput.current?.isValidNumber(value);
  };
  return (
    <ImageOverlay
      style={styles.container}
      source={theme.dark ? images.WelcomeDark : images.Welcome}
    >
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.rootContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={[styles.contentContainer]}>
            <Surface style={styles.surface} elevation={1}>
              <Text
                variant="headlineSmall"
                style={{ textAlign: 'center', marginBottom: 20 }}
              >
                {language.TITLE_Login}
              </Text>
              {useEmail ? (
                <>
                  <Controller
                    control={emailControl}
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
                  {emailErrors.emailAddress && (
                    <Text style={{ color: theme.colors.error }}>
                      {language.ERROR_EmailIsRequired}
                    </Text>
                  )}

                  <Controller
                    control={emailControl}
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
                  {emailErrors.password && (
                    <Text style={{ color: theme.colors.error }}>
                      {language.ERROR_PasswordIsRequired}
                    </Text>
                  )}
                </>
              ) : (
                <>
                  {confirm ? (
                    <>
                      <TextInput
                        value={otp}
                        onChangeText={(text) => setOtp(text)}
                      />
                    </>
                  ) : (
                    <>
                      <Controller
                        control={phoneControl}
                        rules={{
                          required: true,
                          validate: isValidPhoneNumber,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <PhoneInput
                            ref={phoneInput}
                            showCountryCode
                            showFlag
                            // onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            // mode="outlined"
                            placeholder={language.PLACEHOLDER_PhoneNumber}
                            containerStyle={styles.phoneInput}
                          />
                        )}
                        name="phoneNumber"
                      />
                      {phoneErrors.phoneNumber && (
                        <Text style={{ color: theme.colors.error }}>
                          {phoneErrors.phoneNumber?.type === 'required' &&
                            language.ERROR_PhoneNumberIsRequired}
                          {phoneErrors.phoneNumber?.type === 'validate' &&
                            language.ERROR_PhoneNumberInvalid}
                        </Text>
                      )}
                    </>
                  )}
                </>
              )}

              <Button
                mode="contained"
                compact
                onPress={
                  useEmail
                    ? handleEmailSubmit(onEmailSubmit)
                    : handlePhoneSubmit(onPhoneSubmit)
                }
                style={styles.button}
                loading={loading}
              >
                {useEmail
                  ? language.LABEL_EmailLoginButton
                  : confirm
                    ? language.LABEL_PhoneLoginButton
                    : language.LABEL_PhoneLoginOtpButton}
              </Button>
              <View
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  flexDirection: 'column',
                }}
              ></View>
              <Button
                mode="text"
                compact
                onPress={() => setUseEmail(!useEmail)}
                style={styles.button}
                loading={loading}
              >
                {useEmail
                  ? language.LABEL_UsePhoneLogin
                  : language.LABEL_UseEmailLogin}
              </Button>
              <Button
                mode="text"
                compact
                onPress={() => navigation.navigate('SignUp')}
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    flexDirection: 'column',
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
    // height: container_height,
  },
  surface: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    // height: container_height,
  },
  button: {
    marginVertical: 20,
  },
  textInput: {
    marginVertical: 10,
  },
  phoneInput: {
    marginVertical: 10,
  },
  rootContainer: { flex: 1 },
});

export default memo(SignInScreen);
