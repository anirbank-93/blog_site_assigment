import { Box, Typography, styled } from '@mui/material';

const Container = styled(Box)`
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/55% repeat-x #000;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: #ffffff;
  line-height: 1;
`;

const Subheading = styled(Typography)`
  font-size: 20px;
  background: #ffffff;
`;

const Banner = () => {
  return (
    <Container>
      <Heading>BLOG</Heading>
      <Subheading>My journey</Subheading>
    </Container>
  );
};

export default Banner;
