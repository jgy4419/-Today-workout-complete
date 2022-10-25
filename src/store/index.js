import {createStore} from 'vuex';
import {All} from './all';
import {Search} from './search';
import {Community} from './community';
import {User} from './user';
import { Order } from './order';
import { postSide } from './postSide';
import { Chart } from './Chart';


export default createStore({
    // 다른 파일에 있는 VueX 파일 데이터들을 한 번에 모아줌.
    modules: {Search, Community, All, User, Order, postSide, Chart}
})