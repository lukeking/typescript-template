import express from 'express';
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
    Response,
    Tags,
    Request,
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
        @Request() request: any,
        @Query() email?: Email,
    ): Promise<User> {
        console.log('arguments', arguments.length);
        const query = request.query;
        console.log('request', request.query, request.user);
        console.log('email', email);
        return UserModel.getUser(userId, query.email);
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
        @Request() request: any,
    ): Promise<User>{
        console.log(userId, noteId);
        console.log('request', request.params);
        return UserModel.getUser(userId, noteId);
    }
};
