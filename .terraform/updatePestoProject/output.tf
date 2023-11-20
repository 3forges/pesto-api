output "existing_pesto_project" {
  value = data.graphql_query.get_pesto_project_query
}

# output "pesto_project_input_id" {
#   value = var.pesto_project_id
# }

output "provisioned_pesto_project" {
  # value = graphql_mutation.pesto_project_mutation.computed_delete_operation_variables
  # value = graphql_mutation.pesto_project_mutation.computed_read_operation_variables
  # value = graphql_mutation.pesto_project_mutation.computed_update_operation_variables
  value = graphql_mutation.pesto_project_mutation.query_response

}