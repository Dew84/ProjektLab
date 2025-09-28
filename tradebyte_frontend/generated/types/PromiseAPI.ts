import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, PromiseConfigurationOptions, wrapOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

import { AdDto } from '../models/AdDto';
import { AdDtoPagedResult } from '../models/AdDtoPagedResult';
import { AuthResultDto } from '../models/AuthResultDto';
import { CategoryDto } from '../models/CategoryDto';
import { CreateAdDto } from '../models/CreateAdDto';
import { CreateCategoryDto } from '../models/CreateCategoryDto';
import { LoginDto } from '../models/LoginDto';
import { ProblemDetails } from '../models/ProblemDetails';
import { RegisterDto } from '../models/RegisterDto';
import { UpdateAdDto } from '../models/UpdateAdDto';
import { UpdateCategoryDto } from '../models/UpdateCategoryDto';
import { UpdateUserDto } from '../models/UpdateUserDto';
import { UserDto } from '../models/UserDto';
import { ObservableAdsApi } from './ObservableAPI';

import { AdsApiRequestFactory, AdsApiResponseProcessor} from "../apis/AdsApi";
export class PromiseAdsApi {
    private api: ObservableAdsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AdsApiRequestFactory,
        responseProcessor?: AdsApiResponseProcessor
    ) {
        this.api = new ObservableAdsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [keyword]
     * @param [categoryId]
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsGetWithHttpInfo(keyword?: string, categoryId?: number, page?: number, pageSize?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AdDtoPagedResult>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsGetWithHttpInfo(keyword, categoryId, page, pageSize, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [keyword]
     * @param [categoryId]
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsGet(keyword?: string, categoryId?: number, page?: number, pageSize?: number, _options?: PromiseConfigurationOptions): Promise<AdDtoPagedResult> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsGet(keyword, categoryId, page, pageSize, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiAdsIdDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsIdDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiAdsIdDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsIdDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiAdsIdGetWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AdDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsIdGetWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiAdsIdGet(id: number, _options?: PromiseConfigurationOptions): Promise<AdDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsIdGet(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [updateAdDto]
     */
    public apiAdsIdPutWithHttpInfo(id: number, updateAdDto?: UpdateAdDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsIdPutWithHttpInfo(id, updateAdDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [updateAdDto]
     */
    public apiAdsIdPut(id: number, updateAdDto?: UpdateAdDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsIdPut(id, updateAdDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsMineGetWithHttpInfo(page?: number, pageSize?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AdDtoPagedResult>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsMineGetWithHttpInfo(page, pageSize, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsMineGet(page?: number, pageSize?: number, _options?: PromiseConfigurationOptions): Promise<AdDtoPagedResult> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsMineGet(page, pageSize, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createAdDto]
     */
    public apiAdsPostWithHttpInfo(createAdDto?: CreateAdDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsPostWithHttpInfo(createAdDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createAdDto]
     */
    public apiAdsPost(createAdDto?: CreateAdDto, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAdsPost(createAdDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param [loginDto]
     */
    public apiAuthLoginPostWithHttpInfo(loginDto?: LoginDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AuthResultDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAuthLoginPostWithHttpInfo(loginDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [loginDto]
     */
    public apiAuthLoginPost(loginDto?: LoginDto, _options?: PromiseConfigurationOptions): Promise<AuthResultDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAuthLoginPost(loginDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [registerDto]
     */
    public apiAuthRegisterPostWithHttpInfo(registerDto?: RegisterDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AuthResultDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAuthRegisterPostWithHttpInfo(registerDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [registerDto]
     */
    public apiAuthRegisterPost(registerDto?: RegisterDto, _options?: PromiseConfigurationOptions): Promise<AuthResultDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiAuthRegisterPost(registerDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableCategoriesApi } from './ObservableAPI';

import { CategoriesApiRequestFactory, CategoriesApiResponseProcessor} from "../apis/CategoriesApi";
export class PromiseCategoriesApi {
    private api: ObservableCategoriesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CategoriesApiRequestFactory,
        responseProcessor?: CategoriesApiResponseProcessor
    ) {
        this.api = new ObservableCategoriesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public apiCategoriesGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<CategoryDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public apiCategoriesGet(_options?: PromiseConfigurationOptions): Promise<Array<CategoryDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesGet(observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiCategoriesIdDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesIdDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiCategoriesIdDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesIdDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [updateCategoryDto]
     */
    public apiCategoriesIdPutWithHttpInfo(id: number, updateCategoryDto?: UpdateCategoryDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesIdPutWithHttpInfo(id, updateCategoryDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     * @param [updateCategoryDto]
     */
    public apiCategoriesIdPut(id: number, updateCategoryDto?: UpdateCategoryDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesIdPut(id, updateCategoryDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createCategoryDto]
     */
    public apiCategoriesPostWithHttpInfo(createCategoryDto?: CreateCategoryDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesPostWithHttpInfo(createCategoryDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [createCategoryDto]
     */
    public apiCategoriesPost(createCategoryDto?: CreateCategoryDto, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiCategoriesPost(createCategoryDto, observableOptions);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public apiUsersGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<UserDto>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public apiUsersGet(_options?: PromiseConfigurationOptions): Promise<Array<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersGet(observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiUsersIdDeleteWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersIdDeleteWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiUsersIdDelete(id: number, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersIdDelete(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiUsersIdGetWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersIdGetWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * @param id
     */
    public apiUsersIdGet(id: number, _options?: PromiseConfigurationOptions): Promise<UserDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersIdGet(id, observableOptions);
        return result.toPromise();
    }

    /**
     */
    public apiUsersMeGetWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<UserDto>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersMeGetWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     */
    public apiUsersMeGet(_options?: PromiseConfigurationOptions): Promise<UserDto> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersMeGet(observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateUserDto]
     */
    public apiUsersMePutWithHttpInfo(updateUserDto?: UpdateUserDto, _options?: PromiseConfigurationOptions): Promise<HttpInfo<void>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersMePutWithHttpInfo(updateUserDto, observableOptions);
        return result.toPromise();
    }

    /**
     * @param [updateUserDto]
     */
    public apiUsersMePut(updateUserDto?: UpdateUserDto, _options?: PromiseConfigurationOptions): Promise<void> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.apiUsersMePut(updateUserDto, observableOptions);
        return result.toPromise();
    }


}



