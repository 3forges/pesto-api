# output "existing_pesto_project" {
#   value = data.graphql_query.get_pesto_project_query
# }
output "provisioned_pesto_project" {
  # value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_update_operation_variables
  value = graphql_mutation.pesto_project_example1

}

# --
#  data.terraform_remote_state.pesto_project_state.outputs.provisioned_pesto_project_generated_pesto_id
output "provisioned_pesto_project_generated_pesto_id" {
  value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables.id
  # value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
}


output "provisioned_pesto_project_query_response_generated_pesto_id" {
  value = jsondecode(graphql_mutation.pesto_project_example1.query_response).data.pestoProject._id
  # ["data"] # .pestoProject._id
}



















output "provisioned_pesto_project_generated_pesto_id_from_computed_read_operation_variables" {
  # value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_update_operation_variables
  value = graphql_mutation.pesto_project_example1.computed_read_operation_variables.id

}

output "provisioned_pesto_project_mutation_variables" {
  # value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_update_operation_variables
  value = graphql_mutation.pesto_project_example1.mutation_variables

}



output "provisioned_pesto_project_computed_read_operation_variables" {
  # value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_update_operation_variables
  value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
}


output "provisioned_pesto_project_create_mutation" {
  # value = graphql_mutation.pesto_project_example1.computed_delete_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_read_operation_variables
  # value = graphql_mutation.pesto_project_example1.computed_update_operation_variables
  value = graphql_mutation.pesto_project_example1.create_mutation

}

output "provisioned_pesto_project_id" {
  value = graphql_mutation.pesto_project_example1.id
}

output "provisioned_pesto_project_query_response_input_key_map" {
  value = graphql_mutation.pesto_project_example1.query_response_input_key_map
}

output "provisioned_pesto_project_query_response" {
  value = graphql_mutation.pesto_project_example1.query_response
}

output "provisioned_pesto_project_existing_hash" {
  value = graphql_mutation.pesto_project_example1.existing_hash
}
