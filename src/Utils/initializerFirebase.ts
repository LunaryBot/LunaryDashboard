import firebase from 'firebase'
import 'firebase/database';
import data from '../../firebase.config.json';

const initializerFirebase = firebase.initializeApp as any

interface _dbs {
    guilds?: firebase.database.Database,
    users?: firebase.database.Database,
    logs?: firebase.database.Database,
}

export default function initializerFirebases() {
    const dbs: _dbs = {}
    
    console.log(firebase.apps.some(app => app.name == 'Guilds'))
    if(!firebase.apps.find((app: firebase.app.App) => app.name == 'Guilds')) {
        console.log("a")

        const GuildsDB = initializerFirebase(
            data.GuildsDB,
            'Guilds'
        );

        dbs.guilds = GuildsDB.database();
    } else dbs.guilds = firebase.apps.find((app: firebase.app.App) => app.name == 'Guilds').database()

    return dbs;
}