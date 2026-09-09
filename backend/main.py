from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
from dotenv import load_dotenv
from supabase import create_client, Client
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# Mobil/web uygulamanın buraya istek atabilmesi için CORS izni
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Harcama(BaseModel):
    tutar: float
    kategori: str
    tarih: date
    aciklama: str | None = None


@app.get("/")
def anasayfa():
    return {"mesaj": "SpendWise API çalışıyor"}


@app.get("/expenses")
def harcamalari_listele():
    response = supabase.table("expenses").select("*").order("tarih", desc=True).execute()
    return response.data


@app.post("/expenses")
def harcama_ekle(harcama: Harcama):
    response = supabase.table("expenses").insert({
        "tutar": harcama.tutar,
        "kategori": harcama.kategori,
        "tarih": harcama.tarih.isoformat(),
        "aciklama": harcama.aciklama,
    }).execute()
    return response.data


@app.delete("/expenses/{expense_id}")
def harcama_sil(expense_id: int):
    response = supabase.table("expenses").delete().eq("id", expense_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Harcama bulunamadı")
    return {"mesaj": "Harcama silindi"}