# .CategoriesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiCategoriesGet**](CategoriesApi.md#apiCategoriesGet) | **GET** /api/Categories | 
[**apiCategoriesIdDelete**](CategoriesApi.md#apiCategoriesIdDelete) | **DELETE** /api/Categories/{id} | 
[**apiCategoriesIdPut**](CategoriesApi.md#apiCategoriesIdPut) | **PUT** /api/Categories/{id} | 
[**apiCategoriesPost**](CategoriesApi.md#apiCategoriesPost) | **POST** /api/Categories | 


# **apiCategoriesGet**
> Array<CategoryDto> apiCategoriesGet()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.apiCategoriesGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<CategoryDto>**

### Authorization

[Bearer](README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiCategoriesIdDelete**
> void apiCategoriesIdDelete()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiApiCategoriesIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiApiCategoriesIdDeleteRequest = {
  
  id: 1,
};

const data = await apiInstance.apiCategoriesIdDelete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined


### Return type

**void**

### Authorization

[Bearer](README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | No Content |  -  |
**401** | Unauthorized |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiCategoriesIdPut**
> void apiCategoriesIdPut()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiApiCategoriesIdPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiApiCategoriesIdPutRequest = {
  
  id: 1,
  
  updateCategoryDto: {
    name: "name_example",
  },
};

const data = await apiInstance.apiCategoriesIdPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateCategoryDto** | **UpdateCategoryDto**|  |
 **id** | [**number**] |  | defaults to undefined


### Return type

**void**

### Authorization

[Bearer](README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | No Content |  -  |
**400** | Bad Request |  -  |
**401** | Unauthorized |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |
**409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiCategoriesPost**
> any apiCategoriesPost()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiApiCategoriesPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiApiCategoriesPostRequest = {
  
  createCategoryDto: {
    name: "name_example",
  },
};

const data = await apiInstance.apiCategoriesPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createCategoryDto** | **CreateCategoryDto**|  |


### Return type

**any**

### Authorization

[Bearer](README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Created |  -  |
**400** | Bad Request |  -  |
**401** | Unauthorized |  -  |
**403** | Forbidden |  -  |
**409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


