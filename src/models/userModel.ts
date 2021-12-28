import { v4 as uuid } from 'uuid';
import { Email, NoteList, ShortId } from '../constants';
import Utils from '../utils';

/**
 * User objects allow you to associate actions performed
 * in the system with the user that performed them.
 * The User object contains common information across
 * every user in the system regardless of status and role.
 */
export interface User {
    id: ShortId;
    email: Email;
    name: string;
    notes?: NoteList;
};

export type UserCreationParameters = Pick<User, 'email' | 'name' | 'notes'>;

class UserModel {
    public getUser(id: ShortId, email: Email): User {
        return {
            id,
            email,
            name: 'John'
        };
    }

    public createUser(params: UserCreationParameters): User {
        return {
            id: Utils.shortId(),
            ...params,
        };
    }
};

export default new UserModel();
