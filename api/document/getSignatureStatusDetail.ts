import axios from 'axios';

export const requestSignatureDetailsGet = async ({
  access_token,
  userId,
  applyId
}: {
  access_token: string;
  userId: number;
  applyId: number;
}) => {
  try {
    const response = await axios.get(
      `https://api.giggle-inglo.com/api/v1/applicants/applys/details/${applyId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        params: {
          userId
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
