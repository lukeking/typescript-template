/**
 * @pattern ^[0-9a-f]{32}$
 * @example "529077457672470ea803a2f8feb52944"
 */
export type ShortId = string;

/**
* @pattern [a-z0-9\._%+!$&*=^|~#%{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,22})
* @example "abc@gmail.com"
*/
export type Email = string;

/**
 * @maxLength 3
 */
export type NoteList = ShortId[];
