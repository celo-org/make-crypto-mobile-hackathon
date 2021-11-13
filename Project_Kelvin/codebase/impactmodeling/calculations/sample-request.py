import requests

requests.post("http://127.0.0.1:8000/calculations/update-score", data={"user": "betelgeuse", "proposal_id": "sample_proposal", "param1": 1, "operator": "+", "param2": 1, "credentials": "include"})