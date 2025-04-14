from fastapi.responses import JSONResponse

def render_success_response(data: dict = {}, status_code: int = 200, message: str = "Record fetched successfully!"):
    return JSONResponse(
        status_code=status_code,
        content={
            "data": {
                "result": data,
                "statusCode": status_code,
                "success": True,
                "message": message,
            }
        }
    )
