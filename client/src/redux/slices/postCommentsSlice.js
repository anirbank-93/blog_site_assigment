import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

// Helpers
import { ApiHelperFunction } from '../../service/apiHelpers';

let initialState = {
    status: 'idle',
    comments: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const getAllPostComments = createAsyncThunk('get_all_post_comments', async (postId) => {
    let response = await ApiHelperFunction({
        urlPath: `api/comments/${postId}`,
        method: 'GET',
    });
    console.log("comments", response);

    if (response.status === 200) {
        return response.data;
    } else {
        toast.error("Can't get data. Something went wrong");
    }
});

export const CommentsSlice = createSlice({
    name: 'post_commment_actions',
    initialState,
    reducers: {
        clearPostCommentsState: state => {
            state.status = 'idle';
            state.comments = [];
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAllPostComments.pending, state => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(getAllPostComments.fulfilled, (state, { payload }) => {
                state.status = 'success';
                state.isSuccess = true;
                console.log('payload', payload);
                state.comments = payload?.data;
            })
            .addCase(getAllPostComments.rejected, state => {
                state.status = 'failed';
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { clearPostCommentsState } = CommentsSlice.actions;

export default CommentsSlice.reducer;
