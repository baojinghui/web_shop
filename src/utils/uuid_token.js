import { v4 as uuidv4 } from 'uuid';
//要生成一个随机的字符串，且每次执行不能发生变化,游客身份持久储存
export const gteUuid=()=>{
    //从本地存储中拿到uuid,看本地存储中是否存在
    let uuid_koken=localStorage.getItem('UUIDTOKEN')
    //判断本地存储中是否存在uuid,如果不存在就生成一个新的uuid
    if(!uuid_koken){//单例
       let uuid_koken= uuidv4 ();
       localStorage.setItem('UUIDTOKEN',uuid_koken)
    }
    return uuid_koken
}