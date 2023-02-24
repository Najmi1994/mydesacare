import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { baseUrl } from "src/config";
import { authAtom } from "src/recoil/auth";
import { initMixpanel } from "src/utils/mixpanel";
import request from "../../../lib/axios";
import { useCompany } from "../company";

const host = baseUrl + "mydesacare/counsellor/api";

const useLogin = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const router = useRouter();
  return useMutation(loginRequest, {
    onSuccess: (data) => {
      setAuth(data.data);
      localStorage.setItem("accessToken",JSON.stringify(data.data.data.token));
      if(data.data.data.level_access){
        sessionStorage.setItem("lvl",data.data.data.level_access);
        window.location.href = '/superadmin';
      }else{
        if(!data.data.data.age || !data.data.data.phone_no || !data.data.data.marital_status || !data.data.data.expertise || !data.data.data.experience){
          window.location.href = '/settings';
        }else{
          window.location.href = '/dashboard';
        }
      }
      // router.push("/dashboard");
    },
  });
};

const useLogout = () => {
  const router = useRouter();
  return useMutation(logoutRequest, {
    onSuccess: () => {
      localStorage.clear();
      router.reload();
      router.push("/auth/login");
    },
  });
};

const useVerify = () => {
  const router = useRouter();
  return useMutation(verifyRequest, {
    onSuccess: () => {
      router.push("/auth/login");
    },
  });
};

const useForgotPassword = () => {
  return useMutation(forgotPasswordRequest);
};

const useResetPassword = () => {
  return useMutation(resetPasswordRequest);
};

const loginRequest = async (credentials) => {
    console.log('credentials',credentials)
  try {
    let res = await request({
      url: `${host}/login`,
      method: "post",
      data: credentials,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log("err ::", err);
    throw err;
  }
};

const logoutRequest = async (data) => {
  let res = await request({
    url: `${host}/logout`,
    method: "post",
    data: data,
  });
  return res;
};

const verifyRequest = async (data) => {
  let res = await request({
    url: `${baseUrl}/auth/verify`,
    method: "post",
    data: data,
  });
  return res;
};

const forgotPasswordRequest = async (data) => {
  let res = await request({
    url: `${baseUrl}/user/forgotPassword`,
    method: "post",
    data: data,
  });
  return res;
};

const resetPasswordRequest = async (data) => {
  let res = await request({
    url: `${baseUrl}/user/resetPassword`,
    method: "post",
    data: data,
  });
  return res;
};

export { useLogin, useLogout, useVerify, useForgotPassword, useResetPassword };
