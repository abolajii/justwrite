/* eslint-disable react/prop-types */
// import React from "react";
import styled from "styled-components";

const SkeletonPulse = styled.div`
  flex-shrink: 0;
  margin-top: ${(props) => props.mt};
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  margin-bottom: ${(props) => props.mb};
  display: inline-block;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  background: linear-gradient(-90deg, #e5e5e5 0%, #f3f3f3 50%, #e5e5e5 100%);

  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  overflow: hidden;
  border-radius: ${({ border }) => border && `${border}px`};

  /* DARK MODE */

  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -140% 0%;
    }
  }
`;

const Skeleton = ({ border, height, width, mt, mb, ml, mr }) => {
  return (
    <SkeletonPulse
      border={border}
      height={height}
      width={width}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
    />
  );
};
export default Skeleton;
