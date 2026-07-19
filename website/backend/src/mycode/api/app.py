"""Define the FastAPI application and template endpoints."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from mycode import constants, models


app = FastAPI(title=constants.API_TITLE, version=constants.API_VERSION)

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=constants.LOCAL_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Template API is running"}


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.get("/items", response_model=models.MockResponse)
async def get_items():
    """Get mock items data"""
    return models.MockResponse(count=3)
