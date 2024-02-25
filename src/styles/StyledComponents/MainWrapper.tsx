import styled from "@emotion/styled";

export const MainWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colorGrayLightest};
  background-color: ${({ theme }) => theme.colorBgMask};
  .main-body-wrap {
    padding: 24px 20px;
  }
  .header-wrap {
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    &.backbtn {
      h5 {
        font-size: 20px;
        font-weight: 600;
      }
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
      color: ${({ theme }) => theme.colorPrimaryText};
      margin-bottom: 0;
    }
    p {
      padding-left: 8px;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;
