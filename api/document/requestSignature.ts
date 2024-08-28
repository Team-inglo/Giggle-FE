import axios from 'axios';
import { Linking } from 'react-native';
import { RequestSignatureDto } from '@/interface/document/requestSinatureInterface';

export const requestSignature = async ({
    access_token,
    requestSignatureDto,
    documentType,
    announcementId,
    userId
  }: {
    access_token: string;
    requestSignatureDto: RequestSignatureDto;
    documentType: string;
    announcementId: number;
    userId: number;
  }) => {

  try {
    const response = await axios.post(
      'https://api.giggle-inglo.com/api/v1/applicants/documents/request',
      requestSignatureDto,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        params: {
            documentType,
            announcementId,
            userId
        }
      }
    );

    if (response.data != undefined) {
      console.log("성공했습니다.", response.data);

      // 외부 url로 이동시키기
      await Linking.openURL(response.data);
    }
  } catch (error) {
    console.error('서명 요청 에러', error);
  }
};
