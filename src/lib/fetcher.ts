import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export async function sendRequest(url: string, { arg }: { arg: unknown }) {
  const response = await axios.post(url, arg, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
