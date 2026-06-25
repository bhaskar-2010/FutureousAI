import React from "react";

interface QuestionTextProps {
  text: string;
  className?: string;
}

export function QuestionText({ text, className = "" }: QuestionTextProps) {
  if (!text) return null;

  let formatted = text;

  // 1. Math Exponents
  formatted = formatted
    .replace(/\^2/g, "²")
    .replace(/\^3/g, "³")
    .replace(/\^4/g, "⁴")
    .replace(/\^5/g, "⁵")
    .replace(/\^6/g, "⁶")
    .replace(/\^7/g, "⁷")
    .replace(/\^8/g, "⁸")
    .replace(/\^9/g, "⁹")
    .replace(/\^0/g, "⁰")
    .replace(/\^n/g, "ⁿ")
    .replace(/\^\-1/g, "⁻¹")
    .replace(/\^\-2/g, "⁻²");

  // 2. Square roots
  formatted = formatted.replace(/sqrt\(([^)]+)\)/g, "√($1)");
  formatted = formatted.replace(/\bsqrt\b/g, "√"); 

  // 3. Chemistry Formatting (Subscripts)
  const subscripts: Record<string, string> = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
    "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉"
  };

  formatted = formatted.replace(/\b\d*[A-Z][a-zA-Z0-9]*\b/g, (match) => {
    // Match patterns like H2O, CO2, 2H2, CaCO3, etc.
    const formulaRegex = /^(\d*)([A-Z][a-z]?\d*)+$/;
    const formulaMatch = match.match(formulaRegex);
    if (formulaMatch && /[0-9]/.test(match)) {
      const coefficient = formulaMatch[1];
      const rest = match.substring(coefficient.length);
      return coefficient + rest.replace(/[0-9]/g, (d) => subscripts[d] || d);
    }
    return match;
  });

  // 4. Mathematical Operators & Arrows
  formatted = formatted
    .replace(/<->/g, "↔")
    .replace(/->/g, "→")
    .replace(/=>/g, "⇒")
    .replace(/<=/g, "≤")
    .replace(/>=/g, "≥")
    .replace(/!=/g, "≠");

  // 5. Fractions (Special Inline Cases)
  // We keep 1/2 as ½ as per user's explicit exception (e.g., ½mv²)
  formatted = formatted.replace(/\b1\/2\b/g, "½");

  // 6. Spacing around Operators (Normalize)
  formatted = formatted.replace(/\s*([=≈≠≤≥→↔⇒])\s*/g, " $1 ");
  
  // Spacing for + and - only when between variables/numbers
  const mathChar = `[a-zA-Z0-9²³⁴⁵⁶⁷⁸⁹⁰ⁿ₀₁₂₃₄₅₆₇₈₉]`;
  formatted = formatted.replace(new RegExp(`(${mathChar})\\s*\\+\\s*(${mathChar})`, "g"), "$1 + $2");
  
  // Multiplication
  formatted = formatted.replace(/(?<!\*)\*(?!\*)/g, " × ");

  // Clean up excessive spaces
  formatted = formatted.replace(/  +/g, " ");

  // 7. Render Fractions Vertically
  // Match a numerator: either parenthesized or alphanumeric+symbols
  // followed by a slash, followed by a denominator
  const fractionRegex = /(\([^)]+\)|[\w²³⁴⁵⁶⁷⁸⁹⁰ⁿ₀₁₂₃₄₅₆₇₈₉.]+)\s*\/\s*(\([^)]+\)|[\w²³⁴⁵⁶⁷⁸⁹⁰ⁿ₀₁₂₃₄₅₆₇₈₉.]+)/g;

  const renderFractions = (input: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = fractionRegex.exec(input)) !== null) {
      if (match.index > lastIndex) {
        parts.push(input.substring(lastIndex, match.index));
      }

      let num = match[1];
      let den = match[2];

      // Strip outer parentheses if they enclose the whole string
      if (num.startsWith('(') && num.endsWith(')')) num = num.slice(1, -1);
      if (den.startsWith('(') && den.endsWith(')')) den = den.slice(1, -1);

      parts.push(
        <span key={`frac-${match.index}`} className="inline-flex flex-col items-center align-middle mx-1 text-[0.9em] leading-[1.2]">
          <span className="block border-b border-foreground px-1 pb-[1px]">{num}</span>
          <span className="block px-1 pt-[1px]">{den}</span>
        </span>
      );

      lastIndex = fractionRegex.lastIndex;
    }

    if (lastIndex < input.length) {
      parts.push(input.substring(lastIndex));
    }

    return parts;
  };

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {renderFractions(formatted)}
    </span>
  );
}
