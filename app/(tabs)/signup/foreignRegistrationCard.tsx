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

const AlienRegistrationCardPage = () => {
  const { access_token } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const [userInfo, setUserInfo] = useState<userRegistrationCardState>({
    등록번호: "",
    체류자격: "",
    발급일자: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();
  // const handleButtonClick = () => {
  //   const validStatus =
  //     userInfo.체류자격.includes("D-2") || userInfo.체류자격.includes("D-4");
  //   validStatus ? router.push("/signup/idPw") : setModalVisible(true);
  // };
  useEffect(() => {
    if(imageUri !=null) ocrRegistration(imageUri);
  }, [imageUri]);

  let registration_number:any;
  let status_of_residence:any;
  let registration_issue_date:any;
  const ocrRegistration = async (imageFile: any) => {
    const formData = new FormData();
    const file = {
      imageFile,
      name: 'photo.jpg',
      type: 'image/jpeg',
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
      registration_number = data.registration_number;
      status_of_residence = data.status_of_residence;
      registration_issue_date = data.registration_issue_date;
      setUserInfo({
        등록번호:registration_number,
        체류자격:status_of_residence,
        발급일자:registration_issue_date
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const updateRegistration = async () => {
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/applicants/registration`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + {access_token},
          "Content-Type": "application/json",
        },
        data: {
          "registration_number": registration_number,
          "status_of_residence": status_of_residence,
          "registration_issue_date": registration_issue_date
        }
      });
      const success = await response.data.data;
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
    if (isAllInfoFilled) {
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
    fontWeight: "700",
    lineHeight: 57.6,
  },
  keyword: {
    color: "#FFB65A",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
  },
  subTitle: {
    color: "black",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28.8,
    marginBottom: 12,
  },
});
