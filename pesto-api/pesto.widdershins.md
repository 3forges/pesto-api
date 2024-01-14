---
title: Pesto API v1.0
language_tabs:
  - "'shell": Shell'
  - "'typescript": TypeScript'
  - "'ruby": Ruby'
  - "'python": Python'
language_clients:
  - "'shell": ""
  - "'typescript": ""
  - "'ruby": ""
  - "'python": ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="pesto-api">Pesto API v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

The Pesto API purpose is to manage the content of your website, using the power of headless CMS. Pesto is in the Git-based CMS gang.

Base URLs:

<h1 id="pesto-api-default">Default</h1>

## AppController_getHello

<a id="opIdAppController_getHello"></a>

> Code samples

`GET /`

<h3 id="appcontroller_gethello-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_index

<a id="opIdPestoProjectController_index"></a>

> Code samples

`GET /pesto-project`

<h3 id="pestoprojectcontroller_index-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_create

<a id="opIdPestoProjectController_create"></a>

> Code samples

`POST /pesto-project`

> Body parameter

```json
{}
```

<h3 id="pestoprojectcontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreatePestoProjectDto](#schemacreatepestoprojectdto)|true|none|

<h3 id="pestoprojectcontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_find

<a id="opIdPestoProjectController_find"></a>

> Code samples

`GET /pesto-project/{id}`

<h3 id="pestoprojectcontroller_find-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="pestoprojectcontroller_find-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_update

<a id="opIdPestoProjectController_update"></a>

> Code samples

`PUT /pesto-project/{id}`

> Body parameter

```json
{}
```

<h3 id="pestoprojectcontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdatePestoProjectDto](#schemaupdatepestoprojectdto)|true|none|

<h3 id="pestoprojectcontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_delete

<a id="opIdPestoProjectController_delete"></a>

> Code samples

`DELETE /pesto-project/{id}`

<h3 id="pestoprojectcontroller_delete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="pestoprojectcontroller_delete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_findByName

<a id="opIdPestoProjectController_findByName"></a>

> Code samples

`GET /pesto-project/name/{name}`

<h3 id="pestoprojectcontroller_findbyname-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="pestoprojectcontroller_findbyname-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoProjectController_findByURI

<a id="opIdPestoProjectController_findByURI"></a>

> Code samples

`GET /pesto-project/uri/{git_ssh_uri}`

<h3 id="pestoprojectcontroller_findbyuri-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|git_ssh_uri|path|string|true|none|

<h3 id="pestoprojectcontroller_findbyuri-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentController_index

<a id="opIdPestoContentController_index"></a>

> Code samples

`GET /pesto-content`

<h3 id="pestocontentcontroller_index-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentController_create

<a id="opIdPestoContentController_create"></a>

> Code samples

`POST /pesto-content`

> Body parameter

```json
{}
```

<h3 id="pestocontentcontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreatePestoContentDto](#schemacreatepestocontentdto)|true|none|

<h3 id="pestocontentcontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentController_find

<a id="opIdPestoContentController_find"></a>

> Code samples

`GET /pesto-content/{id}`

<h3 id="pestocontentcontroller_find-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="pestocontentcontroller_find-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentController_update

<a id="opIdPestoContentController_update"></a>

> Code samples

`PUT /pesto-content/{id}`

> Body parameter

```json
{}
```

<h3 id="pestocontentcontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdatePestoContentDto](#schemaupdatepestocontentdto)|true|none|

<h3 id="pestocontentcontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentController_delete

<a id="opIdPestoContentController_delete"></a>

> Code samples

`DELETE /pesto-content/{id}`

<h3 id="pestocontentcontroller_delete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="pestocontentcontroller_delete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentController_findByProject

<a id="opIdPestoContentController_findByProject"></a>

> Code samples

`GET /pesto-content/project/{project_id}`

<h3 id="pestocontentcontroller_findbyproject-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_id|path|string|true|none|

<h3 id="pestocontentcontroller_findbyproject-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="pesto-api-pestocontenttype">PestoContentType</h1>

