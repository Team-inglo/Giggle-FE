export interface SigningMethod {
    type: "SECURE_LINK" | "EMAIL" | "KAKAO";
    value: string;
  }
  
  export interface Signer {
    signingMethod: SigningMethod;
    role: "외국인유학생" | "고용주" | "교내유학생담당자";
    name: string;
  }
  
  export type RequestSignatureDto = Signer[];