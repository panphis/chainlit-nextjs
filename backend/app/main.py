from fastapi import FastAPI, Request
from chainlit.utils import mount_chainlit

from chainlit.user import User
from chainlit.utils import mount_chainlit
from chainlit.server import _authenticate_user

app = FastAPI()


@app.get("/app")
def read_main():
    return {"message": "Hello World from main app"}



@app.get("/custom-auth")
async def custom_auth(request: Request):
    # Verify the user's identity with custom logic.
    user = User(identifier="Test User")

    return await _authenticate_user(request, user)


mount_chainlit(app=app, target="app/chain_lit.py", path="/chainlit")