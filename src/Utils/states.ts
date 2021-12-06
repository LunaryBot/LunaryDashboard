import generateId from './generateId';

export function createState({ url, id }: { url: string; id?:string|null; }) {
    if(!global.states || (typeof global.states == "object" && !Array.isArray(global.states))) global.states = {};

    if(!id) id = generateId();
    
    while(global.states[id]) {
        id = generateId();
    }
    
    global.states[id] = url;

    return id;
}