import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function CodeFixer() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Sinhala');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFixCode = async () => {
    if (!code.trim()) {
      alert('කරුණාකර කේතයක් (Code) ඇතුළත් කරන්න!');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:5000/api/fix-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setResult('⚠️ දෝෂයක් මතු විය: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('⚠️ සර්වර් එකට සම්බන්ධ වීමේදී දෝෂයක් ඇති විය. Backend එක රන් වෙනවාදැයි පරීක්ෂා කරන්න.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Luminous Green Gradient එක මෙතනට එකතු කර ඇත
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-green-900 text-white p-8 font-sans shadow-[inset_0_0_100px_rgba(16,185,129,0.2)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-emerald-400 mb-2 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
          DevBuddy AI 
        </h1>
        <p className=" text-center text-emerald-200/70 mb-8 capitalize text-2xl">fix the error in quckly</p>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] border border-emerald-800/50 mb-8">
          <label className="block text-sm font-medium text-emerald-100 mb-2">
            (Paste your code here):
          </label>
          <textarea
            className="w-full h-48 bg-black/50 text-emerald-300 p-4 rounded-lg border border-emerald-700/50 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono text-sm"
            placeholder="function sayHello() { console.log('Hello' }"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <div className="flex items-center gap-3">
              <label className="text-emerald-200 text-sm">Choose language:</label>
              <select
                className="bg-gray-800 text-emerald-100 px-3 py-2 rounded border border-emerald-700/50 focus:outline-none focus:border-emerald-400"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Sinhala">Sinhala</option>
                <option value="English">English</option>
              </select>
            </div>

            <button
              onClick={handleFixCode}
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                loading
                  ? 'bg-emerald-600/50 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 text-white'
              }`}
            >
              {loading ? 'සොයමින් පවතී...' : '✨ Fix My Code'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)] border border-emerald-800/50">
            <h2 className="text-xl font-bold text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">AI පිළිතුර:</h2>
            <div className="prose prose-invert prose-emerald max-w-none bg-black/40 p-4 rounded-lg text-emerald-50 text-sm leading-relaxed overflow-x-auto border border-emerald-900/50">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeFixer;