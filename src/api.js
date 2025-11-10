export const API_BASE = "https://script.google.com/macros/s/AKfycbxPYhJneZhk0pMwE4X1nDH9pV70MPBHl9qJaL1aWZ3H4E5BZj__N86WZyJVpEiyY9Eq/exec";
export const API_KEY = "ISGEC2025";

export async function getHomeSummary(month){
  const url = `${API_BASE}?action=homeSummary&month=${month}`;
  const r = await fetch(url); return r.json();
}

export async function getProjects(){
  const r = await fetch(`${API_BASE}?action=projects`); return r.json();
}

// Attempt to fetch assignments list (if backend exposes it). Fallback empty.
export async function getAssignments(){
  try{ const r = await fetch(`${API_BASE}?action=assignments`); const j = await r.json(); return j.assignments||[]; }
  catch(e){ return []; }
}

export async function addProject(payload){
  const r = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY}, body: JSON.stringify({action:'addProject',...payload}) });
  return r.json();
}

export async function addBilling(payload){
  const r = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY}, body: JSON.stringify({action:'addBilling',...payload}) });
  return r.json();
}

export async function setMonthlyTargets(payload){
  const r = await fetch(API_BASE, { method:'POST', headers:{'Content-Type':'application/json','x-api-key':API_KEY}, body: JSON.stringify({action:'setMonthlyTargets',...payload}) });
  return r.json();
}

export const fmtINR = (n)=> new Intl.NumberFormat('en-IN').format(Math.round(n||0));
