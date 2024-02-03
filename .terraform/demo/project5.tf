# ---
# 
resource "graphql_mutation" "pesto_project_hydra" {
  mutation_variables = {
    "name"                 = "Hydra project5 - That's a third Pesto project created with terraform"
    "git_ssh_uri"          = "git@github.com:pesto/hydra-demo-bob.git"
    "description"          = "Description of Hydra project5 - Et ceci est donc la description du troisième projet pesto créé avec terraform"
    "git_service_provider" = "gitPesto"
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

# ---
# 
resource "graphql_mutation" "pesto_content_type_example1" {
  mutation_variables = {
    "name"                   = "TAS VU BOOOBBB This is a pesto content type created in the [Hydra project5] Pesto Project - That's a first Pesto Content Type created with terraform!!"
    "project_id"             = jsondecode(graphql_mutation.pesto_project_hydra.query_response).data.pestoProject._id
    "frontmatter_definition" = "Frontmatter definition of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
    "description"            = "Description of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                     = "createPestoContentType._id"
    "name"                   = "createPestoContentType.name"
    "project_id"             = "createPestoContentType.project_id"
    "frontmatter_definition" = "createPestoContentType.frontmatter_definition"
    "description"            = "createPestoContentType.description"
  }
  create_mutation = file("./grapqhql/content-types/mutations/createPestoContentType.gql")
  update_mutation = file("./grapqhql/content-types/mutations/updatePestoContentTypeByID.gql")
  delete_mutation = file("./grapqhql/content-types/mutations/deletePestoContentTypeByID.gql")
  read_query      = file("./grapqhql/content-types/queries/getPestoContentTypeByID.gql")
  depends_on = [
    graphql_mutation.pesto_project_hydra
  ]
}

resource "graphql_mutation" "pesto_content_type_jupes" {
  mutation_variables = {
    "name"                   = "jupe"
    "project_id"             = jsondecode(graphql_mutation.pesto_project_hydra.query_response).data.pestoProject._id
    "frontmatter_definition" = "Frontmatter definition of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
    "description"            = "Description of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                     = "createPestoContentType._id"
    "name"                   = "createPestoContentType.name"
    "project_id"             = "createPestoContentType.project_id"
    "frontmatter_definition" = "createPestoContentType.frontmatter_definition"
    "description"            = "createPestoContentType.description"
  }
  create_mutation = file("./grapqhql/content-types/mutations/createPestoContentType.gql")
  update_mutation = file("./grapqhql/content-types/mutations/updatePestoContentTypeByID.gql")
  delete_mutation = file("./grapqhql/content-types/mutations/deletePestoContentTypeByID.gql")
  read_query      = file("./grapqhql/content-types/queries/getPestoContentTypeByID.gql")
  depends_on = [
    graphql_mutation.pesto_project_hydra
  ]
}

resource "graphql_mutation" "pesto_content_type_chaussures" {
  mutation_variables = {
    "name"                   = "chaussure"
    "project_id"             = jsondecode(graphql_mutation.pesto_project_hydra.query_response).data.pestoProject._id
    "frontmatter_definition" = "Frontmatter definition of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
    "description"            = "Description of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                     = "createPestoContentType._id"
    "name"                   = "createPestoContentType.name"
    "project_id"             = "createPestoContentType.project_id"
    "frontmatter_definition" = "createPestoContentType.frontmatter_definition"
    "description"            = "createPestoContentType.description"
  }
  create_mutation = file("./grapqhql/content-types/mutations/createPestoContentType.gql")
  update_mutation = file("./grapqhql/content-types/mutations/updatePestoContentTypeByID.gql")
  delete_mutation = file("./grapqhql/content-types/mutations/deletePestoContentTypeByID.gql")
  read_query      = file("./grapqhql/content-types/queries/getPestoContentTypeByID.gql")
  depends_on = [
    graphql_mutation.pesto_project_hydra
  ]
}

resource "graphql_mutation" "pesto_content_type_big_spoon" {
  mutation_variables = {
    "name"                   = "cuillère à soupe"
    "project_id"             = jsondecode(graphql_mutation.pesto_project_example3_kingkong.query_response).data.pestoProject._id
    "frontmatter_definition" = "Frontmatter definition of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
    "description"            = "Description of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                     = "createPestoContentType._id"
    "name"                   = "createPestoContentType.name"
    "project_id"             = "createPestoContentType.project_id"
    "frontmatter_definition" = "createPestoContentType.frontmatter_definition"
    "description"            = "createPestoContentType.description"
  }
  create_mutation = file("./grapqhql/content-types/mutations/createPestoContentType.gql")
  update_mutation = file("./grapqhql/content-types/mutations/updatePestoContentTypeByID.gql")
  delete_mutation = file("./grapqhql/content-types/mutations/deletePestoContentTypeByID.gql")
  read_query      = file("./grapqhql/content-types/queries/getPestoContentTypeByID.gql")
  depends_on = [
    graphql_mutation.pesto_project_hydra
  ]
}

resource "graphql_mutation" "pesto_content_type_tea_spoon" {
  mutation_variables = {
    "name"                   = "cuillère à café"
    "project_id"             = jsondecode(graphql_mutation.pesto_project_example3_kingkong.query_response).data.pestoProject._id
    "frontmatter_definition" = "Frontmatter definition of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
    "description"            = "Description of the first Pesto Content Type, in the Hydra Pesto project, created with terraform!!"
  }
  compute_from_create = true
  compute_mutation_keys = {
    "id"                     = "createPestoContentType._id"
    "name"                   = "createPestoContentType.name"
    "project_id"             = "createPestoContentType.project_id"
    "frontmatter_definition" = "createPestoContentType.frontmatter_definition"
    "description"            = "createPestoContentType.description"
  }
  create_mutation = file("./grapqhql/content-types/mutations/createPestoContentType.gql")
  update_mutation = file("./grapqhql/content-types/mutations/updatePestoContentTypeByID.gql")
  delete_mutation = file("./grapqhql/content-types/mutations/deletePestoContentTypeByID.gql")
  read_query      = file("./grapqhql/content-types/queries/getPestoContentTypeByID.gql")
  depends_on = [
    graphql_mutation.pesto_project_hydra
  ]
}