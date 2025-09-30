# .UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsersGet**](UsersApi.md#apiUsersGet) | **GET** /api/Users | 
[**apiUsersIdDelete**](UsersApi.md#apiUsersIdDelete) | **DELETE** /api/Users/{id} | 
[**apiUsersIdGet**](UsersApi.md#apiUsersIdGet) | **GET** /api/Users/{id} | 
[**apiUsersMeGet**](UsersApi.md#apiUsersMeGet) | **GET** /api/Users/me | 
[**apiUsersMePut**](UsersApi.md#apiUsersMePut) | **PUT** /api/Users/me | 


# **apiUsersGet**
> Array<UserDto> apiUsersGet()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.apiUsersGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<UserDto>**

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
**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiUsersIdDelete**
> void apiUsersIdDelete()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiApiUsersIdDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiApiUsersIdDeleteRequest = {
  
  id: 1,
};

const data = await apiInstance.apiUsersIdDelete(request);
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
**400** | Bad Request |  -  |
**401** | Unauthorized |  -  |
**403** | Forbidden |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiUsersIdGet**
> UserDto apiUsersIdGet()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiApiUsersIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiApiUsersIdGetRequest = {
  
  id: 1,
};

const data = await apiInstance.apiUsersIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined


### Return type

**UserDto**

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
**403** | Forbidden |  -  |
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiUsersMeGet**
> UserDto apiUsersMeGet()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.apiUsersMeGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**UserDto**

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
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiUsersMePut**
> void apiUsersMePut()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiApiUsersMePutRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiApiUsersMePutRequest = {
  
  updateUserDto: {
    userName: "userName_example",
    email: "email_example",
  },
};

const data = await apiInstance.apiUsersMePut(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateUserDto** | **UpdateUserDto**|  |


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
**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


