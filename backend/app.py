import os

from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS
from supabase import create_client, Client
app = Flask(__name__)
load_dotenv()
CORS(app)
TABLE = "friendly_giggle_resources"
supabase: Client = create_client(
  os.getenv("URL"),
  os.getenv("KEY")
)

@app.get("/")
def health():
  return {"status": "ok"}


@app.get("/api/resources")
def get_resources():
  res = supabase.table(TABLE).select("*").execute().data
  return res


@app.post("/api/resources")
def create_resource():
  req = request.get_json()
  res = supabase.table(TABLE).insert(req).execute()
  return res.data[0]


@app.patch("/api/resources/<int:resource_id>")
def update_resource(resource_id):
  req = request.get_json()
  res = supabase.table(TABLE).update(req).eq("id", resource_id).execute()
  return res.data[0]


if __name__ == "__main__":
  app.run()


