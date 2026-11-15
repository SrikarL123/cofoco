// Customer-created DEMO orders live in this browser only (localStorage). Not a real order system.
export type Order={id:string;created:string;status:string;customer:{name:string,email:string,phone:string};address:string;items:{slug:string,name:string,qty:number,price:number}[];total:number}
const KEY='cofoco-orders'
export function readOrders():Order[]{try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
export function saveOrder(o:Order){localStorage.setItem(KEY,JSON.stringify([o,...readOrders()]))}
export const newOrderId=()=>'CF'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).slice(2,5).toUpperCase()
