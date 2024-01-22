
resource "graphql_mutation" "pesto_project_example1" {

  # ------------------------------
  #  │ Error: Value for unconfigurable attribute
  #     
  #     with graphql_mutation.pesto_project_example1,
  #     on main.tf line 3, in resource "graphql_mutation" "pesto_project_example1":
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
    # "id" = ""
    # "id"          = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
    "name"                 = "modifié OUIIIII Exemple VRAIMENT modifié avec la mutation [UpdateProject] de Projet Pesto numéro 2 : nom donné par terraform"
    "git_ssh_uri"          = "git@github.com:pesto/godzillaRocks-modifiée.git"
    "description"          = "modifié - Description de l'exemple de Projet Pesto numéro 1: définie par terraform aussi"
    "git_service_provider" = "giteaKorea"
    # "phone" = "\"1234567890\"" // Interpret as string
    # "age" = "25" // This is interpreted as an integer
  }
  # ---
  # read_query_variables = {
  #   # "id" = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
  #   "id" = "[compute_from_create] is set to [false], so the create mutation takes me as [_id] paramater value" # this won't work for the Read Query, but it heled debugging
  #   # "id" = "pestoProject._id"
  # }
  # ---
  # https://github.com/sullivtr/terraform-provider-graphql/issues/77#issuecomment-1297997561
  # ---
  # If [compute_from_create] is set to [false], I get this error : 
  # ╷
  # │ Error: Attempt to get attribute from null value
  # │
  # │   on output.tf line 18, in output "provisioned_pesto_project_generated_pesto_id":
  # │   18:   value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables.id
  # │     ├────────────────
  # │     │ graphql_mutation.pesto_project_example1.computed_delete_operation_variables is null
  # │
  # │ This value is null, so it does not have any attributes.
  # ╵
  # ---
  # Omy, I ot it from the API logs : 
  # If [compute_from_create = false], then the 
  # create mutation will get its parameters 
  # values from the [read_query_variables]
  compute_from_create = true

  compute_mutation_keys = {
    "id"                   = "createPestoProject._id"
    "name"                 = "createPestoProject.name"
    "git_ssh_uri"          = "createPestoProject.git_ssh_uri"
    "description"          = "createPestoProject.description"
    "git_service_provider" = "createPestoProject.git_service_provider"
  }

  # --- The response I get with Apollo Browser for a get project query : 
  # {
  #   "data": {
  #     "pestoProject": {
  #       "_id": "655bf9c73bba23547e432df5",
  #       "name": "savoirfaire",
  #       "description": "Ce projet pesto a été créé par Mutation dans le Browser apollo",
  #       "createdAt": "2023-11-21T00:28:55.180Z",
  #       "deletedAt": null
  #     }
  #   }
  # }
  # --- The response I get with Apollo Browser for a create project mutation : 
  # {
  #  "data": {
  #    "createPestoProject": {
  #      "_id": "655bf18d10e5a17e9d4fa512",
  #      "name": "savoirfaire",
  #      "git_ssh_uri": "git@github.com:3forges/savoirfaire.git",
  #      "description": "Ce projet pesto a été créé par Mutation dans le Browser apollo",
  #      "git_service_provider": "github"
  #    }
  #  }
  # }
  # ---- An example usage of [compute_mutation_keys] found at https://github.com/sullivtr/terraform-provider-graphql/issues/36#issue-906122022
  # 
  # compute_mutation_keys = {
  #   "srn" = "CreateSonraiInvites.items.srn"
  # }
  # read_query_variables = {
  #   "srn" = "SonraiInvites.items.srn"
  # }
  delete_mutation_variables = {
    # "_id" = "655bed2110e5a17e9d4fa4de"
    # "id"                   = "deleteProject.id"
    # "message"                   = "message"
    # "deletedProject"                   = "deleteProject.deletedProject.name"
  }

  create_mutation = file("./grapqhql/projects/mutations/createPestoProject.gql")
  update_mutation = file("./grapqhql/projects/mutations/updatePestoProjectByID.gql")
  delete_mutation = file("./grapqhql/projects/mutations/deletePestoProjectByID.gql")
  read_query      = file("./grapqhql/projects/queries/getPestoProjectByID.gql")
}


