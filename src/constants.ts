export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const UPLOAD_FILE_END_POINT = "/upload"
export const GET_ALL_STATES_END_POINT = "/states"
export const GET_HIGH_RISK_STATES_END_POINT = "/high-risk-states"
export const GET_RISK_SCORES_END_POINT = "/risk-scores"
export const GET_DEMOGRPAHICS_END_POINT = "/demographics"
export const GET_STATE_PROFILE_END_POINT = "/state-profile"
export const GET_TOP_N_STATES_END_POINT = "/top-states-by-score"

export const RISK_LEVEL_LOW = "Low"
export const RISK_LEVEL_MODERATE = "Moderate"
export const RISK_LEVEL_HIGH = "High"

export const DEMOGRAPICS_FIELDS = [
    "state", "anemia_women", "bmi_low", "child_mortality_rate", 
    "female_education_years", "rural_population"
]

export const DEMOGRAPICS_COLUMN_NAMES = [
    "State", "Anemia Women (%)", "BMI Low (%)", "Child Mortality Rate (%)", 
    "Female Education (Years)", "Rural Population (%)"
]

export const HIGH_RISK_STATES_FIELDS = [
    "state", "reason"
]

export const HIGH_RISK_STATE_COLUMN_NAMES = [
    "State", "Reason"
]

export const TOP_N_STATES_FIELDS = [
           "state", "anemia_women", "bmi_low",
           "child_mortality_rate", "risk_score","score_band"
]

export const TOP_N_STATES_COLUMN_NAMES = [
            "State", "Anemia Women (%)", "BMI Low (%)",
           "Child Mortality Rate (%)", "Risk Score (%)","Score Band"
]

export const METRICS = [
     "anemia_women", "bmi_low", "child_mortality_rate", 
    "female_education_years", "rural_population"
]

export const METRIC_FIELDS_TO_COLUMN_NAMES_MAP = {
    "anemia_women": "Anemia Women (%)" , 
    "bmi_low" : "BMI Low (%)" , 
    "child_mortality_rate" : "Child Mortality Rate (%)", 
    "female_education_years": "Female Education (Years)" , 
    "rural_population": "Rural Population (%)"
}