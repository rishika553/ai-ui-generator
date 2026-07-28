from copy import deepcopy
from typing import Dict, List, Optional


class VersionMemory:
    def __init__(self):
        self.versions: List[Dict] = []

    def save(self, website, explanation):
        version = {
            "versionId": len(self.versions) + 1,
            "website": deepcopy(website),
            "explanation": explanation,
        }
        self.versions.append(version)
        return version

    def list_versions(self):
        return [
            {
                "versionId": v["versionId"],
                "createdAt": v["website"].get("createdAt"),
                "theme": v["website"].get("theme", {}).get("name"),
                "prompt": v["website"].get("prompt"),
                "title": v["website"].get("hero", {}).get("title"),
            }
            for v in self.versions
        ]

    def get_latest(self) -> Optional[Dict]:
        if not self.versions:
            return None
        return deepcopy(self.versions[-1])

    def restore(self, version_id: int):
        for version in self.versions:
            if version["versionId"] == version_id:
                restored = deepcopy(version)
                self.versions.append({
                    "versionId": len(self.versions) + 1,
                    "website": restored["website"],
                    "explanation": restored["explanation"],
                })
                return self.get_latest()
        return None

    def rollback(self):
        if len(self.versions) > 1:
            self.versions.pop()
        return self.get_latest()


memory = VersionMemory()
