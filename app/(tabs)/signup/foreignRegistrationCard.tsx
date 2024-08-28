import PrevButton from "@/components/common/PrevButton";
import InvalidModal from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import UserInfo from "@/components/signup/UserInfo";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { userRegistrationCardState } from "@/constants/Users";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

const AlienRegistrationCardPage = () => {
  const { access_token } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const [userInfo, setUserInfo] = useState<userRegistrationCardState>({
    등록번호: "",
    체류자격: "",
    발급일자: "",
    테스트: ""
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(imageUri !=null) ocrRegistration(imageUri);
  }, [imageUri]);

  let registration_number:any;
  let status_of_residence:any;
  let registration_issue_date:any;
  const ocrRegistration = async (imageUri: any) => {
    // 이미지를 884x600 픽셀로 조정
    const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 522, height: 828 } }], // 크기를 522x828으로 조정
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
          "https://api.giggle-inglo.com/api/v1/applicants/ocr/registration",
          formData,
          {
            headers: {
              "Authorization": `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
      );
      const data = response.data.data;
      registration_number = data.registrationNumber;
      status_of_residence = data.statusOfResidence;
      registration_issue_date = data.registrationIssueDate;
      setUserInfo({
        등록번호:registration_number,
        체류자격:status_of_residence,
        발급일자:registration_issue_date,
        테스트:"   "
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const updateRegistration = async () => {
    console.log("진입!!")
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/applicants/registration`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: {
          "registration_number": registration_number,
          "status_of_residence": status_of_residence,
          "registration_issue_date": registration_issue_date
        }
      });
      const success = await response.data.success;
      if(success) {
        router.push({
          pathname:"/extraInfo",
          params: {
            access_token: access_token
          }
        });
      }
    } catch (error) {
      console.error("외국인등록증 등록 에러", error);
    }
  }
  const handleButtonClick = () => {
    const isAllInfoFilled = Object.values(userInfo).every(value => value !== "");
    const validStatus =
      userInfo.체류자격.includes("D-2") || userInfo.체류자격.includes("D-4");
    if (isAllInfoFilled && validStatus) {
      updateRegistration();
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
            <Text style={styles.keyword}>외국인등록증</Text>을{"\n"}
            입력해주세요.
          </Text>
        </View>
        <UserInfo userInfo={userInfo} />
        <UploadPassPort
          title="외국인등록증을 올려주세요."
          description="5MB 이하만 가능합니다. (png, jpeg 파일)"
          imageUri={imageUri}
          setImageUri={setImageUri}
        />
        <BottomButton
          state={userInfo.등록번호 !== "" ? "activated" : "disabled"}
          text="인증"
          onPress={handleButtonClick}
        />
        {modalVisible && (
          <InvalidModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title="체류자격 부적합"
            message="체류자격이 D-2 혹은 D-4인 경우에만 회원가입이 가능합니다."
          />
        )}
      </ThemedView>
    </>
  );
};

export default AlienRegistrationCardPage;

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
