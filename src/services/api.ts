import { GET_ALL_STATES_END_POINT, GET_DEMOGRPAHICS_END_POINT, GET_HIGH_RISK_STATES_END_POINT, GET_RISK_SCORES_END_POINT } from "../constants";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      if (res.status === 400) {
        throw new Error(errorData.detail || "Bad request");
      } else if (res.status === 500) {
        throw new Error("Server error");
      } else {
        throw new Error("Something went wrong");
      }
    }

    return res.json();

  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
};

export const getStates = async () => {
    const data = await apiRequest(GET_ALL_STATES_END_POINT, {
        method: "GET"});
    return data.states
}

export const getHighRiskStates = async () => {
    const data = await apiRequest(GET_HIGH_RISK_STATES_END_POINT, {
            method: "GET"});
    return data.high_risk_states
}

export const getRiskScores = async () => {
    const data = await apiRequest(GET_RISK_SCORES_END_POINT, {
        method: "GET"
    });
    return data.risk_scores
}

export const getDemographics = async () => {
    const data = await apiRequest(
        GET_DEMOGRPAHICS_END_POINT, 
        {method: "GET"}
    )
    return data.data
}