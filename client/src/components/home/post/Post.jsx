import { Box, Typography, styled } from '@mui/material';

import { API_SERVER } from '../../../constants/config';
import { addEllipsis } from '../../../utils/common-utils';

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    padding: 0 5px 5px 5px;
  }
`;

const Image = styled('img')({
  width: '100%',
  borderRadius: '10px 10px 0 0',
  objectFit: 'cover',
  height: 150,
});

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const TextHeading = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const TextDetails = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const Post = ({ post }) => {
  const url = post.image
    ? API_SERVER + post.image
    : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

  return (
    <Container>
      <Image src={url} alt="blog-pic" />
      <Text>{post.category}</Text>
      <TextHeading>{addEllipsis(post.title, 20)}</TextHeading>
      <Text>{post.username}</Text>
      <TextDetails>{addEllipsis(post.description, 100)}</TextDetails>
    </Container>
  );
};

export default Post;
