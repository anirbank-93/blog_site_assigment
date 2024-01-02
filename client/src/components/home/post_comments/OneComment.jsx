import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import { DataContext } from "../../../context/DataProvider";
import { JsonAPI } from "../../../service/api";

// Components
import { Box, Typography, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Container = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const ProfileContainer = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 18px;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const OneComment = ({ comment, getComments }) => {
  const dispatch = useDispatch();
  const { account } = useContext(DataContext);

  const handleDelete = async (id) => {
    let res = await JsonAPI["deleteComment"]({ id });

    if (res.isSuccess) {
      dispatch(getComments(comment?.postId));
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <Name>{comment?.name}</Name>
        <StyledDate>{new Date(comment?.createdAt).toDateString()}</StyledDate>
        {comment?.username == account?.username && (
          <DeleteIcon onClick={() => handleDelete(comment?.id)} />
        )}
      </ProfileContainer>
      <Box>
        <Typography>{comment?.comment}</Typography>
      </Box>
    </Container>
  );
};

export default OneComment;
