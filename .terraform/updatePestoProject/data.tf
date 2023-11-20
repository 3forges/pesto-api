data "graphql_query" "get_pesto_project_query" {
  query_variables = {
    id = "6526bb5df88cd05417311b3c" # "${var.pesto_project_id}"
  }
  # query           = file("./.terraform/updatePestoProject/grapqhql/mutations/updatePestoProject.gql")
  query = file("./grapqhql/queries/getPestoProjectByID.gql")
}
