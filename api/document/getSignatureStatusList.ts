import axios from 'axios';

export const requestSignatureGet = async ({
  access_token,
  userId,
  status
}: {
  access_token: string;
  userId: number;
  status: boolean;
}) => {
  try {
    const response = await axios.get(
      'https://api.giggle-inglo.com/api/v1/applicants/applys/logs',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        params: {
          userId,
          status
        }
      }
    );

    if (response.data != undefined) {
      console.log('성공했습니다.', response.data);
      return response.data; // 데이터를 반환합니다.
    }
  } catch (error) {
    console.error('서명 요청 에러', error);
    throw error; // 에러를 던져 호출하는 쪽에서 처리할 수 있도록 합니다.
  }
};
