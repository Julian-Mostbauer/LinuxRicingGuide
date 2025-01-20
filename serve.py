# Usage: python3 serve.py [port: 8080]
import os
import socket
import socketserver
import sys
import time
import http.server
from rich.console import Console
from rich.table import Table
import traceback

# setup
default_port = 8080
console = Console()

class LoggingHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_request_table(self, method, path, response_code, duration):
        current_time = time.strftime("%H:%M:%S", time.localtime())
        
        # Create a single table for the entire request
        table = Table(show_header=True, header_style="bold magenta")
        table.add_column("Time", style="cyan")
        table.add_column("Client IP", style="green")
        table.add_column("Method", style="yellow")
        table.add_column("Path", style="blue", overflow="fold")
        table.add_column("Response Code", style="red")
        table.add_column("Duration (s)", style="white")

        # Add a single row with all the details
        table.add_row(
            current_time,
            self.client_address[0],
            method,
            path,
            str(response_code),
            f"{duration:.4f}"
        )
        
        # Print the table
        console.print(table)

    def log_error_table(self, method, path, error_message, error_traceback):
        current_time = time.strftime("%H:%M:%S", time.localtime())
        
        # Create a table for the error
        table = Table(show_header=True, header_style="bold red")
        table.add_column("Time", style="cyan")
        table.add_column("Error Message", style="white", width=50)
        table.add_column("Client IP", style="yellow")
        table.add_column("Method", style="yellow")
        table.add_column("Path", style="blue", overflow="fold")
        
        # Add a single row with the error details
        table.add_row(
            current_time,
            error_message,
            self.client_address[0],
            method,
            path
        )
        
        # Print the error table within a red panel to highlight it
        console.print(Panel(table, style="bold red"))
        
        # Print the traceback in a separate block
        console.print(Panel(error_traceback, style="bold yellow"))

    def send_response(self, code, message=None):
        # Override to capture the response code
        self.response_code = code
        super().send_response(code, message)

    def do_GET(self):
        try:
            start_time = time.time()
            super().do_GET()
            end_time = time.time()
            duration = end_time - start_time

            # Log the entire request details in a single table
            self.log_request_table("GET", self.path, self.response_code, duration)
        except Exception as e:
            # Log the error with a detailed table and traceback
            error_message = str(e)
            error_traceback = "".join(traceback.format_exception(None, e, e.__traceback__))
            self.log_error_table("GET", self.path, error_message, error_traceback)


# fix the "Address already in use" error
class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def serve(dir: str, port: int) -> None:
    os.chdir(dir)
    handler = LoggingHTTPRequestHandler
    with ReusableTCPServer(("", port), handler) as httpd:
        print(f"Serving {dir} at port {port}")
        httpd.serve_forever()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else default_port
    serve(".", port)


if __name__ == "__main__":
    main()
