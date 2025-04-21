import os
import subprocess
import sys
import time
import signal
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class ReloadHandler(FileSystemEventHandler):
    def __init__(self, command):
        self.command = command
        self.process = None
        self.start_process()

    def start_process(self):
        if self.process:
            print("Terminating existing Gunicorn process...")
            try:
                # Gửi SIGTERM trước
                self.process.terminate()
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                print("SIGTERM failed, sending SIGKILL...")
                self.process.kill()
                self.process.wait()
            # Chờ thêm để đảm bảo socket được giải phóng
            time.sleep(2)
        print(f"Starting Gunicorn with command: {self.command}")
        self.process = subprocess.Popen(self.command, shell=True)

    def on_any_event(self, event):
        if event.is_directory or not event.src_path.endswith('.py'):
            return
        print(f"Detected change in {event.src_path}, restarting Gunicorn...")
        self.start_process()

if __name__ == '__main__':
    command = 'gunicorn --config gunicorn_config.py app:app'
    print(f"Starting Watchdog with command: {command}")
    event_handler = ReloadHandler(command)
    observer = Observer()
    observer.schedule(event_handler, path='/tourist_project', recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping Watchdog...")
        observer.stop()
    observer.join()