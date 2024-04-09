import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ToastAndroid, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useMutation } from 'react-query';
import axios from 'axios';
import { globalEnv } from '../../../config/baseConfig';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

enum RecurrenceTypeEnum {
  NO_RECURRENCE,
  DAILY,
  WEEKLY,
  BIWEEKLY,
  MONTHLY,
  CUSTOM
}

type ImageType = {
  lq_url: string;
  mq_url: string;
  hq_url: string;
};

export default function CreateNewEvent() {
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const user = auth().currentUser;
    user != null && user.getIdToken().then((token: string) => setAccessToken(token));
  }, []);

  const genericImgUrl = 'https://meavana-statics-prod.s3.us-east-2.amazonaws.com/assets/hero.jpeg';

  const [eventName, setEventName] = useState<string>('');
  const [eventDetails, setEventDetails] = useState<string>('');
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceTypeEnum>(RecurrenceTypeEnum.NO_RECURRENCE);
  const [location, setLocation] = useState<string>('');

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [timeHour, setTimeHour] = useState<number | undefined>(undefined);
  const [timeMinutes, setTimeMinutes] = useState<number | undefined>(undefined);

  const [isStartDatePickerVisible, setIsStartDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState<ImageType>({
    lq_url: genericImgUrl,
    mq_url: genericImgUrl,
    hq_url: genericImgUrl
  });

  const onDismissTimePickerModal = useCallback(() => {
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible]);

  const getEventDateTime = () => {
    const time = `${timeHour}:${timeMinutes}`;
    return moment(startDate + ' ' + time, 'DD/MM/YYYY HH:mm');
  };

  const onConfirmTime = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setIsTimePickerVisible(false);
      setTimeHour(hours);
      setTimeMinutes(minutes);
      console.log({ hours, minutes });
    },
    [setIsTimePickerVisible]
  );

  const onDismissStartDatePickerModal = useCallback(() => {
    setIsStartDatePickerVisible(false);
  }, [setIsStartDatePickerVisible]);

  const onConfirmStartDate = useCallback(
    (params: any) => {
      console.log('params', params);
      setIsStartDatePickerVisible(false);
      setStartDate(params.date);
    },
    [setIsStartDatePickerVisible, setStartDate]
  );

  const onDismissEndDatePickerModal = useCallback(() => {
    setIsEndDatePickerVisible(false);
  }, [setIsEndDatePickerVisible]);

  const onConfirmEndDate = useCallback(
    (params: any) => {
      console.log('params', params);
      setIsEndDatePickerVisible(false);
      setEndDate(params.date);
    },
    [setIsEndDatePickerVisible, setEndDate]
  );

  const saveEventRequest = async () => {
    let duration = 0;

    if (startDate != null) {
      if (timeHour != null) {
        startDate.setHours(timeHour);
        startDate.setSeconds(0);
      }
      if (timeMinutes != null) {
        startDate.setMinutes(timeMinutes);
        startDate.setSeconds(0);
      }
      if (endDate != null) {
        let a = moment(startDate);
        let b = moment(endDate);
        duration = moment.duration(b.diff(a)).asMinutes();
      }
    }

    const dto = {
      name: eventName,
      details: eventDetails,

      startDate: startDate,
      duration: duration,
      recurrenceType: recurrenceType,
      images: [selectedImage]
      // location: location,
      // date: getEventDateTime().toString()
    };
    const config = {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };
    const { data: response } = await axios.post(`${globalEnv.BASE_URL}/media/events`, dto, config);
    return response;
  };

  const saveMutation = useMutation(saveEventRequest, {
    onSuccess: (data) => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Success ' + data, ToastAndroid.SHORT);
      } else {
        Alert.alert('Success');
      }
    },
    onError: (data) => {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Fail ' + data, ToastAndroid.SHORT);
      } else {
        Alert.alert('Fail');
      }
    }
  });

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.9,
      maxHeight: 2000,
      maxWidth: 2000
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage({
          lq_url: imageUri,
          mq_url: imageUri,
          hq_url: imageUri
        });
      }
    });
  };

  const saveIcon = () => {
    return saveMutation.isLoading ? (
      <MaterialCommunityIcons name={'magnify'} size={34} />
    ) : (
      <MaterialCommunityIcons name={'plus'} size={34} />
    );
  };

  return (
    // <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={-50}>
    //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isStartDatePickerVisible}
          onDismiss={onDismissStartDatePickerModal}
          date={startDate}
          onConfirm={onConfirmStartDate}
        />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isEndDatePickerVisible}
          onDismiss={onDismissEndDatePickerModal}
          date={endDate}
          onConfirm={onConfirmEndDate}
        />
        <View style={{ position: 'relative' }}>
          <Image style={styles.image} source={{ uri: selectedImage.hq_url }} />
          <Button
            // icon={() => ButtonIcon()}
            style={{
              position: 'absolute',
              top: 10,
              left: '88%',
              backgroundColor: '#fff',
              width: 35,
              height: 35
            }}
            onPress={openImagePicker}
            labelStyle={styles.label}
            compact={true}
            children={<Icon name="picture-o" size={17} color="#000" style={{ marginTop: 7 }} />}
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Event name"
            onChangeText={(input) => setEventName(input)}
            theme={{ roundness: 15 }}
            placeholder="Type something"
          />

          <View style={styles.datePickersContainer}>
            <View style={startDate != null ? { flex: 3, paddingEnd: 5 } : { flex: 2, paddingEnd: 5 }}>
              <Button onPress={() => setIsStartDatePickerVisible(true)} uppercase={false} mode="outlined">
                {startDate != null ? moment(startDate).format('ddd DD/MM/YYYY') : 'Pick date'}
              </Button>
            </View>

            <View style={{ justifyContent: 'center', flex: 2, paddingStart: 5 }}>
              <Button onPress={() => setIsTimePickerVisible(true)} uppercase={false} mode="outlined">
                {timeHour != null ? `${timeHour}:${timeMinutes}` : 'Pick a time'}
              </Button>
              <TimePickerModal
                visible={isTimePickerVisible}
                onDismiss={onDismissTimePickerModal}
                onConfirm={onConfirmTime}
                hours={timeHour}
                minutes={timeMinutes}
              />
            </View>
          </View>

          <View style={styles.frequencyContainer}>
            <Button
              icon={ButtonIcon}
              mode="contained"
              labelStyle={styles.label}
              compact={true}
              style={styles.button}
              onPress={() => setIsEndDatePickerVisible(true)}
            >
              {endDate != null ? moment(endDate).format('ddd DD/MM/YYYY') : 'Add end time'}
            </Button>
            <Button
              icon={ButtonIcon}
              mode="contained"
              labelStyle={styles.label}
              compact={true}
              style={[styles.button, { marginLeft: 10 }]}
              onPress={() => console.log('Pressed')}
            >
              Frequency
            </Button>
          </View>

          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Location"
            theme={{ roundness: 15 }}
            onChangeText={(input) => setLocation(input)}
            placeholder="Type something"
          />
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Who might be interested in this event ?"
            theme={{ roundness: 15 }}
            placeholder="Type something"
          />

          <TextInput
            style={[{ marginTop: 15 }]}
            multiline={true}
            mode="outlined"
            label="Event details"
            onChangeText={(input) => setEventDetails(input)}
            theme={{ roundness: 15 }}
          />

          <Button
            icon={saveIcon}
            mode="contained"
            labelStyle={styles.label}
            compact={true}
            style={styles.saveBtn}
            onPress={() => saveMutation.mutate()}
          >
            Save
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>

    // </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const ButtonIcon = () => {
  return <Icon name="facebook" size={12} color="#000" style={{ marginTop: 1 }} />;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },

  datePickersContainer: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  frequencyContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row'
  },

  button: {
    width: 'auto'
  },
  label: {
    fontSize: 13,
    marginVertical: 4
  },
  formContainer: {
    display: 'flex',
    flex: 1,
    margin: 20,
    flexDirection: 'column'
  },
  textInput: {
    marginTop: 15,
    height: 50
  },
  image: {
    resizeMode: 'cover',
    alignSelf: 'stretch',
    height: 230
  },
  header: {
    fontSize: 20,
    paddingTop: 30
  },
  formText: {
    fontSize: 20,
    padding: 10,
    paddingLeft: 0
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '300',
    paddingBottom: 30
  },

  saveBtn: {
    width: '100%',
    paddingHorizontal: 10,
    bottom: -20
  }
});

// const FormField = (props: any) => {
//   return (
//     <View style={FormFieldstyles.formFieldWrapper}>
//       <Text style={FormFieldstyles.labelText}>{props.label}</Text>
//       <TextInput
//         placeholder={props.placeholder}
//         style={FormFieldstyles.formFieldText}
//         onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text)}
//         {...props.textInputProps}
//       />
//     </View>
//   );
// };

// const FormFieldstyles = StyleSheet.create({
//   formFieldWrapper: {},
//   formFieldText: {
//     fontSize: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#fff',
//     padding: 12
//   },
//   labelText: {
//     fontSize: 20,
//     marginBottom: 12,
//     paddingLeft: 10,
//     paddingTop: 10,
//     color: '#fff458'
//   }
// });
