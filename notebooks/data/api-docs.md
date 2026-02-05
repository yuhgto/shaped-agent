---
title: Shaped API v2.0.8
language_tabs:
  - python: Python
  - javascript: JavaScript
language_clients:
  - python: ""
  - javascript: ""
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="shaped-api">Shaped API v2.0.8</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Welcome to Shaped's API reference docs. These provide a 
detailed view of the endpoints and CLI commands that Shaped provides and brief 
explanations of how they should be used.

The Shaped API has four main endpoints:

**Tables** - Provision and manage batch and real-time data connectors. 

**Views** - Configure SQL transformations and AI enrichment on your input data.
Use SQL to combine multiple data sources or use an LLM to add new categories,
extract specific attributes from descriptions, etc.

**Engines** - Deploy and manage your relevance engines. The Engine API exposes
configuration for indexing logic, input datasets, externam embeddings, and
more.

**Query** - Execute queries against your engines, to return data based on an
input query or rerank an existing list. The Query API exposes the retrieve,
filter, score, and ranking steps of the 4-stage ranking architecture.

The base URL for each endpoint is: `https://api.shaped.ai/v2`

Base URLs:

* <a href="https://api.shaped.ai/v2">https://api.shaped.ai/v2</a>

<h1 id="shaped-api-table">Table</h1>

Tables store the foundational data for your relevance engines.<br/><br/>Tables are loaded to Shaped through connectors; batch connectors update data every 15 mins while real-time connectors are updated immediately.<br/><br/>

## Create Table

<a id="opIdpost_create_table_tables_post"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.post('https://api.shaped.ai/v2/tables', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "schema_type": "BIGQUERY",
  "name": "string",
  "description": "string",
  "table": "string",
  "columns": [
    "string"
  ],
  "datetime_key": "string",
  "schedule_interval": "@hourly",
  "filters": [
    "string"
  ],
  "start_datetime": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/tables',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /tables`

Creates a new Table.

Use this endpoint to configure the schema, column
structure, and metadata of the table. Use **Insert Table Rows** to add
rows to your table.

If you want to upload a local dataset, use the CLI: `shaped create_dataset_from_uri`

Schema type: Different sources have different configuration.
The `schema_type` argument specifies the type of table you are
creating (Snowflake, SQL, Amplitude, etc).

Unique keys and replication keys: Tables are append-only. In case of
duplicates, we use the `unique_keys` and `replication_key` attributes to
determine the correct value for a record.

> Body parameter

```json
{
  "schema_type": "BIGQUERY",
  "name": "string",
  "description": "string",
  "table": "string",
  "columns": [
    "string"
  ],
  "datetime_key": "string",
  "schedule_interval": "@hourly",
  "filters": [
    "string"
  ],
  "start_datetime": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}
```

<h3 id="create-table-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|none|
|body|body|any|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="create-table-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[CreateTableResponse](#schemacreatetableresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid credentials|[HttpProblemResponse](#schemahttpproblemresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Table already exists|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Request schema validation error|[HttpProblemResponse](#schemahttpproblemresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## Update Table

<a id="opIdpatch_update_table_tables_patch"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.patch('https://api.shaped.ai/v2/tables', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "schema_type": "BIGQUERY",
  "name": "string",
  "description": "string",
  "table": "string",
  "columns": [
    "string"
  ],
  "datetime_key": "string",
  "schedule_interval": "@hourly",
  "filters": [
    "string"
  ],
  "start_datetime": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/tables',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /tables`

Update the config of an existing table.

> Body parameter

```json
{
  "schema_type": "BIGQUERY",
  "name": "string",
  "description": "string",
  "table": "string",
  "columns": [
    "string"
  ],
  "datetime_key": "string",
  "schedule_interval": "@hourly",
  "filters": [
    "string"
  ],
  "start_datetime": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}
```

<h3 id="update-table-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|none|
|body|body|any|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="update-table-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[UpdateTableResponse](#schemaupdatetableresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid credentials|[HttpProblemResponse](#schemahttpproblemresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Table not found|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Request schema validation error|[HttpProblemResponse](#schemahttpproblemresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## List Tables

<a id="opIdget_tables_tables_get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.get('https://api.shaped.ai/v2/tables', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/tables',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /tables`

List the tables in your account and basic metadata like schema type and status.

<h3 id="list-tables-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "tables": [
    {
      "name": "string",
      "uri": "string",
      "created_at": "string",
      "schema_type": "string",
      "status": "string",
      "description": "string"
    }
  ]
}
```

<h3 id="list-tables-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[ListTablesResponse](#schemalisttablesresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Table Insert

<a id="opIdpost_table_insert_tables__table_name__insert_post"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.post('https://api.shaped.ai/v2/tables/{table_name}/insert', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "data": {
    "event": "click",
    "item_id": "item1",
    "timestamp": 1680116390,
    "user_id": "user1"
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/tables/{table_name}/insert',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /tables/{table_name}/insert`

Insert dictionary data into Shaped table. The schema must match the schema of the
table or it'll throw an error.

Tables are append-only. In case of duplicates, we use the `unique_keys`
and `replication_key` attributes to determine the correct value for a record.

Batch tables are updated every 15 minutes while real-time tables are
updated immediately.

> Body parameter

```json
{
  "data": {
    "event": "click",
    "item_id": "item1",
    "timestamp": 1680116390,
    "user_id": "user1"
  }
}
```

<h3 id="table-insert-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|table_name|path|string|true|Name of the table to insert data into.|
|x-api-key|header|string|true|none|
|body|body|[TableInsertArguments](#schematableinsertarguments)|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="table-insert-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[TableInsertResponse](#schematableinsertresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Rows do not match table schema|[HttpProblemResponse](#schemahttpproblemresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Table does not exist|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Delete Table

<a id="opIddelete_table_route_tables__table_name__delete"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.delete('https://api.shaped.ai/v2/tables/{table_name}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/tables/{table_name}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /tables/{table_name}`

Delete the table with identifier: {table_name}.

<h3 id="delete-table-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|table_name|path|string|true|Name of the table to delete.|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="delete-table-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DeleteTableResponse](#schemadeletetableresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Invalid Table Name|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="shaped-api-view">View</h1>

Transform your data into new formats or views using SQL statements or LLM-powered enrichment.

## Create View

<a id="opIdpost_create_view_views_post"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.post('https://api.shaped.ai/v2/views', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "name": "string",
  "transform_type": "SQL",
  "description": "string",
  "sql_query": "string",
  "sql_transform_type": "VIEW"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/views',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /views`

> Body parameter

```json
{
  "name": "string",
  "transform_type": "SQL",
  "description": "string",
  "sql_query": "string",
  "sql_transform_type": "VIEW"
}
```

<h3 id="create-view-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|none|
|body|body|any|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="create-view-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[CreateViewResponse](#schemacreateviewresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Update View

<a id="opIdpatch_update_view_views_patch"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.patch('https://api.shaped.ai/v2/views', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "name": "string",
  "transform_type": "SQL",
  "description": "string",
  "sql_query": "string",
  "sql_transform_type": "VIEW"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/views',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /views`

> Body parameter

```json
{
  "name": "string",
  "transform_type": "SQL",
  "description": "string",
  "sql_query": "string",
  "sql_transform_type": "VIEW"
}
```

<h3 id="update-view-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|none|
|body|body|any|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="update-view-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[UpdateViewResponse](#schemaupdateviewresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|View not found|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## List Views

<a id="opIdget_views_views_get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.get('https://api.shaped.ai/v2/views', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/views',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /views`

List all views for the authenticated tenant.

<h3 id="list-views-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "views": [
    {
      "name": "string",
      "uri": "string",
      "created_at": "string",
      "type": "string",
      "status": "string",
      "source_table_names": [
        "string"
      ],
      "description": "string"
    }
  ]
}
```

<h3 id="list-views-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[ListViewsResponse](#schemalistviewsresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Get View Details

<a id="opIdget_view_details_views__view_name__get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.get('https://api.shaped.ai/v2/views/{view_name}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/views/{view_name}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /views/{view_name}`

Get detailed information about a specific view.

<h3 id="get-view-details-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|view_name|path|string|true|Name of the view to retrieve.|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "uri": "string",
  "status": "ACTIVE",
  "created_at": "2019-08-24T14:15:22Z",
  "schema": {
    "property1": "string",
    "property2": "string"
  },
  "source_table_names": [
    "string"
  ],
  "description": "string",
  "error_message": "string",
  "type": "SQL"
}
```

<h3 id="get-view-details-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|View not found|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="get-view-details-responseschema">Response Schema</h3>

Status Code **200**

*Response Get View Details Views  View Name  Get*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Response Get View Details Views  View Name  Get|any|false|none|none|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ViewDetailsSQL](#schemaviewdetailssql)|false|none|none|
|»» name|string|true|none|Unique identifier for the view.|
|»» uri|string|true|none|URI to access the view.|
|»» status|[TransformStatus](#schematransformstatus)|true|none|none|
|»» created_at|string(date-time)|true|none|Timestamp when view was created.|
|»» schema|any|false|none|Schema definition mapping column names to value types.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» **additionalProperties**|any|false|none|none|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»»» *anonymous*|string|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»»» *anonymous*|[ValueType](#schemavaluetype)|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»»» *anonymous*|object|false|none|none|
|»»»»»» ValueType|[ValueType](#schemavaluetype)|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» source_table_names|[string]|true|none|List of source table names used by this view.|
|»» description|any|false|none|Optional description of the view.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» error_message|any|false|none|Error message if view is in error state.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» type|string|true|none|View type discriminator for SQL views.|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ViewDetailsAI](#schemaviewdetailsai)|false|none|none|
|»» name|string|true|none|Unique identifier for the view.|
|»» uri|string|true|none|URI to access the view.|
|»» status|[TransformStatus](#schematransformstatus)|true|none|none|
|»» created_at|string(date-time)|true|none|Timestamp when view was created.|
|»» schema|any|false|none|Schema definition mapping column names to value types.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» **additionalProperties**|any|false|none|none|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»»» *anonymous*|string|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»»» *anonymous*|[ValueType](#schemavaluetype)|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»»» *anonymous*|object|false|none|none|
|»»»»»» ValueType|[ValueType](#schemavaluetype)|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» source_table_names|[string]|true|none|List of source table names used by this view.|
|»» description|any|false|none|Optional description of the view.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» error_message|any|false|none|Error message if view is in error state.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» type|string|true|none|View type discriminator for AI enrichment views.|

#### Enumerated Values

|Property|Value|
|---|---|
|status|ACTIVE|
|status|SCHEDULING|
|status|BACKFILLING|
|status|DESTROYING|
|status|INACTIVE|
|status|ERROR|
|*anonymous*|Unknown|
|*anonymous*|Bytes|
|*anonymous*|String|
|*anonymous*|LowCardinality(String)|
|*anonymous*|Array(String)|
|*anonymous*|Array(Int64)|
|*anonymous*|Int32|
|*anonymous*|Int64|
|*anonymous*|Float|
|*anonymous*|Double|
|*anonymous*|Array(Float64)|
|*anonymous*|Bool|
|*anonymous*|DateTime|
|*anonymous*|Json|
|*anonymous*|ImageUrl|
|ValueType|Unknown|
|ValueType|Bytes|
|ValueType|String|
|ValueType|LowCardinality(String)|
|ValueType|Array(String)|
|ValueType|Array(Int64)|
|ValueType|Int32|
|ValueType|Int64|
|ValueType|Float|
|ValueType|Double|
|ValueType|Array(Float64)|
|ValueType|Bool|
|ValueType|DateTime|
|ValueType|Json|
|ValueType|ImageUrl|
|status|ACTIVE|
|status|SCHEDULING|
|status|BACKFILLING|
|status|DESTROYING|
|status|INACTIVE|
|status|ERROR|
|*anonymous*|Unknown|
|*anonymous*|Bytes|
|*anonymous*|String|
|*anonymous*|LowCardinality(String)|
|*anonymous*|Array(String)|
|*anonymous*|Array(Int64)|
|*anonymous*|Int32|
|*anonymous*|Int64|
|*anonymous*|Float|
|*anonymous*|Double|
|*anonymous*|Array(Float64)|
|*anonymous*|Bool|
|*anonymous*|DateTime|
|*anonymous*|Json|
|*anonymous*|ImageUrl|
|ValueType|Unknown|
|ValueType|Bytes|
|ValueType|String|
|ValueType|LowCardinality(String)|
|ValueType|Array(String)|
|ValueType|Array(Int64)|
|ValueType|Int32|
|ValueType|Int64|
|ValueType|Float|
|ValueType|Double|
|ValueType|Array(Float64)|
|ValueType|Bool|
|ValueType|DateTime|
|ValueType|Json|
|ValueType|ImageUrl|

<aside class="success">
This operation does not require authentication
</aside>

## Delete View

<a id="opIddelete_view_views__view_name__delete"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.delete('https://api.shaped.ai/v2/views/{view_name}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/views/{view_name}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /views/{view_name}`

<h3 id="delete-view-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|view_name|path|string|true|Name of the view to delete.|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="delete-view-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DeleteViewResponse](#schemadeleteviewresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="shaped-api-engine">Engine</h1>

Configure, monitor, and manage the core ranking and retrieval engines in your Shaped account.

## Create Engine

<a id="opIdpost_setup_engine_engines_post"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.post('https://api.shaped.ai/v2/engines', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "data": {
    "interaction_table": {
      "type": "query",
      "query": "string"
    },
    "user_table": {
      "type": "query",
      "query": "string"
    },
    "item_table": {
      "type": "query",
      "query": "string"
    },
    "schedule": "@hourly",
    "schema_override": {
      "user": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "item": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "interaction": {
        "label": {
          "name": "string",
          "type": "BinaryLabel"
        },
        "created_at": "string",
        "session_id": "string",
        "interaction_id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ]
      }
    },
    "compute": {
      "cpu_count": 4,
      "cpu_memory_gb": 16
    },
    "filters": [
      {
        "name": "string",
        "filter_table": {
          "type": "query",
          "query": "string"
        },
        "filter_type": {
          "user_id_column": "user_id",
          "item_id_column": "item_id",
          "index_type": "bloom_filter",
          "type": "personal"
        }
      }
    ]
  },
  "index": {
    "lexical_search": {
      "tokenizer": {
        "language": "en",
        "stemming": true,
        "ascii_folding": true,
        "remove_stop_words": true,
        "type": "stemmer"
      },
      "user_fields": [
        "string"
      ],
      "item_fields": [
        "string"
      ]
    },
    "embeddings": [
      {
        "name": "string",
        "encoder": {
          "model_name": "string",
          "user_fields": [
            "string"
          ],
          "item_fields": [
            "string"
          ],
          "type": "hugging_face",
          "batch_size": 256
        }
      }
    ],
    "user_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ],
    "item_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ]
  },
  "training": {
    "schedule": "@daily",
    "compute": {
      "gpu_type": "T4",
      "gpu_count": 1,
      "cpu_memory_gb": 16,
      "cpu_count": 4,
      "force_gpu": false,
      "disk_size_gb": 64
    },
    "data_split": {
      "strategy": "global"
    },
    "evaluation": {
      "enable": false,
      "candidate_source": "batch_iids",
      "filter_seen_items": false,
      "evaluation_top_k": 50
    },
    "models": [
      {
        "policy_type": "elsa",
        "name": "string",
        "event_values": [
          "string"
        ],
        "batch_size": 512,
        "n_epochs": 1,
        "factors": {
          "type": "tunable_int",
          "min": 10,
          "max": 200,
          "scale": "linear"
        },
        "lr": {
          "type": "tunable_float",
          "min": 0.01,
          "max": 0.1,
          "scale": "linear"
        },
        "device": "string",
        "strategy": "default",
        "patience": 3,
        "balance_labels": true
      }
    ],
    "tuning": {
      "total_jobs": 30,
      "parallel_jobs": 10
    }
  },
  "deployment": {
    "data_tier": "fast_tier",
    "rollout": {
      "strategy": {
        "type": "canary",
        "evaluation_period_minutes": 10
      }
    },
    "autoscaling": {
      "min_replicas": 1,
      "max_replicas": 20,
      "policy": {
        "type": "requests_per_second",
        "target_requests": 10
      }
    },
    "pagination": {
      "page_expiration_in_seconds": 0
    },
    "online_store": {
      "interaction_max_per_user": 30,
      "interaction_expiration_days": 90
    }
  },
  "queries": {
    "property1": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    },
    "property2": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    }
  },
  "version": "v2"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/engines',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /engines`

Create Engine creates a retrieval engine that can be used for any down-stream retrieval-search, ranking-recommendation and user-understanding use-case.The create engine endpoint will do some validation of the input request (including verifying connected datasets are active and validating the fetch SQL). It then asynchronously provisions your data pipelines, and training and serving infrastructure. Use the View Engine and List Engines endpoints to view the status of the underlying asynchronous setup request.

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "data": {
    "interaction_table": {
      "type": "query",
      "query": "string"
    },
    "user_table": {
      "type": "query",
      "query": "string"
    },
    "item_table": {
      "type": "query",
      "query": "string"
    },
    "schedule": "@hourly",
    "schema_override": {
      "user": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "item": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "interaction": {
        "label": {
          "name": "string",
          "type": "BinaryLabel"
        },
        "created_at": "string",
        "session_id": "string",
        "interaction_id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ]
      }
    },
    "compute": {
      "cpu_count": 4,
      "cpu_memory_gb": 16
    },
    "filters": [
      {
        "name": "string",
        "filter_table": {
          "type": "query",
          "query": "string"
        },
        "filter_type": {
          "user_id_column": "user_id",
          "item_id_column": "item_id",
          "index_type": "bloom_filter",
          "type": "personal"
        }
      }
    ]
  },
  "index": {
    "lexical_search": {
      "tokenizer": {
        "language": "en",
        "stemming": true,
        "ascii_folding": true,
        "remove_stop_words": true,
        "type": "stemmer"
      },
      "user_fields": [
        "string"
      ],
      "item_fields": [
        "string"
      ]
    },
    "embeddings": [
      {
        "name": "string",
        "encoder": {
          "model_name": "string",
          "user_fields": [
            "string"
          ],
          "item_fields": [
            "string"
          ],
          "type": "hugging_face",
          "batch_size": 256
        }
      }
    ],
    "user_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ],
    "item_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ]
  },
  "training": {
    "schedule": "@daily",
    "compute": {
      "gpu_type": "T4",
      "gpu_count": 1,
      "cpu_memory_gb": 16,
      "cpu_count": 4,
      "force_gpu": false,
      "disk_size_gb": 64
    },
    "data_split": {
      "strategy": "global"
    },
    "evaluation": {
      "enable": false,
      "candidate_source": "batch_iids",
      "filter_seen_items": false,
      "evaluation_top_k": 50
    },
    "models": [
      {
        "policy_type": "elsa",
        "name": "string",
        "event_values": [
          "string"
        ],
        "batch_size": 512,
        "n_epochs": 1,
        "factors": {
          "type": "tunable_int",
          "min": 10,
          "max": 200,
          "scale": "linear"
        },
        "lr": {
          "type": "tunable_float",
          "min": 0.01,
          "max": 0.1,
          "scale": "linear"
        },
        "device": "string",
        "strategy": "default",
        "patience": 3,
        "balance_labels": true
      }
    ],
    "tuning": {
      "total_jobs": 30,
      "parallel_jobs": 10
    }
  },
  "deployment": {
    "data_tier": "fast_tier",
    "rollout": {
      "strategy": {
        "type": "canary",
        "evaluation_period_minutes": 10
      }
    },
    "autoscaling": {
      "min_replicas": 1,
      "max_replicas": 20,
      "policy": {
        "type": "requests_per_second",
        "target_requests": 10
      }
    },
    "pagination": {
      "page_expiration_in_seconds": 0
    },
    "online_store": {
      "interaction_max_per_user": 30,
      "interaction_expiration_days": 90
    }
  },
  "queries": {
    "property1": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    },
    "property2": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    }
  },
  "version": "v2"
}
```

<h3 id="create-engine-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|API key for authentication.|
|body|body|[EngineConfigV2](#schemaengineconfigv2)|true|none|

> Example responses

> 200 Response

```json
{
  "engine_url": "string"
}
```

<h3 id="create-engine-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[SetupEngineResponse](#schemasetupengineresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid credentials|[HttpProblemResponse](#schemahttpproblemresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Table not found|[HttpProblemResponse](#schemahttpproblemresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Engine already exists|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Request schema validation error|[HttpProblemResponse](#schemahttpproblemresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## Update Engine

<a id="opIdpatch_update_engine_engines_patch"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.patch('https://api.shaped.ai/v2/engines', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "data": {
    "interaction_table": {
      "type": "query",
      "query": "string"
    },
    "user_table": {
      "type": "query",
      "query": "string"
    },
    "item_table": {
      "type": "query",
      "query": "string"
    },
    "schedule": "@hourly",
    "schema_override": {
      "user": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "item": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "interaction": {
        "label": {
          "name": "string",
          "type": "BinaryLabel"
        },
        "created_at": "string",
        "session_id": "string",
        "interaction_id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ]
      }
    },
    "compute": {
      "cpu_count": 4,
      "cpu_memory_gb": 16
    },
    "filters": [
      {
        "name": "string",
        "filter_table": {
          "type": "query",
          "query": "string"
        },
        "filter_type": {
          "user_id_column": "user_id",
          "item_id_column": "item_id",
          "index_type": "bloom_filter",
          "type": "personal"
        }
      }
    ]
  },
  "index": {
    "lexical_search": {
      "tokenizer": {
        "language": "en",
        "stemming": true,
        "ascii_folding": true,
        "remove_stop_words": true,
        "type": "stemmer"
      },
      "user_fields": [
        "string"
      ],
      "item_fields": [
        "string"
      ]
    },
    "embeddings": [
      {
        "name": "string",
        "encoder": {
          "model_name": "string",
          "user_fields": [
            "string"
          ],
          "item_fields": [
            "string"
          ],
          "type": "hugging_face",
          "batch_size": 256
        }
      }
    ],
    "user_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ],
    "item_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ]
  },
  "training": {
    "schedule": "@daily",
    "compute": {
      "gpu_type": "T4",
      "gpu_count": 1,
      "cpu_memory_gb": 16,
      "cpu_count": 4,
      "force_gpu": false,
      "disk_size_gb": 64
    },
    "data_split": {
      "strategy": "global"
    },
    "evaluation": {
      "enable": false,
      "candidate_source": "batch_iids",
      "filter_seen_items": false,
      "evaluation_top_k": 50
    },
    "models": [
      {
        "policy_type": "elsa",
        "name": "string",
        "event_values": [
          "string"
        ],
        "batch_size": 512,
        "n_epochs": 1,
        "factors": {
          "type": "tunable_int",
          "min": 10,
          "max": 200,
          "scale": "linear"
        },
        "lr": {
          "type": "tunable_float",
          "min": 0.01,
          "max": 0.1,
          "scale": "linear"
        },
        "device": "string",
        "strategy": "default",
        "patience": 3,
        "balance_labels": true
      }
    ],
    "tuning": {
      "total_jobs": 30,
      "parallel_jobs": 10
    }
  },
  "deployment": {
    "data_tier": "fast_tier",
    "rollout": {
      "strategy": {
        "type": "canary",
        "evaluation_period_minutes": 10
      }
    },
    "autoscaling": {
      "min_replicas": 1,
      "max_replicas": 20,
      "policy": {
        "type": "requests_per_second",
        "target_requests": 10
      }
    },
    "pagination": {
      "page_expiration_in_seconds": 0
    },
    "online_store": {
      "interaction_max_per_user": 30,
      "interaction_expiration_days": 90
    }
  },
  "queries": {
    "property1": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    },
    "property2": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    }
  },
  "version": "v2"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/engines',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /engines`

Update engine is used to update the configurations of a currently hosted engine within the ERROR or ACTIVE states.

> Body parameter

```json
{
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "data": {
    "interaction_table": {
      "type": "query",
      "query": "string"
    },
    "user_table": {
      "type": "query",
      "query": "string"
    },
    "item_table": {
      "type": "query",
      "query": "string"
    },
    "schedule": "@hourly",
    "schema_override": {
      "user": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "item": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "interaction": {
        "label": {
          "name": "string",
          "type": "BinaryLabel"
        },
        "created_at": "string",
        "session_id": "string",
        "interaction_id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ]
      }
    },
    "compute": {
      "cpu_count": 4,
      "cpu_memory_gb": 16
    },
    "filters": [
      {
        "name": "string",
        "filter_table": {
          "type": "query",
          "query": "string"
        },
        "filter_type": {
          "user_id_column": "user_id",
          "item_id_column": "item_id",
          "index_type": "bloom_filter",
          "type": "personal"
        }
      }
    ]
  },
  "index": {
    "lexical_search": {
      "tokenizer": {
        "language": "en",
        "stemming": true,
        "ascii_folding": true,
        "remove_stop_words": true,
        "type": "stemmer"
      },
      "user_fields": [
        "string"
      ],
      "item_fields": [
        "string"
      ]
    },
    "embeddings": [
      {
        "name": "string",
        "encoder": {
          "model_name": "string",
          "user_fields": [
            "string"
          ],
          "item_fields": [
            "string"
          ],
          "type": "hugging_face",
          "batch_size": 256
        }
      }
    ],
    "user_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ],
    "item_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ]
  },
  "training": {
    "schedule": "@daily",
    "compute": {
      "gpu_type": "T4",
      "gpu_count": 1,
      "cpu_memory_gb": 16,
      "cpu_count": 4,
      "force_gpu": false,
      "disk_size_gb": 64
    },
    "data_split": {
      "strategy": "global"
    },
    "evaluation": {
      "enable": false,
      "candidate_source": "batch_iids",
      "filter_seen_items": false,
      "evaluation_top_k": 50
    },
    "models": [
      {
        "policy_type": "elsa",
        "name": "string",
        "event_values": [
          "string"
        ],
        "batch_size": 512,
        "n_epochs": 1,
        "factors": {
          "type": "tunable_int",
          "min": 10,
          "max": 200,
          "scale": "linear"
        },
        "lr": {
          "type": "tunable_float",
          "min": 0.01,
          "max": 0.1,
          "scale": "linear"
        },
        "device": "string",
        "strategy": "default",
        "patience": 3,
        "balance_labels": true
      }
    ],
    "tuning": {
      "total_jobs": 30,
      "parallel_jobs": 10
    }
  },
  "deployment": {
    "data_tier": "fast_tier",
    "rollout": {
      "strategy": {
        "type": "canary",
        "evaluation_period_minutes": 10
      }
    },
    "autoscaling": {
      "min_replicas": 1,
      "max_replicas": 20,
      "policy": {
        "type": "requests_per_second",
        "target_requests": 10
      }
    },
    "pagination": {
      "page_expiration_in_seconds": 0
    },
    "online_store": {
      "interaction_max_per_user": 30,
      "interaction_expiration_days": 90
    }
  },
  "queries": {
    "property1": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    },
    "property2": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    }
  },
  "version": "v2"
}
```

