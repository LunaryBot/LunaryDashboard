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

    if(!firebase.apps.find(app => app.name !== 'Guilds')) {
        const GuildsDB = initializerFirebase(
            data.GuildsDB,
            'Guilds'
        );

        dbs.guilds = GuildsDB.database();
    }

    return dbs;
}