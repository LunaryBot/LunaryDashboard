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
    
    if(!firebase.apps.find((app: firebase.app.App) => app.name == 'Guilds')) {
        const GuildsDB = initializerFirebase(
            data.GuildsDB,
            'Guilds'
        );

        dbs.guilds = GuildsDB.database();
    } else dbs.guilds = firebase.apps.find((app: firebase.app.App) => app.name == 'Guilds').database()
    
    if(!firebase.apps.find((app: firebase.app.App) => app.name == 'Logs')) {
        const LogsDB = initializerFirebase(
            data.LogsDB,
            'Logs'
        );

        dbs.logs = LogsDB.database();
    } else dbs.logs = firebase.apps.find((app: firebase.app.App) => app.name == 'Logs').database()

    return dbs;
}