## Get all PestoContentTypes

<a id="opIdPestoContentTypeController_index"></a>

> Code samples

`GET /pesto-content-type`

> Example responses

> 200 Response

```json
[
  {
    "frontmatter_schema": "{ \"prix\" 45, devise: \"eur\", tailles_dispos: [{ \"xs\": \"Extra-small\", \"s\": \"small\", \"M\": \"medium\", \"L\": \"Large\", \"XL\": \"Extra-Large\", \"XXL\": \"Extra-Extra-Large\"  }] }",
    "frontmatter_format": "JSON",
    "description": "This Content Type represents a pair of shoe, with its size, its color, its price, the trademark, the model.",
    "identifier": "trousers"
  }
]
```

<h3 id="get-all-pestocontenttypes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns all of the PestoContentType s|Inline|

<h3 id="get-all-pestocontenttypes-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[PestoContentType](#schemapestocontenttype)]|false|none|none|
|» frontmatter_schema|function|true|none|The schema of the frontmatter, specified with an example (stringified) JSON, will be converted to a JSON Schema by the [quicktypes] framework|
|» frontmatter_format|[FRONTMATTER_FORMAT](#schemafrontmatter_format)|true|none|none|
|» description|function|true|none|The description of this PestoContentType|
|» identifier|function|true|none|The <code>identifier</code> to use as value of 'type: <identifier>' in the frontmatter of a markdown|

#### Enumerated Values

|Property|Value|
|---|---|
|frontmatter_format|JSON|
|frontmatter_format|YAML|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentTypeController_create

<a id="opIdPestoContentTypeController_create"></a>

> Code samples

`POST /pesto-content-type`

Create a {PestoContentType} of a given {PestoProject}

> Body parameter

```json
{}
```

<h3 id="pestocontenttypecontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreatePestoContentTypeDto](#schemacreatepestocontenttypedto)|true|none|

<h3 id="pestocontenttypecontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get a PestoContentType by ID ([_id] in MongoDB)

<a id="opIdPestoContentTypeController_find"></a>

> Code samples

`GET /pesto-content-type/{id}`

<h3 id="get-a-pestocontenttype-by-id-([_id]-in-mongodb)-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
[
  {
    "frontmatter_schema": "{ \"prix\" 45, devise: \"eur\", tailles_dispos: [{ \"xs\": \"Extra-small\", \"s\": \"small\", \"M\": \"medium\", \"L\": \"Large\", \"XL\": \"Extra-Large\", \"XXL\": \"Extra-Extra-Large\"  }] }",
    "frontmatter_format": "JSON",
    "description": "This Content Type represents a pair of shoe, with its size, its color, its price, the trademark, the model.",
    "identifier": "trousers"
  }
]
```

<h3 id="get-a-pestocontenttype-by-id-([_id]-in-mongodb)-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Returns ae [PestoContentType] from its ID ([_id] in MongoDB)|Inline|

<h3 id="get-a-pestocontenttype-by-id-([_id]-in-mongodb)-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[PestoContentType](#schemapestocontenttype)]|false|none|none|
|» frontmatter_schema|function|true|none|The schema of the frontmatter, specified with an example (stringified) JSON, will be converted to a JSON Schema by the [quicktypes] framework|
|» frontmatter_format|[FRONTMATTER_FORMAT](#schemafrontmatter_format)|true|none|none|
|» description|function|true|none|The description of this PestoContentType|
|» identifier|function|true|none|The <code>identifier</code> to use as value of 'type: <identifier>' in the frontmatter of a markdown|

#### Enumerated Values

|Property|Value|
|---|---|
|frontmatter_format|JSON|
|frontmatter_format|YAML|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentTypeController_update

<a id="opIdPestoContentTypeController_update"></a>

> Code samples

`PUT /pesto-content-type/{id}`

> Body parameter

```json
{}
```

<h3 id="pestocontenttypecontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdatePestoContentTypeDto](#schemaupdatepestocontenttypedto)|true|none|

<h3 id="pestocontenttypecontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentTypeController_delete

<a id="opIdPestoContentTypeController_delete"></a>

> Code samples

`DELETE /pesto-content-type/{id}`

<h3 id="pestocontenttypecontroller_delete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="pestocontenttypecontroller_delete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## findByProject

<a id="opIdfindByProject"></a>

> Code samples

`GET /pesto-content-type/project/{project_id}`

Get all PestoContentType of a given PestoProject

> Body parameter

<h3 id="findbyproject-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_id|path|string|true|none|

<h3 id="findbyproject-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_FRONTMATTER_FORMAT">FRONTMATTER_FORMAT</h2>
<!-- backwards compatibility -->
<a id="schemafrontmatter_format"></a>
<a id="schema_FRONTMATTER_FORMAT"></a>
<a id="tocSfrontmatter_format"></a>
<a id="tocsfrontmatter_format"></a>

```json
"JSON"

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|JSON|
|*anonymous*|YAML|

<h2 id="tocS_PestoContentType">PestoContentType</h2>
<!-- backwards compatibility -->
<a id="schemapestocontenttype"></a>
<a id="schema_PestoContentType"></a>
<a id="tocSpestocontenttype"></a>
<a id="tocspestocontenttype"></a>

```json
{
  "frontmatter_schema": "{ \"prix\" 45, devise: \"eur\", tailles_dispos: [{ \"xs\": \"Extra-small\", \"s\": \"small\", \"M\": \"medium\", \"L\": \"Large\", \"XL\": \"Extra-Large\", \"XXL\": \"Extra-Extra-Large\"  }] }",
  "frontmatter_format": "JSON",
  "description": "This Content Type represents a pair of shoe, with its size, its color, its price, the trademark, the model.",
  "identifier": "trousers"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|frontmatter_schema|function|true|none|The schema of the frontmatter, specified with an example (stringified) JSON, will be converted to a JSON Schema by the [quicktypes] framework|
|frontmatter_format|[FRONTMATTER_FORMAT](#schemafrontmatter_format)|true|none|The format of the frontmatter, either JSON, or YAML, for the PestoContentType|
|description|function|true|none|The description of this PestoContentType|
|identifier|function|true|none|The <code>identifier</code> to use as value of 'type: <identifier>' in the frontmatter of a markdown|

<h2 id="tocS_CreatePestoContentTypeDto">CreatePestoContentTypeDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatepestocontenttypedto"></a>
<a id="schema_CreatePestoContentTypeDto"></a>
<a id="tocScreatepestocontenttypedto"></a>
<a id="tocscreatepestocontenttypedto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_UpdatePestoContentTypeDto">UpdatePestoContentTypeDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatepestocontenttypedto"></a>
<a id="schema_UpdatePestoContentTypeDto"></a>
<a id="tocSupdatepestocontenttypedto"></a>
<a id="tocsupdatepestocontenttypedto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreatePestoProjectDto">CreatePestoProjectDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatepestoprojectdto"></a>
<a id="schema_CreatePestoProjectDto"></a>
<a id="tocScreatepestoprojectdto"></a>
<a id="tocscreatepestoprojectdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_UpdatePestoProjectDto">UpdatePestoProjectDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatepestoprojectdto"></a>
<a id="schema_UpdatePestoProjectDto"></a>
<a id="tocSupdatepestoprojectdto"></a>
<a id="tocsupdatepestoprojectdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreatePestoContentDto">CreatePestoContentDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatepestocontentdto"></a>
<a id="schema_CreatePestoContentDto"></a>
<a id="tocScreatepestocontentdto"></a>
<a id="tocscreatepestocontentdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_UpdatePestoContentDto">UpdatePestoContentDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatepestocontentdto"></a>
<a id="schema_UpdatePestoContentDto"></a>
<a id="tocSupdatepestocontentdto"></a>
<a id="tocsupdatepestocontentdto"></a>

```json
{}

```

### Properties

*None*

