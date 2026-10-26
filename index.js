export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Serve the homepage
    if (path === '/' || path === '') {
      return new Response(getHomepage(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    // API endpoints
    if (path === '/api/search' && request.method === 'POST') {
      const body = await request.json();
      return new Response(JSON.stringify(handleSearch(body)), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/stats') {
      return new Response(JSON.stringify(getStats()), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/export') {
      const data = getExportData();
      return new Response(data, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="leads.csv"'
        }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
};

function getHomepage() {
  return \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LeadsVDL - Complete Lead Discovery System</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
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
            <h1 class="text-4xl font-bold text-center mb-2">LeadsVDL</h1>
            <p class="text-center text-gray-600 mb-8">Complete Lead Discovery System (Phases 1-4)</p>

            <div class="mb-8 flex flex-wrap gap-2">
                <button class="phase-btn px-4 py-2 rounded-lg font-semibold active bg-gradient-to-r from-green-700 to-red-700 text-white" data-phase="universal">
                    🔍 Universal Search
                </button>
                <button class="phase-btn px-4 py-2 rounded-lg font-semibold border-2 border-green-700" data-phase="phase1">
                    📧 Phase 1: Email Finder
                </button>
                <button class="phase-btn px-4 py-2 rounded-lg font-semibold border-2 border-green-700" data-phase="phase2">
                    📞 Phase 2: Phone Finder
                </button>
                <button class="phase-btn px-4 py-2 rounded-lg font-semibold border-2 border-green-700" data-phase="phase3">
                    📊 Phase 3: Scorer
                </button>
            </div>

            <div class="mb-8" id="search-form">
                <input type="text" id="search-query" placeholder="Search leads..." class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4">
                <button onclick="performSearch()" class="w-full px-6 py-3 bg-gradient-to-r from-green-700 to-red-700 text-white font-semibold rounded-lg hover:shadow-lg">
                    Search Leads
                </button>
            </div>

            <div id="results-container" class="space-y-4"></div>

            <div class="mt-8 text-center text-sm text-gray-600">
                <p>📞 +91 84460 00784 | 🌐 vdldigital.com</p>
            </div>
        </div>
    </div>

    <script>
        async function performSearch() {
            const query = document.getElementById('search-query').value;
            if (!query.trim()) return;

            try {
                const response = await fetch('/api/search', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, phase: 'universal' })
                });
                const data = await response.json();
                displayResults(data);
            } catch (error) {
                console.error('Search error:', error);
            }
        }

        function displayResults(data) {
            const container = document.getElementById('results-container');
            if (!data.results_email || !data.results_email.results) {
                container.innerHTML = '<p class="text-gray-500">No results found</p>';
                return;
            }

            const html = data.results_email.results.map(lead => \`
                <div class="border-l-4 border-blue-500 bg-gray-50 p-4 rounded">
                    <h3 class="font-bold text-lg">\${lead.name}</h3>
                    <p class="text-gray-700"><strong>\${lead.title}</strong> at \${lead.company}</p>
                    <p class="text-gray-600">📧 \${lead.email}</p>
                    <p class="text-sm text-gray-500">\${lead.location} • \${lead.industry}</p>
                    <p class="mt-2 text-sm"><strong>Score:</strong> \${lead.scoring.final_score}/100 \${lead.scoring.color}</p>
                </div>
            \`).join('');

            container.innerHTML = html;
        }
    <\/script>
</body>
</html>\`;
}

function handleSearch(body) {
  const sampleLeads = [
    {
      name: "Rajesh Kumar",
      title: "CTO",
      company: "TechCorp India",
      email: "rajesh.kumar@techcorp.com",
      location: "Bangalore",
      industry: "SaaS",
      scoring: { final_score: 85, color: "🔴 HOT" }
    },
    {
      name: "Priya Singh",
      title: "CEO",
      company: "Uniforms India",
      email: "ceo@uniformsindia.com",
      location: "Mumbai",
      industry: "Uniforms",
      scoring: { final_score: 88, color: "🔴 HOT" }
    }
  ];

  return {
    query: body.query,
    phase: "1-4 (All)",
    generated_at: new Date().toISOString(),
    results_email: {
      count: sampleLeads.length,
      results: sampleLeads
    }
  };
}

function getStats() {
  return {
    total_leads: 80,
    monthly_capacity: "2000-3000",
    phases: 4,
    api_version: "1.0"
  };
}

function getExportData() {
  const headers = "Name,Title,Company,Email,Location,Industry,Score\\n";
  const rows = [
    "Rajesh Kumar,CTO,TechCorp India,rajesh.kumar@techcorp.com,Bangalore,SaaS,85",
    "Priya Singh,CEO,Uniforms India,ceo@uniformsindia.com,Mumbai,Uniforms,88"
  ].join("\\n");
  return headers + rows;
}
