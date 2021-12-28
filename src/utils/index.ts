import { v4 as uuid } from 'uuid';
import { ShortId } from '../constants';

export default class Utils {
    static shortId(): ShortId {
        return uuid().split('-').join('');
    }
}
