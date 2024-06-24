import { API_URL } from "@/lib/api";
import { APIResponse, IOptions } from "@/types/base.types";
import { getToken } from "@/utils/auth";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const token = getToken();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${token}`);
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    localStorage.clear();
    window.location.href = process.env.NEXT_PUBLIC_APP_URL + "/auth";
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["PROFILE", "OPTIONS"],
  endpoints: (builder) => ({
    getOptions: builder.query<APIResponse<Array<IOptions>>, string>({
      queryFn: (query: any) => query,
      providesTags: ["OPTIONS"],
    }),
  }),
});

export const { useGetOptionsQuery } = apiSlice;
