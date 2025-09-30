# TradeByteApi.AdsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAdsGet**](AdsApi.md#apiAdsGet) | **GET** /api/Ads | 
[**apiAdsIdDelete**](AdsApi.md#apiAdsIdDelete) | **DELETE** /api/Ads/{id} | 
[**apiAdsIdGet**](AdsApi.md#apiAdsIdGet) | **GET** /api/Ads/{id} | 
[**apiAdsIdPut**](AdsApi.md#apiAdsIdPut) | **PUT** /api/Ads/{id} | 
[**apiAdsMineGet**](AdsApi.md#apiAdsMineGet) | **GET** /api/Ads/mine | 
[**apiAdsPost**](AdsApi.md#apiAdsPost) | **POST** /api/Ads | 



## apiAdsGet

> AdDtoPagedResult apiAdsGet(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AdsApi();
let opts = {
  'keyword': "keyword_example", // String | 
  'categoryId': 56, // Number | 
  'page': 1, // Number | 
  'pageSize': 20 // Number | 
};
apiInstance.apiAdsGet(opts, (error, data, response) => {
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
 **keyword** | **String**|  | [optional] 
 **categoryId** | **Number**|  | [optional] 
 **page** | **Number**|  | [optional] [default to 1]
 **pageSize** | **Number**|  | [optional] [default to 20]

### Return type

[**AdDtoPagedResult**](AdDtoPagedResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiAdsIdDelete

> apiAdsIdDelete(id)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AdsApi();
let id = 56; // Number | 
apiInstance.apiAdsIdDelete(id, (error, data, response) => {
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


## apiAdsIdGet

> AdDto apiAdsIdGet(id)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AdsApi();
let id = 56; // Number | 
apiInstance.apiAdsIdGet(id, (error, data, response) => {
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

[**AdDto**](AdDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiAdsIdPut

> apiAdsIdPut(id, opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AdsApi();
let id = 56; // Number | 
let opts = {
  'updateAdDto': new TradeByteApi.UpdateAdDto() // UpdateAdDto | 
};
apiInstance.apiAdsIdPut(id, opts, (error, data, response) => {
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
 **updateAdDto** | [**UpdateAdDto**](UpdateAdDto.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json


## apiAdsMineGet

> AdDtoPagedResult apiAdsMineGet(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AdsApi();
let opts = {
  'page': 1, // Number | 
  'pageSize': 20 // Number | 
};
apiInstance.apiAdsMineGet(opts, (error, data, response) => {
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
 **page** | **Number**|  | [optional] [default to 1]
 **pageSize** | **Number**|  | [optional] [default to 20]

### Return type

[**AdDtoPagedResult**](AdDtoPagedResult.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiAdsPost

> Object apiAdsPost(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AdsApi();
let opts = {
  'createAdDto': new TradeByteApi.CreateAdDto() // CreateAdDto | 
};
apiInstance.apiAdsPost(opts, (error, data, response) => {
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
 **createAdDto** | [**CreateAdDto**](CreateAdDto.md)|  | [optional] 

### Return type

**Object**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json

