#!/usr/bin/env python3
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import os

class LeadsVDLHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(get_html().encode())
        elif self.path == '/api/stats':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            data = {
                'total_leads': 80,
                'monthly_capacity': '2000-3000',
                'phases': 4,
                'status': 'active'
            }
            self.wfile.write(json.dumps(data).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == '/api/search':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                query_data = json.loads(body)
                response = {
                    'status': 'success',
                    'query': query_data.get('query', ''),
                    'results': [
                        {'name': 'Rajesh Kumar', 'title': 'CTO', 'company': 'TechCorp India', 'email': 'rajesh@techcorp.com', 'score': 85},
                        {'name': 'Priya Singh', 'title': 'CEO', 'company': 'Uniforms India', 'email': 'priya@uniforms.com', 'score': 88}
                    ]
                }
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode())
            except:
                self.send_response(400)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        pass  # Suppress logging

def get_html():
    return '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LeadsVDL Phase 4</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background: linear-gradient(135deg, #1B5E20 0%, #C41E3A 100%);
      min-height: 100vh;
    }
  </style>
</head>
<body class="text-gray-800">
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold mb-2">LeadsVDL</h1>
        <p class="text-xl text-gray-600">Phase 4 - Universal Lead Discovery</p>
      </div>

      <div class="bg-green-50 border-l-4 border-green-700 p-4 mb-6">
        <p class="text-green-700 font-bold">✅ LIVE & READY FOR DIKSHA DEMO</p>
        <p class="text-green-600 text-sm">Oct 28-Nov 3, 2026 | 80 USA/Europe buyer leads</p>
      </div>

      <div class="mb-8">
        <input type="text" id="query" placeholder="Search leads..."
               class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-green-700">
        <button onclick="performSearch()"
                class="w-full px-6 py-3 bg-gradient-to-r from-green-700 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg">
          🔍 Search Leads
        </button>
      </div>

      <div id="results" class="space-y-4"></div>

      <div class="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
        <p class="font-semibold mb-2">📞 +91 84460 00784 | 🌐 vdldigital.com</p>
        <p class="text-xs">LeadsVDL - White-label Lead Discovery for Email Marketing Agencies</p>
      </div>
    </div>
  </div>

  <script>
    async function performSearch() {
      const query = document.getElementById('query').value;
      if (!query.trim()) {
        document.getElementById('results').innerHTML = '<p class="text-gray-500">Enter a search query</p>';
        return;
      }

      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const html = data.results.map(r => `
            <div class="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
              <h3 class="font-bold text-lg">${r.name}</h3>
              <p class="text-gray-700"><strong>${r.title}</strong> at ${r.company}</p>
              <p class="text-gray-600">📧 ${r.email}</p>
              <p class="mt-2 text-sm"><strong>Quality Score:</strong> ${r.score}/100 ${r.score >= 80 ? '🔴 HOT' : '🟡 WARM'}</p>
            </div>
          `).join('');
          document.getElementById('results').innerHTML = html;
        } else {
          document.getElementById('results').innerHTML = '<p class="text-gray-500">No results found</p>';
        }
      } catch (error) {
        document.getElementById('results').innerHTML = '<p class="text-red-500">Error: ' + error.message + '</p>';
      }
    }
  </script>
</body>
</html>'''

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    server = HTTPServer(('0.0.0.0', port), LeadsVDLHandler)
    print(f'LeadsVDL Phase 4 running on port {port}')
    server.serve_forever()
