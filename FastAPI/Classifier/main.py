# from fastapi import FastAPI
import pickle
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

vectorizer = pickle.load(open('vector_large.pickel', "rb"))
classifier = pickle.load(open('clf_large.pkl', "rb"))

@app.get('/')
def homePage():
	return "Welcome to Naive Bayes Classifier's Homepage"

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in production to specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SentenceRequest(BaseModel):
    sentence: str


# all the requests at /process routes are served below
@app.post("/process")
async def process_sentence(request: SentenceRequest):
	transformed_text = vectorizer.transform([request.sentence])
	label = classifier.predict(transformed_text)
	if(label == 0):
		return {"message": "Income"}
	else:
		return {"message": "Expense"}
