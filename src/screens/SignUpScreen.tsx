import React, { memo, useState } from 'react';
import {
  Button,
  Surface,
  TextInput,
  useTheme,
  Snackbar,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '../store/hook';
import { ImageOverlay } from '../components/image-overlay';
import { useAuth } from '../hooks/useAuth';
import { IAuthState } from '../interfaces/IAuthentication';
import { userRegistered } from '../store/authSlice';
import { useValidation } from '../hooks/useValidation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../navigation/PublicStack';
import useLanguage from '../hooks/useLanguage';
import images from '../core/images';

type SignUpFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen = ({
  navigation,
}: NativeStackScreenProps<PublicStackParamList, 'SignUp'>) => {
  const theme = useTheme();
  const language = useLanguage();
  const [showSnack, setShowSnack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const dispatch = useAppDispatch();
  const { signupEmailUser, getProfile } = useAuth();
  const { validateEmail } = useValidation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    handleSignUp(
      data.firstName,
      data.lastName,
      data.emailAddress,
      data.password,
    );
  };

  const onDismissSnackBar = () => setShowSnack(false);

  const handleSignUp = async (
    fname: string,
    lname: string,
    email: string,
    password: string,
  ) => {
    // let parsedResponse = null;
    // let firebaseToken = null;
    const fullName = `${fname} ${lname}`;
    setLoading(true);
    await signupEmailUser(fullName, email, password).then(
      async (fbResponse) => {
        // error response
        if (fbResponse.error.code) {
          setSnackMessage(fbResponse.error.message);
          setShowSnack(true);
          setLoading(false);
          return;
        }
        // response
        if (fbResponse.result) {
          // firebaseToken = fbResponse.result.user.stsTokenManager.accessToken;
          const firebaseUserName = fbResponse.result.user.displayName;
          // if (firebaseToken != null) {
          // Get firebase profile
          const profile = await getProfile();
          console.log(profile);
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
          dispatch(userRegistered(user));
          setLoading(false);
          // React navigation will handle Redirect to home, if login worked
          // }
        }
      },
    );
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
                {language.TITLE_Register}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: {
                    message: language.ERROR_FirstNameIsRequired,
                    value: true,
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: language.ERROR_InvalidName,
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={language.LABEL_FirstName}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    mode="outlined"
                    placeholder={language.PLACEHOLDER_FirstName}
                    textContentType="name"
                    style={styles.textInput}
                  />
                )}
                name="firstName"
              />
              {errors.firstName?.message && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.firstName?.message}
                </Text>
              )}

              <Controller
                control={control}
                rules={{
                  required: {
                    message: language.ERROR_LastNameIsRequired,
                    value: true,
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    message: language.ERROR_InvalidName,
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={language.LABEL_LastName}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    mode="outlined"
                    placeholder={language.PLACEHOLDER_LastName}
                    textContentType="name"
                    style={styles.textInput}
                  />
                )}
                name="lastName"
              />
              {errors.lastName?.message && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.lastName?.message}
                </Text>
              )}

              <Controller
                control={control}
                rules={{
                  required: {
                    message: language.ERROR_EmailIsRequired,
                    value: true,
                  },
                  validate: {
                    invalidEmail: (value) => {
                      return validateEmail(value);
                    },
                  },
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
              {errors.emailAddress &&
                errors.emailAddress.type === 'required' && (
                  <Text style={{ color: theme.colors.error }}>
                    {language.ERROR_EmailIsRequired}
                  </Text>
                )}
              {errors.emailAddress &&
                errors.emailAddress.type === 'invalidEmail' && (
                  <Text style={{ color: theme.colors.error }}>
                    {language.ERROR_InvalidEmail}
                  </Text>
                )}

              <Controller
                control={control}
                rules={{
                  maxLength: 16,
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

              <Controller
                control={control}
                rules={{
                  maxLength: 16,
                  required: true,
                  validate: (val) => {
                    if (watch('password') !== val) {
                      return language.ERROR_ConfirmPassword;
                    }
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={language.LABEL_ConfirmPassword}
                    mode="outlined"
                    placeholder={language.PLACEHOLDER_ConfirmPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    textContentType="password"
                    style={styles.textInput}
                  />
                )}
                name="confirmPassword"
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'required' && (
                  <Text style={{ color: theme.colors.error }}>
                    {language.ERROR_PasswordIsRequired}
                  </Text>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <Text style={{ color: theme.colors.error }}>
                    {language.ERROR_ConfirmPassword}
                  </Text>
                )}

              <Button
                mode="contained"
                compact
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
                loading={loading}
              >
                {language.LABEL_SignUpEmailButton}
              </Button>
              <Button
                mode="text"
                compact
                onPress={() => navigation.navigate('SignIn')}
                style={styles.button}
                loading={loading}
              >
                {language.LABEL_AlreadyAUser}
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
      <Snackbar
        visible={showSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {snackMessage}
      </Snackbar>
    </ImageOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  surface: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 20,
  },
  textInput: {
    marginVertical: 10,
  },
  rootContainer: {
    flex: 1,
  },
});

export default memo(SignUpScreen);
