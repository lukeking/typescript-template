// import { Request as ExRequest } from 'express';
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Query,
    Route,
    Security,
    SuccessResponse,
    Tags,
    // Request,
} from "tsoa";
import { Email, ShortId } from '../constants';
import UserModel, { User, UserCreationParameters } from '../models/userModel';

@Route("users")
@Tags("Users")
export class UserController extends Controller {
    // @Response<ValidateErrorJSON>('default', "Unexpected Error")
    @Security('api_key')
    @Get("{userId}")
    public async getUser(
        userId: ShortId,
        // @Request() request: ExRequest,
        @Query() email?: Email,
    ): Promise<User> {
        // const query = request.query as UserCreationParameters;
        return UserModel.getUser(userId, email);
    }

    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParameters
    ): Promise<User> {
        this.setStatus(201); // set return status 201
        return UserModel.createUser(requestBody);
    }

    @Put("{userId}")
    public async updateUser(
        @Path() userId: ShortId,
        @Body() requestBody: UserCreationParameters,
    ): Promise<User> {
        return {
            ...UserModel.createUser(requestBody),
            id: userId,
        };
    }

    @Get('{userId}/notes/{noteId}')
    public async getUserNote(
        userId: ShortId,
        noteId: ShortId,
        // @Request() request: ExRequest,
    ): Promise<User> {
        return UserModel.getUser(userId, noteId);
    }
}
