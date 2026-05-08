from fastapi import FastAPI

app = FastAPI(title="odyssey-ml-serving")


@app.get("/health")
def health():
    return {"status": "ok"}

