import React from 'react';
import {
  StyleSheet,
  ScrollView,
  ViewStyle,
  Dimensions,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../router';
import Button from '../../components/Base/Button';
import {Text, useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
export default function ProfileScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Profile'>) {
  const theme = useTheme();
  return (
    <View style={styles.profile}>
      <View>
        {/* <ImageBackground
          source={images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width, marginTop: '25%'}}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              {/* <Image
                source={{uri: Images.ProfilePicture}}
                style={styles.avatar}
              /> */}
            </View>
            <View style={styles.info}>
              <View style={{marginTop: 20, paddingBottom: 24}}>
                <Button buttonColor={theme.colors.primary}>
                  <Text>CONNECT</Text>
                </Button>
                <Button buttonColor={theme.colors.secondary}>
                  <Text>MESSAGE</Text>
                </Button>
              </View>
              <View>
                <View>
                  <Text>2K</Text>
                  <Text>Orders</Text>
                </View>
                <View>
                  <Text>10</Text>
                  <Text>Photos</Text>
                </View>
                <View>
                  <Text>89</Text>
                  <Text>Comments</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={styles.nameInfo}>
                <Text>Anil Kumar, 27</Text>
                <Text>Chandigarh, India</Text>
              </View>
              <View>
                <View style={styles.divider} />
              </View>
              <View>
                <Text>
                  An artist of considerable range, Jessica name taken by
                  Melbourne …
                </Text>
                <Button
                // textStyle={{
                //   color: '#233DD2',
                //   fontWeight: '500',
                //   fontSize: 16,
                // }}
                >
                  <Text>Show more</Text>
                </Button>
              </View>
              <View>
                <Text>Album</Text>
                <Button
                // textStyle={{
                //   color: '#5E72E4',
                //   fontSize: 12,
                //   marginLeft: 24,
                // }}
                >
                  <Text>View all</Text>
                </Button>
              </View>
              {/* <View style={{paddingBottom: -HeaderHeight * 2}}> */}
              {/* <View row space="between" style={{flexWrap: 'wrap'}}> */}
              {/* {Images.Viewed.map((img, imgIndex) => (
                    <Image
                      source={{uri: img}}
                      key={`viewed-${img}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))} */}
              {/* </View> */}
              {/* </View> */}
            </View>
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ flex: 1, width, height, zIndex: 9000, backgroundColor: 'red' }}>
    <View flex style={styles.profileCard}>
      <View middle style={styles.avatarContainer}>
        <Image
          source={{ uri: Images.ProfilePicture }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.info}>
        <View
          middle
          row
          space="evenly"
          style={{ marginTop: 20, paddingBottom: 24 }}
        >
          <Button small style={{ backgroundColor: theme.colors.info }}>
            CONNECT
          </Button>
          <Button
            small
            style={{ backgroundColor: theme.colors.default }}
          >
            MESSAGE
          </Button>
        </View>

        <View row space="between">
          <View middle>
            <Text
              bold
              size={12}
              color="#525F7F"
              style={{ marginBottom: 4 }}
            >
              2K
            </Text>
            <Text size={12}>Orders</Text>
          </View>
          <View middle>
            <Text bold size={12} style={{ marginBottom: 4 }}>
              10
            </Text>
            <Text size={12}>Photos</Text>
          </View>
          <View middle>
            <Text bold size={12} style={{ marginBottom: 4 }}>
              89
            </Text>
            <Text size={12}>Comments</Text>
          </View>
        </View>
      </View>
      <View flex>
          <View middle style={styles.nameInfo}>
            <Text bold size={28} color="#32325D">
              Jessica Jones, 27
            </Text>
            <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
              San Francisco, USA
            </Text>
          </View>
          <View middle style={{ marginTop: 30, marginBottom: 16 }}>
            <View style={styles.divider} />
          </View>
          <View middle>
            <Text size={16} color="#525F7F" style={{ textAlign: "center" }}>
              An artist of considerable range, Jessica name taken by
              Melbourne …
            </Text>
            <Button
              color="transparent"
              textStyle={{
                color: "#233DD2",
                fontWeight: "500",
                fontSize: 16
              }}
            >
              Show more
            </Button>
          </View>
          <View
            row
            style={{ paddingVertical: 14, alignItems: "baseline" }}
          >
            <Text bold size={16} color="#525F7F">
              Album
            </Text>
          </View>
          <View
            row
            style={{ paddingBottom: 20, justifyContent: "flex-end" }}
          >
            <Button
              small
              color="transparent"
              textStyle={{ color: "#5E72E4", fontSize: 12 }}
            >
              View all
            </Button>
          </View>
          <View style={{ paddingBottom: -HeaderHeight * 2 }}>
            <View row space="between" style={{ flexWrap: "wrap" }}>
              {Images.Viewed.map((img, imgIndex) => (
                <Image
                  source={{ uri: img }}
                  key={`viewed-${img}`}
                  resizeMode="cover"
                  style={styles.thumb}
                />
              ))}
            </View>
          </View>
      </View>
    </View>
              </ScrollView>*/}
    </View>
  );
}
interface Style {
  profile: ViewStyle;
  profileContainer: ViewStyle;
  profileBackground: ViewStyle;
  profileCard: ViewStyle;
  info: ViewStyle;
  avatarContainer: ViewStyle;
  avatar: ViewStyle;
  nameInfo: ViewStyle;
  divider: ViewStyle;
  thumb: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  profile: {
    // marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    // position: "relative",
    // padding: theme.SIZES.BASE,
    // marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    // backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
});
