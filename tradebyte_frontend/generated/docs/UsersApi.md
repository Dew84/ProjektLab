# TradeByteApi.UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsersGet**](UsersApi.md#apiUsersGet) | **GET** /api/Users | 
[**apiUsersIdDelete**](UsersApi.md#apiUsersIdDelete) | **DELETE** /api/Users/{id} | 
[**apiUsersIdGet**](UsersApi.md#apiUsersIdGet) | **GET** /api/Users/{id} | 
[**apiUsersMeGet**](UsersApi.md#apiUsersMeGet) | **GET** /api/Users/me | 
[**apiUsersMePut**](UsersApi.md#apiUsersMePut) | **PUT** /api/Users/me | 



## apiUsersGet

> [UserDto] apiUsersGet()



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.UsersApi();
apiInstance.apiUsersGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[UserDto]**](UserDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersIdDelete

> apiUsersIdDelete(id)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.UsersApi();
let id = 56; // Number | 
apiInstance.apiUsersIdDelete(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersIdGet

> UserDto apiUsersIdGet(id)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.UsersApi();
let id = 56; // Number | 
apiInstance.apiUsersIdGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersMeGet

> UserDto apiUsersMeGet()



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.UsersApi();
apiInstance.apiUsersMeGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserDto**](UserDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersMePut

> apiUsersMePut(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.UsersApi();
let opts = {
  'updateUserDto': new TradeByteApi.UpdateUserDto() // UpdateUserDto | 
};
apiInstance.apiUsersMePut(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateUserDto** | [**UpdateUserDto**](UpdateUserDto.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json

