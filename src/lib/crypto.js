import {createHash} from "crypto"

export function hex(hash, s) {
    return createHash(hash).update(s).digest('hex').toLowerCase();
}