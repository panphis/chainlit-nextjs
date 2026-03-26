import sys
from pathlib import Path

from fastapi.testclient import TestClient

# 确保 pytest 执行时可以导入 `app` 包
PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))

from app.main import app  # noqa: E402

client = TestClient(app)


def test_health() -> None:
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


def test_items_crud() -> None:
    # create
    create_resp = client.post("/items", json={"name": "apple", "description": "red"})
    assert create_resp.status_code == 201
    created = create_resp.json()
    assert "id" in created
    item_id = created["id"]
    assert created["name"] == "apple"

    # get
    get_resp = client.get(f"/items/{item_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == item_id

    # list
    list_resp = client.get("/items")
    assert list_resp.status_code == 200
    assert any(x["id"] == item_id for x in list_resp.json())

    # delete
    del_resp = client.delete(f"/items/{item_id}")
    assert del_resp.status_code == 204

    # get after delete
    missing_resp = client.get(f"/items/{item_id}")
    assert missing_resp.status_code == 404

