# TradeByteApi.CategoriesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiCategoriesGet**](CategoriesApi.md#apiCategoriesGet) | **GET** /api/Categories | 
[**apiCategoriesIdDelete**](CategoriesApi.md#apiCategoriesIdDelete) | **DELETE** /api/Categories/{id} | 
[**apiCategoriesIdPut**](CategoriesApi.md#apiCategoriesIdPut) | **PUT** /api/Categories/{id} | 
[**apiCategoriesPost**](CategoriesApi.md#apiCategoriesPost) | **POST** /api/Categories | 



## apiCategoriesGet

> [CategoryDto] apiCategoriesGet()



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.CategoriesApi();
apiInstance.apiCategoriesGet((error, data, response) => {
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

[**[CategoryDto]**](CategoryDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiCategoriesIdDelete

> apiCategoriesIdDelete(id)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.CategoriesApi();
let id = 56; // Number | 
apiInstance.apiCategoriesIdDelete(id, (error, data, response) => {
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


## apiCategoriesIdPut

> apiCategoriesIdPut(id, opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.CategoriesApi();
let id = 56; // Number | 
let opts = {
  'updateCategoryDto': new TradeByteApi.UpdateCategoryDto() // UpdateCategoryDto | 
};
apiInstance.apiCategoriesIdPut(id, opts, (error, data, response) => {
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
 **updateCategoryDto** | [**UpdateCategoryDto**](UpdateCategoryDto.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json


## apiCategoriesPost

> Object apiCategoriesPost(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.CategoriesApi();
let opts = {
  'createCategoryDto': new TradeByteApi.CreateCategoryDto() // CreateCategoryDto | 
};
apiInstance.apiCategoriesPost(opts, (error, data, response) => {
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
 **createCategoryDto** | [**CreateCategoryDto**](CreateCategoryDto.md)|  | [optional] 

### Return type

**Object**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json

