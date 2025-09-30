import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

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

import { ObservableAdsApi } from "./ObservableAPI";
import { AdsApiRequestFactory, AdsApiResponseProcessor} from "../apis/AdsApi";

export interface AdsApiApiAdsGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AdsApiapiAdsGet
     */
    keyword?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AdsApiapiAdsGet
     */
    categoryId?: number
    /**
     * 
     * Defaults to: 1
     * @type number
     * @memberof AdsApiapiAdsGet
     */
    page?: number
    /**
     * 
     * Defaults to: 20
     * @type number
     * @memberof AdsApiapiAdsGet
     */
    pageSize?: number
}

export interface AdsApiApiAdsIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AdsApiapiAdsIdDelete
     */
    id: number
}

export interface AdsApiApiAdsIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AdsApiapiAdsIdGet
     */
    id: number
}

export interface AdsApiApiAdsIdPutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AdsApiapiAdsIdPut
     */
    id: number
    /**
     * 
     * @type UpdateAdDto
     * @memberof AdsApiapiAdsIdPut
     */
    updateAdDto?: UpdateAdDto
}

export interface AdsApiApiAdsMineGetRequest {
    /**
     * 
     * Defaults to: 1
     * @type number
     * @memberof AdsApiapiAdsMineGet
     */
    page?: number
    /**
     * 
     * Defaults to: 20
     * @type number
     * @memberof AdsApiapiAdsMineGet
     */
    pageSize?: number
}

export interface AdsApiApiAdsPostRequest {
    /**
     * 
     * @type CreateAdDto
     * @memberof AdsApiapiAdsPost
     */
    createAdDto?: CreateAdDto
}

export class ObjectAdsApi {
    private api: ObservableAdsApi

