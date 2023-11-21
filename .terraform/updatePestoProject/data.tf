data "graphql_query" "get_pesto_project_query" {
  query_variables = {
    id = "6526bb5df88cd05417311b3c" # "${var.pesto_project_id}"
  }
  # query           = file("./.terraform/updatePestoProject/grapqhql/mutations/updatePestoProject.gql")
  query = file("./grapqhql/queries/getPestoProjectByID.gql")
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
# output.provisioned_pesto_project_generated_pesto_id