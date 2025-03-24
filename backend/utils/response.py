from fastapi import HTTPException, status

class HTTPError:
  @staticmethod
  def not_found(message):
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=message)
  
  @staticmethod
  def bad_request(message):
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=message)
  
  @staticmethod
  def unauthorized(message):
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=message)
  
  @staticmethod
  def forbidden(message):
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=message)
  