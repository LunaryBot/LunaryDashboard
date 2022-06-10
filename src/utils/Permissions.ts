import BitField, { TBit } from './BitField';
import * as Constants from './Constants';

type TPermissions = keyof typeof Constants.Permissions;

type TPermissionsBit = bigint | TPermissions | Permissions | Array<TPermissions |bigint | Permissions>;

class Permissions extends BitField {
    // @ts-ignore
    public declare add: (bit: TPermissionsBit) => Permissions;
    // @ts-ignore
    public declare has: (bit: TPermissionsBit) => boolean;
    // @ts-ignore
    public declare missing: (bit: TPermissionsBit) => TPermissions[];
    // @ts-ignore
    public declare remove: (bit: TPermissionsBit) => Permissions;
    // @ts-ignore
    public declare serialize: () => { [key in TPermissions]: boolean };
    public declare toArray: () => TPermissions[];

    constructor(bits: TPermissionsBit) {
        super(bits as TBit, {
            FLAGS: Constants.Permissions,
            defaultBit: 0n,
        });
    }

    static get FLAGS() {
		return Constants.Permissions as { [key in TPermissions]: bigint };
	}
}

export default Permissions;