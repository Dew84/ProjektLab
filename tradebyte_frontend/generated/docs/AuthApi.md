# TradeByteApi.AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAuthLoginPost**](AuthApi.md#apiAuthLoginPost) | **POST** /api/Auth/login | 
[**apiAuthRegisterPost**](AuthApi.md#apiAuthRegisterPost) | **POST** /api/Auth/register | 



## apiAuthLoginPost

> AuthResultDto apiAuthLoginPost(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AuthApi();
let opts = {
  'loginDto': new TradeByteApi.LoginDto() // LoginDto | 
};
apiInstance.apiAuthLoginPost(opts, (error, data, response) => {
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
 **loginDto** | [**LoginDto**](LoginDto.md)|  | [optional] 

### Return type

[**AuthResultDto**](AuthResultDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json


## apiAuthRegisterPost

> AuthResultDto apiAuthRegisterPost(opts)



### Example

```javascript
import TradeByteApi from 'trade_byte_api';
let defaultClient = TradeByteApi.ApiClient.instance;
// Configure API key authorization: Bearer
let Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

let apiInstance = new TradeByteApi.AuthApi();
let opts = {
  'registerDto': new TradeByteApi.RegisterDto() // RegisterDto | 
};
apiInstance.apiAuthRegisterPost(opts, (error, data, response) => {
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
 **registerDto** | [**RegisterDto**](RegisterDto.md)|  | [optional] 

### Return type

[**AuthResultDto**](AuthResultDto.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

- **Content-Type**: application/json, text/json, application/*+json
- **Accept**: application/json

