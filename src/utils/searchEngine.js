// src/utils/searchEngine.js
import { medicinesDatabase } from "../data/medicinesData";

// Simple Levenshtein distance based fuzzy matching algorithm for typos
function getSimilarityScore(s1, s2) {
  let longer = s1.toLowerCase();
  let shorter = s2.toLowerCase();
  if (longer.length < shorter.length) {
    let temp = longer; longer = shorter; shorter = temp;
  }
  let longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();
  let costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (s1.length > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// Robust Typo & Semantic Search Function
export function findMatchingMedicine(query) {
  if (!query || query.trim() === "") return null;
  
  const cleanQuery = query.toLowerCase().trim();
  let bestMatch = null;
  let highestScore = 0.0;

  // 1. Exact or substring check first on brand, molecule, or common alias tags
  const exactFound = medicinesDatabase.find(med => 
    (med.brand_name && med.brand_name.toLowerCase().includes(cleanQuery)) ||
    (med.brandName && med.brandName.toLowerCase().includes(cleanQuery)) ||
    (med.molecule && med.molecule.toLowerCase().includes(cleanQuery)) ||
    (med.salt && med.salt.toLowerCase().includes(cleanQuery)) ||
    (med.tags && med.tags.some(tag => tag.toLowerCase().includes(cleanQuery) || cleanQuery.includes(tag.toLowerCase())))
  );
  if (exactFound) return exactFound;

  // 2. Fuzzy Matching across all database brands and molecules for typo tolerance
  medicinesDatabase.forEach(med => {
    const brandStr = med.brand_name || med.brandName || "";
    const molStr = med.molecule || med.salt || "";

    // Check brand name similarity
    let brandScore = getSimilarityScore(cleanQuery, brandStr);
    // Check molecule similarity
    let molScore = getSimilarityScore(cleanQuery, molStr);
    
    // Check tag similarities for typos (e.g. "pantocd", "agumentin", "doloo")
    let tagScore = 0;
    if (med.tags && Array.isArray(med.tags)) {
      for (const tag of med.tags) {
        const score = getSimilarityScore(cleanQuery, tag);
        if (score > tagScore) tagScore = score;
      }
    }

    let maxScore = Math.max(brandScore, molScore, tagScore);
    if (maxScore > highestScore) {
      highestScore = maxScore;
      bestMatch = med;
    }
  });

  // Threshold cutoff (0.3 means 30% similarity required)
  return highestScore >= 0.3 ? bestMatch : null;
}

// Multi-result search for autocomplete and filtering
export function searchMedicines(query) {
  if (!query || query.trim() === "") {
    return medicinesDatabase;
  }

  const cleanQuery = query.toLowerCase().trim();
  const directMatch = findMatchingMedicine(cleanQuery);

  if (directMatch) {
    const others = medicinesDatabase.filter(m => m.id !== directMatch.id);
    return [directMatch, ...others];
  }

  return medicinesDatabase;
}
