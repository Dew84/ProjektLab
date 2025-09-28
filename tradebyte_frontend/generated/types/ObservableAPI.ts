import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { AdsApiRequestFactory, AdsApiResponseProcessor} from "../apis/AdsApi";
export class ObservableAdsApi {
    private requestFactory: AdsApiRequestFactory;
    private responseProcessor: AdsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AdsApiRequestFactory,
        responseProcessor?: AdsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AdsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AdsApiResponseProcessor();
    }

    /**
     * @param [keyword]
     * @param [categoryId]
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsGetWithHttpInfo(keyword?: string, categoryId?: number, page?: number, pageSize?: number, _options?: ConfigurationOptions): Observable<HttpInfo<AdDtoPagedResult>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAdsGet(keyword, categoryId, page, pageSize, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAdsGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [keyword]
     * @param [categoryId]
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsGet(keyword?: string, categoryId?: number, page?: number, pageSize?: number, _options?: ConfigurationOptions): Observable<AdDtoPagedResult> {
        return this.apiAdsGetWithHttpInfo(keyword, categoryId, page, pageSize, _options).pipe(map((apiResponse: HttpInfo<AdDtoPagedResult>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public apiAdsIdDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAdsIdDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAdsIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public apiAdsIdDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.apiAdsIdDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public apiAdsIdGetWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<AdDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAdsIdGet(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAdsIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public apiAdsIdGet(id: number, _options?: ConfigurationOptions): Observable<AdDto> {
        return this.apiAdsIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<AdDto>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [updateAdDto]
     */
    public apiAdsIdPutWithHttpInfo(id: number, updateAdDto?: UpdateAdDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAdsIdPut(id, updateAdDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAdsIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [updateAdDto]
     */
    public apiAdsIdPut(id: number, updateAdDto?: UpdateAdDto, _options?: ConfigurationOptions): Observable<void> {
        return this.apiAdsIdPutWithHttpInfo(id, updateAdDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsMineGetWithHttpInfo(page?: number, pageSize?: number, _options?: ConfigurationOptions): Observable<HttpInfo<AdDtoPagedResult>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAdsMineGet(page, pageSize, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAdsMineGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [page]
     * @param [pageSize]
     */
    public apiAdsMineGet(page?: number, pageSize?: number, _options?: ConfigurationOptions): Observable<AdDtoPagedResult> {
        return this.apiAdsMineGetWithHttpInfo(page, pageSize, _options).pipe(map((apiResponse: HttpInfo<AdDtoPagedResult>) => apiResponse.data));
    }

    /**
     * @param [createAdDto]
     */
    public apiAdsPostWithHttpInfo(createAdDto?: CreateAdDto, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAdsPost(createAdDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAdsPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createAdDto]
     */
    public apiAdsPost(createAdDto?: CreateAdDto, _options?: ConfigurationOptions): Observable<any> {
        return this.apiAdsPostWithHttpInfo(createAdDto, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

}

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * @param [loginDto]
     */
    public apiAuthLoginPostWithHttpInfo(loginDto?: LoginDto, _options?: ConfigurationOptions): Observable<HttpInfo<AuthResultDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAuthLoginPost(loginDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAuthLoginPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [loginDto]
     */
    public apiAuthLoginPost(loginDto?: LoginDto, _options?: ConfigurationOptions): Observable<AuthResultDto> {
        return this.apiAuthLoginPostWithHttpInfo(loginDto, _options).pipe(map((apiResponse: HttpInfo<AuthResultDto>) => apiResponse.data));
    }

    /**
     * @param [registerDto]
     */
    public apiAuthRegisterPostWithHttpInfo(registerDto?: RegisterDto, _options?: ConfigurationOptions): Observable<HttpInfo<AuthResultDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiAuthRegisterPost(registerDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiAuthRegisterPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [registerDto]
     */
    public apiAuthRegisterPost(registerDto?: RegisterDto, _options?: ConfigurationOptions): Observable<AuthResultDto> {
        return this.apiAuthRegisterPostWithHttpInfo(registerDto, _options).pipe(map((apiResponse: HttpInfo<AuthResultDto>) => apiResponse.data));
    }

}

import { CategoriesApiRequestFactory, CategoriesApiResponseProcessor} from "../apis/CategoriesApi";
export class ObservableCategoriesApi {
    private requestFactory: CategoriesApiRequestFactory;
    private responseProcessor: CategoriesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CategoriesApiRequestFactory,
        responseProcessor?: CategoriesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CategoriesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CategoriesApiResponseProcessor();
    }

    /**
     */
    public apiCategoriesGetWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<CategoryDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiCategoriesGet(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiCategoriesGetWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public apiCategoriesGet(_options?: ConfigurationOptions): Observable<Array<CategoryDto>> {
        return this.apiCategoriesGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<CategoryDto>>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public apiCategoriesIdDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiCategoriesIdDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiCategoriesIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public apiCategoriesIdDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.apiCategoriesIdDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     * @param [updateCategoryDto]
     */
    public apiCategoriesIdPutWithHttpInfo(id: number, updateCategoryDto?: UpdateCategoryDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiCategoriesIdPut(id, updateCategoryDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiCategoriesIdPutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     * @param [updateCategoryDto]
     */
    public apiCategoriesIdPut(id: number, updateCategoryDto?: UpdateCategoryDto, _options?: ConfigurationOptions): Observable<void> {
        return this.apiCategoriesIdPutWithHttpInfo(id, updateCategoryDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param [createCategoryDto]
     */
    public apiCategoriesPostWithHttpInfo(createCategoryDto?: CreateCategoryDto, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiCategoriesPost(createCategoryDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiCategoriesPostWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [createCategoryDto]
     */
    public apiCategoriesPost(createCategoryDto?: CreateCategoryDto, _options?: ConfigurationOptions): Observable<any> {
        return this.apiCategoriesPostWithHttpInfo(createCategoryDto, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

}

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class ObservableUsersApi {
    private requestFactory: UsersApiRequestFactory;
    private responseProcessor: UsersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UsersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UsersApiResponseProcessor();
    }

    /**
     */
    public apiUsersGetWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<UserDto>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiUsersGet(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiUsersGetWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public apiUsersGet(_options?: ConfigurationOptions): Observable<Array<UserDto>> {
        return this.apiUsersGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<UserDto>>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public apiUsersIdDeleteWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiUsersIdDelete(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiUsersIdDeleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public apiUsersIdDelete(id: number, _options?: ConfigurationOptions): Observable<void> {
        return this.apiUsersIdDeleteWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * @param id
     */
    public apiUsersIdGetWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<UserDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiUsersIdGet(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiUsersIdGetWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param id
     */
    public apiUsersIdGet(id: number, _options?: ConfigurationOptions): Observable<UserDto> {
        return this.apiUsersIdGetWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<UserDto>) => apiResponse.data));
    }

    /**
     */
    public apiUsersMeGetWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<UserDto>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiUsersMeGet(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiUsersMeGetWithHttpInfo(rsp)));
            }));
    }

    /**
     */
    public apiUsersMeGet(_options?: ConfigurationOptions): Observable<UserDto> {
        return this.apiUsersMeGetWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<UserDto>) => apiResponse.data));
    }

    /**
     * @param [updateUserDto]
     */
    public apiUsersMePutWithHttpInfo(updateUserDto?: UpdateUserDto, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.apiUsersMePut(updateUserDto, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.apiUsersMePutWithHttpInfo(rsp)));
            }));
    }

    /**
     * @param [updateUserDto]
     */
    public apiUsersMePut(updateUserDto?: UpdateUserDto, _options?: ConfigurationOptions): Observable<void> {
        return this.apiUsersMePutWithHttpInfo(updateUserDto, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}
