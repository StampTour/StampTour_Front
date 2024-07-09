import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const CameraView = forwardRef((props, ref) => {
    return <StyledVideo ref={ref} autoPlay playsInline />;
});

export default CameraView;
