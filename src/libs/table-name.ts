const productionPrefix = process.env.NEXT_PUBLIC_DB_PREFIX || ""

export const SITUATION_TABLE = productionPrefix + "situations"
export const USER_TABLE = productionPrefix + "users"
export const SUBSCRIPTION_TABLE = productionPrefix + "subscriptions"
