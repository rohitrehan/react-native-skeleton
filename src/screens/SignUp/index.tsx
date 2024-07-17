import React, {
  ImageBackground,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import {Card, Surface, Text} from 'react-native-paper';
import Button from '../../components/Base/Button';
import useLanguage from '../../hooks/useLanguage';

export default function SignUpScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SignUp'>) {
  const language = useLanguage();
  return (
    <ImageBackground
      source={{uri: 'https://example.com/your-background-image.jpg'}} // Replace with your image URL
      style={styles.background}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.socialContainer}>
              <Text style={styles.signUpText}>Sign up with</Text>
              <View style={styles.socialButtons}>
                <Button
                  mode="contained"
                  icon={() => <Icon name="github" size={20} />}
                  style={styles.socialButtons}>
                  GITHUB
                </Button>
                <Button
                  mode="contained"
                  icon={() => <IconMaterial name="google" size={20} />}
                  style={styles.socialButtons}>
                  GOOGLE
                </Button>
              </View>
            </View>

            <Text style={styles.orText}>Or sign up the classic way</Text>

            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              left={<TextInput.Icon name="account" />}
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon name="email" />}
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              left={<TextInput.Icon name="lock" />}
              style={styles.input}
            />

            <Text style={styles.passwordStrength}>
              password strength: <Text style={{color: 'green'}}>strong</Text>
            </Text>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
              />
              <Text style={styles.checkboxText}>
                I agree with the{' '}
                <Text style={{color: 'blue'}}>Privacy Policy</Text>
              </Text>
            </View>

            <Button
              mode="contained"
              style={styles.createAccountButton}
              onPress={() => console.log('Create Account Pressed')}>
              CREATE ACCOUNT
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
}
interface Style {
  orText: TextStyle;
  card: ViewStyle;
  background: ViewStyle;
  socialButtons: ViewStyle;
  signUpText: TextStyle;
  socialContainer: ViewStyle;
  passwordStrength: TextStyle;
  createAccountButton: ViewStyle;
  checkboxText: TextStyle;
  checkboxContainer: ViewStyle;
  container: ViewStyle;
}
const styles: Style = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
