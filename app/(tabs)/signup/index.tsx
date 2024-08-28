import PrevButton from "@/components/common/PrevButton";
import InvalidModal from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import UserInfo from "@/components/signup/UserInfo";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { UserInfoState } from "@/constants/Users";
import {useLocalSearchParams, useRouter} from "expo-router";
import * as ImageManipulator from 'expo-image-manipulator';
import {useEffect, useState} from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import axios from "axios";

const SignUpPage = () => {
  const { access_token } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    여권번호: "",
    이름: "",
    성별: "",
    생년월일: "",
    유효기간: "",
    국적: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if(imageUri !=null) ocrPassport(imageUri);
  }, [imageUri]);

  let passport_number:any;
  let name:any;
  let sex:any;
  let date_of_birth:any;
  let nationality:any;
  let passport_issue_date:any;
  let passport_expiry_date:any;
  const ocrPassport = async (imageUri: any) => {
    // 이미지를 884x600 픽셀로 조정
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 884, height: 600 } }], // 크기를 884x600으로 조정
        { compress: 1, format: ImageManipulator.SaveFormat.PNG } // 압축하지 않고, JPEG 포맷으로 저장
    );
    const formData = new FormData();
    const file = {
      uri: manipResult.uri,
      name: 'photo.png',
      type: 'image/png',
    } as unknown as Blob

    formData.append('file', file);
    try {
      const response = await axios.post(
          "https://api.giggle-inglo.com/api/v1/applicants/ocr/passport",
          formData,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
      );
      const data = response.data.data;
      passport_number = data.passportNumber; // chk
      name = data.name;
      sex = data.sex;
      date_of_birth = data.dateOfBirth; // chk
      nationality = data.nationality;
      passport_issue_date = data.passportIssueDate;
      passport_expiry_date = data.passportExpiryDate; // chk

      setUserInfo({
        여권번호:passport_number,
        이름:name,
        성별:sex,
        국적:nationality,
        생년월일:date_of_birth,
        유효기간:passport_issue_date + " ~ \n" + passport_expiry_date
      });

      // console.log('first chk : ', userInfo); // 여기가 문제
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const updatePassport = async () => {
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/applicants/passport`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: {
          "passport_number": passport_number,
          "name": name,
          "sex": sex,
          "nationality": nationality,
          "date_of_birth": date_of_birth,
          "passport_issue_date": passport_issue_date,
          "passport_expiry_date": passport_expiry_date
        }
      });
      const success = await response.data.success;
      if(success) {
        router.push({
          pathname:"/signup/foreignRegistrationCard",
          params: {
            access_token: access_token
          }
        });
      }
  } catch (error) {
      console.error("여권 등록 에러", error);
    }
  }
  const handleButtonClick = () => {
    const isAllInfoFilled = Object.values(userInfo).every(value => value !== "");
    if (isAllInfoFilled) {
      updatePassport();
    } else {
      setModalVisible(false);
    }
  };
  return (
    <>
      <ThemedView style={[styles.background, { height }]}>
        <PrevButton isLogo={false} />
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>
            <Text style={styles.keyword}>여권</Text>을{"\n"}선택해주세요
          </Text>
        </View>
        <UserInfo userInfo={userInfo} />
        <UploadPassPort
          title="여권을 선택해주세요."
          description="5MB 이하만 가능합니다. (png, jpeg 파일)"
          imageUri={imageUri}
          setImageUri={setImageUri}
        />
        <BottomButton
          state={userInfo.여권번호 !== "" ? "activated" : "disabled"}
          text="인증"
          onPress={handleButtonClick}
        />
        {modalVisible && (
          <InvalidModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="부적절한 사진"
            message="적절한 여권사진이 아닙니다. 크기와 해상도를 조절해주세요."
          />
        )}
      </ThemedView>
    </>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  titleContainer: {
    display: "flex",
    backgroundColor: "white",
    width: 257,
    height: 70,
    flexDirection: "column",
    justifyContent: "flex-start",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  title: {
    color: "black",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    lineHeight: 57.6,
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 28.8,
    marginBottom: 12,
  },
});
