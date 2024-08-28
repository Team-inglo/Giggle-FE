import PrevButton from "@/components/common/PrevButton";
import InvalidModal from "@/components/signup/InvalidModal";
import UploadPassPort from "@/components/signup/UploadPassport";
import UserInfo from "@/components/signup/UserInfo";
import { ThemedView } from "@/components/ThemedView";
import BottomButton from "@/components/tutorial/BottomButton";
import { UserInfoState } from "@/constants/Users";
import {useLocalSearchParams, useRouter} from "expo-router";
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
    발급일만료일: "",
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
  const ocrPassport = async (imageFile: any) => {
    const formData = new FormData();
    const file = {
      imageFile,
      name: 'photo.jpg',
      type: 'image/jpeg',
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
      passport_number = data.passport_number;
      name = data.name;
      sex = data.sex;
      date_of_birth = data.date_of_birth;
      nationality = data.nationality;
      passport_issue_date = data.passport_issue_date;
      passport_expiry_date = data.passport_expiry_date;
      setUserInfo({
        여권번호:passport_number,
        이름:name,
        성별:sex,
        국적:nationality,
        생년월일:date_of_birth,
        발급일만료일:passport_issue_date + " " + passport_expiry_date
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const updatePassport = async () => {
    try {
      const response = await axios(`https://api.giggle-inglo.com/api/v1/applicants/passport`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + {access_token},
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
      const success = await response.data.data;
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
            title="체류자격 부적합"
            message="체류자격이 D-2 혹은 D-4인 경우에만 회원가입이 가능합니다."
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
    container: {
    padding: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
});
