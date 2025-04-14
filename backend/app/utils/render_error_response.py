from fastapi.responses import JSONResponse

def render_error_response(status_code: int = 500, message: str = "Something went wrong!"):
    return JSONResponse(
        status_code=status_code,
        content={
            "data": {
                "statusCode": status_code,
                "success": False,
                "message": message
            }
        }
    )
