import { Response } from "express";

class ResponseHandler{
    static success(
        res:Response,
        data:any,
        message= "Operation Successful",
        statusCode = 200
    ):void{
        res.status(statusCode).json({
            status: "success",
            message,
            data,
        })
    }

    static created(
        res:Response,
        data:any,
        message = " Operation successful",
        statusCode = 201
    ): void{
        res.status(statusCode).json({
            staus: "success",
            message,
            data
        })
    }

    static error(
        res:Response,
        data:any,
        message = "Operation failed",
        statusCode = 500
    ): void {
        res.status(statusCode).json({
            status: "error",
            message,
            data
        })
    }
    static validationError (
        res: Response,
        data: any,
        message = "Validation error",
        statusCode = 400
    ) : void{
        res.status(statusCode).json({
            status: "fail",
            message,
            data
        })
    }

    static notFound(
        res: Response,
        data: any,
        message = "Resource not found",
        statusCode = 404
    ) : void{
        res.status(statusCode).json({
            status: "error",
            message,
            data
        })
    }

}

export default ResponseHandler; 