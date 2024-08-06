class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""//defining the parameter by which we wil pass data
        ){
        super(message);
        //user can send message what he wants
        this.statusCode=statusCode;
        this.errors=errors;
        this.data=null;
        this.success=false;
            if(stack){//stack will exactly tell that in which file error is occured
                this.stack=stack;
            }
            else{
                Error.captureStackTrace(this,this.constructor)
            }
}}

export { ApiError,};