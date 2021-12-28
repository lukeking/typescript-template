import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SwaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import morgan from 'morgan';

import { RegisterRoutes } from '../../dist/routes';
import { IncomingMessage } from 'http';

const app = express();

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token('userId', (req) => {
    interface ExtendedRequest extends IncomingMessage {
        user: {
            id: string;
        };
    }
    const { user } = req as ExtendedRequest;
    return user?.id;
});
app.use(morgan('[:userId] :date[iso] [:method]:url :status :res[content-length] :response-time ms', { stream: { write: (str) => console.log(str) } }));

app.use('/docs', SwaggerUi.serve, SwaggerUi.setup(undefined, {
    swaggerOptions: {
        url: '/swagger.json',
    },
}));

// app.use(Router);
// app.use(UserRouter);
RegisterRoutes(app);

app.use((err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void => {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    return next();
});

export default app;
