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

## AppController_getCheerUp

<a id="opIdAppController_getCheerUp"></a>

> Code samples

`GET /cheerup`

<h3 id="appcontroller_getcheerup-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

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

## PestoContentTypeController_index

<a id="opIdPestoContentTypeController_index"></a>

> Code samples

`GET /pesto-content-type`

<h3 id="pestocontenttypecontroller_index-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentTypeController_create

<a id="opIdPestoContentTypeController_create"></a>

> Code samples

`POST /pesto-content-type`

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
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentTypeController_find

<a id="opIdPestoContentTypeController_find"></a>

> Code samples

`GET /pesto-content-type/{id}`

<h3 id="pestocontenttypecontroller_find-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="pestocontenttypecontroller_find-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

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

## PestoContentTypeController_findByName

<a id="opIdPestoContentTypeController_findByName"></a>

> Code samples

`GET /pesto-content-type/name/{name}`

<h3 id="pestocontenttypecontroller_findbyname-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|none|

<h3 id="pestocontenttypecontroller_findbyname-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## PestoContentTypeController_findByProjectID

<a id="opIdPestoContentTypeController_findByProjectID"></a>

> Code samples

`GET /pesto-content-type/project/{project_id}`

<h3 id="pestocontenttypecontroller_findbyprojectid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|project_id|path|string|true|none|

<h3 id="pestocontenttypecontroller_findbyprojectid-responses">Responses</h3>

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
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

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

## TsToZodController_create

<a id="opIdTsToZodController_create"></a>

> Code samples

`GET /ts-to-zod`

<h3 id="tstozodcontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

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

