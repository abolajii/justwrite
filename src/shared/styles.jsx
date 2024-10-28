import styled from "styled-components";

export const Container = styled.div`
  border-radius: 5px;
  background-color: #f3f3f3;
  border: 1px solid #e0e0e0;
  margin-bottom: 15px;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 20px;
  margin-bottom: 10px;

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
    margin-top: -4px;
  }
`;

export const Middle = styled.div`
  padding: 0 10px;
  font-size: 14.5px;
  line-height: 1.4;
  margin-top: 16px;
  word-wrap: break-word;
`;

export const Image = styled.div`
  margin-top: 10px;
  height: 600px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Avi = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #313838;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
