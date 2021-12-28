import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import SwaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';

import { RegisterRoutes } from '../dist/routes';

const app = express();

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    next();
});

app.listen(3000, () => console.log('listening on port 3000'));
