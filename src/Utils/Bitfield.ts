class Bitfield {
    bitfield: number;
    constructor(bits: number) {
        this.bitfield = bits;
    }

    has(bit: number) {
        return (this.bitfield & bit) !== 0;
    }

    set(bit: number) {
        if (!this.has(bit)) {
            this.bitfield |= (bit);
        } else {
            this.bitfield &= ~(bit);
        }

        return this
    }
}

export default Bitfield;