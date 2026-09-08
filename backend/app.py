"""Rise Backend · esqueleto preparado (sin dependencias externas).
Futuro: FastAPI + auth + tokens + validación server-side + proveedor de IA real.
Nunca expongas API keys en el frontend: el frontend solo llama a estos endpoints."""
import json, re
from http.server import HTTPServer, BaseHTTPRequestHandler

def safe_text(s, max_len=500):
    return re.sub(r"[<>\"]", "", str(s or ""))[:max_len]

class Handler(BaseHTTPRequestHandler):
    def _json(self, data, code=200):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")  # restringir en producción + HTTPS
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/health":
            return self._json({"ok": True, "service": "rise-backend", "ai": False})
        self._json({"error": "not found"}, 404)

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        try: payload = json.loads(self.rfile.read(length) or b"{}")
        except Exception: return self._json({"error": "invalid json"}, 400)
        # Aquí irá: autenticación por token, validación por usuario, y llamada al proveedor de IA.
        if self.path == "/api/analyze/food":
            return self._json({"available": False, "source": "backend",
                               "message": "Endpoint preparado. Conecta tu proveedor de visión (p. ej. modelo nutricional) sin tocar el frontend.",
                               "estimates": None, "recommendations": []})
        if self.path == "/api/analyze/training":
            return self._json({"available": False, "message": "Endpoint preparado para análisis de entrenamiento."})
        if self.path == "/api/analyze/finance":
            return self._json({"available": False, "message": "Endpoint preparado para análisis financiero."})
        if self.path == "/api/chat":
            return self._json({"available": False, "message": "Endpoint preparado para conversación futura.", "reply": None})
        if self.path == "/api/sync":  # futuro: Local → Cuenta → Nube
            return self._json({"available": False, "message": "Sincronización no implementada aún."})
        self._json({"error": "not found"}, 404)

if __name__ == "__main__":
    print("Rise backend listo en http://127.0.0.1:8000")
    HTTPServer(("127.0.0.1", 8000), Handler).serve_forever()