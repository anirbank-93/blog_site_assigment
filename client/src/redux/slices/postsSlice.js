import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

// Helpers
import { ApiHelperFunction } from '../../service/apiHelpers';

let initialState = {
    status: 'idle',
    posts: [],
    post: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const getAllPosts = createAsyncThunk('get_all_posts', async () => {
    let response = await ApiHelperFunction({
        urlPath: 'api/posts',
        method: 'GET',
    });
    console.log("posts", response);

    if (response.status === 200) {
        return response.data;
    } else {
        toast.error("Can't get data. Something went wrong");
    }
});

export const getOnePost = createAsyncThunk("get_one_post", async (id) => {
    let response = await ApiHelperFunction({
        urlPath: `api/posts/${id}`,
        method: 'GET'
    });
    console.log("post", response);

    if (response.status === 200) {
        return response.data;
    } else {
        toast.error("Can't get data. Something went wrong");
    }
})

export const PostsSlice = createSlice({
    name: 'blog_post_actions',
    initialState,
    reducers: {
        clearBlogPostsState: state => {
            state.status = 'idle';
            state.posts = [];
            state.post = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getAllPosts.pending, state => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, { payload }) => {
                state.status = 'success';
                state.isSuccess = true;
                console.log('payload', payload);
                state.posts = payload?.data;
            })
            .addCase(getAllPosts.rejected, state => {
                state.status = 'failed';
                state.isError = true;
                state.isSuccess = false;
            })
            .addCase(getOnePost.pending, state => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(getOnePost.fulfilled, (state, { payload }) => {
                state.status = 'success';
                state.isSuccess = true;
                console.log('payload', payload);
                state.post = payload?.data;
            })
            .addCase(getOnePost.rejected, state => {
                state.status = 'failed';
                state.isError = true;
                state.isSuccess = false;
            });
    },
});

export const { clearBlogPostsState } = PostsSlice.actions;

export default PostsSlice.reducer;
