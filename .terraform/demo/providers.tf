# https://github.com/sullivtr/terraform-provider-graphql/issues/95
terraform {
  required_providers {
    graphql = {
      source = "sullivtr/graphql"
      # version = "~> 1.0"
      # configuration_aliases = [ mycloud.alternate ]
    }
  }
}

provider "graphql" {
  # url = "http://localhost:3000/graphql"
  url = "http://api.pesto.io:3000/graphql"
  headers = {
    "X-Pesto-Performed-By" = "terraform"
    "Content-Type"         = "application/json"
    "Accept"               = "application/json"
    # "header1" = "header1-value"
    # "header2" = "header2-value"
  }
  # oauth2_login_query = "mutation loginAPI($apiKey: String!) {loginAPI(apiKey: $apiKey) {accessToken}}"
  # oauth2_login_query_variables = {
  #   "apiKey" = "5555-44-33-99"
  # }
  # oauth2_login_query_value_attribute = "loginAPI.accessToken"
}




/*
provider "graphql" {
  url = "https://your-graphql-server-url"

  oauth2_login_query = "mutation loginAPI($apiKey: String!) {loginAPI(apiKey: $apiKey) {accessToken}}"
  oauth2_login_query_variables = {
    "apiKey" = "5555-44-33-99"
  }
  oauth2_login_query_value_attribute = "loginAPI.accessToken"
}
*/