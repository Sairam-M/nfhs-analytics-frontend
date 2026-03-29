export const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const UPLOAD_FILE_END_POINT = "/upload"
export const GET_ALL_STATES_END_POINT = "/states"
export const GET_HIGH_RISK_STATES_END_POINT = "/high-risk-states"
export const GET_RISK_SCORES_END_POINT = "/risk-scores"
export const GET_DEMOGRPAHICS_END_POINT = "/demographics"


export const DEMOGRAPICS_FIELDS = [
    "state", "anemia_women", "bmi_low", "child_mortality_rate", 
    "female_education_years", "rural_population"
]

export const DEMOGRAPICS_COLUMN_NAMES = [
    "State", "Anemia Women (%)", "BMI Low (%)", "Child Mortality Rate (%)", 
    "Female Education (Years)", "Rural Population (%)"
]