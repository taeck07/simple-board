import { createAction, createReducer } from '@reduxjs/toolkit';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { CommentApi } from '../../api';
import { reducerUtils } from '../../util/async.utill';

export const getList = createAction('comments/getList');
export const getListPagingInfo = createAction('comments/getListPagingInfo');
export const setPaging = createAction('comments/setPagingLimits');
export const getDetail = createAction('comments/getDetail');
export const create = createAction('comments/create');
export const setDetail = createAction('comments/setDetail');
export const modify = createAction('comments/modify');
export const deleteCmm = createAction('comments/delete');
const pending = createAction('comments/pending');
const success = createAction('comments/success');
const error = createAction('comments/error');

function getPagingParams(info = {}) {
  return Object.fromEntries(Object.entries(info).map(([key, value]) => ['_' + key, value]));
}

const pagingInitState = { page: 1, limit: 5, sort: '', order: '', totalPage: 0 };

const initialState = {
  list: reducerUtils.initial([]),
  detail: reducerUtils.initial({}),
  paging: { ...pagingInitState },
};

export const commentReducer = createReducer(initialState, builder => {
  builder
    .addCase(pending, (state, action) => {
      return { ...state, [action.key]: action.payload };
    })
    .addCase(success, (state, action) => {
      return { ...state, [action.key]: action.payload };
    })
    .addCase(error, (state, action) => {
      return { ...state, [action.key]: action.payload };
    })
    .addCase(setDetail, (state, action) => {
      return { ...state, detail: action.payload || {} };
    })
    .addCase(setPaging, (state, action) => {
      return { ...state, paging: action.payload || {} };
    })
    .addDefaultCase((state, action) => {});
});

export function* commentsSagas() {
  yield takeLatest(getList, getListSaga);
  yield takeLatest(getDetail, getDetailSaga);
  yield takeLatest(create, createSaga);
  yield takeLatest(modify, modifySaga);
  yield takeLatest(deleteCmm, deleteSaga);
  yield takeLatest(getListPagingInfo, getListPagingSaga);
}

function* getListSaga(action) {
  const currPagingInfo = yield select(state => state.comments.paging);
  const pagingInfo = { ...currPagingInfo, ...action.payload };
  try {
    yield put({ type: pending.type, key: 'list', payload: reducerUtils.loading([]) });
    const commentList = yield call(CommentApi.getList, getPagingParams(pagingInfo));
    yield put({ type: success.type, key: 'list', payload: reducerUtils.success(commentList.data) });
  } catch (error) {
    yield put({ type: error.type, key: 'list', payload: reducerUtils.error([]) });
  }
  yield put({ type: getListPagingInfo.type, payload: pagingInfo });
}

function* getListPagingSaga(action) {
  try {
    const { page, limit } = action.payload;
    const info = yield call(CommentApi.getListPaging, { page, limit });
    yield put({ type: setPaging.type, payload: info.data });
  } catch (error) {
    yield put({ type: setPaging.type, payload: { ...initialState, totalPage: 0 } });
  }
}

function* getDetailSaga(action) {
  try {
    yield put({ type: pending.type, key: 'detail', payload: reducerUtils.loading({}) });
    const detail = yield call(CommentApi.getDetail, action.payload);
    yield put({ type: success.type, key: 'detail', payload: reducerUtils.success(detail.data) });
  } catch (error) {
    yield put({ type: error, key: 'detail', payload: reducerUtils.error({}) });
  }
}

function* createSaga(action) {
  try {
    yield put({ type: pending.type, key: 'detail', payload: reducerUtils.loading({}) });
    yield call(CommentApi.createComment, {
      ...action.payload,
      createdAt: new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0],
    });
    yield put({ type: success.type, key: 'detail', payload: reducerUtils.success({}) });
  } catch (error) {
    yield put({ type: error.type, key: 'detail', payload: reducerUtils.error({}) });
  }
  yield put({ type: getList.type, payload: { page: 1 } });
}

function* modifySaga(action) {
  try {
    yield put({ type: pending.type, key: 'detail', payload: reducerUtils.loading({}) });
    yield call(CommentApi.modifyComment, action.payload);
    yield put({ type: success.type, key: 'detail', payload: reducerUtils.success({}) });
  } catch (error) {
    yield put({ type: error.type, key: action.payload.key, payload: reducerUtils.error({}) });
  }
  yield put({ type: getList.type, payload: {} });
}

function* deleteSaga(action) {
  try {
    yield put({ type: pending.type, key: 'detail', payload: reducerUtils.loading([]) });
    yield call(CommentApi.deleteComment, action.payload);
    yield put({ type: success.type, key: 'detail', payload: reducerUtils.success({}) });
  } catch (error) {
    yield put({ type: error.type, key: action.payload.key, payload: reducerUtils.error() });
  }
  yield put({ type: getList.type, payload: { page: 1 } });
}

export default commentReducer;
