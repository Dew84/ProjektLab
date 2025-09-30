# .AdsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAdsGet**](AdsApi.md#apiAdsGet) | **GET** /api/Ads | 
[**apiAdsIdDelete**](AdsApi.md#apiAdsIdDelete) | **DELETE** /api/Ads/{id} | 
[**apiAdsIdGet**](AdsApi.md#apiAdsIdGet) | **GET** /api/Ads/{id} | 
[**apiAdsIdPut**](AdsApi.md#apiAdsIdPut) | **PUT** /api/Ads/{id} | 
[**apiAdsMineGet**](AdsApi.md#apiAdsMineGet) | **GET** /api/Ads/mine | 
[**apiAdsPost**](AdsApi.md#apiAdsPost) | **POST** /api/Ads | 


# **apiAdsGet**
> AdDtoPagedResult apiAdsGet()


### Example


```typescript
import { createConfiguration, AdsApi } from '';
import type { AdsApiApiAdsGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AdsApi(configuration);

const request: AdsApiApiAdsGetRequest = {
  
  keyword: "keyword_example",
  
  categoryId: 1,
  
  page: 1,
  
  pageSize: 20,
};

const data = await apiInstance.apiAdsGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keyword** | [**string**] |  | (optional) defaults to undefined
 **categoryId** | [**number**] |  | (optional) defaults to undefined
 **page** | [**number**] |  | (optional) defaults to 1
 **pageSize** | [**number**] |  | (optional) defaults to 20


### Return type

**AdDtoPagedResult**

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

# **apiAdsIdDelete**
> void apiAdsIdDelete()


### Example


```typescript
import { createConfiguration, AdsApi } from '';
import type { AdsApiApiAdsIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AdsApi(configuration);

const request: AdsApiApiAdsIdDeleteRequest = {
  
  id: 1,
};

const data = await apiInstance.apiAdsIdDelete(request);
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

# **apiAdsIdGet**
> AdDto apiAdsIdGet()


### Example


```typescript
import { createConfiguration, AdsApi } from '';
import type { AdsApiApiAdsIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AdsApi(configuration);

const request: AdsApiApiAdsIdGetRequest = {
  
  id: 1,
};

const data = await apiInstance.apiAdsIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined


### Return type

**AdDto**

### Authorization

[Bearer](README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiAdsIdPut**
> void apiAdsIdPut()


### Example


```typescript
import { createConfiguration, AdsApi } from '';
import type { AdsApiApiAdsIdPutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AdsApi(configuration);

const request: AdsApiApiAdsIdPutRequest = {
  
  id: 1,
  
  updateAdDto: {
    title: "title_example",
    description: "description_example",
    price: 3.14,
    categoryIds: [
      1,
    ],
  },
};

const data = await apiInstance.apiAdsIdPut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateAdDto** | **UpdateAdDto**|  |
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

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiAdsMineGet**
> AdDtoPagedResult apiAdsMineGet()


### Example


```typescript
import { createConfiguration, AdsApi } from '';
import type { AdsApiApiAdsMineGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AdsApi(configuration);

const request: AdsApiApiAdsMineGetRequest = {
  
  page: 1,
  
  pageSize: 20,
};

const data = await apiInstance.apiAdsMineGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | [**number**] |  | (optional) defaults to 1
 **pageSize** | [**number**] |  | (optional) defaults to 20


### Return type

**AdDtoPagedResult**

### Authorization

[Bearer](README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiAdsPost**
> any apiAdsPost()


### Example


```typescript
import { createConfiguration, AdsApi } from '';
import type { AdsApiApiAdsPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AdsApi(configuration);

const request: AdsApiApiAdsPostRequest = {
  
  createAdDto: {
    title: "title_example",
    description: "description_example",
    price: 3.14,
    categoryIds: [
      1,
    ],
  },
};

const data = await apiInstance.apiAdsPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createAdDto** | **CreateAdDto**|  |


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

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