    public constructor(configuration: Configuration, requestFactory?: AdsApiRequestFactory, responseProcessor?: AdsApiResponseProcessor) {
        this.api = new ObservableAdsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public apiAdsGetWithHttpInfo(param: AdsApiApiAdsGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<AdDtoPagedResult>> {
        return this.api.apiAdsGetWithHttpInfo(param.keyword, param.categoryId, param.page, param.pageSize,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsGet(param: AdsApiApiAdsGetRequest = {}, options?: ConfigurationOptions): Promise<AdDtoPagedResult> {
        return this.api.apiAdsGet(param.keyword, param.categoryId, param.page, param.pageSize,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsIdDeleteWithHttpInfo(param: AdsApiApiAdsIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.apiAdsIdDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsIdDelete(param: AdsApiApiAdsIdDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.apiAdsIdDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsIdGetWithHttpInfo(param: AdsApiApiAdsIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<AdDto>> {
        return this.api.apiAdsIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsIdGet(param: AdsApiApiAdsIdGetRequest, options?: ConfigurationOptions): Promise<AdDto> {
        return this.api.apiAdsIdGet(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsIdPutWithHttpInfo(param: AdsApiApiAdsIdPutRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.apiAdsIdPutWithHttpInfo(param.id, param.updateAdDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsIdPut(param: AdsApiApiAdsIdPutRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.apiAdsIdPut(param.id, param.updateAdDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsMineGetWithHttpInfo(param: AdsApiApiAdsMineGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<AdDtoPagedResult>> {
        return this.api.apiAdsMineGetWithHttpInfo(param.page, param.pageSize,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsMineGet(param: AdsApiApiAdsMineGetRequest = {}, options?: ConfigurationOptions): Promise<AdDtoPagedResult> {
        return this.api.apiAdsMineGet(param.page, param.pageSize,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsPostWithHttpInfo(param: AdsApiApiAdsPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.apiAdsPostWithHttpInfo(param.createAdDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAdsPost(param: AdsApiApiAdsPostRequest = {}, options?: ConfigurationOptions): Promise<any> {
        return this.api.apiAdsPost(param.createAdDto,  options).toPromise();
    }

}

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiApiAuthLoginPostRequest {
    /**
     * 
     * @type LoginDto
     * @memberof AuthApiapiAuthLoginPost
     */
    loginDto?: LoginDto
}

export interface AuthApiApiAuthRegisterPostRequest {
    /**
     * 
     * @type RegisterDto
     * @memberof AuthApiapiAuthRegisterPost
     */
    registerDto?: RegisterDto
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public apiAuthLoginPostWithHttpInfo(param: AuthApiApiAuthLoginPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<AuthResultDto>> {
        return this.api.apiAuthLoginPostWithHttpInfo(param.loginDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAuthLoginPost(param: AuthApiApiAuthLoginPostRequest = {}, options?: ConfigurationOptions): Promise<AuthResultDto> {
        return this.api.apiAuthLoginPost(param.loginDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAuthRegisterPostWithHttpInfo(param: AuthApiApiAuthRegisterPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<AuthResultDto>> {
        return this.api.apiAuthRegisterPostWithHttpInfo(param.registerDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiAuthRegisterPost(param: AuthApiApiAuthRegisterPostRequest = {}, options?: ConfigurationOptions): Promise<AuthResultDto> {
        return this.api.apiAuthRegisterPost(param.registerDto,  options).toPromise();
    }

}

import { ObservableCategoriesApi } from "./ObservableAPI";
import { CategoriesApiRequestFactory, CategoriesApiResponseProcessor} from "../apis/CategoriesApi";

export interface CategoriesApiApiCategoriesGetRequest {
}

export interface CategoriesApiApiCategoriesIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CategoriesApiapiCategoriesIdDelete
     */
    id: number
}

export interface CategoriesApiApiCategoriesIdPutRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof CategoriesApiapiCategoriesIdPut
     */
    id: number
    /**
     * 
     * @type UpdateCategoryDto
     * @memberof CategoriesApiapiCategoriesIdPut
     */
    updateCategoryDto?: UpdateCategoryDto
}

export interface CategoriesApiApiCategoriesPostRequest {
    /**
     * 
     * @type CreateCategoryDto
     * @memberof CategoriesApiapiCategoriesPost
     */
    createCategoryDto?: CreateCategoryDto
}

export class ObjectCategoriesApi {
    private api: ObservableCategoriesApi

    public constructor(configuration: Configuration, requestFactory?: CategoriesApiRequestFactory, responseProcessor?: CategoriesApiResponseProcessor) {
        this.api = new ObservableCategoriesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public apiCategoriesGetWithHttpInfo(param: CategoriesApiApiCategoriesGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<CategoryDto>>> {
        return this.api.apiCategoriesGetWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesGet(param: CategoriesApiApiCategoriesGetRequest = {}, options?: ConfigurationOptions): Promise<Array<CategoryDto>> {
        return this.api.apiCategoriesGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesIdDeleteWithHttpInfo(param: CategoriesApiApiCategoriesIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.apiCategoriesIdDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesIdDelete(param: CategoriesApiApiCategoriesIdDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.apiCategoriesIdDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesIdPutWithHttpInfo(param: CategoriesApiApiCategoriesIdPutRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.apiCategoriesIdPutWithHttpInfo(param.id, param.updateCategoryDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesIdPut(param: CategoriesApiApiCategoriesIdPutRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.apiCategoriesIdPut(param.id, param.updateCategoryDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesPostWithHttpInfo(param: CategoriesApiApiCategoriesPostRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.apiCategoriesPostWithHttpInfo(param.createCategoryDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiCategoriesPost(param: CategoriesApiApiCategoriesPostRequest = {}, options?: ConfigurationOptions): Promise<any> {
        return this.api.apiCategoriesPost(param.createCategoryDto,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiApiUsersGetRequest {
}

export interface UsersApiApiUsersIdDeleteRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiapiUsersIdDelete
     */
    id: number
}

export interface UsersApiApiUsersIdGetRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiapiUsersIdGet
     */
    id: number
}

export interface UsersApiApiUsersMeGetRequest {
}

export interface UsersApiApiUsersMePutRequest {
    /**
     * 
     * @type UpdateUserDto
     * @memberof UsersApiapiUsersMePut
     */
    updateUserDto?: UpdateUserDto
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public apiUsersGetWithHttpInfo(param: UsersApiApiUsersGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<UserDto>>> {
        return this.api.apiUsersGetWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersGet(param: UsersApiApiUsersGetRequest = {}, options?: ConfigurationOptions): Promise<Array<UserDto>> {
        return this.api.apiUsersGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersIdDeleteWithHttpInfo(param: UsersApiApiUsersIdDeleteRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.apiUsersIdDeleteWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersIdDelete(param: UsersApiApiUsersIdDeleteRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.apiUsersIdDelete(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersIdGetWithHttpInfo(param: UsersApiApiUsersIdGetRequest, options?: ConfigurationOptions): Promise<HttpInfo<UserDto>> {
        return this.api.apiUsersIdGetWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersIdGet(param: UsersApiApiUsersIdGetRequest, options?: ConfigurationOptions): Promise<UserDto> {
        return this.api.apiUsersIdGet(param.id,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersMeGetWithHttpInfo(param: UsersApiApiUsersMeGetRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<UserDto>> {
        return this.api.apiUsersMeGetWithHttpInfo( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersMeGet(param: UsersApiApiUsersMeGetRequest = {}, options?: ConfigurationOptions): Promise<UserDto> {
        return this.api.apiUsersMeGet( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersMePutWithHttpInfo(param: UsersApiApiUsersMePutRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.apiUsersMePutWithHttpInfo(param.updateUserDto,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public apiUsersMePut(param: UsersApiApiUsersMePutRequest = {}, options?: ConfigurationOptions): Promise<void> {
        return this.api.apiUsersMePut(param.updateUserDto,  options).toPromise();
    }

}
