import * as express from "express";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    // scopes?: string[]
): Promise<unknown> {
    if (securityName === "api_key") {
        const token = request.headers['authorization'];

        if (token === "22222") {
            return Promise.resolve({
                id: '234567890',
                name: "Ironman",
            });
        } else {
            return Promise.reject(new Error('Authentication failed'));
        }
    }

    return Promise.reject(new Error('Authentication failed'));

    // if (securityName === "jwt") {
    //     const token =
    //         request.body.token ||
    //         request.query.token ||
    //         request.headers["x-access-token"];

    //     return new Promise((resolve, reject) => {
    //         if (!token) {
    //             reject(new Error("No token provided"));
    //         }
    //         jwt.verify(token, "[secret]", function (err: any, decoded: any) {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 // Check if JWT contains all required scopes
    //                 for (let scope of scopes) {
    //                     if (!decoded.scopes.includes(scope)) {
    //                         reject(new Error("JWT does not contain required scope."));
    //                     }
    //                 }
    //                 resolve(decoded);
    //             }
    //         });
    //     });
    // }
}
