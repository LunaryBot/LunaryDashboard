import firebase from 'firebase'
import 'firebase/database';
import data from '../../firebase.config.json';

const initializerFirebase = firebase.initializeApp as any

export default function initializerFirebases() {
    if(!global.GuildsDB) {
        const GuildsDB = initializerFirebase(
            data.GuildsDB,
            'Guilds'
        );

        global.GuildsDB = GuildsDB.database();
    }
}