# Testing the `Pesto API`

## E2E Tests Scenarii

Here are the scenarii I want to tests.

_**Scenario 1**_

- I create a new pesto project named `myfirstpestoproject`:
  - it has a **`name`**, value `myfirstpestoproject`
  - it has a **`description`**
  - it has a **`git url`**
  - it has a **`git service provider`**: `Gitlab` `Gitea`, or `Github`, or CustomGitService. _(custom git service is a service which is ran in private servers, using a different configuration than those of Github Gitea or Gitlab, so i will need the concept of a general Git Service Provider Config, which includes partial API definition, to define how to create a webhook, what is the payload of that webhook, how to integrate a given Git Service Provider event with the pipeline service)_.
  - _[DEPRECATED]_ It has a list of `PestoContentType`s. A Content-Type can be created without any content yet
  - _[DEPRECATED]_ It has a list of `PestoContent`s. No `PestoContent` can be created without an existing `PestoContentType`
- I create a `PestoContentType` named `robe`, in the project named `myfirstpestoproject` : from project creation request, i keep the `_id` of the `myfirstpestoproject` created project, and use it as `project_id`
- I create 2 `PestoContent` of type (`PestoContentType`) is `robe`, in the project `myfirstpestoproject`:
  - One named `Robe d'été rouge manoukian`
  - One other named `Robe mi-saison verte mango`
  - when i create the content type, if the frontmatter in the HTTP POST request payload,is not valid against the JSonSchema of the associated (`content_type_id`) `PestoContentType` (there exists a `React` component called [`react-yaml-form`](https://github.com/MaximeGoyette/react-yaml-form), you give it a `yaml`, you get the form). ideally the validation should happen on client side, so when i fill in the form, when the `content_type_id` is selected, (drop down list), then the content type is fetched, the JSonSchema is used to validate the frontmatter edited by the user filling in the form. the validation is also triggered everytime the JSON is edited. an the rest endpoint also runs the jsonschema validation before updating the mongothrough redux toolkit rtk.
- Now I want to list :
  - all `PestoContent` in a given `PestoProject` project
  - all `PestoContentType` of a given `PestoProject` project.
  - all `PestoContent` of a given `PestoContentType`, in a given `PestoProject` project.

## Tests automation

TODO
