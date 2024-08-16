import { ZodError } from "zod";
import { IErrorSources, IGenericErrorResponse } from "../interfaces/error";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
    const errorSources: IErrorSources = error.errors.map((err) => {
        return {
            path: err.path.join('.'),
            message: err.message,
        };
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleZodError;
