import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { baseUrl } from "src/config";
import request from "../../../lib/axios";

const host = baseUrl + "mydesacare/counsellor/api";
const token = typeof window !== 'undefined' ? (localStorage.getItem("accessToken") ? localStorage.getItem("accessToken").replace(/^"(.*)"$/, '$1')  : '') : '';

const headers = {
    Token: token,
    crossDomain: true,
    "Access-Control-Allow-Origin": "*"
};

const useClient = (status,data) => {
    return useQuery(
      ["client",data],
      () => clientAll(status,data),
      { refetchOnWindowFocus: false }
    );
  };
  
  const clientAll = async (data,page) => {
    let status = data ? `&status=${data}` : '';
    let db_page = page ? `?_page=${page}` : '?_page=1';
    
    let res = await request({
      url: `${host}/client_all_admin${db_page}${status}`,
      method: "get",
      headers: headers
    });
  
    return res.data.data;
  };

  export { useClient }