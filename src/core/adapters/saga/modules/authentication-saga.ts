import { takeLatest } from "redux-saga/effects";
import { makeApiURL } from "core/infra/http/api-url-factory";
import { ApiClient } from "core/infra";
import { createSagaRequest } from "../handlers/request";

import { AuthenticationController } from "core/controllers/requests/authentication-controller";
import { AuthenticationParams } from "core/entities/authentication";

import {
  onAuth,
  onAuthError,
  onAuthLoad,
  onAuthSuccess,
} from "core/adapters/redux";

const client = new ApiClient();

export const rootAuthenticationSaga = [
  takeLatest(
    onAuth.type,
    createSagaRequest<AuthenticationParams>({
      request: async (params) =>
        await new AuthenticationController(
          makeApiURL("/admin/auth/login"),
          client
        ).auth(params),
      onError: onAuthError,
      onLoad: onAuthLoad,
      onSuccess: onAuthSuccess,
    })
  ),
];
