import {BASE_URL} from '../constants/urls'
import {postData} from './index'
export function postLogin(data){
    return postData(BASE_URL, {username:'nate',password:'hamm'})
    
}
