# memory.py

from typing import List, Dict

class VersionMemory:
    def __init__(self):
        self.versions: List[Dict] = []

    def save(self, plan, code, explanation):
        self.versions.append({
            "plan": plan,
            "code": code,
            "explanation": explanation
        })

    def get_latest(self):
        if not self.versions:
            return None
        return self.versions[-1]

    def rollback(self):
        if len(self.versions) > 1:
            self.versions.pop()
        return self.get_latest()

memory = VersionMemory()