# ---
# This one, we want to try and import it:
# > We will first create it 
# > Then we 'll remove it from the terraform state
# > And finally we will import it, as if it was exsiting
resource "graphql_mutation" "pesto_project_example2" {

  # ------------------------------
  #  │ Error: Value for unconfigurable attribute
  #     
  #     with graphql_mutation.pesto_project_example1,
  #     on main.tf line 3, in resource "graphql_mutation" "pesto_project_example1":
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
    # "id" = ""
    # "id"          = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
    "name"                 = "modifié - That's a second Pesto project created with terraform"
    "git_ssh_uri"          = "git@github.com:pesto/butMothraRules-modifiiiieed.git"
    "description"          = "modifié - Et ceci est donc la description du second projet pesto créé avec terraform"
    "git_service_provider" = "gitchiRocks"
    # "phone" = "\"1234567890\"" // Interpret as string
    # "age" = "25" // This is interpreted as an integer
  }
  # ---
  # read_query_variables = {
  #   # "id" = "655aa15ab32ce40270e9a306" # "${var.pesto_project_id}"
  #   "id" = "[compute_from_create] is set to [false], so the create mutation takes me as [_id] paramater value" # this won't work for the Read Query, but it heled debugging
  #   # "id" = "pestoProject._id"
  # }
  # ---
  # https://github.com/sullivtr/terraform-provider-graphql/issues/77#issuecomment-1297997561
  # ---
  # If [compute_from_create] is set to [false], I get this error : 
  # ╷
  # │ Error: Attempt to get attribute from null value
  # │
  # │   on output.tf line 18, in output "provisioned_pesto_project_generated_pesto_id":
  # │   18:   value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables.id
  # │     ├────────────────
  # │     │ graphql_mutation.pesto_project_example1.computed_delete_operation_variables is null
  # │
  # │ This value is null, so it does not have any attributes.
  # ╵
  # ---
  # Omy, I ot it from the API logs : 
  # If [compute_from_create = false], then the 
  # create mutation will get its parameters 
  # values from the [read_query_variables]
  compute_from_create = true

  compute_mutation_keys = {
    "id"                   = "createPestoProject._id"
    "name"                 = "createPestoProject.name"
    "git_ssh_uri"          = "createPestoProject.git_ssh_uri"
    "description"          = "createPestoProject.description"
    "git_service_provider" = "createPestoProject.git_service_provider"
  }

  # --- The response I get with Apollo Browser for a get project query : 
  # {
  #   "data": {
  #     "pestoProject": {
  #       "_id": "655bf9c73bba23547e432df5",
  #       "name": "savoirfaire",
  #       "description": "Ce projet pesto a été créé par Mutation dans le Browser apollo",
  #       "createdAt": "2023-11-21T00:28:55.180Z",
  #       "deletedAt": null
  #     }
  #   }
  # }
  # --- The response I get with Apollo Browser for a create project mutation : 
  # {
  #  "data": {
  #    "createPestoProject": {
  #      "_id": "655bf18d10e5a17e9d4fa512",
  #      "name": "savoirfaire",
  #      "git_ssh_uri": "git@github.com:3forges/savoirfaire.git",
  #      "description": "Ce projet pesto a été créé par Mutation dans le Browser apollo",
  #      "git_service_provider": "github"
  #    }
  #  }
  # }
  # ---- An example usage of [compute_mutation_keys] found at https://github.com/sullivtr/terraform-provider-graphql/issues/36#issue-906122022
  # 
  # compute_mutation_keys = {
  #   "srn" = "CreateSonraiInvites.items.srn"
  # }
  # read_query_variables = {
  #   "srn" = "SonraiInvites.items.srn"
  # }
  delete_mutation_variables = {
    # "_id" = "655bed2110e5a17e9d4fa4de"
    # "id"                   = "deleteProject.id"
    # "message"                   = "message"
    # "deletedProject"                   = "deleteProject.deletedProject.name"
  }

  create_mutation = file("./grapqhql/projects/mutations/createPestoProject.gql")
  update_mutation = file("./grapqhql/projects/mutations/updatePestoProjectByID.gql")
  delete_mutation = file("./grapqhql/projects/mutations/deletePestoProjectByID.gql")
  read_query      = file("./grapqhql/projects/queries/getPestoProjectByID.gql")
}
