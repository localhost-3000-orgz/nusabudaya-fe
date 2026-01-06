import apiClient from "../apiClient";
import { endpoints } from "../endpoint";

export const gameResultService = {
  get: async () => {
    const { data } = await apiClient.get(endpoints.gameResults.getAll);
    return data.data;
  },
}