data "graphql_query" "get_pesto_project_query" {
  query_variables = {
    # id = "65ad3ef7cfe51bc67ad3adf7" # "${var.pesto_project_id}"
    # id = "65ad3ef7cfe51bc67ad3adf7"
    id = "65ad3ef7cfe51bc67ad3adf7"
  }
  # query           = file("./.terraform/updatePestoProject/grapqhql/mutations/updatePestoProject.gql")
  query = file("./grapqhql/projects/queries/getPestoProjectByID.gql")
}

# ---
# The terraform state is locked while terraform is running: 
# we can't declare a terraform remote state to read the 
# state of the currently runnng terraform
# --- 
# data "terraform_remote_state" "pesto_project_state" {
#   backend = "local"
# 
#   config = {
#     path = "./terraform.tfstate"
#   }
# }