<h3 id="update-engine-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|API key for authentication.|
|body|body|[EngineConfigV2](#schemaengineconfigv2)|true|none|

> Example responses

> 200 Response

```json
{
  "engine_url": "string"
}
```

<h3 id="update-engine-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[SetupEngineResponse](#schemasetupengineresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Invalid credentials|[HttpProblemResponse](#schemahttpproblemresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Table not found|[HttpProblemResponse](#schemahttpproblemresponse)|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Engine already exists|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Request schema validation error|[HttpProblemResponse](#schemahttpproblemresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## List Engines

<a id="opIdget_engines_engines_get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.get('https://api.shaped.ai/v2/engines', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/engines',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /engines`

List Engines returns a list of your previously created engines and their associated metadata (e.g. status and last train time).

<h3 id="list-engines-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "engines": [
    {
      "engine_name": "string",
      "description": "string",
      "engine_uri": "string",
      "created_at": "string",
      "trained_at": "string",
      "status": "string",
      "version": "string"
    }
  ]
}
```

<h3 id="list-engines-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[ListEnginesResponse](#schemalistenginesresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Delete Engine

<a id="opIddelete_engine_engines__engine_name__delete"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.delete('https://api.shaped.ai/v2/engines/{engine_name}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/engines/{engine_name}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /engines/{engine_name}`

Delete the engine with identifier: {engine_name}.

<h3 id="delete-engine-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|engine_name|path|string|true|Name of the engine to delete.|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="delete-engine-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[DeleteEngineResponse](#schemadeleteengineresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Invalid Engine Name|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Get Engine Details

<a id="opIdget_engine_details_engines__engine_name__get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json',
  'x-api-key': 'stringstringstringstringstringstringstri'
}

r = requests.get('https://api.shaped.ai/v2/engines/{engine_name}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json',
  'x-api-key':'stringstringstringstringstringstringstri'
};

fetch('https://api.shaped.ai/v2/engines/{engine_name}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /engines/{engine_name}`

View Engines returns detailed information about the given {engine_name} including the input setup schemas details and status.

<h3 id="get-engine-details-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|engine_name|path|string|true|Name of the engine to view.|
|x-api-key|header|string|true|API key for authentication.|

> Example responses

> 200 Response

```json
{
  "engine_uri": "string",
  "created_at": "string",
  "status": "string",
  "config": {},
  "engine_schema": {
    "user": [
      {
        "name": "string",
        "type": "Id"
      }
    ],
    "item": [
      {
        "name": "string",
        "type": "Id"
      }
    ],
    "interaction": [
      {
        "name": "string",
        "type": "Id"
      }
    ]
  },
  "error_message": "string",
  "warning_message": "string",
  "input_yaml": "string"
}
```

<h3 id="get-engine-details-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[EngineDetailsResponse](#schemaenginedetailsresponse)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Invalid Engine Name|[HttpProblemResponse](#schemahttpproblemresponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="shaped-api-query">Query</h1>

The Query API exposes a set of attributes to run custom retrieval, filtering and ordering logic against your Shaped engines. <br/><br/>We expose two methods for querying: <br/>1) Use the query endpoint directly, for development and experimentation <br/>2) Pass parameters like a user ID or search string to a saved query for execution, to minimize complexity for downstream clients

## Execute Query

<a id="opIdexecute_ad_hoc_query_query_post"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://api.shaped.ai/v2/query', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "parameters": {
    "property1": 0,
    "property2": 0
  },
  "query": {
    "columns": [
      "string"
    ],
    "embeddings": [
      "string"
    ],
    "retrieve": [
      {
        "columns": [
          {
            "name": "string",
            "ascending": true,
            "nulls_first": false
          }
        ],
        "where": "string",
        "limit": 100,
        "name": "string",
        "type": "column_order"
      }
    ],
    "filter": [
      {
        "filter_ref": "string",
        "name": "string",
        "input_user_id": "string",
        "type": "prebuilt"
      }
    ],
    "score": {
      "value_model": "string",
      "input_user_id": "string",
      "input_user_features": {},
      "input_interactions_item_ids": [
        null
      ],
      "name": "string",
      "type": "score_ensemble"
    },
    "reorder": [
      {
        "retriever": {
          "columns": [
            {
              "name": "string",
              "ascending": true,
              "nulls_first": false
            }
          ],
          "where": "string",
          "limit": 100,
          "name": "string",
          "type": "column_order"
        },
        "strength": 0.5,
        "name": "string",
        "type": "exploration"
      }
    ],
    "limit": 0,
    "type": "rank",
    "from": "user"
  },
  "return_metadata": true,
  "return_explanation": false,
  "return_journey_explanations": false,
  "pagination_key": "string",
  "ignore_pagination": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://api.shaped.ai/v2/query',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /query`

Execute a query with the provided QueryConfig. Use this endpoint to execute
on-demand queries for development or experimentation.

> Body parameter

```json
{
  "parameters": {
    "property1": 0,
    "property2": 0
  },
  "query": {
    "columns": [
      "string"
    ],
    "embeddings": [
      "string"
    ],
    "retrieve": [
      {
        "columns": [
          {
            "name": "string",
            "ascending": true,
            "nulls_first": false
          }
        ],
        "where": "string",
        "limit": 100,
        "name": "string",
        "type": "column_order"
      }
    ],
    "filter": [
      {
        "filter_ref": "string",
        "name": "string",
        "input_user_id": "string",
        "type": "prebuilt"
      }
    ],
    "score": {
      "value_model": "string",
      "input_user_id": "string",
      "input_user_features": {},
      "input_interactions_item_ids": [
        null
      ],
      "name": "string",
      "type": "score_ensemble"
    },
    "reorder": [
      {
        "retriever": {
          "columns": [
            {
              "name": "string",
              "ascending": true,
              "nulls_first": false
            }
          ],
          "where": "string",
          "limit": 100,
          "name": "string",
          "type": "column_order"
        },
        "strength": 0.5,
        "name": "string",
        "type": "exploration"
      }
    ],
    "limit": 0,
    "type": "rank",
    "from": "user"
  },
  "return_metadata": true,
  "return_explanation": false,
  "return_journey_explanations": false,
  "pagination_key": "string",
  "ignore_pagination": false
}
```

<h3 id="execute-query-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[QueryRequest](#schemaqueryrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "results": [
    {
      "id": "string",
      "score": 0,
      "metadata": {},
      "embeddings": {
        "property1": [
          0
        ],
        "property2": [
          0
        ]
      },
      "journey": {
        "entity_id": "string",
        "inner_entity_id": 0,
        "retrieved_by": [
          "string"
        ],
        "retrieval_scores": {
          "property1": 0,
          "property2": 0
        },
        "retrieval_rank": {
          "property1": 0,
          "property2": 0
        },
        "filter_results": {
          "property1": true,
          "property2": true
        },
        "filtered_out_by": "string",
        "score": 0,
        "score_rank": 0,
        "reorder_changes": [
          {}
        ],
        "final_position": 0,
        "final_score": 0
      }
    }
  ],
  "entity_type": "string",
  "explanation": {
    "query_name": "string",
    "query_type": "string",
    "parameters": {},
    "pagination_id": "string",
    "retrieve_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "filter_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "score_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "reorder_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "total_execution_time_ms": 0,
    "final_result_count": 0,
    "limit_applied": 0,
    "inner_uid": 0,
    "outer_uid": "string"
  }
}
```

<h3 id="execute-query-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[QueryResult](#schemaqueryresult)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Execute Saved Query

<a id="opIdexecute_saved_query_queries__query_name__post"></a>

> Code samples

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('https://api.shaped.ai/v2/queries/{query_name}', headers = headers)

print(r.json())

```

```javascript
const inputBody = '{
  "parameters": {
    "property1": 0,
    "property2": 0
  },
  "return_metadata": true,
  "return_explanation": false,
  "return_journey_explanations": false,
  "pagination_key": "string",
  "ignore_pagination": false
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('https://api.shaped.ai/v2/queries/{query_name}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /queries/{query_name}`

Execute a saved query by name. The `parameters` field defines inputs for
the saved query, such as a search string or user ID.

> Body parameter

```json
{
  "parameters": {
    "property1": 0,
    "property2": 0
  },
  "return_metadata": true,
  "return_explanation": false,
  "return_journey_explanations": false,
  "pagination_key": "string",
  "ignore_pagination": false
}
```

<h3 id="execute-saved-query-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|query_name|path|string|true|none|
|body|body|[SavedQueryRequest](#schemasavedqueryrequest)|true|none|

> Example responses

> 200 Response

```json
{
  "results": [
    {
      "id": "string",
      "score": 0,
      "metadata": {},
      "embeddings": {
        "property1": [
          0
        ],
        "property2": [
          0
        ]
      },
      "journey": {
        "entity_id": "string",
        "inner_entity_id": 0,
        "retrieved_by": [
          "string"
        ],
        "retrieval_scores": {
          "property1": 0,
          "property2": 0
        },
        "retrieval_rank": {
          "property1": 0,
          "property2": 0
        },
        "filter_results": {
          "property1": true,
          "property2": true
        },
        "filtered_out_by": "string",
        "score": 0,
        "score_rank": 0,
        "reorder_changes": [
          {}
        ],
        "final_position": 0,
        "final_score": 0
      }
    }
  ],
  "entity_type": "string",
  "explanation": {
    "query_name": "string",
    "query_type": "string",
    "parameters": {},
    "pagination_id": "string",
    "retrieve_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "filter_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "score_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "reorder_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "total_execution_time_ms": 0,
    "final_result_count": 0,
    "limit_applied": 0,
    "inner_uid": 0,
    "outer_uid": "string"
  }
}
```

<h3 id="execute-saved-query-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[QueryResult](#schemaqueryresult)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Get Saved Query Details

<a id="opIdget_saved_query_info_queries__query_name__get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.shaped.ai/v2/queries/{query_name}', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://api.shaped.ai/v2/queries/{query_name}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /queries/{query_name}`

Get information about a specific saved query.

<h3 id="get-saved-query-details-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|query_name|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "params": [
    "string"
  ],
  "query": "string",
  "query_type": "string"
}
```

<h3 id="get-saved-query-details-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[SavedQueryInfoResponse](#schemasavedqueryinforesponse)|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<aside class="success">
This operation does not require authentication
</aside>

## List Saved Queries

<a id="opIdlist_saved_queries_queries_get"></a>

> Code samples

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://api.shaped.ai/v2/queries', headers = headers)

print(r.json())

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://api.shaped.ai/v2/queries',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /queries`

List all available saved queries.

> Example responses

> 200 Response

```json
{
  "queries": [
    "string"
  ]
}
```

<h3 id="list-saved-queries-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|[SavedQueryListResponse](#schemasavedquerylistresponse)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_AutoscalingConfig">AutoscalingConfig</h2>
<!-- backwards compatibility -->
<a id="schemaautoscalingconfig"></a>
<a id="schema_AutoscalingConfig"></a>
<a id="tocSautoscalingconfig"></a>
<a id="tocsautoscalingconfig"></a>

```json
{
  "min_replicas": 1,
  "max_replicas": 20,
  "policy": {
    "type": "requests_per_second",
    "target_requests": 10
  }
}

```

AutoscalingConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_replicas|integer|false|none|Minimum number of inference pod replicas.|
|max_replicas|integer|false|none|Maximum number of inference pod replicas.|
|policy|any|false|none|Autoscaling policy configuration.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[RequestsPerSecondScalingPolicy](#schemarequestspersecondscalingpolicy)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[LatencyScalingPolicy](#schemalatencyscalingpolicy)|false|none|none|

<h2 id="tocS_BoostedReorderStep">BoostedReorderStep</h2>
<!-- backwards compatibility -->
<a id="schemaboostedreorderstep"></a>
<a id="schema_BoostedReorderStep"></a>
<a id="tocSboostedreorderstep"></a>
<a id="tocsboostedreorderstep"></a>

```json
{
  "retriever": {
    "columns": [
      {
        "name": "string",
        "ascending": true,
        "nulls_first": false
      }
    ],
    "where": "string",
    "limit": 100,
    "name": "string",
    "type": "column_order"
  },
  "strength": 0.5,
  "name": "string",
  "type": "boosted"
}

```

BoostedReorderStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retriever|any|true|none|Retrieve step to use as source for boosting.|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ColumnOrderRetrieveStep](#schemacolumnorderretrievestep)|false|none|Retrieves candidates by sorting on one or more columns.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TextSearchRetrieveStep](#schematextsearchretrievestep)|false|none|Unified text search retrieval.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SimilarityRetrieveStep](#schemasimilarityretrievestep)|false|none|Performs a search on an embedding index and returns entities.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[FilterRetrieveStep](#schemafilterretrievestep)|false|none|Retrieves entities by filtering without ordering. Useful for simple data<br>queries that select specific columns and filter them.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CandidateIdsRetrieveStep](#schemacandidateidsretrievestep)|false|none|Retrieves a specific list of entity IDs (candidate items for reranking).<br>Useful for reranking scenarios where you want to score/reorder a specific<br>set of items.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CandidateAttributesRetrieveStep](#schemacandidateattributesretrievestep)|false|none|Retrieves items from provided item attributes (for items not in catalog).<br>Useful for reranking scenarios where you want to score/reorder items that<br>may not be in the catalog yet, using their attributes directly.|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strength|number|false|none|Boost strength (0.0-1.0). Closer to 1.0 pulls more items from boosted retriever (items with boost=1).|
|name|any|false|none|Optional name for this reorder step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Reorder step type discriminator.|

<h2 id="tocS_CanaryRollout">CanaryRollout</h2>
<!-- backwards compatibility -->
<a id="schemacanaryrollout"></a>
<a id="schema_CanaryRollout"></a>
<a id="tocScanaryrollout"></a>
<a id="tocscanaryrollout"></a>

```json
{
  "type": "canary",
  "evaluation_period_minutes": 10
}

```

CanaryRollout

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Rollout type discriminator.|
|evaluation_period_minutes|integer|false|none|Time in minutes to evaluate canary before full rollout.|

<h2 id="tocS_CandidateAttributesRetrieveStep">CandidateAttributesRetrieveStep</h2>
<!-- backwards compatibility -->
<a id="schemacandidateattributesretrievestep"></a>
<a id="schema_CandidateAttributesRetrieveStep"></a>
<a id="tocScandidateattributesretrievestep"></a>
<a id="tocscandidateattributesretrievestep"></a>

```json
{
  "item_attributes": [
    {}
  ],
  "limit": 0,
  "name": "string",
  "type": "candidate_attributes"
}

```

CandidateAttributesRetrieveStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_attributes|[object]|true|none|List of item attribute dictionaries to retrieve (e.g., [{'title': 'Item 1', 'category': 'electronics'}, ...]).|
|limit|any|false|none|Maximum number of items to retrieve. Defaults to length of item_attributes.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|any|false|none|Optional name for this retrieve step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Retrieve step type discriminator.|

<h2 id="tocS_CandidateIdsRetrieveStep">CandidateIdsRetrieveStep</h2>
<!-- backwards compatibility -->
<a id="schemacandidateidsretrievestep"></a>
<a id="schema_CandidateIdsRetrieveStep"></a>
<a id="tocScandidateidsretrievestep"></a>
<a id="tocscandidateidsretrievestep"></a>

```json
{
  "item_ids": [
    null
  ],
  "limit": 0,
  "name": "string",
  "type": "candidate_ids"
}

```

CandidateIdsRetrieveStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_ids|[any]|true|none|List of entity IDs to retrieve (e.g., ['item1', 'item2', 'item3']).|
|limit|any|false|none|Maximum number of IDs to retrieve. Defaults to length of item_ids.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|any|false|none|Optional name for this retrieve step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Retrieve step type discriminator.|

<h2 id="tocS_CandidateRetrievalStrategy">CandidateRetrievalStrategy</h2>
<!-- backwards compatibility -->
<a id="schemacandidateretrievalstrategy"></a>
<a id="schema_CandidateRetrievalStrategy"></a>
<a id="tocScandidateretrievalstrategy"></a>
<a id="tocscandidateretrievalstrategy"></a>

```json
"batch_iids"

```

CandidateRetrievalStrategy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|CandidateRetrievalStrategy|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|CandidateRetrievalStrategy|batch_iids|
|CandidateRetrievalStrategy|train_iids|
|CandidateRetrievalStrategy|test_iids|
|CandidateRetrievalStrategy|all_iids|
|CandidateRetrievalStrategy|negative_sampled_iids|
|CandidateRetrievalStrategy|none|

<h2 id="tocS_ColumnIndexConfig">ColumnIndexConfig</h2>
<!-- backwards compatibility -->
<a id="schemacolumnindexconfig"></a>
<a id="schema_ColumnIndexConfig"></a>
<a id="tocScolumnindexconfig"></a>
<a id="tocscolumnindexconfig"></a>

```json
{
  "column": "string",
  "index_type": "btree"
}

```

ColumnIndexConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column|string|true|none|Column name to create an index for.|
|index_type|[IndexType](#schemaindextype)|false|none|Type of index to create. Options: btree, bitmap, label_list, fts.|

<h2 id="tocS_ColumnOrderRetrieveStep">ColumnOrderRetrieveStep</h2>
<!-- backwards compatibility -->
<a id="schemacolumnorderretrievestep"></a>
<a id="schema_ColumnOrderRetrieveStep"></a>
<a id="tocScolumnorderretrievestep"></a>
<a id="tocscolumnorderretrievestep"></a>

```json
{
  "columns": [
    {
      "name": "string",
      "ascending": true,
      "nulls_first": false
    }
  ],
  "where": "string",
  "limit": 100,
  "name": "string",
  "type": "column_order"
}

```

ColumnOrderRetrieveStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|[[ColumnOrdering](#schemacolumnordering)]|true|none|List of column orderings to sort candidates by.|
|where|any|false|none|Optional DuckDB filter expression.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|integer|false|none|Maximum number of candidates to retrieve.|
|name|any|false|none|Optional name for this retrieve step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Retrieve step type discriminator.|

<h2 id="tocS_ColumnOrdering">ColumnOrdering</h2>
<!-- backwards compatibility -->
<a id="schemacolumnordering"></a>
<a id="schema_ColumnOrdering"></a>
<a id="tocScolumnordering"></a>
<a id="tocscolumnordering"></a>

```json
{
  "name": "string",
  "ascending": true,
  "nulls_first": false
}

```

ColumnOrdering

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Column name to order by.|
|ascending|boolean|false|none|Whether to sort in ascending order.|
|nulls_first|boolean|false|none|Whether to place null values first.|

<h2 id="tocS_DataComputeConfig">DataComputeConfig</h2>
<!-- backwards compatibility -->
<a id="schemadatacomputeconfig"></a>
<a id="schema_DataComputeConfig"></a>
<a id="tocSdatacomputeconfig"></a>
<a id="tocsdatacomputeconfig"></a>

```json
{
  "cpu_count": 4,
  "cpu_memory_gb": 16
}

```

DataComputeConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|cpu_count|integer|false|none|Number of CPU cores for data transformations.|
|cpu_memory_gb|integer|false|none|Memory in GB for data transformations.|

<h2 id="tocS_DataConfig">DataConfig</h2>
<!-- backwards compatibility -->
<a id="schemadataconfig"></a>
<a id="schema_DataConfig"></a>
<a id="tocSdataconfig"></a>
<a id="tocsdataconfig"></a>

```json
{
  "interaction_table": {
    "type": "query",
    "query": "string"
  },
  "user_table": {
    "type": "query",
    "query": "string"
  },
  "item_table": {
    "type": "query",
    "query": "string"
  },
  "schedule": "@hourly",
  "schema_override": {
    "user": {
      "id": "string",
      "features": [
        {
          "name": "string",
          "type": "Id"
        }
      ],
      "created_at": "string"
    },
    "item": {
      "id": "string",
      "features": [
        {
          "name": "string",
          "type": "Id"
        }
      ],
      "created_at": "string"
    },
    "interaction": {
      "label": {
        "name": "string",
        "type": "BinaryLabel"
      },
      "created_at": "string",
      "session_id": "string",
      "interaction_id": "string",
      "features": [
        {
          "name": "string",
          "type": "Id"
        }
      ]
    }
  },
  "compute": {
    "cpu_count": 4,
    "cpu_memory_gb": 16
  },
  "filters": [
    {
      "name": "string",
      "filter_table": {
        "type": "query",
        "query": "string"
      },
      "filter_type": {
        "user_id_column": "user_id",
        "item_id_column": "item_id",
        "index_type": "bloom_filter",
        "type": "personal"
      }
    }
  ]
}

```

DataConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|interaction_table|any|false|none|Table of user-item interactions. Must have user_id, item_id, label, and created_at columns.|

anyOf - discriminator: type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[QueryTableConfig](#schemaquerytableconfig)|false|none|Table config that uses a SQL query to fetch data. Supports joins and<br>complex SQL operations.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[ReferenceTableConfig](#schemareferencetableconfig)|false|none|Table config that references a table by name with column selection and<br>optional where clause. Limited to single table queries (no joins).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_table|any|false|none|Table of user attributes. Must have a user_id column.|

anyOf - discriminator: type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[QueryTableConfig](#schemaquerytableconfig)|false|none|Table config that uses a SQL query to fetch data. Supports joins and<br>complex SQL operations.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[ReferenceTableConfig](#schemareferencetableconfig)|false|none|Table config that references a table by name with column selection and<br>optional where clause. Limited to single table queries (no joins).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_table|any|false|none|Table of candidate items. Must have an item_id column.|

anyOf - discriminator: type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[QueryTableConfig](#schemaquerytableconfig)|false|none|Table config that uses a SQL query to fetch data. Supports joins and<br>complex SQL operations.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[ReferenceTableConfig](#schemareferencetableconfig)|false|none|Table config that references a table by name with column selection and<br>optional where clause. Limited to single table queries (no joins).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schedule|string|false|none|Data refresh frequency.|
|schema_override|any|false|none|Specify each feature and its type for more accurate training. Optional.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SchemaConfig](#schemaschemaconfig)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|compute|[DataComputeConfig](#schemadatacomputeconfig)|false|none|Compute resources for data transformations.|
|filters|[[FilterConfig](#schemafilterconfig)]|false|none|List of filter configurations.|

<h2 id="tocS_DataSplitConfig">DataSplitConfig</h2>
<!-- backwards compatibility -->
<a id="schemadatasplitconfig"></a>
<a id="schema_DataSplitConfig"></a>
<a id="tocSdatasplitconfig"></a>
<a id="tocsdatasplitconfig"></a>

```json
{
  "strategy": "global"
}

```

DataSplitConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strategy|[DataSplitStrategy](#schemadatasplitstrategy)|false|none|Strategy for splitting data into train and test sets.|

<h2 id="tocS_DataSplitStrategy">DataSplitStrategy</h2>
<!-- backwards compatibility -->
<a id="schemadatasplitstrategy"></a>
<a id="schema_DataSplitStrategy"></a>
<a id="tocSdatasplitstrategy"></a>
<a id="tocsdatasplitstrategy"></a>

```json
"global"

```

DataSplitStrategy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DataSplitStrategy|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|DataSplitStrategy|global|
|DataSplitStrategy|user|

<h2 id="tocS_DataTier">DataTier</h2>
<!-- backwards compatibility -->
<a id="schemadatatier"></a>
<a id="schema_DataTier"></a>
<a id="tocSdatatier"></a>
<a id="tocsdatatier"></a>

```json
"fast_tier"

```

DataTier

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DataTier|string|false|none|Defines the data storage tier for inference, a critical performance choice.|

#### Enumerated Values

|Property|Value|
|---|---|
|DataTier|fast_tier|
|DataTier|cold_tier|

<h2 id="tocS_DeleteEngineResponse">DeleteEngineResponse</h2>
<!-- backwards compatibility -->
<a id="schemadeleteengineresponse"></a>
<a id="schema_DeleteEngineResponse"></a>
<a id="tocSdeleteengineresponse"></a>
<a id="tocsdeleteengineresponse"></a>

```json
{
  "message": "string"
}

```

DeleteEngineResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating the model deletion status.|

<h2 id="tocS_DeploymentConfig">DeploymentConfig</h2>
<!-- backwards compatibility -->
<a id="schemadeploymentconfig"></a>
<a id="schema_DeploymentConfig"></a>
<a id="tocSdeploymentconfig"></a>
<a id="tocsdeploymentconfig"></a>

```json
{
  "data_tier": "fast_tier",
  "rollout": {
    "strategy": {
      "type": "canary",
      "evaluation_period_minutes": 10
    }
  },
  "autoscaling": {
    "min_replicas": 1,
    "max_replicas": 20,
    "policy": {
      "type": "requests_per_second",
      "target_requests": 10
    }
  },
  "pagination": {
    "page_expiration_in_seconds": 0
  },
  "online_store": {
    "interaction_max_per_user": 30,
    "interaction_expiration_days": 90
  }
}

```

DeploymentConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data_tier|[DataTier](#schemadatatier)|false|none|Data storage tier: fast_tier (Redis, HA) or cold_tier (disk-based, cost-effective).|
|rollout|[RolloutConfig](#schemarolloutconfig)|false|none|Deployment rollout strategy configuration.|
|autoscaling|any|false|none|Autoscaling configuration (enables if present).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AutoscalingConfig](#schemaautoscalingconfig)|false|none|Configuration for horizontally scaling inference pods.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pagination|[PaginationConfig](#schemapaginationconfig)|false|none|Pagination state management configuration.|
|online_store|[OnlineStoreConfig](#schemaonlinestoreconfig)|false|none|Online store (Redis) caching configuration.|

<h2 id="tocS_DiversityReorderStep">DiversityReorderStep</h2>
<!-- backwards compatibility -->
<a id="schemadiversityreorderstep"></a>
<a id="schema_DiversityReorderStep"></a>
<a id="tocSdiversityreorderstep"></a>
<a id="tocsdiversityreorderstep"></a>

```json
{
  "strength": 0.5,
  "diversity_lookback_window": 30,
  "diversity_lookforward_window": 30,
  "diversity_attributes": [
    null
  ],
  "text_encoding_embedding_ref": "string",
  "name": "string",
  "type": "diversity"
}

```

DiversityReorderStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strength|number|false|none|Diversity strength (0.0-1.0). Closer to 1.0 penalizes items similar to those already in slate.|
|diversity_lookback_window|integer|false|none|Number of items already in slate to consider for diversity calculation.|
|diversity_lookforward_window|integer|false|none|Number of candidate items ahead to consider for diversity calculation.|
|diversity_attributes|any|false|none|List of attribute names to use for diversity. If not set, all attributes are used.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[any]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text_encoding_embedding_ref|any|false|none|Embedding reference to use for diversity calculations. If not set, text encoding will not be used for diversity.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|any|false|none|Optional name for this reorder step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Reorder step type discriminator.|

<h2 id="tocS_EmbeddingConfig">EmbeddingConfig</h2>
<!-- backwards compatibility -->
<a id="schemaembeddingconfig"></a>
<a id="schema_EmbeddingConfig"></a>
<a id="tocSembeddingconfig"></a>
<a id="tocsembeddingconfig"></a>

```json
{
  "name": "string",
  "encoder": {
    "model_name": "string",
    "user_fields": [
      "string"
    ],
    "item_fields": [
      "string"
    ],
    "type": "hugging_face",
    "batch_size": 256
  }
}

```

EmbeddingConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the embedding.|
|encoder|any|true|none|Encoder configuration (HuggingFace or trained model).|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[HuggingFaceEncoder](#schemahuggingfaceencoder)|false|none|An encoder sourced directly from HuggingFace.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TrainedModelEncoder](#schematrainedmodelencoder)|false|none|none|

<h2 id="tocS_Engine">Engine</h2>
<!-- backwards compatibility -->
<a id="schemaengine"></a>
<a id="schema_Engine"></a>
<a id="tocSengine"></a>
<a id="tocsengine"></a>

```json
{
  "engine_name": "string",
  "description": "string",
  "engine_uri": "string",
  "created_at": "string",
  "trained_at": "string",
  "status": "string",
  "version": "string"
}

```

Engine

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|engine_name|string|true|none|Unique identifier for the engine.|
|description|any|false|none|Optional description of the engine.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|engine_uri|string|true|none|URI to access the engine.|
|created_at|string|true|none|Timestamp when the engine was created.|
|trained_at|any|false|none|Timestamp when the engine was last trained.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|string|true|none|Current status of the engine.|
|version|string|true|none|Version of the engine: possible values are 'v1' or 'v2'.|

<h2 id="tocS_EngineConfigV2">EngineConfigV2</h2>
<!-- backwards compatibility -->
<a id="schemaengineconfigv2"></a>
<a id="schema_EngineConfigV2"></a>
<a id="tocSengineconfigv2"></a>
<a id="tocsengineconfigv2"></a>

```json
{
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "data": {
    "interaction_table": {
      "type": "query",
      "query": "string"
    },
    "user_table": {
      "type": "query",
      "query": "string"
    },
    "item_table": {
      "type": "query",
      "query": "string"
    },
    "schedule": "@hourly",
    "schema_override": {
      "user": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "item": {
        "id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ],
        "created_at": "string"
      },
      "interaction": {
        "label": {
          "name": "string",
          "type": "BinaryLabel"
        },
        "created_at": "string",
        "session_id": "string",
        "interaction_id": "string",
        "features": [
          {
            "name": "string",
            "type": "Id"
          }
        ]
      }
    },
    "compute": {
      "cpu_count": 4,
      "cpu_memory_gb": 16
    },
    "filters": [
      {
        "name": "string",
        "filter_table": {
          "type": "query",
          "query": "string"
        },
        "filter_type": {
          "user_id_column": "user_id",
          "item_id_column": "item_id",
          "index_type": "bloom_filter",
          "type": "personal"
        }
      }
    ]
  },
  "index": {
    "lexical_search": {
      "tokenizer": {
        "language": "en",
        "stemming": true,
        "ascii_folding": true,
        "remove_stop_words": true,
        "type": "stemmer"
      },
      "user_fields": [
        "string"
      ],
      "item_fields": [
        "string"
      ]
    },
    "embeddings": [
      {
        "name": "string",
        "encoder": {
          "model_name": "string",
          "user_fields": [
            "string"
          ],
          "item_fields": [
            "string"
          ],
          "type": "hugging_face",
          "batch_size": 256
        }
      }
    ],
    "user_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ],
    "item_column_indices": [
      {
        "column": "string",
        "index_type": "btree"
      }
    ]
  },
  "training": {
    "schedule": "@daily",
    "compute": {
      "gpu_type": "T4",
      "gpu_count": 1,
      "cpu_memory_gb": 16,
      "cpu_count": 4,
      "force_gpu": false,
      "disk_size_gb": 64
    },
    "data_split": {
      "strategy": "global"
    },
    "evaluation": {
      "enable": false,
      "candidate_source": "batch_iids",
      "filter_seen_items": false,
      "evaluation_top_k": 50
    },
    "models": [
      {
        "policy_type": "elsa",
        "name": "string",
        "event_values": [
          "string"
        ],
        "batch_size": 512,
        "n_epochs": 1,
        "factors": {
          "type": "tunable_int",
          "min": 10,
          "max": 200,
          "scale": "linear"
        },
        "lr": {
          "type": "tunable_float",
          "min": 0.01,
          "max": 0.1,
          "scale": "linear"
        },
        "device": "string",
        "strategy": "default",
        "patience": 3,
        "balance_labels": true
      }
    ],
    "tuning": {
      "total_jobs": 30,
      "parallel_jobs": 10
    }
  },
  "deployment": {
    "data_tier": "fast_tier",
    "rollout": {
      "strategy": {
        "type": "canary",
        "evaluation_period_minutes": 10
      }
    },
    "autoscaling": {
      "min_replicas": 1,
      "max_replicas": 20,
      "policy": {
        "type": "requests_per_second",
        "target_requests": 10
      }
    },
    "pagination": {
      "page_expiration_in_seconds": 0
    },
    "online_store": {
      "interaction_max_per_user": 30,
      "interaction_expiration_days": 90
    }
  },
  "queries": {
    "property1": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    },
    "property2": {
      "query": {
        "columns": [
          "string"
        ],
        "embeddings": [
          "string"
        ],
        "retrieve": [
          {
            "columns": [
              {
                "name": "string",
                "ascending": true,
                "nulls_first": false
              }
            ],
            "where": "string",
            "limit": 100,
            "name": "string",
            "type": "column_order"
          }
        ],
        "filter": [
          {
            "filter_ref": "string",
            "name": "string",
            "input_user_id": "string",
            "type": "prebuilt"
          }
        ],
        "score": {
          "value_model": "string",
          "input_user_id": "string",
          "input_user_features": {},
          "input_interactions_item_ids": [
            null
          ],
          "name": "string",
          "type": "score_ensemble"
        },
        "reorder": [
          {
            "retriever": {
              "columns": [
                {
                  "name": "string",
                  "ascending": true,
                  "nulls_first": false
                }
              ],
              "where": "string",
              "limit": 100,
              "name": "string",
              "type": "column_order"
            },
            "strength": 0.5,
            "name": "string",
            "type": "exploration"
          }
        ],
        "limit": 0,
        "type": "rank",
        "from": "user"
      },
      "parameters": {
        "property1": {
          "default": 0
        },
        "property2": {
          "default": 0
        }
      }
    }
  },
  "version": "v2"
}

```

EngineConfigV2

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the engine.|
|description|any|false|none|Optional description of the engine.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tags|any|false|none|Optional key-value tags for organization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[DataConfig](#schemadataconfig)|true|none|Data preparation workflow configuration.|
|index|[IndexConfig](#schemaindexconfig)|false|none|Index configuration.|
|training|[TrainingConfig](#schematrainingconfig)|false|none|Model training and evaluation configuration.|
|deployment|[DeploymentConfig](#schemadeploymentconfig)|false|none|Inference serving infrastructure configuration.|
|queries|object|false|none|Dictionary of named query definitions (saved queries).|
|» **additionalProperties**|[QueryDefinition](#schemaquerydefinition)|false|none|Defines a single, named query recipe ("stored procedure").<br><br>The query can be either:<br>- A QueryConfig object (structured query configuration)<br>- A SQL query string (will be transpiled to QueryConfig at initialization)|
|version|string|false|none|API version discriminator for v2 configs.|

<h2 id="tocS_EngineDetailsResponse">EngineDetailsResponse</h2>
<!-- backwards compatibility -->
<a id="schemaenginedetailsresponse"></a>
<a id="schema_EngineDetailsResponse"></a>
<a id="tocSenginedetailsresponse"></a>
<a id="tocsenginedetailsresponse"></a>

```json
{
  "engine_uri": "string",
  "created_at": "string",
  "status": "string",
  "config": {},
  "engine_schema": {
    "user": [
      {
        "name": "string",
        "type": "Id"
      }
    ],
    "item": [
      {
        "name": "string",
        "type": "Id"
      }
    ],
    "interaction": [
      {
        "name": "string",
        "type": "Id"
      }
    ]
  },
  "error_message": "string",
  "warning_message": "string",
  "input_yaml": "string"
}

```

EngineDetailsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|engine_uri|string|true|none|URI to access the engine.|
|created_at|string|true|none|Timestamp when the engine was created.|
|status|string|true|none|Current status of the engine.|
|config|object|true|none|Engine configuration details.|
|engine_schema|[EngineSchema](#schemaengineschema)|true|none|Schema describing engine features.|
|error_message|any|false|none|Error message if the engine is in an error state.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|warning_message|any|false|none|Warning message if there are any warnings.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_yaml|any|false|none|Original YAML input used to create the engine.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_EngineSchema">EngineSchema</h2>
<!-- backwards compatibility -->
<a id="schemaengineschema"></a>
<a id="schema_EngineSchema"></a>
<a id="tocSengineschema"></a>
<a id="tocsengineschema"></a>

```json
{
  "user": [
    {
      "name": "string",
      "type": "Id"
    }
  ],
  "item": [
    {
      "name": "string",
      "type": "Id"
    }
  ],
  "interaction": [
    {
      "name": "string",
      "type": "Id"
    }
  ]
}

```

EngineSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user|[anyOf]|true|none|User features and labels in the engine schema.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Feature](#schemafeature)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Label](#schemalabel)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item|[anyOf]|true|none|Item features and labels in the engine schema.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Feature](#schemafeature)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Label](#schemalabel)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|interaction|[anyOf]|true|none|Interaction features and labels in the engine schema.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Feature](#schemafeature)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Label](#schemalabel)|false|none|none|

<h2 id="tocS_EntityConfig">EntityConfig</h2>
<!-- backwards compatibility -->
<a id="schemaentityconfig"></a>
<a id="schema_EntityConfig"></a>
<a id="tocSentityconfig"></a>
<a id="tocsentityconfig"></a>

```json
{
  "id": "string",
  "features": [
    {
      "name": "string",
      "type": "Id"
    }
  ],
  "created_at": "string"
}

```

EntityConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|Column name for the entity identifier.|
|features|any|false|none|List of feature definitions for this entity.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[Feature](#schemafeature)]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|created_at|any|false|none|Column name for the entity creation timestamp.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_EntityType">EntityType</h2>
<!-- backwards compatibility -->
<a id="schemaentitytype"></a>
<a id="schema_EntityType"></a>
<a id="tocSentitytype"></a>
<a id="tocsentitytype"></a>

```json
"user"

```

EntityType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|EntityType|string|false|none|Enum for entity types used in query processing.|

#### Enumerated Values

|Property|Value|
|---|---|
|EntityType|user|
|EntityType|item|
|EntityType|item_attribute|

<h2 id="tocS_EvaluationConfig">EvaluationConfig</h2>
<!-- backwards compatibility -->
<a id="schemaevaluationconfig"></a>
<a id="schema_EvaluationConfig"></a>
<a id="tocSevaluationconfig"></a>
<a id="tocsevaluationconfig"></a>

```json
{
  "enable": false,
  "candidate_source": "batch_iids",
  "filter_seen_items": false,
  "evaluation_top_k": 50
}

```

EvaluationConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable|boolean|false|none|Whether to perform offline model evaluation.|
|candidate_source|[CandidateRetrievalStrategy](#schemacandidateretrievalstrategy)|false|none|Strategy for selecting candidate items for evaluation.|
|filter_seen_items|boolean|false|none|Whether to filter out items the user has already seen.|
|evaluation_top_k|integer|false|none|Number of top items to evaluate (must be between 1 and 300).|

<h2 id="tocS_ExplorationReorderStep">ExplorationReorderStep</h2>
<!-- backwards compatibility -->
<a id="schemaexplorationreorderstep"></a>
<a id="schema_ExplorationReorderStep"></a>
<a id="tocSexplorationreorderstep"></a>
<a id="tocsexplorationreorderstep"></a>

```json
{
  "retriever": {
    "columns": [
      {
        "name": "string",
        "ascending": true,
        "nulls_first": false
      }
    ],
    "where": "string",
    "limit": 100,
    "name": "string",
    "type": "column_order"
  },
  "strength": 0.5,
  "name": "string",
  "type": "exploration"
}

```

ExplorationReorderStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retriever|any|true|none|Retrieve step to use as source for exploration.|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ColumnOrderRetrieveStep](#schemacolumnorderretrievestep)|false|none|Retrieves candidates by sorting on one or more columns.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TextSearchRetrieveStep](#schematextsearchretrievestep)|false|none|Unified text search retrieval.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SimilarityRetrieveStep](#schemasimilarityretrievestep)|false|none|Performs a search on an embedding index and returns entities.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[FilterRetrieveStep](#schemafilterretrievestep)|false|none|Retrieves entities by filtering without ordering. Useful for simple data<br>queries that select specific columns and filter them.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CandidateIdsRetrieveStep](#schemacandidateidsretrievestep)|false|none|Retrieves a specific list of entity IDs (candidate items for reranking).<br>Useful for reranking scenarios where you want to score/reorder a specific<br>set of items.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CandidateAttributesRetrieveStep](#schemacandidateattributesretrievestep)|false|none|Retrieves items from provided item attributes (for items not in catalog).<br>Useful for reranking scenarios where you want to score/reorder items that<br>may not be in the catalog yet, using their attributes directly.|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strength|number|false|none|Exploration strength (0.0-1.0). Closer to 1.0 pulls more items from retriever.|
|name|any|false|none|Optional name for this reorder step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Reorder step type discriminator.|

<h2 id="tocS_ExpressionFilterStep">ExpressionFilterStep</h2>
<!-- backwards compatibility -->
<a id="schemaexpressionfilterstep"></a>
<a id="schema_ExpressionFilterStep"></a>
<a id="tocSexpressionfilterstep"></a>
<a id="tocsexpressionfilterstep"></a>

```json
{
  "expression": "string",
  "name": "string",
  "type": "expression"
}

```

ExpressionFilterStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|expression|string|true|none|DuckDB filter expression (e.g., item.category == 'electronics').|
|name|any|false|none|Optional name for this filter step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Filter step type discriminator.|

<h2 id="tocS_Feature">Feature</h2>
<!-- backwards compatibility -->
<a id="schemafeature"></a>
<a id="schema_Feature"></a>
<a id="tocSfeature"></a>
<a id="tocsfeature"></a>

```json
{
  "name": "string",
  "type": "Id"
}

```

Feature

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|type|[FeatureType](#schemafeaturetype)|true|none|none|

<h2 id="tocS_FeatureType">FeatureType</h2>
<!-- backwards compatibility -->
<a id="schemafeaturetype"></a>
<a id="schema_FeatureType"></a>
<a id="tocSfeaturetype"></a>
<a id="tocsfeaturetype"></a>

```json
"Id"

```

FeatureType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|FeatureType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|FeatureType|Id|
|FeatureType|Unknown|
|FeatureType|Timestamp|
|FeatureType|Category|
|FeatureType|TextCategory|
|FeatureType|LowCardinalityCategory|
|FeatureType|Binary|
|FeatureType|Boolean|
|FeatureType|Numerical|
|FeatureType|Sequence[Category]|
|FeatureType|Sequence[TextCategory]|
|FeatureType|Sequence[Text]|
|FeatureType|Sequence[Numerical]|
|FeatureType|Sequence[Binary]|
|FeatureType|Set[Category]|
|FeatureType|Set[Numerical]|
|FeatureType|Set[Binary]|
|FeatureType|Set[TextCategory]|
|FeatureType|Set[Text]|
|FeatureType|Url|
|FeatureType|Text|
|FeatureType|Vector|
|FeatureType|Image|
|FeatureType|Audio|
|FeatureType|Video|

<h2 id="tocS_FileTableConfig">FileTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemafiletableconfig"></a>
<a id="schema_FileTableConfig"></a>
<a id="tocSfiletableconfig"></a>
<a id="tocsfiletableconfig"></a>

```json
{
  "type": "file",
  "path": "string"
}

```

FileTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Type discriminator for file-based config.|
|path|string|true|none|File path (e.g., S3 URI or local path).|

<h2 id="tocS_FilterConfig">FilterConfig</h2>
<!-- backwards compatibility -->
<a id="schemafilterconfig"></a>
<a id="schema_FilterConfig"></a>
<a id="tocSfilterconfig"></a>
<a id="tocsfilterconfig"></a>

```json
{
  "name": "string",
  "filter_table": {
    "type": "query",
    "query": "string"
  },
  "filter_type": {
    "user_id_column": "user_id",
    "item_id_column": "item_id",
    "index_type": "bloom_filter",
    "type": "personal"
  }
}

```

FilterConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the filter.|
|filter_table|any|true|none|Dataset configuration for the filter source data.|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[QueryTableConfig](#schemaquerytableconfig)|false|none|Table config that uses a SQL query to fetch data. Supports joins and<br>complex SQL operations.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ReferenceTableConfig](#schemareferencetableconfig)|false|none|Table config that references a table by name with column selection and<br>optional where clause. Limited to single table queries (no joins).|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter_type|any|true|none|Filter type (personal or global).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PersonalFilter](#schemapersonalfilter)|false|none|A user-specific filter. The source dataset must contain user and item identifiers.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[GlobalFilter](#schemaglobalfilter)|false|none|A global filter. The source dataset must contain item identifiers.|

<h2 id="tocS_FilterIndexType">FilterIndexType</h2>
<!-- backwards compatibility -->
<a id="schemafilterindextype"></a>
<a id="schema_FilterIndexType"></a>
<a id="tocSfilterindextype"></a>
<a id="tocsfilterindextype"></a>

```json
"bloom_filter"

```

FilterIndexType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|FilterIndexType|string|false|none|The underlying index type to build for fast lookups.|

#### Enumerated Values

|Property|Value|
|---|---|
|FilterIndexType|bloom_filter|

<h2 id="tocS_FilterRetrieveStep">FilterRetrieveStep</h2>
<!-- backwards compatibility -->
<a id="schemafilterretrievestep"></a>
<a id="schema_FilterRetrieveStep"></a>
<a id="tocSfilterretrievestep"></a>
<a id="tocsfilterretrievestep"></a>

```json
{
  "where": "string",
  "limit": 100,
  "name": "string",
  "type": "filter"
}

```

FilterRetrieveStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|where|any|false|none|Optional DuckDB filter expression.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|integer|false|none|Maximum number of candidates to retrieve.|
|name|any|false|none|Optional name for this retrieve step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Retrieve step type discriminator.|

<h2 id="tocS_GlobalFilter">GlobalFilter</h2>
<!-- backwards compatibility -->
<a id="schemaglobalfilter"></a>
<a id="schema_GlobalFilter"></a>
<a id="tocSglobalfilter"></a>
<a id="tocsglobalfilter"></a>

```json
{
  "item_id_column": "item_id",
  "index_type": "bloom_filter",
  "type": "global"
}

```

GlobalFilter

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_id_column|string|false|none|Column name for item identifiers.|
|index_type|[FilterIndexType](#schemafilterindextype)|false|none|Index type for fast filter lookups.|
|type|string|false|none|Filter type discriminator.|

<h2 id="tocS_HTTPValidationError">HTTPValidationError</h2>
<!-- backwards compatibility -->
<a id="schemahttpvalidationerror"></a>
<a id="schema_HTTPValidationError"></a>
<a id="tocShttpvalidationerror"></a>
<a id="tocshttpvalidationerror"></a>

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

HTTPValidationError

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|detail|[[ValidationError](#schemavalidationerror)]|false|none|none|

<h2 id="tocS_HttpProblemResponse">HttpProblemResponse</h2>
<!-- backwards compatibility -->
<a id="schemahttpproblemresponse"></a>
<a id="schema_HttpProblemResponse"></a>
<a id="tocShttpproblemresponse"></a>
<a id="tocshttpproblemresponse"></a>

```json
{
  "status": 0,
  "title": "string",
  "detail": "string",
  "type": "string",
  "instance": "string"
}

```

HttpProblemResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|status|integer|true|none|none|
|title|any|false|none|Name of the error (optional)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|detail|any|false|none|Details about the error (optional)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|any|false|none|The type of error (optional)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|instance|any|false|none|The instance originating the error (optional)|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_HuggingFaceEncoder">HuggingFaceEncoder</h2>
<!-- backwards compatibility -->
<a id="schemahuggingfaceencoder"></a>
<a id="schema_HuggingFaceEncoder"></a>
<a id="tocShuggingfaceencoder"></a>
<a id="tocshuggingfaceencoder"></a>

```json
{
  "model_name": "string",
  "user_fields": [
    "string"
  ],
  "item_fields": [
    "string"
  ],
  "type": "hugging_face",
  "batch_size": 256
}

```

HuggingFaceEncoder

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|model_name|string|true|none|HuggingFace model identifier (e.g., sentence-transformers/...).|
|user_fields|any|false|none|List of user field names to encode.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_fields|any|false|none|List of item field names to encode.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Encoder type discriminator.|
|batch_size|integer|false|none|Batch size for encoding features with this embedding. Larger batch sizes may improve throughput but require more memory.|

<h2 id="tocS_IndexConfig">IndexConfig</h2>
<!-- backwards compatibility -->
<a id="schemaindexconfig"></a>
<a id="schema_IndexConfig"></a>
<a id="tocSindexconfig"></a>
<a id="tocsindexconfig"></a>

```json
{
  "lexical_search": {
    "tokenizer": {
      "language": "en",
      "stemming": true,
      "ascii_folding": true,
      "remove_stop_words": true,
      "type": "stemmer"
    },
    "user_fields": [
      "string"
    ],
    "item_fields": [
      "string"
    ]
  },
  "embeddings": [
    {
      "name": "string",
      "encoder": {
        "model_name": "string",
        "user_fields": [
          "string"
        ],
        "item_fields": [
          "string"
        ],
        "type": "hugging_face",
        "batch_size": 256
      }
    }
  ],
  "user_column_indices": [
    {
      "column": "string",
      "index_type": "btree"
    }
  ],
  "item_column_indices": [
    {
      "column": "string",
      "index_type": "btree"
    }
  ]
}

```

IndexConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lexical_search|[SearchConfig](#schemasearchconfig)|false|none|BM25 text search configuration.|
|embeddings|[[EmbeddingConfig](#schemaembeddingconfig)]|false|none|List of embedding configurations for vector search.|
|user_column_indices|any|false|none|Column index configurations. Should be of the form {table_name: [column_index_config1, column_index_config2, ...]}.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[ColumnIndexConfig](#schemacolumnindexconfig)]|false|none|[Configuration for a specific column index in the vector store.]|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_column_indices|any|false|none|Column index configurations. Should be of the form {table_name: [column_index_config1, column_index_config2, ...]}.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[ColumnIndexConfig](#schemacolumnindexconfig)]|false|none|[Configuration for a specific column index in the vector store.]|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_IndexType">IndexType</h2>
<!-- backwards compatibility -->
<a id="schemaindextype"></a>
<a id="schema_IndexType"></a>
<a id="tocSindextype"></a>
<a id="tocsindextype"></a>

```json
"btree"

```

IndexType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|IndexType|string|false|none|The underlying index type to build for fast lookups.|

#### Enumerated Values

|Property|Value|
|---|---|
|IndexType|btree|
|IndexType|bitmap|
|IndexType|label_list|
|IndexType|fts|

<h2 id="tocS_IndexingComputeConfig">IndexingComputeConfig</h2>
<!-- backwards compatibility -->
<a id="schemaindexingcomputeconfig"></a>
<a id="schema_IndexingComputeConfig"></a>
<a id="tocSindexingcomputeconfig"></a>
<a id="tocsindexingcomputeconfig"></a>

```json
null

```

### Properties

*None*

<h2 id="tocS_InteractionConfig">InteractionConfig</h2>
<!-- backwards compatibility -->
<a id="schemainteractionconfig"></a>
<a id="schema_InteractionConfig"></a>
<a id="tocSinteractionconfig"></a>
<a id="tocsinteractionconfig"></a>

```json
{
  "label": {
    "name": "string",
    "type": "BinaryLabel"
  },
  "created_at": "string",
  "session_id": "string",
  "interaction_id": "string",
  "features": [
    {
      "name": "string",
      "type": "Id"
    }
  ]
}

```

InteractionConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|label|[Label](#schemalabel)|true|none|Label definition for interaction outcomes.|
|created_at|string|true|none|Column name for the interaction timestamp.|
|session_id|any|false|none|Column name for the session identifier.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|interaction_id|any|false|none|Column name for the interaction identifier.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|features|any|false|none|List of feature definitions for interactions.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[Feature](#schemafeature)]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_InteractionPoolingEncoder">InteractionPoolingEncoder</h2>
<!-- backwards compatibility -->
<a id="schemainteractionpoolingencoder"></a>
<a id="schema_InteractionPoolingEncoder"></a>
<a id="tocSinteractionpoolingencoder"></a>
<a id="tocsinteractionpoolingencoder"></a>

```json
{
  "input_user_id": "string",
  "pooling_function": "max",
  "truncate_interactions": 10,
  "type": "interaction_pooling"
}

```

InteractionPoolingEncoder

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_id|string|true|none|User ID parameter or value to pool interactions for.|
|pooling_function|[PoolingFunction](#schemapoolingfunction)|false|none|Function to use when pooling multiple embeddings.|
|truncate_interactions|integer|false|none|Maximum number of interactions to use for pooling.|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_InteractionRoundRobinEncoder">InteractionRoundRobinEncoder</h2>
<!-- backwards compatibility -->
<a id="schemainteractionroundrobinencoder"></a>
<a id="schema_InteractionRoundRobinEncoder"></a>
<a id="tocSinteractionroundrobinencoder"></a>
<a id="tocsinteractionroundrobinencoder"></a>

```json
{
  "input_user_id": "string",
  "pooling_function": "max",
  "num_clusters": 5,
  "type": "interaction_round_robin"
}

```

InteractionRoundRobinEncoder

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_id|string|true|none|User ID parameter or value for round-robin retrieval.|
|pooling_function|[PoolingFunction](#schemapoolingfunction)|false|none|Function to use when pooling cluster results.|
|num_clusters|integer|false|none|Number of interaction clusters to create.|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_ItemAttributePoolingEncoder">ItemAttributePoolingEncoder</h2>
<!-- backwards compatibility -->
<a id="schemaitemattributepoolingencoder"></a>
<a id="schema_ItemAttributePoolingEncoder"></a>
<a id="tocSitemattributepoolingencoder"></a>
<a id="tocsitemattributepoolingencoder"></a>

```json
{
  "input_item_id": "string",
  "input_item_features": {},
  "type": "item_attribute_pooling"
}

```

ItemAttributePoolingEncoder

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_item_id|any|false|none|Item ID parameter or value to encode.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_item_features|any|false|none|Item features dictionary to encode (merged with item_id data).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_Label">Label</h2>
<!-- backwards compatibility -->
<a id="schemalabel"></a>
<a id="schema_Label"></a>
<a id="tocSlabel"></a>
<a id="tocslabel"></a>

```json
{
  "name": "string",
  "type": "BinaryLabel"
}

```

Label

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|type|[LabelType](#schemalabeltype)|true|none|none|

<h2 id="tocS_LabelType">LabelType</h2>
<!-- backwards compatibility -->
<a id="schemalabeltype"></a>
<a id="schema_LabelType"></a>
<a id="tocSlabeltype"></a>
<a id="tocslabeltype"></a>

```json
"BinaryLabel"

```

LabelType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|LabelType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|LabelType|BinaryLabel|

<h2 id="tocS_LatencyScalingPolicy">LatencyScalingPolicy</h2>
<!-- backwards compatibility -->
<a id="schemalatencyscalingpolicy"></a>
<a id="schema_LatencyScalingPolicy"></a>
<a id="tocSlatencyscalingpolicy"></a>
<a id="tocslatencyscalingpolicy"></a>

```json
{
  "type": "latency",
  "target_seconds": 0.5
}

```

LatencyScalingPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Scaling policy type discriminator.|
|target_seconds|number|false|none|Target latency in seconds for scaling decisions.|

<h2 id="tocS_LexicalSearchMode">LexicalSearchMode</h2>
<!-- backwards compatibility -->
<a id="schemalexicalsearchmode"></a>
<a id="schema_LexicalSearchMode"></a>
<a id="tocSlexicalsearchmode"></a>
<a id="tocslexicalsearchmode"></a>

```json
{
  "fuzziness_edit_distance": 0,
  "type": "lexical"
}

```

LexicalSearchMode

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|fuzziness_edit_distance|integer|false|none|Maximum edit distance for fuzzy text matching.|
|type|string|false|none|Search mode type discriminator.|

<h2 id="tocS_ListEnginesResponse">ListEnginesResponse</h2>
<!-- backwards compatibility -->
<a id="schemalistenginesresponse"></a>
<a id="schema_ListEnginesResponse"></a>
<a id="tocSlistenginesresponse"></a>
<a id="tocslistenginesresponse"></a>

```json
{
  "engines": [
    {
      "engine_name": "string",
      "description": "string",
      "engine_uri": "string",
      "created_at": "string",
      "trained_at": "string",
      "status": "string",
      "version": "string"
    }
  ]
}

```

ListEnginesResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|engines|[[Engine](#schemaengine)]|true|none|List of engines and their metadata.|

<h2 id="tocS_LossTypes">LossTypes</h2>
<!-- backwards compatibility -->
<a id="schemalosstypes"></a>
<a id="schema_LossTypes"></a>
<a id="tocSlosstypes"></a>
<a id="tocslosstypes"></a>

```json
"BPR"

```

LossTypes

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|LossTypes|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|LossTypes|BPR|
|LossTypes|CE|

<h2 id="tocS_NgramTokenizer">NgramTokenizer</h2>
<!-- backwards compatibility -->
<a id="schemangramtokenizer"></a>
<a id="schema_NgramTokenizer"></a>
<a id="tocSngramtokenizer"></a>
<a id="tocsngramtokenizer"></a>

```json
{
  "min_length": 3,
  "max_length": 3,
  "prefix_only": false,
  "type": "ngram"
}

```

NgramTokenizer

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_length|integer|false|none|Minimum n-gram length.|
|max_length|integer|false|none|Maximum n-gram length.|
|prefix_only|boolean|false|none|Whether to generate only prefix n-grams.|
|type|string|false|none|Tokenizer type discriminator.|

<h2 id="tocS_NoOpConfig">NoOpConfig</h2>
<!-- backwards compatibility -->
<a id="schemanoopconfig"></a>
<a id="schema_NoOpConfig"></a>
<a id="tocSnoopconfig"></a>
<a id="tocsnoopconfig"></a>

```json
{
  "policy_type": "no-op",
  "name": "string"
}

```

NoOpConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_Objective">Objective</h2>
<!-- backwards compatibility -->
<a id="schemaobjective"></a>
<a id="schema_Objective"></a>
<a id="tocSobjective"></a>
<a id="tocsobjective"></a>

```json
"binary"

```

Objective

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Objective|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|Objective|binary|
|Objective|regression|
|Objective|poisson|
|Objective|lambdarank|
|Objective|rank_xendcg|

<h2 id="tocS_OnlineStoreConfig">OnlineStoreConfig</h2>
<!-- backwards compatibility -->
<a id="schemaonlinestoreconfig"></a>
<a id="schema_OnlineStoreConfig"></a>
<a id="tocSonlinestoreconfig"></a>
<a id="tocsonlinestoreconfig"></a>

```json
{
  "interaction_max_per_user": 30,
  "interaction_expiration_days": 90
}

```

OnlineStoreConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|interaction_max_per_user|integer|false|none|Maximum number of recent interactions per user in Redis.|
|interaction_expiration_days|integer|false|none|Time-to-live in days for user interaction history in Redis.|

<h2 id="tocS_PaginationConfig">PaginationConfig</h2>
<!-- backwards compatibility -->
<a id="schemapaginationconfig"></a>
<a id="schema_PaginationConfig"></a>
<a id="tocSpaginationconfig"></a>
<a id="tocspaginationconfig"></a>

```json
{
  "page_expiration_in_seconds": 0
}

```

PaginationConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|page_expiration_in_seconds|integer|false|none|Time in seconds before pagination state expires. 0 disables pagination.|

<h2 id="tocS_ParameterDefinition">ParameterDefinition</h2>
<!-- backwards compatibility -->
<a id="schemaparameterdefinition"></a>
<a id="schema_ParameterDefinition"></a>
<a id="tocSparameterdefinition"></a>
<a id="tocsparameterdefinition"></a>

```json
{
  "default": 0
}

```

ParameterDefinition

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|default|any|false|none|Default value for the parameter if not provided in request.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[integer]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[number]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[boolean]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_PassthroughScore">PassthroughScore</h2>
<!-- backwards compatibility -->
<a id="schemapassthroughscore"></a>
<a id="schema_PassthroughScore"></a>
<a id="tocSpassthroughscore"></a>
<a id="tocspassthroughscore"></a>

```json
{
  "name": "string",
  "type": "passthrough"
}

```

PassthroughScore

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|any|false|none|Optional name for this score step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Score step type discriminator.|

<h2 id="tocS_PersonalFilter">PersonalFilter</h2>
<!-- backwards compatibility -->
<a id="schemapersonalfilter"></a>
<a id="schema_PersonalFilter"></a>
<a id="tocSpersonalfilter"></a>
<a id="tocspersonalfilter"></a>

```json
{
  "user_id_column": "user_id",
  "item_id_column": "item_id",
  "index_type": "bloom_filter",
  "type": "personal"
}

```

PersonalFilter

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_id_column|string|false|none|Column name for user identifiers.|
|item_id_column|string|false|none|Column name for item identifiers.|
|index_type|[FilterIndexType](#schemafilterindextype)|false|none|Index type for fast filter lookups.|
|type|string|false|none|Filter type discriminator.|

<h2 id="tocS_PoolingFunction">PoolingFunction</h2>
<!-- backwards compatibility -->
<a id="schemapoolingfunction"></a>
<a id="schema_PoolingFunction"></a>
<a id="tocSpoolingfunction"></a>
<a id="tocspoolingfunction"></a>

```json
"max"

```

PoolingFunction

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|PoolingFunction|string|false|none|The function to use when pooling multiple embeddings into one.|

#### Enumerated Values

|Property|Value|
|---|---|
|PoolingFunction|max|
|PoolingFunction|mean|

<h2 id="tocS_PrebuiltFilterStep">PrebuiltFilterStep</h2>
<!-- backwards compatibility -->
<a id="schemaprebuiltfilterstep"></a>
<a id="schema_PrebuiltFilterStep"></a>
<a id="tocSprebuiltfilterstep"></a>
<a id="tocsprebuiltfilterstep"></a>

```json
{
  "filter_ref": "string",
  "name": "string",
  "input_user_id": "string",
  "type": "prebuilt"
}

```

PrebuiltFilterStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter_ref|string|true|none|Reference to a prebuilt filter (e.g., ref:data.filters:name).|
|name|any|false|none|Optional name for this filter step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_id|any|false|none|User ID for personal filters. Required for personal, omitted for global filters.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Filter step type discriminator.|

<h2 id="tocS_PrecomputedItemEmbedding">PrecomputedItemEmbedding</h2>
<!-- backwards compatibility -->
<a id="schemaprecomputeditemembedding"></a>
<a id="schema_PrecomputedItemEmbedding"></a>
<a id="tocSprecomputeditemembedding"></a>
<a id="tocsprecomputeditemembedding"></a>

```json
{
  "input_item_id": "string",
  "type": "precomputed_item"
}

```

PrecomputedItemEmbedding

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_item_id|string|true|none|Item ID to lookup precomputed embedding.|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_PrecomputedUserEmbedding">PrecomputedUserEmbedding</h2>
<!-- backwards compatibility -->
<a id="schemaprecomputeduserembedding"></a>
<a id="schema_PrecomputedUserEmbedding"></a>
<a id="tocSprecomputeduserembedding"></a>
<a id="tocsprecomputeduserembedding"></a>

```json
{
  "input_user_id": "string",
  "type": "precomputed_user"
}

```

PrecomputedUserEmbedding

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_id|string|true|none|User ID parameter or value to lookup precomputed embedding.|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_QueryDefinition">QueryDefinition</h2>
<!-- backwards compatibility -->
<a id="schemaquerydefinition"></a>
<a id="schema_QueryDefinition"></a>
<a id="tocSquerydefinition"></a>
<a id="tocsquerydefinition"></a>

```json
{
  "query": {
    "columns": [
      "string"
    ],
    "embeddings": [
      "string"
    ],
    "retrieve": [
      {
        "columns": [
          {
            "name": "string",
            "ascending": true,
            "nulls_first": false
          }
        ],
        "where": "string",
        "limit": 100,
        "name": "string",
        "type": "column_order"
      }
    ],
    "filter": [
      {
        "filter_ref": "string",
        "name": "string",
        "input_user_id": "string",
        "type": "prebuilt"
      }
    ],
    "score": {
      "value_model": "string",
      "input_user_id": "string",
      "input_user_features": {},
      "input_interactions_item_ids": [
        null
      ],
      "name": "string",
      "type": "score_ensemble"
    },
    "reorder": [
      {
        "retriever": {
          "columns": [
            {
              "name": "string",
              "ascending": true,
              "nulls_first": false
            }
          ],
          "where": "string",
          "limit": 100,
          "name": "string",
          "type": "column_order"
        },
        "strength": 0.5,
        "name": "string",
        "type": "exploration"
      }
    ],
    "limit": 0,
    "type": "rank",
    "from": "user"
  },
  "parameters": {
    "property1": {
      "default": 0
    },
    "property2": {
      "default": 0
    }
  }
}

```

QueryDefinition

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|query|any|true|none|Query configuration pipeline or SQL query string. Can be either a QueryConfig object or a SQL query string that will be transpiled to a QueryConfig at initialization time.|

anyOf - discriminator: type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[RankQueryConfig](#schemarankqueryconfig)|false|none|Config for a query pipeline that ranks entities (items or users) based on the<br>given definition. The entity type is determined by the 'from' field.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[RankItemAttributeValuesQueryConfig](#schemarankitemattributevaluesqueryconfig)|false|none|Config for a query pipeline that ranks the possible values of a given item<br>attribute. If a user_id is provided, the ranking will be personalized.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|parameters|object|false|none|Dictionary of parameter definitions for query parameterization.|
|» **additionalProperties**|[ParameterDefinition](#schemaparameterdefinition)|false|none|Defines a single parameter that can be passed to an endpoint. These parameters are<br>templates that can be passed into any of the configuration of the query pipeline.|

<h2 id="tocS_QueryTableConfig">QueryTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaquerytableconfig"></a>
<a id="schema_QueryTableConfig"></a>
<a id="tocSquerytableconfig"></a>
<a id="tocsquerytableconfig"></a>

```json
{
  "type": "query",
  "query": "string"
}

```

QueryTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Type discriminator for query-based config.|
|query|string|true|none|SQL query to run against the data in your account. Your query can reference tables or transforms. Uses Clickhouse SQL dialect.|

<h2 id="tocS_RankItemAttributeValuesQueryConfig">RankItemAttributeValuesQueryConfig</h2>
<!-- backwards compatibility -->
<a id="schemarankitemattributevaluesqueryconfig"></a>
<a id="schema_RankItemAttributeValuesQueryConfig"></a>
<a id="tocSrankitemattributevaluesqueryconfig"></a>
<a id="tocsrankitemattributevaluesqueryconfig"></a>

```json
{
  "input_attribute": "string",
  "columns": [
    "string"
  ],
  "embeddings": [
    "string"
  ],
  "limit": 15,
  "input_user_id": "string",
  "type": "rank_attributes"
}

```

RankItemAttributeValuesQueryConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_attribute|string|true|none|Item attribute name to rank values for.|
|columns|any|false|none|List of column names to include in results.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embeddings|any|false|none|List of embedding names to include in results.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|integer|false|none|Maximum number of attribute values to return.|
|input_user_id|any|false|none|User ID for personalized ranking (optional).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Query config type discriminator.|

<h2 id="tocS_RankQueryConfig">RankQueryConfig</h2>
<!-- backwards compatibility -->
<a id="schemarankqueryconfig"></a>
<a id="schema_RankQueryConfig"></a>
<a id="tocSrankqueryconfig"></a>
<a id="tocsrankqueryconfig"></a>

```json
{
  "columns": [
    "string"
  ],
  "embeddings": [
    "string"
  ],
  "retrieve": [
    {
      "columns": [
        {
          "name": "string",
          "ascending": true,
          "nulls_first": false
        }
      ],
      "where": "string",
      "limit": 100,
      "name": "string",
      "type": "column_order"
    }
  ],
  "filter": [
    {
      "filter_ref": "string",
      "name": "string",
      "input_user_id": "string",
      "type": "prebuilt"
    }
  ],
  "score": {
    "value_model": "string",
    "input_user_id": "string",
    "input_user_features": {},
    "input_interactions_item_ids": [
      null
    ],
    "name": "string",
    "type": "score_ensemble"
  },
  "reorder": [
    {
      "retriever": {
        "columns": [
          {
            "name": "string",
            "ascending": true,
            "nulls_first": false
          }
        ],
        "where": "string",
        "limit": 100,
        "name": "string",
        "type": "column_order"
      },
      "strength": 0.5,
      "name": "string",
      "type": "exploration"
    }
  ],
  "limit": 0,
  "type": "rank",
  "from": "user"
}

```

RankQueryConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to include in results.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embeddings|any|false|none|List of embedding names to include in results.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retrieve|[oneOf]|false|none|List of retrieval steps to execute.|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ColumnOrderRetrieveStep](#schemacolumnorderretrievestep)|false|none|Retrieves candidates by sorting on one or more columns.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TextSearchRetrieveStep](#schematextsearchretrievestep)|false|none|Unified text search retrieval.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SimilarityRetrieveStep](#schemasimilarityretrievestep)|false|none|Performs a search on an embedding index and returns entities.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[FilterRetrieveStep](#schemafilterretrievestep)|false|none|Retrieves entities by filtering without ordering. Useful for simple data<br>queries that select specific columns and filter them.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CandidateIdsRetrieveStep](#schemacandidateidsretrievestep)|false|none|Retrieves a specific list of entity IDs (candidate items for reranking).<br>Useful for reranking scenarios where you want to score/reorder a specific<br>set of items.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CandidateAttributesRetrieveStep](#schemacandidateattributesretrievestep)|false|none|Retrieves items from provided item attributes (for items not in catalog).<br>Useful for reranking scenarios where you want to score/reorder items that<br>may not be in the catalog yet, using their attributes directly.|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter|any|false|none|Filter steps to apply (only used for item ranking).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[PrebuiltFilterStep](#schemaprebuiltfilterstep)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[ExpressionFilterStep](#schemaexpressionfilterstep)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[TruncateFilterStep](#schematruncatefilterstep)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score|any|false|none|Scoring step configuration.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ScoreEnsemble](#schemascoreensemble)|false|none|Scores items using a model expression.<br><br>The value_model is a mathematical expression that references trained models.<br>For single models, just use the model name (e.g., "lightgbm_v1").<br>For ensembles, use arithmetic (e.g., "0.6 * lightgbm_v1 + 0.4 * xgboost_v2").|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PassthroughScore](#schemapassthroughscore)|false|none|A simple step that uses the raw retrieval scores.|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|reorder|[anyOf]|false|none|List of reordering steps to apply.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ExplorationReorderStep](#schemaexplorationreorderstep)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[BoostedReorderStep](#schemaboostedreorderstep)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[DiversityReorderStep](#schemadiversityreorderstep)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|any|false|none|Maximum number of entities to return.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Query config type discriminator.|
|from|any|false|none|Entity type to rank|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[EntityType](#schemaentitytype)|false|none|Enum for entity types used in query processing.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_RecreateRollout">RecreateRollout</h2>
<!-- backwards compatibility -->
<a id="schemarecreaterollout"></a>
<a id="schema_RecreateRollout"></a>
<a id="tocSrecreaterollout"></a>
<a id="tocsrecreaterollout"></a>

```json
{
  "type": "recreate"
}

```

RecreateRollout

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Rollout type discriminator.|

<h2 id="tocS_ReferenceTableConfig">ReferenceTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemareferencetableconfig"></a>
<a id="schema_ReferenceTableConfig"></a>
<a id="tocSreferencetableconfig"></a>
<a id="tocsreferencetableconfig"></a>

```json
{
  "type": "table",
  "name": "string",
  "columns": [
    "string"
  ],
  "where": "string"
}

```

ReferenceTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Type discriminator for table reference config.|
|name|string|true|none|Name of the table to use.|
|columns|any|false|none|List of column names to select from the table. Defaults to all columns if not provided.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|where|any|false|none|Optional WHERE clause for filtering rows.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_RequestsPerSecondScalingPolicy">RequestsPerSecondScalingPolicy</h2>
<!-- backwards compatibility -->
<a id="schemarequestspersecondscalingpolicy"></a>
<a id="schema_RequestsPerSecondScalingPolicy"></a>
<a id="tocSrequestspersecondscalingpolicy"></a>
<a id="tocsrequestspersecondscalingpolicy"></a>

```json
{
  "type": "requests_per_second",
  "target_requests": 10
}

```

RequestsPerSecondScalingPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Scaling policy type discriminator.|
|target_requests|number|false|none|Target requests per second per replica for scaling.|

<h2 id="tocS_ResourceConfig">ResourceConfig</h2>
<!-- backwards compatibility -->
<a id="schemaresourceconfig"></a>
<a id="schema_ResourceConfig"></a>
<a id="tocSresourceconfig"></a>
<a id="tocsresourceconfig"></a>

```json
{
  "min_cpu": 0.001
}

```

ResourceConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_cpu|number|false|none|Minimum CPU request for the inference deployment in CPU cores. This specifies the minimum number of CPU cores allocated to the query server deployment, but may be autoscaled up to adjust for traffic.|

<h2 id="tocS_RolloutConfig">RolloutConfig</h2>
<!-- backwards compatibility -->
<a id="schemarolloutconfig"></a>
<a id="schema_RolloutConfig"></a>
<a id="tocSrolloutconfig"></a>
<a id="tocsrolloutconfig"></a>

```json
{
  "strategy": {
    "type": "canary",
    "evaluation_period_minutes": 10
  }
}

```

RolloutConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strategy|any|false|none|Deployment rollout strategy configuration.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[CanaryRollout](#schemacanaryrollout)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[RecreateRollout](#schemarecreaterollout)|false|none|none|

<h2 id="tocS_SamplingStrategy">SamplingStrategy</h2>
<!-- backwards compatibility -->
<a id="schemasamplingstrategy"></a>
<a id="schema_SamplingStrategy"></a>
<a id="tocSsamplingstrategy"></a>
<a id="tocssamplingstrategy"></a>

```json
"user_based"

```

SamplingStrategy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|SamplingStrategy|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|SamplingStrategy|user_based|

<h2 id="tocS_SchemaConfig">SchemaConfig</h2>
<!-- backwards compatibility -->
<a id="schemaschemaconfig"></a>
<a id="schema_SchemaConfig"></a>
<a id="tocSschemaconfig"></a>
<a id="tocsschemaconfig"></a>

```json
{
  "user": {
    "id": "string",
    "features": [
      {
        "name": "string",
        "type": "Id"
      }
    ],
    "created_at": "string"
  },
  "item": {
    "id": "string",
    "features": [
      {
        "name": "string",
        "type": "Id"
      }
    ],
    "created_at": "string"
  },
  "interaction": {
    "label": {
      "name": "string",
      "type": "BinaryLabel"
    },
    "created_at": "string",
    "session_id": "string",
    "interaction_id": "string",
    "features": [
      {
        "name": "string",
        "type": "Id"
      }
    ]
  }
}

```

SchemaConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user|any|false|none|User entity configuration with id and features.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[EntityConfig](#schemaentityconfig)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item|any|false|none|Item entity configuration with id and features.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[EntityConfig](#schemaentityconfig)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|interaction|any|false|none|Interaction configuration with label and features.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[InteractionConfig](#schemainteractionconfig)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ScoreEnsemble">ScoreEnsemble</h2>
<!-- backwards compatibility -->
<a id="schemascoreensemble"></a>
<a id="schema_ScoreEnsemble"></a>
<a id="tocSscoreensemble"></a>
<a id="tocsscoreensemble"></a>

```json
{
  "value_model": "string",
  "input_user_id": "string",
  "input_user_features": {},
  "input_interactions_item_ids": [
    null
  ],
  "name": "string",
  "type": "score_ensemble"
}

```

ScoreEnsemble

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value_model|string|true|none|Mathematical expression combining model outputs (e.g., '0.6 * model1 + 0.4 * model2').|
|input_user_id|any|false|none|User ID parameter or value for scoring.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_features|any|false|none|User features dictionary for scoring.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_interactions_item_ids|any|false|none|List of item IDs from user interactions.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[any]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|any|false|none|Optional name for this score step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Score step type discriminator.|

<h2 id="tocS_SearchConfig">SearchConfig</h2>
<!-- backwards compatibility -->
<a id="schemasearchconfig"></a>
<a id="schema_SearchConfig"></a>
<a id="tocSsearchconfig"></a>
<a id="tocssearchconfig"></a>

```json
{
  "tokenizer": {
    "language": "en",
    "stemming": true,
    "ascii_folding": true,
    "remove_stop_words": true,
    "type": "stemmer"
  },
  "user_fields": [
    "string"
  ],
  "item_fields": [
    "string"
  ]
}

```

SearchConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tokenizer|any|false|none|The tokenizer to use for text indexing.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[StemmerTokenizer](#schemastemmertokenizer)|false|none|A standard, language-aware tokenizer that supports stemming, folding, and stop<br>words.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[NgramTokenizer](#schemangramtokenizer)|false|none|A tokenizer that breaks text into n-grams of a specified size.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[WhitespaceTokenizer](#schemawhitespacetokenizer)|false|none|A simple tokenizer that splits on whitespace.|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_fields|any|false|none|List of user field names to index for search.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_fields|any|false|none|List of item field names to index for search.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ServerConfig">ServerConfig</h2>
<!-- backwards compatibility -->
<a id="schemaserverconfig"></a>
<a id="schema_ServerConfig"></a>
<a id="tocSserverconfig"></a>
<a id="tocsserverconfig"></a>

```json
{
  "worker_count": 1
}

```

ServerConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|worker_count|integer|false|none|Number of worker processes per inference pod.|

<h2 id="tocS_SetupEngineResponse">SetupEngineResponse</h2>
<!-- backwards compatibility -->
<a id="schemasetupengineresponse"></a>
<a id="schema_SetupEngineResponse"></a>
<a id="tocSsetupengineresponse"></a>
<a id="tocssetupengineresponse"></a>

```json
{
  "engine_url": "string"
}

```

SetupEngineResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|engine_url|string|true|none|URL to access the created or updated engine.|

<h2 id="tocS_SimilarityRetrieveStep">SimilarityRetrieveStep</h2>
<!-- backwards compatibility -->
<a id="schemasimilarityretrievestep"></a>
<a id="schema_SimilarityRetrieveStep"></a>
<a id="tocSsimilarityretrievestep"></a>
<a id="tocssimilarityretrievestep"></a>

```json
{
  "embedding_ref": "string",
  "query_encoder": {
    "input_user_id": "string",
    "pooling_function": "max",
    "truncate_interactions": 10,
    "type": "interaction_pooling"
  },
  "where": "string",
  "limit": 100,
  "name": "string",
  "type": "similarity",
  "use_exact_search": false
}

```

SimilarityRetrieveStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embedding_ref|string|true|none|Name of the embedding to use for similarity search.|
|query_encoder|any|true|none|Encoder to generate query vector from user/item input.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[InteractionPoolingEncoder](#schemainteractionpoolingencoder)|false|none|Creates a query vector by pooling embeddings from a user's interaction history.<br>This should only be used with users, as item interactions aren't stored.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[InteractionRoundRobinEncoder](#schemainteractionroundrobinencoder)|false|none|Retrieves items using round-robin strategy from a user's interaction history.<br>Instead of pooling, this queries each interacted item and round-robins the results.<br>This should only be used with users, as item interactions aren't stored.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[UserAttributePoolingEncoder](#schemauserattributepoolingencoder)|false|none|Creates a query vector by encoding the user's attributes.<br>This can only be used with a content or text embedding.<br><br>Can optionally provide user features directly via input_user_features,<br>which will be merged with features from input_user_id.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PrecomputedUserEmbedding](#schemaprecomputeduserembedding)|false|none|Looks up a pre-computed (cached) embedding for a given user ID.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ItemAttributePoolingEncoder](#schemaitemattributepoolingencoder)|false|none|Creates a query vector by encoding the item's attributes.<br>This can only be used with a content or text embedding.<br><br>Can optionally provide item features directly via input_item_features,<br>which will be merged with features from input_item_id.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PrecomputedItemEmbedding](#schemaprecomputeditemembedding)|false|none|Looks up a pre-computed (cached) embedding for a given item ID.|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|where|any|false|none|Optional DuckDB filter expression.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|integer|false|none|Maximum number of candidates to retrieve.|
|name|any|false|none|Optional name for this retrieve step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Retrieve step type discriminator.|
|use_exact_search|boolean|false|none|If True, forces brute-force search, bypassing any index. This can improve recall but is slower.|

<h2 id="tocS_StemmerTokenizer">StemmerTokenizer</h2>
<!-- backwards compatibility -->
<a id="schemastemmertokenizer"></a>
<a id="schema_StemmerTokenizer"></a>
<a id="tocSstemmertokenizer"></a>
<a id="tocsstemmertokenizer"></a>

```json
{
  "language": "en",
  "stemming": true,
  "ascii_folding": true,
  "remove_stop_words": true,
  "type": "stemmer"
}

```

StemmerTokenizer

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|language|string|false|none|Language code (e.g., en, es, fr).|
|stemming|boolean|false|none|Whether to apply word stemming.|
|ascii_folding|boolean|false|none|Whether to fold accented characters to ASCII.|
|remove_stop_words|boolean|false|none|Whether to remove common stop words.|
|type|string|false|none|Tokenizer type discriminator.|

<h2 id="tocS_TextSearchRetrieveStep">TextSearchRetrieveStep</h2>
<!-- backwards compatibility -->
<a id="schematextsearchretrievestep"></a>
<a id="schema_TextSearchRetrieveStep"></a>
<a id="tocStextsearchretrievestep"></a>
<a id="tocstextsearchretrievestep"></a>

```json
{
  "input_text_query": "string",
  "mode": {
    "fuzziness_edit_distance": 0,
    "type": "lexical"
  },
  "where": "string",
  "limit": 100,
  "name": "string",
  "type": "text_search"
}

```

TextSearchRetrieveStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_text_query|string|true|none|Text query parameter or value to search for.|
|mode|any|true|none|Search mode (lexical or vector) for text matching.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[LexicalSearchMode](#schemalexicalsearchmode)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[VectorSearchMode](#schemavectorsearchmode)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|where|any|false|none|Optional DuckDB filter expression.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|integer|false|none|Maximum number of candidates to retrieve.|
|name|any|false|none|Optional name for this retrieve step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Retrieve step type discriminator.|

<h2 id="tocS_TrainedModelEncoder">TrainedModelEncoder</h2>
<!-- backwards compatibility -->
<a id="schematrainedmodelencoder"></a>
<a id="schema_TrainedModelEncoder"></a>
<a id="tocStrainedmodelencoder"></a>
<a id="tocstrainedmodelencoder"></a>

```json
{
  "model_ref": "string",
  "type": "trained_model"
}

```

TrainedModelEncoder

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|model_ref|string|true|none|Name of the trained model to use as encoder.|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_TrainingComputeConfig">TrainingComputeConfig</h2>
<!-- backwards compatibility -->
<a id="schematrainingcomputeconfig"></a>
<a id="schema_TrainingComputeConfig"></a>
<a id="tocStrainingcomputeconfig"></a>
<a id="tocstrainingcomputeconfig"></a>

```json
{
  "gpu_type": "T4",
  "gpu_count": 1,
  "cpu_memory_gb": 16,
  "cpu_count": 4,
  "force_gpu": false,
  "disk_size_gb": 64
}

```

TrainingComputeConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|gpu_type|string|false|none|GPU type for training (e.g., T4, L4).|
|gpu_count|integer|false|none|Number of GPUs per training job.|
|cpu_memory_gb|integer|false|none|CPU memory in GB per training job.|
|cpu_count|integer|false|none|Number of CPU cores per training job.|
|force_gpu|boolean|false|none|Whether to force GPU usage even if not needed.|
|disk_size_gb|integer|false|none|Disk size in GB for training job storage.|

<h2 id="tocS_TrainingConfig">TrainingConfig</h2>
<!-- backwards compatibility -->
<a id="schematrainingconfig"></a>
<a id="schema_TrainingConfig"></a>
<a id="tocStrainingconfig"></a>
<a id="tocstrainingconfig"></a>

```json
{
  "schedule": "@daily",
  "compute": {
    "gpu_type": "T4",
    "gpu_count": 1,
    "cpu_memory_gb": 16,
    "cpu_count": 4,
    "force_gpu": false,
    "disk_size_gb": 64
  },
  "data_split": {
    "strategy": "global"
  },
  "evaluation": {
    "enable": false,
    "candidate_source": "batch_iids",
    "filter_seen_items": false,
    "evaluation_top_k": 50
  },
  "models": [
    {
      "policy_type": "elsa",
      "name": "string",
      "event_values": [
        "string"
      ],
      "batch_size": 512,
      "n_epochs": 1,
      "factors": {
        "type": "tunable_int",
        "min": 10,
        "max": 200,
        "scale": "linear"
      },
      "lr": {
        "type": "tunable_float",
        "min": 0.01,
        "max": 0.1,
        "scale": "linear"
      },
      "device": "string",
      "strategy": "default",
      "patience": 3,
      "balance_labels": true
    }
  ],
  "tuning": {
    "total_jobs": 30,
    "parallel_jobs": 10
  }
}

```

TrainingConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schedule|string|false|none|Model retraining frequency.|
|compute|[TrainingComputeConfig](#schematrainingcomputeconfig)|false|none|Compute resources for training jobs.|
|data_split|[DataSplitConfig](#schemadatasplitconfig)|false|none|Configure train/test split.|
|evaluation|[EvaluationConfig](#schemaevaluationconfig)|false|none|Model evaluation strategy configuration.|
|models|[oneOf]|false|none|List of scoring policy models to train.|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__ELSAModelPolicy__Config](#schemashaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__elsamodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__LightGBMModelPolicy__Config](#schemashaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__lightgbmmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__als_model_policy__ALSModelPolicy__Config](#schemashaped_internal__recsys__policies__als_model_policy__alsmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__svd_model_policy__SVDModelPolicy__Config](#schemashaped_internal__recsys__policies__svd_model_policy__svdmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__SASRecModelPolicy__Config](#schemashaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__sasrecmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__GSASRecModelPolicy__Config](#schemashaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__gsasrecmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__bert_model_policy__bert_model_policy__BERTModelPolicy__Config](#schemashaped_internal__recsys__policies__bert_model_policy__bert_model_policy__bertmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__TwoTowerModelPolicy__Config](#schemashaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__twotowermodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__rising_popular_policy__RisingPopularPolicy__Config](#schemashaped_internal__recsys__policies__rising_popular_policy__risingpopularpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__ngram_model_policy__NgramModelPolicy__Config](#schemashaped_internal__recsys__policies__ngram_model_policy__ngrammodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__widedeep_model_policy__WideDeepModelPolicy__Config](#schemashaped_internal__recsys__policies__widedeep_model_policy__widedeepmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__item2vec_model_policy__Item2VecModelPolicy__Config](#schemashaped_internal__recsys__policies__item2vec_model_policy__item2vecmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__xgboost_model_policy__XGBoostModelPolicy__Config](#schemashaped_internal__recsys__policies__xgboost_model_policy__xgboostmodelpolicy__config)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[shaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__BeeformerModelPolicy__Config](#schemashaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__beeformermodelpolicy__config)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tuning|[TuningConfig](#schematuningconfig)|false|none|Hyperparameter tuning configuration.|

<h2 id="tocS_TrainingStrategy">TrainingStrategy</h2>
<!-- backwards compatibility -->
<a id="schematrainingstrategy"></a>
<a id="schema_TrainingStrategy"></a>
<a id="tocStrainingstrategy"></a>
<a id="tocstrainingstrategy"></a>

```json
"default"

```

TrainingStrategy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|TrainingStrategy|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|TrainingStrategy|default|
|TrainingStrategy|early_stopping|

<h2 id="tocS_TruncateFilterStep">TruncateFilterStep</h2>
<!-- backwards compatibility -->
<a id="schematruncatefilterstep"></a>
<a id="schema_TruncateFilterStep"></a>
<a id="tocStruncatefilterstep"></a>
<a id="tocstruncatefilterstep"></a>

```json
{
  "name": "string",
  "max_length": 500,
  "type": "truncate"
}

```

TruncateFilterStep

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|any|false|none|Optional name for this filter step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|max_length|integer|false|none|Maximum number of items to keep after truncation.|
|type|string|false|none|Filter step type discriminator.|

<h2 id="tocS_TunableBool">TunableBool</h2>
<!-- backwards compatibility -->
<a id="schematunablebool"></a>
<a id="schema_TunableBool"></a>
<a id="tocStunablebool"></a>
<a id="tocstunablebool"></a>

```json
{
  "type": "tunable_bool"
}

```

TunableBool

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|none|

<h2 id="tocS_TunableFloat">TunableFloat</h2>
<!-- backwards compatibility -->
<a id="schematunablefloat"></a>
<a id="schema_TunableFloat"></a>
<a id="tocStunablefloat"></a>
<a id="tocstunablefloat"></a>

```json
{
  "type": "tunable_float",
  "min": 0,
  "max": 0,
  "scale": "linear"
}

```

TunableFloat

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|none|
|min|number|true|none|none|
|max|number|true|none|none|
|scale|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|linear|
|*anonymous*|log|

<h2 id="tocS_TunableInt">TunableInt</h2>
<!-- backwards compatibility -->
<a id="schematunableint"></a>
<a id="schema_TunableInt"></a>
<a id="tocStunableint"></a>
<a id="tocstunableint"></a>

```json
{
  "type": "tunable_int",
  "min": 0,
  "max": 0,
  "scale": "linear"
}

```

TunableInt

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|none|
|min|integer|true|none|none|
|max|integer|true|none|none|
|scale|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|linear|
|*anonymous*|log|

<h2 id="tocS_TunableIntCategorical">TunableIntCategorical</h2>
<!-- backwards compatibility -->
<a id="schematunableintcategorical"></a>
<a id="schema_TunableIntCategorical"></a>
<a id="tocStunableintcategorical"></a>
<a id="tocstunableintcategorical"></a>

```json
{
  "type": "tunable_int_categorical",
  "options": [
    0
  ]
}

```

TunableIntCategorical

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|none|
|options|[integer]|true|none|none|

<h2 id="tocS_TunableString">TunableString</h2>
<!-- backwards compatibility -->
<a id="schematunablestring"></a>
<a id="schema_TunableString"></a>
<a id="tocStunablestring"></a>
<a id="tocstunablestring"></a>

```json
{
  "type": "tunable_string",
  "options": [
    "string"
  ]
}

```

TunableString

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|none|
|options|[string]|true|none|none|

<h2 id="tocS_TuningConfig">TuningConfig</h2>
<!-- backwards compatibility -->
<a id="schematuningconfig"></a>
<a id="schema_TuningConfig"></a>
<a id="tocStuningconfig"></a>
<a id="tocstuningconfig"></a>

```json
{
  "total_jobs": 30,
  "parallel_jobs": 10
}

```

TuningConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|total_jobs|integer|false|none|Total number of hyperparameter tuning jobs.|
|parallel_jobs|integer|false|none|Number of tuning jobs to run in parallel.|

<h2 id="tocS_UserAttributePoolingEncoder">UserAttributePoolingEncoder</h2>
<!-- backwards compatibility -->
<a id="schemauserattributepoolingencoder"></a>
<a id="schema_UserAttributePoolingEncoder"></a>
<a id="tocSuserattributepoolingencoder"></a>
<a id="tocsuserattributepoolingencoder"></a>

```json
{
  "input_user_id": "string",
  "input_user_features": {},
  "type": "user_attribute_pooling"
}

```

UserAttributePoolingEncoder

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_id|any|false|none|User ID parameter or value to encode.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_user_features|any|false|none|User features dictionary to encode (merged with user_id data).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Encoder type discriminator.|

<h2 id="tocS_ValidationError">ValidationError</h2>
<!-- backwards compatibility -->
<a id="schemavalidationerror"></a>
<a id="schema_ValidationError"></a>
<a id="tocSvalidationerror"></a>
<a id="tocsvalidationerror"></a>

```json
{
  "loc": [
    "string"
  ],
  "msg": "string",
  "type": "string"
}

```

ValidationError

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|loc|[anyOf]|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|msg|string|true|none|none|
|type|string|true|none|none|

<h2 id="tocS_VectorSearchMode">VectorSearchMode</h2>
<!-- backwards compatibility -->
<a id="schemavectorsearchmode"></a>
<a id="schema_VectorSearchMode"></a>
<a id="tocSvectorsearchmode"></a>
<a id="tocsvectorsearchmode"></a>

```json
{
  "text_embedding_ref": "string",
  "type": "vector",
  "use_exact_search": false
}

```

VectorSearchMode

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text_embedding_ref|string|true|none|Name of the text embedding to use for vector search.|
|type|string|false|none|Search mode type discriminator.|
|use_exact_search|boolean|false|none|If True, forces brute-force search, bypassing any index. This can improve recall but is slower.|

<h2 id="tocS_WhitespaceTokenizer">WhitespaceTokenizer</h2>
<!-- backwards compatibility -->
<a id="schemawhitespacetokenizer"></a>
<a id="schema_WhitespaceTokenizer"></a>
<a id="tocSwhitespacetokenizer"></a>
<a id="tocswhitespacetokenizer"></a>

```json
{
  "type": "whitespace"
}

```

WhitespaceTokenizer

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|false|none|Tokenizer type discriminator.|

<h2 id="tocS_shaped_internal__recsys__policies__als_model_policy__ALSModelPolicy__Config">shaped_internal__recsys__policies__als_model_policy__ALSModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__als_model_policy__alsmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__als_model_policy__ALSModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__als_model_policy__alsmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__als_model_policy__alsmodelpolicy__config"></a>

```json
{
  "policy_type": "als",
  "name": "string",
  "event_values": [
    "string"
  ],
  "factors": {
    "type": "tunable_int",
    "min": 10,
    "max": 200,
    "scale": "linear"
  },
  "regularization": {
    "type": "tunable_float",
    "min": 0.001,
    "max": 0.5,
    "scale": "linear"
  },
  "bm25": {
    "type": "tunable_bool"
  },
  "bm25_k1": 1.2,
  "bm25_b": 0.75,
  "use_features": false,
  "normalize_numerical_features": false,
  "use_derived_timestamp_features": false,
  "balance_labels": false
}

```

ALSPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|Policy type discriminator.|
|name|any|false|none|Optional name for this policy instance.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|List of event value strings to filter interactions by.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|factors|any|false|none|Number of latent factors in the matrix factorization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|regularization|any|false|none|Regularization parameter to prevent overfitting.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bm25|any|false|none|Whether to use BM25 weighting scheme.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableBool](#schematunablebool)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|bm25_k1|number|false|none|BM25 coefficient for item frequency factor.|
|bm25_b|number|false|none|BM25 coefficient for document length factor.|
|use_features|boolean|false|none|Whether to use entity features in the model.|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__BeeformerModelPolicy__Config">shaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__BeeformerModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__beeformermodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__BeeformerModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__beeformermodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__beeformer_model_policy__beeformer_model_policy__beeformermodelpolicy__config"></a>

```json
{
  "policy_type": "beeformer",
  "name": "string",
  "event_values": [
    "string"
  ],
  "device": "string",
  "seed": 42,
  "lr": {
    "type": "tunable_float",
    "min": 0.000001,
    "max": 0.001,
    "scale": "linear"
  },
  "use_scheduler": false,
  "epochs": 1,
  "max_output": 1,
  "batch_size": 1024,
  "top_k": 0,
  "embedder": "all-mpnet-base-v2",
  "use_images": false,
  "max_seq_length": {
    "type": "tunable_int",
    "min": 128,
    "max": 512,
    "scale": "linear"
  },
  "embedder_batch_size": {
    "type": "tunable_int",
    "min": 8,
    "max": 128,
    "scale": "linear"
  },
  "train_distributed": false,
  "normalize_numerical_features": false,
  "use_derived_timestamp_features": false,
  "balance_labels": false
}

```

BeeformerPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|device|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|seed|integer|false|none|Random seed for reproducibility.|
|lr|any|false|none|Learning rate for gradient descent optimization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|use_scheduler|boolean|false|none|Whether to use a learning rate scheduler.|
|epochs|integer|false|none|Number of complete passes through the training dataset.|
|max_output|integer|false|none|Negative sampling hyperparameter, uniform.|
|batch_size|integer|false|none|Number of samples processed before updating model weights.|
|top_k|integer|false|none|Optimize only for top-k predictions on the output.|
|embedder|string|false|none|none|
|use_images|boolean|false|none|Use image features.|
|max_seq_length|any|false|none|Maximum sequence length for tokenized input.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embedder_batch_size|any|false|none|Batch size for the embedder model (e.g., BERT).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|train_distributed|boolean|false|none|Train on multiple devices.|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__bert_model_policy__bert_model_policy__BERTModelPolicy__Config">shaped_internal__recsys__policies__bert_model_policy__bert_model_policy__BERTModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__bert_model_policy__bert_model_policy__bertmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__bert_model_policy__bert_model_policy__BERTModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__bert_model_policy__bert_model_policy__bertmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__bert_model_policy__bert_model_policy__bertmodelpolicy__config"></a>

```json
{
  "policy_type": "bert4rec",
  "name": "string",
  "event_values": [
    "string"
  ],
  "batch_size": {
    "type": "tunable_int",
    "min": 32,
    "max": 2048,
    "scale": "linear"
  },
  "eval_batch_size": 1000,
  "n_epochs": {
    "type": "tunable_int_categorical",
    "options": [
      1,
      20,
      50,
      100
    ]
  },
  "negative_samples_count": 2,
  "device": "string",
  "hidden_size": {
    "type": "tunable_int_categorical",
    "options": [
      32,
      64,
      128,
      256
    ]
  },
  "inner_size": {
    "type": "tunable_int_categorical",
    "options": [
      16,
      32,
      64,
      128
    ]
  },
  "learning_rate": {
    "type": "tunable_float",
    "min": 0.0001,
    "max": 0.1,
    "scale": "linear"
  },
  "attn_dropout_prob": {
    "type": "tunable_float",
    "min": 0,
    "max": 0.5,
    "scale": "linear"
  },
  "hidden_act": "gelu",
  "hidden_dropout_prob": {
    "type": "tunable_float",
    "min": 0,
    "max": 0.5,
    "scale": "linear"
  },
  "n_heads": {
    "type": "tunable_int",
    "min": 1,
    "max": 8,
    "scale": "linear"
  },
  "n_layers": {
    "type": "tunable_int",
    "min": 1,
    "max": 6,
    "scale": "linear"
  },
  "layer_norm_eps": 1e-12,
  "initializer_range": 0.02,
  "mask_rate": 0.2,
  "loss_type": "BPR",
  "max_seq_length": {
    "type": "tunable_int_categorical",
    "options": [
      20,
      50,
      100
    ]
  },
  "sample_strategy": "user_based",
  "sample_seed": 42,
  "sample_ratio": 0.8,
  "eval_step": 1,
  "early_stopping_step": 5,
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

BERTPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of samples processed before updating model weights.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|eval_batch_size|integer|false|none|Batch size used during model evaluation.|
|n_epochs|any|false|none|Number of complete passes through the training dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|negative_samples_count|integer|false|none|Number of negative samples per positive sample for contrastive learning.|
|device|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|hidden_size|any|false|none|Size of the hidden layers in the transformer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inner_size|any|false|none|Size of the feed-forward network inner layer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|learning_rate|any|false|none|Learning rate for gradient descent optimization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|attn_dropout_prob|any|false|none|Dropout probability for attention layers.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|hidden_act|string|false|none|none|
|hidden_dropout_prob|any|false|none|Dropout probability for hidden layers.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_heads|any|false|none|Number of attention heads in the transformer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_layers|any|false|none|Number of transformer layers.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|layer_norm_eps|number|false|none|none|
|initializer_range|number|false|none|none|
|mask_rate|number|false|none|Fraction of tokens to mask during training.|
|loss_type|[LossTypes](#schemalosstypes)|false|none|none|
|max_seq_length|any|false|none|Maximum length of input sequences.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sample_strategy|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SamplingStrategy](#schemasamplingstrategy)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sample_seed|integer|false|none|none|
|sample_ratio|number|false|none|none|
|eval_step|integer|false|none|none|
|early_stopping_step|integer|false|none|none|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__ELSAModelPolicy__Config">shaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__ELSAModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__elsamodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__ELSAModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__elsamodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__elsa_model_policy__elsa_model_policy__elsamodelpolicy__config"></a>

```json
{
  "policy_type": "elsa",
  "name": "string",
  "event_values": [
    "string"
  ],
  "batch_size": 512,
  "n_epochs": 1,
  "factors": {
    "type": "tunable_int",
    "min": 10,
    "max": 200,
    "scale": "linear"
  },
  "lr": {
    "type": "tunable_float",
    "min": 0.01,
    "max": 0.1,
    "scale": "linear"
  },
  "device": "string",
  "strategy": "default",
  "patience": 3,
  "balance_labels": true
}

```

ELSAPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|integer|false|none|Number of samples processed before updating model weights.|
|n_epochs|integer|false|none|Number of complete passes through the training dataset.|
|factors|any|false|none|Number of latent factors in the matrix factorization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lr|any|false|none|Learning rate for gradient descent optimization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|device|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strategy|[TrainingStrategy](#schematrainingstrategy)|false|none|none|
|patience|integer|false|none|Number of epochs to wait without improvement before early stopping.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__GSASRecModelPolicy__Config">shaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__GSASRecModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__gsasrecmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__GSASRecModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__gsasrecmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__gsasrec_model_policy__gsasrec_model_policy__gsasrecmodelpolicy__config"></a>

```json
{
  "policy_type": "gsasrec",
  "name": "string",
  "event_values": [
    "string"
  ],
  "batch_size": {
    "type": "tunable_int",
    "min": 16,
    "max": 128,
    "scale": "linear"
  },
  "eval_batch_size": 32,
  "n_epochs": {
    "type": "tunable_int_categorical",
    "options": [
      1,
      5,
      10,
      20
    ]
  },
  "device": "string",
  "learning_rate": {
    "type": "tunable_float",
    "min": 0.0001,
    "max": 0.1,
    "scale": "linear"
  },
  "weight_decay": 0.0005,
  "patience": 3,
  "sequence_length": {
    "type": "tunable_int_categorical",
    "options": [
      20,
      50,
      100
    ]
  },
  "embedding_dim": {
    "type": "tunable_int_categorical",
    "options": [
      16,
      32,
      64,
      128
    ]
  },
  "num_heads": {
    "type": "tunable_int_categorical",
    "options": [
      1,
      2,
      4
    ]
  },
  "num_blocks": {
    "type": "tunable_int_categorical",
    "options": [
      1,
      2,
      4
    ]
  },
  "dropout_rate": {
    "type": "tunable_float",
    "min": 0,
    "max": 0.8,
    "scale": "linear"
  },
  "reuse_item_embeddings": false,
  "max_batches_per_epoch": 100,
  "gbce_t": 0.75,
  "filter_rated": false,
  "neg_per_positive": {
    "type": "tunable_int_categorical",
    "options": [
      25,
      256
    ]
  },
  "eval_after_epochs": 1,
  "split_ratio": 0.9,
  "eps": 1e-10,
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

GSASRecPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of samples processed before updating model weights.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|eval_batch_size|integer|false|none|Batch size used during model evaluation.|
|n_epochs|any|false|none|Number of complete passes through the training dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|device|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|learning_rate|any|false|none|Learning rate for gradient descent optimization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|weight_decay|number|false|none|L2 regularization term to prevent overfitting.|
|patience|integer|false|none|Number of epochs to wait without improvement before early stopping.|
|sequence_length|any|false|none|Maximum length of input sequences.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embedding_dim|any|false|none|Dimensionality of item embeddings.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|num_heads|any|false|none|Number of attention heads in the transformer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|num_blocks|any|false|none|Number of transformer blocks.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|dropout_rate|any|false|none|Dropout probability to prevent overfitting.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|reuse_item_embeddings|boolean|false|none|none|
|max_batches_per_epoch|integer|false|none|none|
|gbce_t|number|false|none|none|
|filter_rated|boolean|false|none|none|
|neg_per_positive|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|eval_after_epochs|integer|false|none|none|
|split_ratio|number|false|none|none|
|eps|number|false|none|none|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__item2vec_model_policy__Item2VecModelPolicy__Config">shaped_internal__recsys__policies__item2vec_model_policy__Item2VecModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__item2vec_model_policy__item2vecmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__item2vec_model_policy__Item2VecModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__item2vec_model_policy__item2vecmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__item2vec_model_policy__item2vecmodelpolicy__config"></a>

```json
{
  "policy_type": "item2vec",
  "name": "string",
  "event_values": [
    "string"
  ],
  "embedding_size": {
    "type": "tunable_int",
    "min": 8,
    "max": 512,
    "scale": "linear"
  },
  "window_size": {
    "type": "tunable_int",
    "min": 5,
    "max": 50,
    "scale": "linear"
  },
  "min_count": 1,
  "algorithm": {
    "type": "tunable_string",
    "options": [
      "cbow",
      "skip-gram"
    ]
  },
  "max_window_size": 50,
  "workers": 1
}

```

Item2VecPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embedding_size|any|false|none|Dimensionality of item embeddings.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|window_size|any|false|none|Context window size for predicting items in sequences.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_count|integer|false|none|Minimum number of times an item must appear to be included in the vocabulary.|
|algorithm|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableString](#schematunablestring)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|max_window_size|integer|false|none|Maximum window size for context.|
|workers|any|false|none|Restrict number of workers for memory estimation.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_shaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__LightGBMModelPolicy__Config">shaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__LightGBMModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__lightgbmmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__LightGBMModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__lightgbmmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__lightgbm_model_policy__lightgbm_model_policy__lightgbmmodelpolicy__config"></a>

```json
{
  "policy_type": "lightgbm",
  "name": "string",
  "event_values": [
    "string"
  ],
  "objective": {
    "type": "tunable_string",
    "options": [
      "regression",
      "binary"
    ]
  },
  "n_estimators": 100,
  "max_depth": {
    "type": "tunable_int",
    "min": -1,
    "max": 10,
    "scale": "linear"
  },
  "num_leaves": {
    "type": "tunable_int",
    "min": 20,
    "max": 40,
    "scale": "linear"
  },
  "min_child_weight": 1,
  "learning_rate": {
    "type": "tunable_float",
    "min": 0.001,
    "max": 0.1,
    "scale": "linear"
  },
  "colsample_bytree": 0.9,
  "subsample": 0.8,
  "subsample_freq": 5,
  "zero_as_missing": true,
  "bin_construct_sample_cnt": 200000,
  "verbose": 1,
  "verbose_eval": 1,
  "num_threads": 0,
  "enable_resume": true,
  "lambdarank_truncation_level": 53,
  "calibrate": false,
  "event_value_user_affinity_features": false,
  "event_value_affinity_features_value_filter": [
    "string"
  ],
  "rolling_window_hours": 0,
  "negative_affinity_features": false,
  "content_affinity_features": false,
  "content_affinity_features_batch_size": 1024,
  "content_affinity_max_num_latest_items": 0,
  "content_affinity_embedding_ref": "text_embedding",
  "container_categorical_to_multi_hot": false,
  "container_to_container_affinities": true,
  "point_in_time_item_feature": false,
  "drop_user_id": true,
  "drop_item_id": false,
  "early_stopping_rounds": 300,
  "include_attributes": [
    "string"
  ],
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

LightGBMPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|objective|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[Objective](#schemaobjective)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableString](#schematunablestring)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_estimators|integer|false|none|Number of boosting iterations.|
|max_depth|any|false|none|Maximum depth of the tree. -1 means no limit.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|num_leaves|any|false|none|Maximum number of leaves in one tree.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_child_weight|number|false|none|Minimum sum Hessian in one leaf.|
|learning_rate|any|false|none|Learning rate (shrinkage) for gradient boosting.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|colsample_bytree|number|false|none|Subsample columns on each iteration.|
|subsample|number|false|none|Subsample training data on each iteration.|
|subsample_freq|integer|false|none|Bagging frequency.|
|zero_as_missing|boolean|false|none|Treat zero values as missing.|
|bin_construct_sample_cnt|integer|false|none|Number of samples used to construct bins.|
|verbose|integer|false|none|none|
|verbose_eval|integer|false|none|none|
|num_threads|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|enable_resume|boolean|false|none|none|
|lambdarank_truncation_level|integer|false|none|Number of pairs used in pairwise loss. Should be set to slightly higher than the k value used for NDCG@k.|
|calibrate|boolean|false|none|none|
|event_value_user_affinity_features|boolean|false|none|none|
|event_value_affinity_features_value_filter|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|rolling_window_hours|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|negative_affinity_features|boolean|false|none|none|
|content_affinity_features|boolean|false|none|none|
|content_affinity_features_batch_size|integer|false|none|none|
|content_affinity_max_num_latest_items|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content_affinity_embedding_ref|any|false|none|Embedding reference to use for content affinity features.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|container_categorical_to_multi_hot|boolean|false|none|none|
|container_to_container_affinities|boolean|false|none|none|
|point_in_time_item_feature|boolean|false|none|none|
|drop_user_id|boolean|false|none|none|
|drop_item_id|boolean|false|none|none|
|early_stopping_rounds|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|include_attributes|any|false|none|List of feature and attribute names to include in training. If None, all features are included.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__ngram_model_policy__NgramModelPolicy__Config">shaped_internal__recsys__policies__ngram_model_policy__NgramModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__ngram_model_policy__ngrammodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__ngram_model_policy__NgramModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__ngram_model_policy__ngrammodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__ngram_model_policy__ngrammodelpolicy__config"></a>

```json
{
  "policy_type": "ngram",
  "name": "string",
  "event_values": [
    "string"
  ],
  "n": 3,
  "laplace_smoothing": {
    "type": "tunable_float",
    "min": 0.01,
    "max": 1,
    "scale": "linear"
  }
}

```

NgramPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n|integer|false|none|Length of n-grams (sequences of n consecutive items).|
|laplace_smoothing|any|false|none|Laplace smoothing parameter to handle unseen n-grams.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

<h2 id="tocS_shaped_internal__recsys__policies__rising_popular_policy__RisingPopularPolicy__Config">shaped_internal__recsys__policies__rising_popular_policy__RisingPopularPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__rising_popular_policy__risingpopularpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__rising_popular_policy__RisingPopularPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__rising_popular_policy__risingpopularpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__rising_popular_policy__risingpopularpolicy__config"></a>

```json
{
  "policy_type": "rising-popular",
  "name": "string",
  "event_values": [
    "string"
  ],
  "time_window": {
    "type": "tunable_int",
    "min": 1,
    "max": 30,
    "scale": "linear"
  },
  "time_frequency": {
    "type": "tunable_string",
    "options": [
      "30M",
      "1H",
      "1D",
      "1W"
    ]
  }
}

```

RisingPopularPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|time_window|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|time_frequency|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableString](#schematunablestring)|false|none|none|

<h2 id="tocS_shaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__SASRecModelPolicy__Config">shaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__SASRecModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__sasrecmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__SASRecModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__sasrecmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__sasrec_model_policy__sasrec_model_policy__sasrecmodelpolicy__config"></a>

```json
{
  "policy_type": "sasrec",
  "name": "string",
  "event_values": [
    "string"
  ],
  "batch_size": {
    "type": "tunable_int",
    "min": 32,
    "max": 2048,
    "scale": "linear"
  },
  "eval_batch_size": 1000,
  "n_epochs": 1,
  "negative_samples_count": 2,
  "device": "string",
  "hidden_size": {
    "type": "tunable_int_categorical",
    "options": [
      16,
      32,
      64,
      128
    ]
  },
  "inner_size": {
    "type": "tunable_int_categorical",
    "options": [
      8,
      16,
      32,
      64
    ]
  },
  "learning_rate": {
    "type": "tunable_float",
    "min": 0.001,
    "max": 0.1,
    "scale": "linear"
  },
  "attn_dropout_prob": {
    "type": "tunable_float",
    "min": 0,
    "max": 0.5,
    "scale": "linear"
  },
  "hidden_act": "gelu",
  "hidden_dropout_prob": {
    "type": "tunable_float",
    "min": 0,
    "max": 0.5,
    "scale": "linear"
  },
  "n_heads": {
    "type": "tunable_int",
    "min": 1,
    "max": 8,
    "scale": "linear"
  },
  "n_layers": {
    "type": "tunable_int",
    "min": 1,
    "max": 6,
    "scale": "linear"
  },
  "layer_norm_eps": 1e-12,
  "initializer_range": 0.02,
  "mask_rate": 0.2,
  "loss_type": "BPR",
  "max_seq_length": {
    "type": "tunable_int_categorical",
    "options": [
      50,
      100
    ]
  },
  "sample_strategy": "user_based",
  "append_item_features": false,
  "append_item_embeddings": false,
  "use_candidate_embeddings": false,
  "sample_seed": 42,
  "sample_ratio": 0.8,
  "eval_step": 1,
  "early_stopping_step": 5,
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

SASRecPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of samples processed before updating model weights.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|eval_batch_size|integer|false|none|Batch size used during model evaluation.|
|n_epochs|integer|false|none|Number of complete passes through the training dataset.|
|negative_samples_count|integer|false|none|Number of negative samples per positive sample for contrastive learning.|
|device|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|hidden_size|any|false|none|Size of the hidden layers in the transformer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inner_size|any|false|none|Size of the feed-forward network inner layer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|learning_rate|any|false|none|Learning rate for gradient descent optimization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|attn_dropout_prob|any|false|none|Dropout probability for attention layers.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|hidden_act|string|false|none|none|
|hidden_dropout_prob|any|false|none|Dropout probability for hidden layers.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_heads|any|false|none|Number of attention heads in the transformer.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_layers|any|false|none|Number of transformer layers.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|layer_norm_eps|number|false|none|none|
|initializer_range|number|false|none|none|
|mask_rate|number|false|none|Fraction of tokens to mask during training.|
|loss_type|[LossTypes](#schemalosstypes)|false|none|none|
|max_seq_length|any|false|none|Maximum length of input sequences.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sample_strategy|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[SamplingStrategy](#schemasamplingstrategy)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|append_item_features|boolean|false|none|none|
|append_item_embeddings|boolean|false|none|none|
|use_candidate_embeddings|boolean|false|none|none|
|sample_seed|integer|false|none|none|
|sample_ratio|number|false|none|none|
|eval_step|integer|false|none|none|
|early_stopping_step|integer|false|none|none|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__svd_model_policy__SVDModelPolicy__Config">shaped_internal__recsys__policies__svd_model_policy__SVDModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__svd_model_policy__svdmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__svd_model_policy__SVDModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__svd_model_policy__svdmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__svd_model_policy__svdmodelpolicy__config"></a>

```json
{
  "policy_type": "svd",
  "name": "string",
  "event_values": [
    "string"
  ],
  "factors": {
    "type": "tunable_int",
    "min": 25,
    "max": 150,
    "scale": "linear"
  },
  "num_epochs": 1
}

```

SVDPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|factors|any|false|none|Number of latent factors in the matrix factorization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|num_epochs|integer|false|none|Number of complete passes through the training dataset.|

<h2 id="tocS_shaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__TwoTowerModelPolicy__Config">shaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__TwoTowerModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__twotowermodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__TwoTowerModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__twotowermodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__two_tower_model_policy__two_tower_model_policy__twotowermodelpolicy__config"></a>

```json
{
  "policy_type": "two-tower",
  "name": "string",
  "event_values": [
    "string"
  ],
  "batch_size": {
    "type": "tunable_int_categorical",
    "options": [
      128,
      256,
      512
    ]
  },
  "n_epochs": 1,
  "device": "string",
  "negative_samples_count": 1,
  "embedding_dims": {
    "type": "tunable_int",
    "min": 8,
    "max": 128,
    "scale": "linear"
  },
  "lr": {
    "type": "tunable_float",
    "min": 0.0001,
    "max": 0.1,
    "scale": "linear"
  },
  "weight_decay": {
    "type": "tunable_float",
    "min": 0.0001,
    "max": 0.01,
    "scale": "linear"
  },
  "use_item_ids_as_features": true,
  "strategy": "default",
  "patience": 5,
  "num_workers": 0,
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

TwoTowerPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of samples processed before updating model weights.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_epochs|integer|false|none|Number of complete passes through the training dataset.|
|device|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|negative_samples_count|any|false|none|Number of negative samples per positive sample for contrastive learning.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableIntCategorical](#schematunableintcategorical)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embedding_dims|any|false|none|Dimensionality of the user and item embeddings.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lr|any|false|none|Learning rate for gradient descent optimization.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|weight_decay|any|false|none|L2 regularization term to prevent overfitting.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|use_item_ids_as_features|boolean|false|none|none|
|strategy|[TrainingStrategy](#schematrainingstrategy)|false|none|none|
|patience|integer|false|none|Number of epochs to wait without improvement before early stopping.|
|num_workers|integer|false|none|none|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__widedeep_model_policy__WideDeepModelPolicy__Config">shaped_internal__recsys__policies__widedeep_model_policy__WideDeepModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__widedeep_model_policy__widedeepmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__widedeep_model_policy__WideDeepModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__widedeep_model_policy__widedeepmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__widedeep_model_policy__widedeepmodelpolicy__config"></a>

```json
{
  "policy_type": "widedeep",
  "name": "string",
  "val_split": 0.1,
  "n_epochs": 1,
  "num_workers": 0,
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

WideDeepPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|val_split|any|false|none|Fraction of training data to use for validation.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_epochs|any|false|none|Number of complete passes through the training dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|num_workers|integer|false|none|none|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_shaped_internal__recsys__policies__xgboost_model_policy__XGBoostModelPolicy__Config">shaped_internal__recsys__policies__xgboost_model_policy__XGBoostModelPolicy__Config</h2>
<!-- backwards compatibility -->
<a id="schemashaped_internal__recsys__policies__xgboost_model_policy__xgboostmodelpolicy__config"></a>
<a id="schema_shaped_internal__recsys__policies__xgboost_model_policy__XGBoostModelPolicy__Config"></a>
<a id="tocSshaped_internal__recsys__policies__xgboost_model_policy__xgboostmodelpolicy__config"></a>
<a id="tocsshaped_internal__recsys__policies__xgboost_model_policy__xgboostmodelpolicy__config"></a>

```json
{
  "policy_type": "xgboost",
  "name": "string",
  "event_values": [
    "string"
  ],
  "mode": {
    "type": "tunable_string",
    "options": [
      "regressor",
      "classifier"
    ]
  },
  "n_estimators": {
    "type": "tunable_int",
    "min": 100,
    "max": 1000,
    "scale": "linear"
  },
  "max_depth": {
    "type": "tunable_int",
    "min": -1,
    "max": 10,
    "scale": "linear"
  },
  "max_leaves": {
    "type": "tunable_int",
    "min": 20,
    "max": 40,
    "scale": "linear"
  },
  "n_jobs": -1,
  "learning_rate": {
    "type": "tunable_float",
    "min": 0.01,
    "max": 0.3,
    "scale": "linear"
  },
  "min_child_weight": 1,
  "use_user_ids_as_features": true,
  "use_item_ids_as_features": true,
  "normalize_numerical_features": true,
  "use_derived_timestamp_features": true,
  "balance_labels": true
}

```

XGBoostPolicy

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|policy_type|string|false|none|none|
|name|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_values|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|mode|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableString](#schematunablestring)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_estimators|any|false|none|Number of boosting iterations (trees).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|max_depth|any|false|none|Maximum depth of the tree. -1 means no limit.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|max_leaves|any|false|none|Maximum number of leaves in one tree.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableInt](#schematunableint)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|n_jobs|integer|false|none|none|
|learning_rate|any|false|none|Learning rate (shrinkage) for gradient boosting.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[TunableFloat](#schematunablefloat)|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|min_child_weight|integer|false|none|Minimum sum of instance weight needed in a child node.|
|use_user_ids_as_features|boolean|false|none|none|
|use_item_ids_as_features|boolean|false|none|none|
|normalize_numerical_features|boolean|false|none|Enable NormalizeNumerical transform for entity features.|
|use_derived_timestamp_features|boolean|false|none|Enable TimestampSinCosEncoder and TimestampCountEncoder for entity features.|
|balance_labels|boolean|false|none|Enable BalanceLabel transform for interactions.|

<h2 id="tocS_AIEnrichmentViewConfig">AIEnrichmentViewConfig</h2>
<!-- backwards compatibility -->
<a id="schemaaienrichmentviewconfig"></a>
<a id="schema_AIEnrichmentViewConfig"></a>
<a id="tocSaienrichmentviewconfig"></a>
<a id="tocsaienrichmentviewconfig"></a>

```json
{
  "name": "string",
  "transform_type": "AI_ENRICHMENT",
  "description": "string",
  "source_dataset": "string",
  "source_columns": [
    "string"
  ],
  "source_columns_in_output": [
    "string"
  ],
  "enriched_output_columns": [
    "string"
  ],
  "prompt": "string",
  "limit": -1
}

```

AIEnrichmentViewConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the AI enrichment transform.|
|transform_type|string|false|none|Transform type discriminator for AI enrichment transforms.|
|description|any|false|none|Optional description of the transform.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|source_dataset|string|true|none|Name of the source dataset to enrich.|
|source_columns|[string]|true|none|List of column names from source dataset to use as input.|
|source_columns_in_output|[string]|true|none|List of source columns to include in the output.|
|enriched_output_columns|[string]|true|none|List of new column names for AI-generated enrichments.|
|prompt|string|true|none|Prompt template for AI enrichment generation.|
|limit|any|false|none|Maximum number of rows to process (-1 for unlimited).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_AWSPinpointTableConfig">AWSPinpointTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaawspinpointtableconfig"></a>
<a id="schema_AWSPinpointTableConfig"></a>
<a id="tocSawspinpointtableconfig"></a>
<a id="tocsawspinpointtableconfig"></a>

```json
{
  "schema_type": "AWS_PINPOINT",
  "name": "string",
  "description": "string",
  "tenant_aws_account_id": "string"
}

```

AWSPinpointTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for AWS Pinpoint datasets.|
|name|string|true|none|Unique identifier for the AWS Pinpoint dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tenant_aws_account_id|string|true|none|AWS account ID for the tenant's Pinpoint instance.|

<h2 id="tocS_AmplitudeTableConfig">AmplitudeTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaamplitudetableconfig"></a>
<a id="schema_AmplitudeTableConfig"></a>
<a id="tocSamplitudetableconfig"></a>
<a id="tocsamplitudetableconfig"></a>

```json
{
  "schema_type": "AMPLITUDE",
  "name": "string",
  "description": "string"
}

```

AmplitudeTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Amplitude datasets.|
|name|string|true|none|Unique identifier for the Amplitude dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_BigQueryTableConfig">BigQueryTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemabigquerytableconfig"></a>
<a id="schema_BigQueryTableConfig"></a>
<a id="tocSbigquerytableconfig"></a>
<a id="tocsbigquerytableconfig"></a>

```json
{
  "schema_type": "BIGQUERY",
  "name": "string",
  "description": "string",
  "table": "string",
  "columns": [
    "string"
  ],
  "datetime_key": "string",
  "schedule_interval": "@hourly",
  "filters": [
    "string"
  ],
  "start_datetime": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

BigQueryTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for BigQuery datasets.|
|name|string|true|none|Unique identifier for the BigQuery dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|table|string|true|none|BigQuery table path in format 'projectID.datasetID.tableID'.|
|columns|[string]|true|none|List of column names to sync from table.|
|datetime_key|string|true|none|Column name used for incremental replication.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filters|any|false|none|Optional SQL WHERE clause filters.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_datetime|any|false|none|ISO timestamp for initial data sync start point.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ClickhouseTableConfig">ClickhouseTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaclickhousetableconfig"></a>
<a id="schema_ClickhouseTableConfig"></a>
<a id="tocSclickhousetableconfig"></a>
<a id="tocsclickhousetableconfig"></a>

```json
{
  "schema_type": "CLICKHOUSE",
  "name": "string",
  "description": "string",
  "host": "string",
  "port": 0,
  "user": "string",
  "password": "string",
  "table": "string",
  "replication_key": "string",
  "database": "string",
  "columns": [
    "string"
  ],
  "unique_keys": [
    "string"
  ],
  "schedule_interval": "@hourly"
}

```

ClickhouseTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for ClickHouse datasets.|
|name|string|true|none|Unique identifier for the ClickHouse dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|ClickHouse server hostname or IP address.|
|port|integer|true|none|ClickHouse server port number.|
|user|string|true|none|ClickHouse username.|
|password|string|true|none|ClickHouse password.|
|table|string|true|none|ClickHouse table name to sync.|
|replication_key|string|true|none|Column name used for incremental replication.|
|database|any|false|none|ClickHouse database name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to sync from table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_CreateTableResponse">CreateTableResponse</h2>
<!-- backwards compatibility -->
<a id="schemacreatetableresponse"></a>
<a id="schema_CreateTableResponse"></a>
<a id="tocScreatetableresponse"></a>
<a id="tocscreatetableresponse"></a>

```json
{
  "message": "string"
}

```

CreateTableResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating table creation status.|

<h2 id="tocS_CreateViewResponse">CreateViewResponse</h2>
<!-- backwards compatibility -->
<a id="schemacreateviewresponse"></a>
<a id="schema_CreateViewResponse"></a>
<a id="tocScreateviewresponse"></a>
<a id="tocscreateviewresponse"></a>

```json
{
  "message": "string"
}

```

CreateViewResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating view creation status.|

<h2 id="tocS_CustomTableConfig">CustomTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemacustomtableconfig"></a>
<a id="schema_CustomTableConfig"></a>
<a id="tocScustomtableconfig"></a>
<a id="tocscustomtableconfig"></a>

```json
{
  "schema_type": "CUSTOM",
  "name": "string",
  "description": "string",
  "unique_keys": [
    "string"
  ],
  "s3_path": "string",
  "s3_format": "string",
  "column_schema": {
    "property1": "Unknown",
    "property2": "Unknown"
  }
}

```

CustomTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for custom datasets.|
|name|string|true|none|Unique identifier for the custom dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|s3_path|any|false|none|S3 path to the data files.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|s3_format|any|false|none|File format (e.g., parquet, csv, json).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column_schema|any|false|none|Schema definition mapping column names to value types.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_DeleteTableResponse">DeleteTableResponse</h2>
<!-- backwards compatibility -->
<a id="schemadeletetableresponse"></a>
<a id="schema_DeleteTableResponse"></a>
<a id="tocSdeletetableresponse"></a>
<a id="tocsdeletetableresponse"></a>

```json
{
  "message": "string"
}

```

DeleteTableResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating table deletion status.|

<h2 id="tocS_DeleteViewResponse">DeleteViewResponse</h2>
<!-- backwards compatibility -->
<a id="schemadeleteviewresponse"></a>
<a id="schema_DeleteViewResponse"></a>
<a id="tocSdeleteviewresponse"></a>
<a id="tocsdeleteviewresponse"></a>

```json
{
  "message": "string"
}

```

DeleteViewResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating view deletion status.|

<h2 id="tocS_DynamoDBTableConfig">DynamoDBTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemadynamodbtableconfig"></a>
<a id="schema_DynamoDBTableConfig"></a>
<a id="tocSdynamodbtableconfig"></a>
<a id="tocsdynamodbtableconfig"></a>

```json
{
  "schema_type": "DYNAMODB",
  "name": "string",
  "description": "string",
  "table": "string",
  "aws_role_arn": "string",
  "aws_region": "string",
  "schedule_interval": "@once",
  "infer_schema_sample_size": 0,
  "scan_kwargs": {
    "property1": 0,
    "property2": 0
  },
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

DynamoDBTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for DynamoDB datasets.|
|name|string|true|none|Unique identifier for the DynamoDB dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|table|string|true|none|DynamoDB table name to sync.|
|aws_role_arn|string|true|none|AWS IAM role ARN for accessing DynamoDB table.|
|aws_region|string|true|none|AWS region where DynamoDB table is located.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|infer_schema_sample_size|any|false|none|Number of items to sample for schema inference.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|scan_kwargs|any|false|none|Additional kwargs for DynamoDB scan operation.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of items to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_IcebergTableConfig">IcebergTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaicebergtableconfig"></a>
<a id="schema_IcebergTableConfig"></a>
<a id="tocSicebergtableconfig"></a>
<a id="tocsicebergtableconfig"></a>

```json
{
  "schema_type": "ICEBERG",
  "name": "string",
  "description": "string",
  "catalog_type": "string",
  "catalog_name": "string",
  "table_name": "string",
  "schedule_interval": "@hourly",
  "replication_key": "string",
  "aws_role_arn": "string",
  "aws_region": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

IcebergTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Iceberg datasets.|
|name|string|true|none|Unique identifier for the Iceberg dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|catalog_type|string|true|none|Type of Iceberg catalog (e.g., glue).|
|catalog_name|string|true|none|Name of the Iceberg catalog.|
|table_name|string|true|none|Iceberg table name to sync.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|replication_key|any|false|none|Column name used for incremental replication.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|aws_role_arn|any|false|none|AWS IAM role ARN for accessing Iceberg table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|aws_region|any|false|none|AWS region where Iceberg table is located.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_KafkaTableConfig">KafkaTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemakafkatableconfig"></a>
<a id="schema_KafkaTableConfig"></a>
<a id="tocSkafkatableconfig"></a>
<a id="tocskafkatableconfig"></a>

```json
{
  "schema_type": "KAFKA",
  "name": "string",
  "description": "string",
  "topic": "string",
  "bootstrap_server": "string",
  "username": "string",
  "password": "string",
  "unique_keys": [
    "string"
  ],
  "column_schema": {
    "property1": "Unknown",
    "property2": "Unknown"
  }
}

```

KafkaTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Kafka datasets.|
|name|string|true|none|Unique identifier for the Kafka dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|topic|string|true|none|Kafka topic name to consume from.|
|bootstrap_server|string|true|none|Kafka bootstrap server address (host:port).|
|username|string|true|none|Kafka username for authentication.|
|password|string|true|none|Kafka password for authentication.|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column_schema|any|false|none|Schema definition mapping column names to value types.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_KinesisTableConfig">KinesisTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemakinesistableconfig"></a>
<a id="schema_KinesisTableConfig"></a>
<a id="tocSkinesistableconfig"></a>
<a id="tocskinesistableconfig"></a>

```json
{
  "schema_type": "KINESIS",
  "name": "string",
  "description": "string",
  "unique_keys": [
    "string"
  ],
  "column_schema": {
    "property1": "Unknown",
    "property2": "Unknown"
  },
  "tenant_aws_account_id": "string"
}

```

KinesisTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Kinesis datasets.|
|name|string|true|none|Unique identifier for the Kinesis dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column_schema|any|false|none|Schema definition mapping column names to value types.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» **additionalProperties**|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tenant_aws_account_id|any|false|none|AWS account ID for the tenant's Kinesis stream.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ListTablesResponse">ListTablesResponse</h2>
<!-- backwards compatibility -->
<a id="schemalisttablesresponse"></a>
<a id="schema_ListTablesResponse"></a>
<a id="tocSlisttablesresponse"></a>
<a id="tocslisttablesresponse"></a>

```json
{
  "tables": [
    {
      "name": "string",
      "uri": "string",
      "created_at": "string",
      "schema_type": "string",
      "status": "string",
      "description": "string"
    }
  ]
}

```

ListTablesResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tables|[[Table](#schematable)]|true|none|List of tables and their metadata.|

<h2 id="tocS_ListViewsResponse">ListViewsResponse</h2>
<!-- backwards compatibility -->
<a id="schemalistviewsresponse"></a>
<a id="schema_ListViewsResponse"></a>
<a id="tocSlistviewsresponse"></a>
<a id="tocslistviewsresponse"></a>

```json
{
  "views": [
    {
      "name": "string",
      "uri": "string",
      "created_at": "string",
      "type": "string",
      "status": "string",
      "source_table_names": [
        "string"
      ],
      "description": "string"
    }
  ]
}

```

ListViewsResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|views|[[View](#schemaview)]|true|none|List of views and their metadata.|

<h2 id="tocS_MSSQLTableConfig">MSSQLTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemamssqltableconfig"></a>
<a id="schema_MSSQLTableConfig"></a>
<a id="tocSmssqltableconfig"></a>
<a id="tocsmssqltableconfig"></a>

```json
{
  "schema_type": "MSSQL",
  "name": "string",
  "description": "string",
  "host": "string",
  "port": 0,
  "user": "string",
  "password": "string",
  "table": "string",
  "database": "string",
  "replication_key": "string",
  "schedule_interval": "@hourly",
  "start_date": "string",
  "columns": [
    "string"
  ],
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

MSSQLTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for MSSQL datasets.|
|name|string|true|none|Unique identifier for the MSSQL dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|MSSQL server hostname or IP address.|
|port|integer|true|none|MSSQL server port number.|
|user|string|true|none|MSSQL username.|
|password|string|true|none|MSSQL password.|
|table|string|true|none|MSSQL table name to sync.|
|database|string|true|none|MSSQL database name.|
|replication_key|string|true|none|Column name used for incremental replication.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_date|any|false|none|ISO timestamp for initial sync start point.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to sync from table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_MongoDBTableConfig">MongoDBTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemamongodbtableconfig"></a>
<a id="schema_MongoDBTableConfig"></a>
<a id="tocSmongodbtableconfig"></a>
<a id="tocsmongodbtableconfig"></a>

```json
{
  "schema_type": "MONGODB",
  "name": "string",
  "description": "string",
  "mongodb_connection_string": "string",
  "database": "string",
  "collection": "string",
  "schedule_interval": "@hourly",
  "replication_key": "string",
  "replication_mode": "INCREMENTAL",
  "start_date": "string",
  "batch_size": 0
}

```

MongoDBTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for MongoDB datasets.|
|name|string|true|none|Unique identifier for the MongoDB dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|mongodb_connection_string|string|true|none|MongoDB connection URI string.|
|database|string|true|none|MongoDB database name.|
|collection|string|true|none|MongoDB collection name to sync.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|replication_key|any|false|none|Column used to find the most updated value when overwriting a record.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|replication_mode|any|false|none|Replication mode: INCREMENTAL or FULL_COLLECTION.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_date|any|false|none|ISO timestamp for initial sync start point.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of documents to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_MySQLTableConfig">MySQLTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemamysqltableconfig"></a>
<a id="schema_MySQLTableConfig"></a>
<a id="tocSmysqltableconfig"></a>
<a id="tocsmysqltableconfig"></a>

```json
{
  "schema_type": "MYSQL",
  "name": "string",
  "description": "string",
  "host": "string",
  "port": 0,
  "user": "string",
  "password": "string",
  "table": "string",
  "database": "string",
  "replication_key": "string",
  "schedule_interval": "@hourly",
  "columns": [
    "string"
  ],
  "database_schema": "string",
  "ssh_tunnel_host": "string",
  "ssh_tunnel_port": 0,
  "ssh_tunnel_private_key": "string",
  "ssh_tunnel_private_key_password": "string",
  "ssh_tunnel_user": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

MySQLTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for MySQL datasets.|
|name|string|true|none|Unique identifier for the MySQL dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|MySQL server hostname or IP address.|
|port|integer|true|none|MySQL server port number.|
|user|string|true|none|MySQL username.|
|password|string|true|none|MySQL password.|
|table|string|true|none|MySQL table name to sync.|
|database|string|true|none|MySQL database name.|
|replication_key|string|true|none|Column name used for incremental replication.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to sync from table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|database_schema|any|false|none|MySQL schema name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_host|any|false|none|SSH tunnel hostname for secure connection.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_port|any|false|none|SSH tunnel port number.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_private_key|any|false|none|SSH private key for tunnel authentication.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_private_key_password|any|false|none|Password for SSH private key if encrypted.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_user|any|false|none|SSH username for tunnel connection.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_PostgresTableConfig">PostgresTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemapostgrestableconfig"></a>
<a id="schema_PostgresTableConfig"></a>
<a id="tocSpostgrestableconfig"></a>
<a id="tocspostgrestableconfig"></a>

```json
{
  "schema_type": "POSTGRES",
  "name": "string",
  "description": "string",
  "host": "string",
  "port": 0,
  "user": "string",
  "password": "string",
  "table": "string",
  "database": "string",
  "replication_key": "string",
  "schedule_interval": "@hourly",
  "columns": [
    "string"
  ],
  "database_schema": "string",
  "ssh_tunnel_host": "string",
  "ssh_tunnel_port": 0,
  "ssh_tunnel_private_key": "string",
  "ssh_tunnel_private_key_password": "string",
  "ssh_tunnel_user": "string",
  "ssl_certificate_authority": "string",
  "ssl_client_certificate": "string",
  "ssl_client_private_key": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

PostgresTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Postgres datasets.|
|name|string|true|none|Unique identifier for the Postgres dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|PostgreSQL server hostname or IP address.|
|port|integer|true|none|PostgreSQL server port number.|
|user|string|true|none|PostgreSQL username.|
|password|string|true|none|PostgreSQL password.|
|table|string|true|none|PostgreSQL table name to sync.|
|database|string|true|none|PostgreSQL database name.|
|replication_key|string|true|none|Column name used for incremental replication.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to sync from table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|database_schema|any|false|none|PostgreSQL schema name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_host|any|false|none|SSH tunnel hostname for secure connection.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_port|any|false|none|SSH tunnel port number.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_private_key|any|false|none|SSH private key for tunnel authentication.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_private_key_password|any|false|none|Password for SSH private key if encrypted.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssh_tunnel_user|any|false|none|SSH username for tunnel connection.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssl_certificate_authority|any|false|none|SSL CA certificate for secure connection.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssl_client_certificate|any|false|none|SSL client certificate for mutual TLS.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ssl_client_private_key|any|false|none|SSL client private key for mutual TLS.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_PosthogTableConfig">PosthogTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaposthogtableconfig"></a>
<a id="schema_PosthogTableConfig"></a>
<a id="tocSposthogtableconfig"></a>
<a id="tocsposthogtableconfig"></a>

```json
{
  "schema_type": "POSTHOG",
  "name": "string",
  "description": "string",
  "unique_keys": [
    "string"
  ],
  "column_schema": {
    "property1": "Unknown",
    "property2": "Unknown"
  }
}

```

PosthogTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Posthog datasets.|
|name|string|true|none|Unique identifier for the Posthog dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column_schema|any|false|none|Schema definition mapping column names to value types.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» **additionalProperties**|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_RedshiftTableConfig">RedshiftTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemaredshifttableconfig"></a>
<a id="schema_RedshiftTableConfig"></a>
<a id="tocSredshifttableconfig"></a>
<a id="tocsredshifttableconfig"></a>

```json
{
  "schema_type": "REDSHIFT",
  "name": "string",
  "description": "string",
  "host": "string",
  "port": 0,
  "user": "string",
  "password": "string",
  "table": "string",
  "database": "string",
  "replication_key": "string",
  "schedule_interval": "@hourly",
  "columns": [
    "string"
  ],
  "database_schema": "string",
  "start_date": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

RedshiftTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Redshift datasets.|
|name|string|true|none|Unique identifier for the Redshift dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|Redshift cluster hostname or IP address.|
|port|integer|true|none|Redshift cluster port number.|
|user|string|true|none|Redshift username.|
|password|string|true|none|Redshift password.|
|table|string|true|none|Redshift table name to sync.|
|database|string|true|none|Redshift database name.|
|replication_key|string|true|none|Column name used for incremental replication.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to sync from table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|database_schema|any|false|none|Redshift schema name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_date|any|false|none|ISO timestamp for initial sync start point.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_RudderstackTableConfig">RudderstackTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemarudderstacktableconfig"></a>
<a id="schema_RudderstackTableConfig"></a>
<a id="tocSrudderstacktableconfig"></a>
<a id="tocsrudderstacktableconfig"></a>

```json
{
  "schema_type": "RUDDERSTACK",
  "name": "string",
  "description": "string"
}

```

RudderstackTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Rudderstack datasets.|
|name|string|true|none|Unique identifier for the Rudderstack dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_SQLTransformType">SQLTransformType</h2>
<!-- backwards compatibility -->
<a id="schemasqltransformtype"></a>
<a id="schema_SQLTransformType"></a>
<a id="tocSsqltransformtype"></a>
<a id="tocssqltransformtype"></a>

```json
"VIEW"

```

SQLTransformType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|SQLTransformType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|SQLTransformType|VIEW|
|SQLTransformType|MATERIALIZED_VIEW|

<h2 id="tocS_SQLViewConfig">SQLViewConfig</h2>
<!-- backwards compatibility -->
<a id="schemasqlviewconfig"></a>
<a id="schema_SQLViewConfig"></a>
<a id="tocSsqlviewconfig"></a>
<a id="tocssqlviewconfig"></a>

```json
{
  "name": "string",
  "transform_type": "SQL",
  "description": "string",
  "sql_query": "string",
  "sql_transform_type": "VIEW"
}

```

SQLViewConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the SQL transform.|
|transform_type|string|false|none|Transform type discriminator for SQL transforms.|
|description|any|false|none|Optional description of the transform.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|sql_query|string|true|none|SQL query to execute for the transform.|
|sql_transform_type|[SQLTransformType](#schemasqltransformtype)|true|none|Type of SQL transform (VIEW or MATERIALIZED_VIEW).|

<h2 id="tocS_SegmentTableConfig">SegmentTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemasegmenttableconfig"></a>
<a id="schema_SegmentTableConfig"></a>
<a id="tocSsegmenttableconfig"></a>
<a id="tocssegmenttableconfig"></a>

```json
{
  "schema_type": "SEGMENT",
  "name": "string",
  "description": "string"
}

```

SegmentTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Segment datasets.|
|name|string|true|none|Unique identifier for the Segment dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ShopifyTableConfig">ShopifyTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemashopifytableconfig"></a>
<a id="schema_ShopifyTableConfig"></a>
<a id="tocSshopifytableconfig"></a>
<a id="tocsshopifytableconfig"></a>

```json
{
  "schema_type": "SHOPIFY",
  "name": "string",
  "description": "string",
  "access_token": "string",
  "store": "string",
  "stream": "string",
  "is_plus_account": false,
  "schedule_interval": "@hourly",
  "start_date": "string",
  "admin_url": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ],
  "verify_ssl": true
}

```

ShopifyTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Shopify datasets.|
|name|string|true|none|Unique identifier for the Shopify dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|access_token|string|true|none|Shopify API access token.|
|store|string|true|none|Shopify store name (e.g., mystore.myshopify.com).|
|stream|string|true|none|Shopify stream name to sync (e.g., orders, products).|
|is_plus_account|boolean|false|none|Whether the Shopify account is Plus tier.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_date|any|false|none|ISO timestamp for initial sync start point.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|admin_url|any|false|none|Custom Shopify admin API URL if needed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of records to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|verify_ssl|any|false|none|Whether to verify SSL certificates.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_SnowflakeTableConfig">SnowflakeTableConfig</h2>
<!-- backwards compatibility -->
<a id="schemasnowflaketableconfig"></a>
<a id="schema_SnowflakeTableConfig"></a>
<a id="tocSsnowflaketableconfig"></a>
<a id="tocssnowflaketableconfig"></a>

```json
{
  "schema_type": "SNOWFLAKE",
  "name": "string",
  "description": "string",
  "replication_key": "string",
  "account": "string",
  "user": "string",
  "password": "string",
  "table": "string",
  "schedule_interval": "@hourly",
  "columns": [
    "string"
  ],
  "database": "string",
  "database_schema": "string",
  "warehouse": "string",
  "role": "string",
  "batch_size": 0,
  "unique_keys": [
    "string"
  ]
}

```

SnowflakeTableConfig

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|schema_type|string|false|none|Schema type discriminator for Snowflake datasets.|
|name|string|true|none|Unique identifier for the Snowflake dataset.|
|description|any|false|none|Optional description of the dataset.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|replication_key|string|true|none|Column name used for incremental replication.|
|account|string|true|none|Snowflake account identifier.|
|user|string|true|none|Snowflake username.|
|password|string|true|none|Snowflake password.|
|table|string|true|none|Snowflake table name to sync.|
|schedule_interval|any|false|none|Cron expression for sync frequency.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|any|false|none|List of column names to sync from table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|database|any|false|none|Snowflake database name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|database_schema|any|false|none|Snowflake schema name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|warehouse|any|false|none|Snowflake warehouse name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|role|any|false|none|Snowflake role name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|batch_size|any|false|none|Number of rows to process per batch.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|unique_keys|any|false|none|Column names used for deduplication in ClickHouse.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_Table">Table</h2>
<!-- backwards compatibility -->
<a id="schematable"></a>
<a id="schema_Table"></a>
<a id="tocStable"></a>
<a id="tocstable"></a>

```json
{
  "name": "string",
  "uri": "string",
  "created_at": "string",
  "schema_type": "string",
  "status": "string",
  "description": "string"
}

```

Table

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the table.|
|uri|string|true|none|URI to access the table.|
|created_at|string|true|none|ISO timestamp when the table was created.|
|schema_type|string|true|none|Type of table schema (e.g., BIGQUERY).|
|status|string|true|none|Current deployment status of the table.|
|description|any|false|none|Optional description of the table.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_TableDeploymentType">TableDeploymentType</h2>
<!-- backwards compatibility -->
<a id="schematabledeploymenttype"></a>
<a id="schema_TableDeploymentType"></a>
<a id="tocStabledeploymenttype"></a>
<a id="tocstabledeploymenttype"></a>

```json
"MELTANO_SYNC"

```

TableDeploymentType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|TableDeploymentType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|TableDeploymentType|MELTANO_SYNC|
|TableDeploymentType|REALTIME|
|TableDeploymentType|CUSTOM|

<h2 id="tocS_TableInsertArguments">TableInsertArguments</h2>
<!-- backwards compatibility -->
<a id="schematableinsertarguments"></a>
<a id="schema_TableInsertArguments"></a>
<a id="tocStableinsertarguments"></a>
<a id="tocstableinsertarguments"></a>

```json
{
  "data": {
    "event": "click",
    "item_id": "item1",
    "timestamp": 1680116390,
    "user_id": "user1"
  }
}

```

TableInsertArguments

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[object]|true|none|List of dictionaries representing rows to insert.|

<h2 id="tocS_TableInsertResponse">TableInsertResponse</h2>
<!-- backwards compatibility -->
<a id="schematableinsertresponse"></a>
<a id="schema_TableInsertResponse"></a>
<a id="tocStableinsertresponse"></a>
<a id="tocstableinsertresponse"></a>

```json
{
  "message": "string"
}

```

TableInsertResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Results of the insert operation.|

<h2 id="tocS_TransformStatus">TransformStatus</h2>
<!-- backwards compatibility -->
<a id="schematransformstatus"></a>
<a id="schema_TransformStatus"></a>
<a id="tocStransformstatus"></a>
<a id="tocstransformstatus"></a>

```json
"ACTIVE"

```

TransformStatus

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|TransformStatus|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|TransformStatus|ACTIVE|
|TransformStatus|SCHEDULING|
|TransformStatus|BACKFILLING|
|TransformStatus|DESTROYING|
|TransformStatus|INACTIVE|
|TransformStatus|ERROR|

<h2 id="tocS_UpdateTableResponse">UpdateTableResponse</h2>
<!-- backwards compatibility -->
<a id="schemaupdatetableresponse"></a>
<a id="schema_UpdateTableResponse"></a>
<a id="tocSupdatetableresponse"></a>
<a id="tocsupdatetableresponse"></a>

```json
{
  "message": "string"
}

```

UpdateTableResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating table update status.|

<h2 id="tocS_UpdateViewResponse">UpdateViewResponse</h2>
<!-- backwards compatibility -->
<a id="schemaupdateviewresponse"></a>
<a id="schema_UpdateViewResponse"></a>
<a id="tocSupdateviewresponse"></a>
<a id="tocsupdateviewresponse"></a>

```json
{
  "message": "string"
}

```

UpdateViewResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|Confirmation message indicating view update status.|

<h2 id="tocS_ValueType">ValueType</h2>
<!-- backwards compatibility -->
<a id="schemavaluetype"></a>
<a id="schema_ValueType"></a>
<a id="tocSvaluetype"></a>
<a id="tocsvaluetype"></a>

```json
"Unknown"

```

ValueType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ValueType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|ValueType|Unknown|
|ValueType|Bytes|
|ValueType|String|
|ValueType|LowCardinality(String)|
|ValueType|Array(String)|
|ValueType|Array(Int64)|
|ValueType|Int32|
|ValueType|Int64|
|ValueType|Float|
|ValueType|Double|
|ValueType|Array(Float64)|
|ValueType|Bool|
|ValueType|DateTime|
|ValueType|Json|
|ValueType|ImageUrl|

<h2 id="tocS_View">View</h2>
<!-- backwards compatibility -->
<a id="schemaview"></a>
<a id="schema_View"></a>
<a id="tocSview"></a>
<a id="tocsview"></a>

```json
{
  "name": "string",
  "uri": "string",
  "created_at": "string",
  "type": "string",
  "status": "string",
  "source_table_names": [
    "string"
  ],
  "description": "string"
}

```

View

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the view.|
|uri|string|true|none|URI to access the view.|
|created_at|string|true|none|ISO timestamp when view was created.|
|type|string|true|none|Type of view (SQL or AI_ENRICHMENT).|
|status|string|true|none|Current deployment status of the view.|
|source_table_names|[string]|true|none|List of source table names used by this view.|
|description|any|false|none|Optional description of the view.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ViewDetailsAI">ViewDetailsAI</h2>
<!-- backwards compatibility -->
<a id="schemaviewdetailsai"></a>
<a id="schema_ViewDetailsAI"></a>
<a id="tocSviewdetailsai"></a>
<a id="tocsviewdetailsai"></a>

```json
{
  "name": "string",
  "uri": "string",
  "status": "ACTIVE",
  "created_at": "2019-08-24T14:15:22Z",
  "schema": {
    "property1": "string",
    "property2": "string"
  },
  "source_table_names": [
    "string"
  ],
  "description": "string",
  "error_message": "string",
  "type": "AI_ENRICHMENT"
}

```

ViewDetailsAI

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the view.|
|uri|string|true|none|URI to access the view.|
|status|[TransformStatus](#schematransformstatus)|true|none|Current deployment status.|
|created_at|string(date-time)|true|none|Timestamp when view was created.|
|schema|any|false|none|Schema definition mapping column names to value types.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» **additionalProperties**|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|source_table_names|[string]|true|none|List of source table names used by this view.|
|description|any|false|none|Optional description of the view.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error_message|any|false|none|Error message if view is in error state.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|View type discriminator for AI enrichment views.|

<h2 id="tocS_ViewDetailsSQL">ViewDetailsSQL</h2>
<!-- backwards compatibility -->
<a id="schemaviewdetailssql"></a>
<a id="schema_ViewDetailsSQL"></a>
<a id="tocSviewdetailssql"></a>
<a id="tocsviewdetailssql"></a>

```json
{
  "name": "string",
  "uri": "string",
  "status": "ACTIVE",
  "created_at": "2019-08-24T14:15:22Z",
  "schema": {
    "property1": "string",
    "property2": "string"
  },
  "source_table_names": [
    "string"
  ],
  "description": "string",
  "error_message": "string",
  "type": "SQL"
}

```

ViewDetailsSQL

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Unique identifier for the view.|
|uri|string|true|none|URI to access the view.|
|status|[TransformStatus](#schematransformstatus)|true|none|Current deployment status.|
|created_at|string(date-time)|true|none|Timestamp when view was created.|
|schema|any|false|none|Schema definition mapping column names to value types.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|object|false|none|none|
|»»»» **additionalProperties**|[ValueType](#schemavaluetype)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|source_table_names|[string]|true|none|List of source table names used by this view.|
|description|any|false|none|Optional description of the view.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error_message|any|false|none|Error message if view is in error state.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|View type discriminator for SQL views.|

<h2 id="tocS_AttributeJourney">AttributeJourney</h2>
<!-- backwards compatibility -->
<a id="schemaattributejourney"></a>
<a id="schema_AttributeJourney"></a>
<a id="tocSattributejourney"></a>
<a id="tocsattributejourney"></a>

```json
{
  "attribute_value": "string",
  "score": 0,
  "score_rank": 0,
  "final_position": 0,
  "final_score": 0
}

```

AttributeJourney

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|attribute_value|any|true|none|The attribute value being ranked. This is the actual value of the attribute (e.g., 'electronics', 29.99, etc.).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score|any|false|none|Score assigned to this attribute value by the scoring stage. Higher scores indicate better matches.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score_rank|any|false|none|Rank position of this attribute value after scoring. Lower numbers indicate better ranking.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|final_position|any|false|none|Final position of this attribute value in the result set. Position 1 is the top-ranked value.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|final_score|any|false|none|Final score of this attribute value after all pipeline stages. This is the score used for final ranking.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_EntityJourney">EntityJourney</h2>
<!-- backwards compatibility -->
<a id="schemaentityjourney"></a>
<a id="schema_EntityJourney"></a>
<a id="tocSentityjourney"></a>
<a id="tocsentityjourney"></a>

```json
{
  "entity_id": "string",
  "inner_entity_id": 0,
  "retrieved_by": [
    "string"
  ],
  "retrieval_scores": {
    "property1": 0,
    "property2": 0
  },
  "retrieval_rank": {
    "property1": 0,
    "property2": 0
  },
  "filter_results": {
    "property1": true,
    "property2": true
  },
  "filtered_out_by": "string",
  "score": 0,
  "score_rank": 0,
  "reorder_changes": [
    {}
  ],
  "final_position": 0,
  "final_score": 0
}

```

EntityJourney

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|entity_id|string|true|none|External entity identifier (item_id or user_id as a string). This is the original ID format from your dataset.|
|inner_entity_id|any|false|none|Internal entity identifier (normalized integer ID). This is the ID used internally for lookups and joins.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retrieved_by|[string]|false|none|List of retrieval step names that found this entity. Shows which retrievers contributed this entity to the candidate set.|
|retrieval_scores|object|false|none|Scores from each retrieval step. Dictionary mapping step names to their scores for this entity.|
|» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retrieval_rank|object|false|none|Rank position from each retrieval step. Dictionary mapping step names to their rank positions for this entity.|
|» **additionalProperties**|integer|false|none|none|
|filter_results|object|false|none|Results from each filter step. Dictionary mapping filter step names to whether this entity passed (true) or failed (false) the filter.|
|» **additionalProperties**|boolean|false|none|none|
|filtered_out_by|any|false|none|Name of the filter step that removed this entity. Null if the entity passed all filters.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score|any|false|none|Score assigned to this entity by the scoring stage. Higher scores indicate better matches.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score_rank|any|false|none|Rank position of this entity after scoring. Lower numbers indicate better ranking.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|reorder_changes|any|false|none|List of position changes from reordering steps. Each entry contains step name, before position, and after position.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[object]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|final_position|any|false|none|Final position of this entity in the result set. Position 1 is the top-ranked entity.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|final_score|any|false|none|Final score of this entity after all pipeline stages. This is the score used for final ranking.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_FilterStepExplanation">FilterStepExplanation</h2>
<!-- backwards compatibility -->
<a id="schemafilterstepexplanation"></a>
<a id="schema_FilterStepExplanation"></a>
<a id="tocSfilterstepexplanation"></a>
<a id="tocsfilterstepexplanation"></a>

```json
{
  "step_name": "string",
  "step_type": "",
  "input_count": 0,
  "output_count": 0,
  "filtered_count": 0,
  "execution_time_ms": 0,
  "metadata": {},
  "filter_type": "string",
  "filter_name": "string",
  "expression": "string",
  "items_filtered": 0
}

```

FilterStepExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_name|any|false|none|Name of the step. For named steps this is the configured name, for unnamed steps this may be auto-generated or null.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_type|string|false|none|Type of step. Examples: 'column_order', 'similarity', 'text_search', 'prebuilt', 'expression', 'score_ensemble', 'diversity', etc.|
|input_count|any|false|none|Number of entities that entered this step. Shows how many entities were processed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|output_count|any|false|none|Number of entities that exited this step. May be less than input_count if filtering occurred.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filtered_count|any|false|none|Number of entities filtered out by this step. Only relevant for filter steps.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|execution_time_ms|any|false|none|Time taken to execute this step in milliseconds. Useful for performance analysis.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metadata|object|false|none|Additional step-specific metadata. Contains implementation details specific to the step type.|
|filter_type|any|false|none|Type of filter applied. One of 'prebuilt' (referenced filter), 'expression' (SQL-like expression), or 'pagination' (pagination filter).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter_name|any|false|none|Name of the filter step. For prebuilt filters this is the filter reference name.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|expression|any|false|none|Filter expression used. SQL-like predicate that was evaluated to filter entities. Only present for expression filters.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items_filtered|any|false|none|Number of items filtered out by this step. Shows how many entities were removed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_PipelineStageExplanation">PipelineStageExplanation</h2>
<!-- backwards compatibility -->
<a id="schemapipelinestageexplanation"></a>
<a id="schema_PipelineStageExplanation"></a>
<a id="tocSpipelinestageexplanation"></a>
<a id="tocspipelinestageexplanation"></a>

```json
{
  "stage_name": "string",
  "total_execution_time_ms": 0,
  "input_count": 0,
  "output_count": 0,
  "steps": [
    {
      "step_name": "string",
      "step_type": "",
      "input_count": 0,
      "output_count": 0,
      "filtered_count": 0,
      "execution_time_ms": 0,
      "metadata": {},
      "retrieval_method": "string",
      "retrieved_count": 0,
      "limit": 0,
      "pagination_offset": 0,
      "filter_predicate": "string"
    }
  ]
}

```

PipelineStageExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|stage_name|string|true|none|Name of the pipeline stage. One of 'retrieve', 'filter', 'score', or 'reorder'.|
|total_execution_time_ms|any|false|none|Total time taken to execute all steps in this stage in milliseconds.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|input_count|any|false|none|Number of entities that entered this stage. For the retrieve stage this is typically 0 (starts fresh), for other stages this is the output from the previous stage.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|output_count|any|false|none|Number of entities that exited this stage after all steps. May be less than input_count if filtering occurred.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|steps|[anyOf]|false|none|List of step explanations for each step executed in this stage. Steps are ordered by execution order.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[RetrieveStepExplanation](#schemaretrievestepexplanation)|false|none|Explanation for a retrieval step.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[FilterStepExplanation](#schemafilterstepexplanation)|false|none|Explanation for a filter step.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ScoreStepExplanation](#schemascorestepexplanation)|false|none|Explanation for a scoring step.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[ReorderStepExplanation](#schemareorderstepexplanation)|false|none|Explanation for a reorder step.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[StepExplanation](#schemastepexplanation)|false|none|Explanation for a single pipeline step.|

<h2 id="tocS_QueryExplanation">QueryExplanation</h2>
<!-- backwards compatibility -->
<a id="schemaqueryexplanation"></a>
<a id="schema_QueryExplanation"></a>
<a id="tocSqueryexplanation"></a>
<a id="tocsqueryexplanation"></a>

```json
{
  "query_name": "string",
  "query_type": "string",
  "parameters": {},
  "pagination_id": "string",
  "retrieve_stage": {
    "stage_name": "string",
    "total_execution_time_ms": 0,
    "input_count": 0,
    "output_count": 0,
    "steps": [
      {
        "step_name": "string",
        "step_type": "",
        "input_count": 0,
        "output_count": 0,
        "filtered_count": 0,
        "execution_time_ms": 0,
        "metadata": {},
        "retrieval_method": "string",
        "retrieved_count": 0,
        "limit": 0,
        "pagination_offset": 0,
        "filter_predicate": "string"
      }
    ]
  },
  "filter_stage": {
    "stage_name": "string",
    "total_execution_time_ms": 0,
    "input_count": 0,
    "output_count": 0,
    "steps": [
      {
        "step_name": "string",
        "step_type": "",
        "input_count": 0,
        "output_count": 0,
        "filtered_count": 0,
        "execution_time_ms": 0,
        "metadata": {},
        "retrieval_method": "string",
        "retrieved_count": 0,
        "limit": 0,
        "pagination_offset": 0,
        "filter_predicate": "string"
      }
    ]
  },
  "score_stage": {
    "stage_name": "string",
    "total_execution_time_ms": 0,
    "input_count": 0,
    "output_count": 0,
    "steps": [
      {
        "step_name": "string",
        "step_type": "",
        "input_count": 0,
        "output_count": 0,
        "filtered_count": 0,
        "execution_time_ms": 0,
        "metadata": {},
        "retrieval_method": "string",
        "retrieved_count": 0,
        "limit": 0,
        "pagination_offset": 0,
        "filter_predicate": "string"
      }
    ]
  },
  "reorder_stage": {
    "stage_name": "string",
    "total_execution_time_ms": 0,
    "input_count": 0,
    "output_count": 0,
    "steps": [
      {
        "step_name": "string",
        "step_type": "",
        "input_count": 0,
        "output_count": 0,
        "filtered_count": 0,
        "execution_time_ms": 0,
        "metadata": {},
        "retrieval_method": "string",
        "retrieved_count": 0,
        "limit": 0,
        "pagination_offset": 0,
        "filter_predicate": "string"
      }
    ]
  },
  "total_execution_time_ms": 0,
  "final_result_count": 0,
  "limit_applied": 0,
  "inner_uid": 0,
  "outer_uid": "string"
}

```

QueryExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|query_name|any|false|none|Name of the saved query that was executed. Null for ad-hoc queries.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|query_type|any|false|none|Type of query executed. One of 'rank_items', 'rank_users', 'rerank_items', 'rerank_items_by_attributes', or 'rank_attributes'.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|parameters|object|false|none|Parameters that were passed to the query. Shows the resolved values for any $parameter references used in the query configuration.|
|pagination_id|any|false|none|Pagination identifier for this result set. Use this value as the pagination_key in subsequent requests to retrieve the next page of results.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retrieve_stage|any|false|none|Explanation of the retrieval stage. Shows which retrieval steps were executed, how many entities were retrieved, and execution timing.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PipelineStageExplanation](#schemapipelinestageexplanation)|false|none|Explanation for an entire pipeline stage (e.g., all retrieval steps).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter_stage|any|false|none|Explanation of the filtering stage. Shows which filters were applied, how many entities were filtered out, and execution timing.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PipelineStageExplanation](#schemapipelinestageexplanation)|false|none|Explanation for an entire pipeline stage (e.g., all retrieval steps).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score_stage|any|false|none|Explanation of the scoring stage. Shows the scoring method used, score distributions, and execution timing.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PipelineStageExplanation](#schemapipelinestageexplanation)|false|none|Explanation for an entire pipeline stage (e.g., all retrieval steps).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|reorder_stage|any|false|none|Explanation of the reordering stage. Shows which reordering steps were applied (diversity, exploration, boosted) and execution timing.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[PipelineStageExplanation](#schemapipelinestageexplanation)|false|none|Explanation for an entire pipeline stage (e.g., all retrieval steps).|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|total_execution_time_ms|any|false|none|Total time taken to execute the query pipeline in milliseconds. Includes all stages: retrieval, filtering, scoring, and reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|final_result_count|any|false|none|Number of entities in the final result set after all pipeline stages and limit application.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit_applied|any|false|none|Limit that was applied to the final result set. Shows the maximum number of results returned.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inner_uid|any|false|none|Internal user ID if a user context was provided. This can be either an integer (for factorized stores) or a string (for no-op stores).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|outer_uid|any|false|none|External user ID if a user context was provided. This is the original string ID from the request parameters.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_QueryRequest">QueryRequest</h2>
<!-- backwards compatibility -->
<a id="schemaqueryrequest"></a>
<a id="schema_QueryRequest"></a>
<a id="tocSqueryrequest"></a>
<a id="tocsqueryrequest"></a>

```json
{
  "parameters": {
    "property1": 0,
    "property2": 0
  },
  "query": {
    "columns": [
      "string"
    ],
    "embeddings": [
      "string"
    ],
    "retrieve": [
      {
        "columns": [
          {
            "name": "string",
            "ascending": true,
            "nulls_first": false
          }
        ],
        "where": "string",
        "limit": 100,
        "name": "string",
        "type": "column_order"
      }
    ],
    "filter": [
      {
        "filter_ref": "string",
        "name": "string",
        "input_user_id": "string",
        "type": "prebuilt"
      }
    ],
    "score": {
      "value_model": "string",
      "input_user_id": "string",
      "input_user_features": {},
      "input_interactions_item_ids": [
        null
      ],
      "name": "string",
      "type": "score_ensemble"
    },
    "reorder": [
      {
        "retriever": {
          "columns": [
            {
              "name": "string",
              "ascending": true,
              "nulls_first": false
            }
          ],
          "where": "string",
          "limit": 100,
          "name": "string",
          "type": "column_order"
        },
        "strength": 0.5,
        "name": "string",
        "type": "exploration"
      }
    ],
    "limit": 0,
    "type": "rank",
    "from": "user"
  },
  "return_metadata": true,
  "return_explanation": false,
  "return_journey_explanations": false,
  "pagination_key": "string",
  "ignore_pagination": false
}

```

QueryRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|parameters|object|false|none|Query parameters that can be referenced in the query configuration using $parameter.name syntax. Supports int, float, str, bool, and lists of these types.|
|» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[integer]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[number]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[boolean]|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|query|any|true|none|Query configuration or SQL query string. Can be either:<br>- A QueryConfig object defining the retrieval, filtering, scoring, and reordering pipeline. Must include a 'type' field indicating the query type (rank_items, rank_users, rerank_items, etc.).<br>- A SQL query string that will be transpiled to a QueryConfig. Supports a subset of SQL with custom REORDER BY clause.|

anyOf - discriminator: type

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[RankQueryConfig](#schemarankqueryconfig)|false|none|Config for a query pipeline that ranks entities (items or users) based on the<br>given definition. The entity type is determined by the 'from' field.|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[RankItemAttributeValuesQueryConfig](#schemarankitemattributevaluesqueryconfig)|false|none|Config for a query pipeline that ranks the possible values of a given item<br>attribute. If a user_id is provided, the ranking will be personalized.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|return_metadata|boolean|false|none|Whether to include entity metadata (attributes) in the response. When true, each result includes an 'attributes' field with entity metadata.|
|return_explanation|boolean|false|none|Whether to include a detailed explanation of query execution. When true, the response includes an 'explanation' field with information about retrieval, filtering, scoring, and reordering stages.|
|return_journey_explanations|boolean|false|none|Whether to include per-entity journey tracking in results. When true, each result includes a 'journey' field showing how that entity moved through the query pipeline.|
|pagination_key|any|false|none|Pagination key for retrieving the next page of results. Use the pagination_id from a previous response's explanation to continue pagination.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ignore_pagination|boolean|false|none|Whether to ignore pagination and return results from the beginning. When true, pagination_key is ignored and results start from the first page.|

<h2 id="tocS_QueryResult">QueryResult</h2>
<!-- backwards compatibility -->
<a id="schemaqueryresult"></a>
<a id="schema_QueryResult"></a>
<a id="tocSqueryresult"></a>
<a id="tocsqueryresult"></a>

```json
{
  "results": [
    {
      "id": "string",
      "score": 0,
      "metadata": {},
      "embeddings": {
        "property1": [
          0
        ],
        "property2": [
          0
        ]
      },
      "journey": {
        "entity_id": "string",
        "inner_entity_id": 0,
        "retrieved_by": [
          "string"
        ],
        "retrieval_scores": {
          "property1": 0,
          "property2": 0
        },
        "retrieval_rank": {
          "property1": 0,
          "property2": 0
        },
        "filter_results": {
          "property1": true,
          "property2": true
        },
        "filtered_out_by": "string",
        "score": 0,
        "score_rank": 0,
        "reorder_changes": [
          {}
        ],
        "final_position": 0,
        "final_score": 0
      }
    }
  ],
  "entity_type": "string",
  "explanation": {
    "query_name": "string",
    "query_type": "string",
    "parameters": {},
    "pagination_id": "string",
    "retrieve_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "filter_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "score_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "reorder_stage": {
      "stage_name": "string",
      "total_execution_time_ms": 0,
      "input_count": 0,
      "output_count": 0,
      "steps": [
        {
          "step_name": "string",
          "step_type": "",
          "input_count": 0,
          "output_count": 0,
          "filtered_count": 0,
          "execution_time_ms": 0,
          "metadata": {},
          "retrieval_method": "string",
          "retrieved_count": 0,
          "limit": 0,
          "pagination_offset": 0,
          "filter_predicate": "string"
        }
      ]
    },
    "total_execution_time_ms": 0,
    "final_result_count": 0,
    "limit_applied": 0,
    "inner_uid": 0,
    "outer_uid": "string"
  }
}

```

QueryResult

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|results|[[Result](#schemaresult)]|true|none|List of ranked result entities. Each result contains an id, score, and optionally attributes, embeddings, and journey tracking. Results are ordered by score (descending) after all pipeline stages.|
|entity_type|any|false|none|Type of entities in the results. One of 'item', 'user', or 'attribute'. Indicates what kind of entities are being ranked.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|explanation|any|false|none|Detailed explanation of query execution. Includes information about retrieval, filtering, scoring, and reordering stages. Only included if return_explanation is true in the request.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[QueryExplanation](#schemaqueryexplanation)|false|none|Detailed explanation of the query execution pipeline.<br><br>This follows the declarative query structure, providing explanations<br>for each stage and step in the pipeline. Per-entity journey tracking<br>is attached to individual Result objects in QueryResult.results.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_ReorderStepExplanation">ReorderStepExplanation</h2>
<!-- backwards compatibility -->
<a id="schemareorderstepexplanation"></a>
<a id="schema_ReorderStepExplanation"></a>
<a id="tocSreorderstepexplanation"></a>
<a id="tocsreorderstepexplanation"></a>

```json
{
  "step_name": "string",
  "step_type": "",
  "input_count": 0,
  "output_count": 0,
  "filtered_count": 0,
  "execution_time_ms": 0,
  "metadata": {},
  "reorder_type": "string",
  "strength": 0,
  "items_reordered": 0,
  "diversity_retriever_item_count": 0,
  "diversity_attributes": [
    "string"
  ],
  "lookback_window": 0,
  "lookforward_window": 0,
  "boost_retriever_item_count": 0,
  "boost_filter": "string",
  "items_boosted": 0
}

```

ReorderStepExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_name|any|false|none|Name of the step. For named steps this is the configured name, for unnamed steps this may be auto-generated or null.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_type|string|false|none|Type of step. Examples: 'column_order', 'similarity', 'text_search', 'prebuilt', 'expression', 'score_ensemble', 'diversity', etc.|
|input_count|any|false|none|Number of entities that entered this step. Shows how many entities were processed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|output_count|any|false|none|Number of entities that exited this step. May be less than input_count if filtering occurred.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filtered_count|any|false|none|Number of entities filtered out by this step. Only relevant for filter steps.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|execution_time_ms|any|false|none|Time taken to execute this step in milliseconds. Useful for performance analysis.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metadata|object|false|none|Additional step-specific metadata. Contains implementation details specific to the step type.|
|reorder_type|any|false|none|Type of reordering applied. One of 'diversity' (promote diverse items), 'exploration' (explore new items), or 'boosted' (boost items matching a filter).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|strength|any|false|none|Strength of the reordering effect. Value between 0.0 and 1.0 indicating how strongly the reordering is applied.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items_reordered|any|false|none|Number of items that had their position changed by this reordering step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|diversity_retriever_item_count|any|false|none|Number of items retrieved by the diversity retriever. Only relevant for diversity reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|diversity_attributes|any|false|none|Attributes used for diversity calculation. List of attribute names used to measure diversity. Only relevant for diversity reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lookback_window|any|false|none|Lookback window size for diversity calculation. Number of previous items to consider when promoting diversity. Only relevant for diversity reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lookforward_window|any|false|none|Lookforward window size for diversity calculation. Number of upcoming items to consider when promoting diversity. Only relevant for diversity reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|boost_retriever_item_count|any|false|none|Number of items retrieved by the boost retriever. Only relevant for boosted reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|boost_filter|any|false|none|Filter expression used to identify items to boost. Only relevant for boosted reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items_boosted|any|false|none|Number of items that were boosted by this step. Only relevant for boosted reordering.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_Result">Result</h2>
<!-- backwards compatibility -->
<a id="schemaresult"></a>
<a id="schema_Result"></a>
<a id="tocSresult"></a>
<a id="tocsresult"></a>

```json
{
  "id": "string",
  "score": 0,
  "metadata": {},
  "embeddings": {
    "property1": [
      0
    ],
    "property2": [
      0
    ]
  },
  "journey": {
    "entity_id": "string",
    "inner_entity_id": 0,
    "retrieved_by": [
      "string"
    ],
    "retrieval_scores": {
      "property1": 0,
      "property2": 0
    },
    "retrieval_rank": {
      "property1": 0,
      "property2": 0
    },
    "filter_results": {
      "property1": true,
      "property2": true
    },
    "filtered_out_by": "string",
    "score": 0,
    "score_rank": 0,
    "reorder_changes": [
      {}
    ],
    "final_position": 0,
    "final_score": 0
  }
}

```

Result

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|Entity identifier. For items this is the item_id, for users this is the user_id, and for attributes this is the attribute value.|
|score|any|false|none|Final score assigned to this entity by the scoring stage. Higher scores indicate better matches. Null if scoring was not performed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metadata|any|false|none|Entity metadata/attributes. Contains feature values for the entity such as category, price, description, etc. Serialized as 'metadata' in API responses for compatibility.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|embeddings|any|false|none|Entity embeddings. Dictionary mapping embedding column names to their vector values. Only included if embeddings were requested in the query configuration.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[number]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|journey|any|false|none|Per-entity journey tracking showing how this entity moved through the query pipeline. Includes retrieval sources, filtering results, scoring details, and reordering changes. Only included if return_journey_explanations is true.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[EntityJourney](#schemaentityjourney)|false|none|Tracks a single entity's journey through the query pipeline.<br><br>Shows which retrievers found it, scores at each stage, filtering/reordering<br>impact, and final position. Used in RankQueryConfig queries for both items<br>and users.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[AttributeJourney](#schemaattributejourney)|false|none|Tracks a single attribute's journey through an attribute ranking pipeline.<br><br>Shows the attribute value, its score, and final position. Used in<br>RankItemAttributeValuesQueryConfig queries.|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_RetrieveStepExplanation">RetrieveStepExplanation</h2>
<!-- backwards compatibility -->
<a id="schemaretrievestepexplanation"></a>
<a id="schema_RetrieveStepExplanation"></a>
<a id="tocSretrievestepexplanation"></a>
<a id="tocsretrievestepexplanation"></a>

```json
{
  "step_name": "string",
  "step_type": "",
  "input_count": 0,
  "output_count": 0,
  "filtered_count": 0,
  "execution_time_ms": 0,
  "metadata": {},
  "retrieval_method": "string",
  "retrieved_count": 0,
  "limit": 0,
  "pagination_offset": 0,
  "filter_predicate": "string"
}

```

RetrieveStepExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_name|any|false|none|Name of the step. For named steps this is the configured name, for unnamed steps this may be auto-generated or null.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_type|string|false|none|Type of step. Examples: 'column_order', 'similarity', 'text_search', 'prebuilt', 'expression', 'score_ensemble', 'diversity', etc.|
|input_count|any|false|none|Number of entities that entered this step. Shows how many entities were processed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|output_count|any|false|none|Number of entities that exited this step. May be less than input_count if filtering occurred.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filtered_count|any|false|none|Number of entities filtered out by this step. Only relevant for filter steps.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|execution_time_ms|any|false|none|Time taken to execute this step in milliseconds. Useful for performance analysis.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metadata|object|false|none|Additional step-specific metadata. Contains implementation details specific to the step type.|
|retrieval_method|any|false|none|Method used for retrieval. One of 'item_column_order', 'user_column_order', 'item_similarity', 'user_similarity', or 'text_search'. Indicates the type of retrieval performed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|retrieved_count|any|false|none|Number of entities retrieved by this step before any filtering or limit application.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|any|false|none|Limit configured for this retrieval step. Maximum number of entities this step was configured to retrieve.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pagination_offset|any|false|none|Pagination offset used for this retrieval. Number of entities skipped for pagination.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filter_predicate|any|false|none|Filter predicate applied during retrieval. SQL-like expression used to filter entities at retrieval time.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_SavedQueryInfoResponse">SavedQueryInfoResponse</h2>
<!-- backwards compatibility -->
<a id="schemasavedqueryinforesponse"></a>
<a id="schema_SavedQueryInfoResponse"></a>
<a id="tocSsavedqueryinforesponse"></a>
<a id="tocssavedqueryinforesponse"></a>

```json
{
  "name": "string",
  "params": [
    "string"
  ],
  "query": "string",
  "query_type": "string"
}

```

SavedQueryInfoResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|The name of the saved query.|
|params|[string]|true|none|List of parameter names that this query accepts.|
|query|any|false|none|The actual query configuration as YAML string (or SQL string if originally SQL).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|query_type|any|false|none|The type of query: 'sql' for SQL queries, 'yaml' for YAML/QueryConfig queries.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_SavedQueryListResponse">SavedQueryListResponse</h2>
<!-- backwards compatibility -->
<a id="schemasavedquerylistresponse"></a>
<a id="schema_SavedQueryListResponse"></a>
<a id="tocSsavedquerylistresponse"></a>
<a id="tocssavedquerylistresponse"></a>

```json
{
  "queries": [
    "string"
  ]
}

```

SavedQueryListResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|queries|[string]|true|none|List of available saved query names.|

<h2 id="tocS_SavedQueryRequest">SavedQueryRequest</h2>
<!-- backwards compatibility -->
<a id="schemasavedqueryrequest"></a>
<a id="schema_SavedQueryRequest"></a>
<a id="tocSsavedqueryrequest"></a>
<a id="tocssavedqueryrequest"></a>

```json
{
  "parameters": {
    "property1": 0,
    "property2": 0
  },
  "return_metadata": true,
  "return_explanation": false,
  "return_journey_explanations": false,
  "pagination_key": "string",
  "ignore_pagination": false
}

```

SavedQueryRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|parameters|object|false|none|Query parameters that can be referenced in the saved query configuration using $parameter.name syntax. Supports int, float, str, bool, and lists of these types.|
|» **additionalProperties**|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[integer]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[number]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[string]|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[boolean]|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|return_metadata|boolean|false|none|Whether to include entity metadata (attributes) in the response. When true, each result includes an 'attributes' field with entity metadata.|
|return_explanation|boolean|false|none|Whether to include a detailed explanation of query execution. When true, the response includes an 'explanation' field with information about retrieval, filtering, scoring, and reordering stages.|
|return_journey_explanations|boolean|false|none|Whether to include per-entity journey tracking in results. When true, each result includes a 'journey' field showing how that entity moved through the query pipeline.|
|pagination_key|any|false|none|Pagination key for retrieving the next page of results. Use the pagination_id from a previous response's explanation to continue pagination.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ignore_pagination|boolean|false|none|Whether to ignore pagination and return results from the beginning. When true, pagination_key is ignored and results start from the first page.|

<h2 id="tocS_ScoreStepExplanation">ScoreStepExplanation</h2>
<!-- backwards compatibility -->
<a id="schemascorestepexplanation"></a>
<a id="schema_ScoreStepExplanation"></a>
<a id="tocSscorestepexplanation"></a>
<a id="tocsscorestepexplanation"></a>

```json
{
  "step_name": "string",
  "step_type": "",
  "input_count": 0,
  "output_count": 0,
  "filtered_count": 0,
  "execution_time_ms": 0,
  "metadata": {},
  "score_type": "string",
  "value_model": "string",
  "score_distribution": {
    "property1": 0,
    "property2": 0
  },
  "items_scored": 0,
  "scoring_policy_scores": {
    "property1": [
      0
    ],
    "property2": [
      0
    ]
  },
  "is_user_found_in_feature_store": true,
  "user_interaction_count": 0,
  "user_feature_column_count": 0,
  "item_feature_column_count": 0,
  "candidate_item_features_count": 0
}

```

ScoreStepExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_name|any|false|none|Name of the step. For named steps this is the configured name, for unnamed steps this may be auto-generated or null.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_type|string|false|none|Type of step. Examples: 'column_order', 'similarity', 'text_search', 'prebuilt', 'expression', 'score_ensemble', 'diversity', etc.|
|input_count|any|false|none|Number of entities that entered this step. Shows how many entities were processed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|output_count|any|false|none|Number of entities that exited this step. May be less than input_count if filtering occurred.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filtered_count|any|false|none|Number of entities filtered out by this step. Only relevant for filter steps.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|execution_time_ms|any|false|none|Time taken to execute this step in milliseconds. Useful for performance analysis.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metadata|object|false|none|Additional step-specific metadata. Contains implementation details specific to the step type.|
|score_type|any|false|none|Type of scoring method used. One of 'score_ensemble' (combines multiple models) or 'passthrough' (uses retrieval scores directly).|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|value_model|any|false|none|Scoring expression containing model references. Shows how scores from different models or retrievers are combined. Example: '0.6 * model_1 + 0.4 * model_2'.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|score_distribution|any|false|none|Statistical distribution of scores. Contains min, max, mean, and median score values across all scored entities.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|items_scored|any|false|none|Number of entities that were scored by this step.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|scoring_policy_scores|any|false|none|Scores from individual scoring policies. Dictionary mapping policy names to lists of scores for each entity.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|object|false|none|none|
|»» **additionalProperties**|[anyOf]|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|null|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|is_user_found_in_feature_store|any|false|none|Whether the user was found in the feature store. Only relevant for personalized queries.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|boolean|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_interaction_count|any|false|none|Number of user interactions used for scoring. Only relevant for personalized queries.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user_feature_column_count|any|false|none|Number of user feature columns available. Only relevant for personalized queries.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|item_feature_column_count|any|false|none|Number of item feature columns available for scoring.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|candidate_item_features_count|any|false|none|Number of candidate items that had features available for scoring.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_StepExplanation">StepExplanation</h2>
<!-- backwards compatibility -->
<a id="schemastepexplanation"></a>
<a id="schema_StepExplanation"></a>
<a id="tocSstepexplanation"></a>
<a id="tocsstepexplanation"></a>

```json
{
  "step_name": "string",
  "step_type": "",
  "input_count": 0,
  "output_count": 0,
  "filtered_count": 0,
  "execution_time_ms": 0,
  "metadata": {}
}

```

StepExplanation

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_name|any|false|none|Name of the step. For named steps this is the configured name, for unnamed steps this may be auto-generated or null.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|step_type|string|false|none|Type of step. Examples: 'column_order', 'similarity', 'text_search', 'prebuilt', 'expression', 'score_ensemble', 'diversity', etc.|
|input_count|any|false|none|Number of entities that entered this step. Shows how many entities were processed.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|output_count|any|false|none|Number of entities that exited this step. May be less than input_count if filtering occurred.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|filtered_count|any|false|none|Number of entities filtered out by this step. Only relevant for filter steps.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|execution_time_ms|any|false|none|Time taken to execute this step in milliseconds. Useful for performance analysis.|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|metadata|object|false|none|Additional step-specific metadata. Contains implementation details specific to the step type.|

