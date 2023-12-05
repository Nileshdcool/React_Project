import 'isomorphic-fetch';

import { camelizeKeys } from 'humps';
import { assign } from 'lodash';
import { normalize } from 'normalizr';

import { BASE_URL } from './constants';

const getHeaders = (token, isFormData) => {
  const reqHeaders = isFormData ? {
    Accept: '*/*',
    // cache: 'no-cache',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
    // crossDomain: true,
  }
    : {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
      // crossDomain: true,
    };

  return token ? ({
    ...reqHeaders,
    'Authorization-Operator': token,
  }) : reqHeaders;
};

const getBody = body => JSON.stringify(body);

const getFetchAction = (baseUrl, endpoint, method, body, token) => {
  console.log('process', process.env);
  const isFormDataType = body instanceof FormData;
  const reqHeaders = getHeaders(token);

  if ((method === 'POST' || method === 'PUT') && !isFormDataType) {
    return fetch(`${baseUrl}${endpoint}`, {
      method,
      body: getBody(body),
      credentials: 'include',
      mode: 'cors',
      headers: reqHeaders
    });
  }

  const reqHeadersForFormData = getHeaders(token, isFormDataType);

  if ((method === 'POST' || method === 'PUT') && isFormDataType) {
    return fetch(`${baseUrl}${endpoint}`, {
      method,
      mode: 'cors',
      body,
      credentials: 'include',
      headers: reqHeadersForFormData
    });
  }

  return fetch(`${baseUrl}${endpoint}`, {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: reqHeaders
  });
};

function getNormalizedResponse(json, schema) {
  const normalizedResponse = normalize(json.results, schema);
  const totalObj = {
    total: json.total,
  };

  assign(normalizedResponse, totalObj);
  return { ...normalizedResponse };
}

export const callApi = (isApiUrl, endpoint, method, body, schema, token, isFormData) =>
  Promise.race([
    getFetchAction(BASE_URL, endpoint, method, body, token, isFormData),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('request timeout')), 300000);
    }),
  ])
    .then((response) => {
      if (response.status === 204) {
        return ({ json: null, response });
      }
      return response.json().then((json) => ({ json, response }));
    })
    .then(({ json, response }) => {
      if (!response.ok || (typeof json === 'boolean' && !json)) {
        json.code = response.status;
        return Promise.reject(json);
      }
      if (schema) {
        return { json: getNormalizedResponse(json, schema), status: response.status };
      }
      return { json, status: response.status };
    });

export const CALL_API = Symbol('Call API');

function actionWith(action, data) {
  const finalAction = { ...action, ...data };

  delete finalAction[CALL_API];

  return finalAction;
}

export default store => next => action => {
  const responsesArray = [200, 202, 204];
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const {
    types, body, method, schema, apiUrl, images, port, isTrustpilot,
  } = callAPI;
  const state = store.getState();
  // TODO use for token role param from localstore
  const authOperatorToken = localStorage.getItem('OPERATOR_AUTH_TOKEN');
  const token = authOperatorToken;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(state);
  }

  if (!method) {
    throw new Error('method is not exist');
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  next(actionWith(action, { type: requestType }));

  return callApi(apiUrl, endpoint, method, body, schema, token, images, port, isTrustpilot).then(
    response => {
      const camelizedResult = camelizeKeys(response.json);

      next(
        actionWith(
          action,
          {
            type: responsesArray.includes(response.status) ? successType : failureType,
            payload: camelizedResult,
          },
        ),
      );
      return { data: camelizedResult };
    },
    error => {
      next(
        actionWith(action, {
          type: failureType,
          code: error.code,
          description: error.message || 'Something bad happened',
        }),
      );
    },
  );
};
