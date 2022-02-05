import generateId from './generateId';

export function createState({ url, id = generateId() }: { url: string; id?: string; }) {
    if(!global.states || (typeof global.states == "object" && !Array.isArray(global.states))) global.states = {};

    if(!id) id = generateId();
    
    while(global.states[id]) {
        id = generateId();
    };
    
    global.states[id] = url;

    return id;
}

export function deleteState(id: string): boolean {
    return !!((!id || !global.states?.[id]) ? false : delete global.states[id]);
};

export function getState(id: string): string|undefined {
    return global.states?.[id];
};