import axios from "axios";
import { toast } from 'react-hot-toast';
import { API_SERVER } from '../constants/config';

export const ApiHelperFunction = async (props) => {
    // const { userToken } = useSelector(state => state.adminProfileSlice);
    // console.log("userToken", userToken);
    let token = localStorage.getItem("accessToken");

    const { urlPath, method, data } = props;

    let config = {
        method: `${method}`,
        url: `${API_SERVER}${urlPath}`,
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token
        },
        data: data,
    };
    let responseData;

    await axios(config)
        .then(function (res) {
            // console.log("ApiHelperFunction res", res);
            responseData = res;
        })
        .catch(function (error) {
            if (error?.response?.status === 401) {
                toast.error("Unauthorized");
                responseData = error;
            } else {
                responseData = error;
            }
        });

    return responseData;
};