# ---
# 
resource "graphql_mutation" "pesto_project_example4" {
  mutation_variables = {
    "name"        = "project4 - That's a third Pesto project created with terraform"
    "git_ssh_uri" = "git@github.com:pesto/project4.git"
    "description" = "Description of project4 - Et ceci est donc la description du troisième projet pesto créé avec terraform"
    "git_service_provider" = "gitMePlease"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                   = "createPestoProject._id"
    "name"                 = "createPestoProject.name"
    "git_ssh_uri"          = "createPestoProject.git_ssh_uri"
    "description"          = "createPestoProject.description"
    "git_service_provider" = "createPestoProject.git_service_provider"
  }
  create_mutation = file("./grapqhql/projects/mutations/createPestoProject.gql")
  update_mutation = file("./grapqhql/projects/mutations/updatePestoProjectByID.gql")
  delete_mutation = file("./grapqhql/projects/mutations/deletePestoProjectByID.gql")
  read_query      = file("./grapqhql/projects/queries/getPestoProjectByID.gql")
}