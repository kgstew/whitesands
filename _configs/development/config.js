module.exports = {
  APP_ENV: process.env.NODE_ENV === "production" ? "prod" : "dev",
  MY_GLOBAL_VARIABLE: process.env.NODE_ENV === "production" ? "foo" : "bar"
}