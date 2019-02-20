import {put,takeEvery,call} from 'redux-saga/effects';
import {postLogin} from '../api/login'
import * as LoginActions from '../constants/login-types'
import {loginSuccess,loginFailed} from '../actions/login-actions'
import { passwordValid } from '../actions/validation-actions';
export function* sendLogin(action){
    try{
        const resp = yield call(postLogin, action.credentials)
        const data = yield call([resp,'json']);
        if (data.validSignIn)
            yield put(loginSuccess(data));
        else yield put(loginFailed(data))
    }
    catch (err){
        console.error(err)
        yield put(loginFailed(err))
    }
}



export default function* rootSaga(){
    yield takeEvery(LoginActions.LOGIN_SUBMITTED, sendLogin)
}