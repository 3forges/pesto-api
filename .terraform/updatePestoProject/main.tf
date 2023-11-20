
resource "graphql_mutation" "pesto_project_mutation" {

  # ------------------------------
  #  │ Error: Value for unconfigurable attribute
  #     
  #     with graphql_mutation.pesto_project_mutation,
  #     on main.tf line 3, in resource "graphql_mutation" "pesto_project_mutation":
  #      3:   computed_delete_operation_variables = {
  #      4:     "id" = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
  #      5:   }
  #     
  #     Can't configure a value for "computed_delete_operation_variables": its
  #     value will be decided automatically based on the result of applying this
  #     configuration.
  # -----------------------------------------
  # computed_delete_operation_variables = {
  #   "id" = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
  # }
  # -----------------------------------------
  mutation_variables = {
    "id"          = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
    "name"        = "nom donné par terraform pour pesto-terraform-provider3"
    "git_ssh_uri" = "git@github.com:pesto/pesto-terraform-provider3.git"
    "description" = "Desciption donnée par terraform"
    # "email" = "thewurst@jimmydean.com"
    # "phone" = "\"1234567890\"" // Interpret as string
    # "age" = "25" // This is interpreted as an integer
  }
  read_query_variables = {
    "id" = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                   = "_id"
    "name"                 = "name"
    "git_ssh_uri"          = "git_ssh_uri"
    "description"          = "description"
    "git_service_provider" = "git_service_provider"
    # "id" = "655aa15ab32ce40270e9a306"
    # "id" = "6526bb5df88cd05417311b3c" # "${var.pesto_project_id}"
  }
  delete_mutation_variables = {
    "id" = "655aa15ab32ce40270e9a306"
  }
  create_mutation = file("./grapqhql/mutations/createPestoProject.gql")
  update_mutation = file("./grapqhql/mutations/updatePestoProjectByID.gql")
  delete_mutation = file("./grapqhql/mutations/deletePestoProjectByID.gql")
  read_query      = file("./grapqhql/queries/getPestoProjectByID.gql")
}