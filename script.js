// Copyright arheb, 2024. Licenced under the GPL, version 2 or later.
// version 1.1.1

document.addEventListener('DOMContentLoaded', () => {
	const arabicInput = document.getElementById('arabicInput');
	const hebrewInput = document.getElementById('hebrewInput');

	const mapArabicToHebrew = {
		ا: 'א', // Alif to Aleph
		ﻻ: "לא", // La to la
		ب: 'ב', // Ba to Bet
		ت: 'ת', // Ta to Tav
		ث: "ת'", // Tha to Sin
		ج: "ג'", // Jim to Gimel
		ح: "ח", // Ha to Het
		خ: "ח'", // Kha to Kaf with Dagesh
		د: 'ד', // Dal to Dalet
		ذ: "ד'", // Dhal to Dalet with Dagesh
		ر: 'ר', // Ra to Resh
		ز: 'ז', // Zay to Zayin
		س: 'ס', // Seen to Samekh
		ش: 'ש', // Sheen to Shin
		ص: 'צ', // Sad to Tsadi
		ض: "צ'", // Dad to Tsadi with Geresh
		ط: 'ט', // Ta to Tet
		ظ: "ט'", // Dha to Tet with Geresh
		ع: 'ע', // Ain to Ayin
		غ: "ע'", // Ghayn to Ayin with Geresh
		ف: 'פ', // Fa to Pe
		ق: "ק", // Qaf to Kuf
		ك: 'כ', // Kaf to Kaf
		ل: 'ל', // Lam to Lamed
		م: 'מ', // Meem to Mem
		ن: 'נ', // Noon to Nun
		ه: 'ה', // Ha to He
		و: 'ו', // Waw to Vav
		ي: 'י', // Ya to Yod
		ى: "א", // ʾalif maqṣūrah to Aleph
		"ء": "א'", //
		أ: "א", //
		إ: "א", //
		ؤ: "א", // 
		ئ: "א", //
		ة : "הֿ", // tāʼ marbūṭa to He with upper line    
		
		"َ": "ַ",  // Fatha to Patah
		"ِ": "ִ",  // Kasra to Hiriq
		"ُ": "ֻ",  // Damma to Qubuts
	//	"ً": "ן",   // Tanwin Fath - no direct equivalent in Niqqud
		"ٍ": "",   // Tanwin Kasr - no direct equivalent in Niqqud
		"ٌ": "",   // Tanwin Damm - no direct equivalent in Niqqud
		"ْ":"ְ",  // Sukun to Shva (approximate)
		"ّ": "ּ",  // Shadda to Dagesh
		
		"ٰ": "א",   // Alif Khanjareeya - no direct equivalent in Niqqud
		"آ": "אַא",   // Maddah - no direct equivalent in Niqqud
		"ٱ": "א", // Alif Waslah
		" ُ": "ֻ", // 
		"،": ",",   // Arabic Comma to Hebrew Comma


		"!": "!",   // Exclamation mark (same in both)
		".": ".",   // Period (same in both)
		"؛": ";",   // Arabic Semicolon to Hebrew Semicolon
		"؟": "?",   // Arabic Question Mark to Hebrew Question Mark
		"٪": "%",   // Arabic Percent Sign to Hebrew Percent Sign
		"“": "\"",  // Opening Double Quotation Mark
		"”": "\"",  // Closing Double Quotation Mark
		"‘": "'",   // Opening Single Quotation Mark
		"’": "'",   // Closing Single Quotation Mark
			
		"٠": "0", // 0
		"١": "1", // 1
		"٢": "2", // 2
		"٣": "3", // 3
		"٤": "4", // 4
		"٥": "5", // 5
		"٦": "6", // 6
		"٧": "7", // 7
		"٨": "8", // 8
		"٩": "9"  // 9   
	};

	const hebrewNiqqud = [
    "ְ", // Sheva
    "ֱ", // Hataf Segol
    "ֲ", // Hataf Patah
    "ֳ", // Hataf Qamats
    "ִ", // Hiriq
    "ֵ", // Tsere
    "ֶ", // Segol
    "ַ", // Patah
    "ָ", // Qamats
    "ֹ", // Holam
    "ֺ", // Holam Haser for Vav
    "ּ", // Dagesh or Mappiq
    "ֽ", // Meteg (secondary stress marker)
    "ֻ", // Qubuts
    "ּׁ", // Shin Dot
    "ּׂ", // Sin Dot
    "֫", // Ole
    "֬", // Iluy
    "֭", // Dehi
    "֮"  // Geresh
	];

	const endings = [ ' ', '.', ',', '!', '?', ';', '׃', '״', '׳' ];

	const mapEndingLetters = {
		"כ": "ך",
		"מ": "ם",
		"נ": "ן",
		"פ": "ף",
		"צ": "ץ"
	};

	const mapArabicToHebrewDouble = {
		"ـٰ" : "א",
	}

	function replaceNewlinesWithBreaks( text ) {
		return text.replace(/\n/g, '\n');
	}

	function isDoubleNiqqudSingleLetterGeresh( text, i ){
		return mapArabicToHebrew[text[i]] 
				&& i < text.length - 2 
				&& mapArabicToHebrew[text[i]].includes("'") 
				&& mapArabicToHebrew[text[i+1]] 
				&& hebrewNiqqud.includes(mapArabicToHebrew[text[i+1]])
				&& hebrewNiqqud.includes(mapArabicToHebrew[text[i+2]]);
	}

	function isNiqqudSingleLetterGeresh( text, i ){
		return mapArabicToHebrew[text[i]] 
				&& i < text.length - 1 
				&& mapArabicToHebrew[text[i]].includes("'") 
				&& mapArabicToHebrew[text[i+1]] 
				&& hebrewNiqqud.includes(mapArabicToHebrew[text[i+1]]);
	}

	function isDoubleNiqqudDoubleLetterGeresh( text, i, twoLetterCombo ){
		return i < text.length - 3 
			&& mapArabicToHebrewDouble[twoLetterCombo].includes("'") 
			&& mapArabicToHebrew[text[i+2]]  
			&& hebrewNiqqud.includes(mapArabicToHebrew[text[i+2]])
			&& mapArabicToHebrew[text[i+3]]  
			&& hebrewNiqqud.includes(mapArabicToHebrew[text[i+3]]);
	}

	function isNiqqudDoubleLetterGeresh( text, i, twoLetterCombo ){
		return i < text.length - 2 
			&& mapArabicToHebrewDouble[twoLetterCombo].includes("'") 
			&& mapArabicToHebrew[text[i+2]] 
			&& hebrewNiqqud.includes( mapArabicToHebrew[text[i+2]] );
	}

	function getEndingLetter( text, i, hebrewLetter ){
		console.log(hebrewLetter);
		if( hebrewLetter && Object.keys( mapEndingLetters ).includes( hebrewLetter ) ){
			
			if( i === text.length - 1 || endings.includes( text[i+1] ) ){
				return mapEndingLetters[ hebrewLetter ];
			}
			if( i === text.length - 2 && ( hebrewNiqqud.includes( mapArabicToHebrew[ text[i+1] ] ) || endings.includes( text[i+1] ) ) ){
				return mapEndingLetters[ hebrewLetter ];
			}
			if( i < text.length - 2 && endings.includes( text[i+1] ) ){
				return mapEndingLetters[ hebrewLetter ];
			}
			if( i === text.length - 3 && hebrewNiqqud.includes( mapArabicToHebrew[ text[i+1] ] ) ) {
				if( hebrewNiqqud.includes( mapArabicToHebrew[ text[i+2] ] ) || endings.includes( text[i+2] ) ){
					return mapEndingLetters[ hebrewLetter ];
				}
			}
			if( i < text.length - 3 && hebrewNiqqud.includes( mapArabicToHebrew[ text[i+1] ] ) && endings.includes( text[i+2] ) ) {
					return mapEndingLetters[ hebrewLetter ];
			}
			if( i < text.length - 4 && hebrewNiqqud.includes( mapArabicToHebrew[ text[i+1] ] ) ) {
				if( endings.includes( text[i+2] ) ){
					return mapEndingLetters[ hebrewLetter ];
				}
				if( hebrewNiqqud.includes( mapArabicToHebrew[ text[i+2] ] ) && endings.includes( text[i+3] ) ){
					return mapEndingLetters[ hebrewLetter ];
				}
			}
		}
		return hebrewLetter;
	}

	const convertText = ( text ) => {
		let newText = '';

		for (let i = 0; i < text.length; i++) {
			// Check for two-letter combination
			if ( i < text.length - 1) {
				const twoLetterCombo = text[i] + text[i + 1];
				if (mapArabicToHebrewDouble[twoLetterCombo]) {
					if( isDoubleNiqqudDoubleLetterGeresh( text, i, twoLetterCombo ) ){
						newText += getEndingLetter( text, i, mapArabicToHebrewDouble[twoLetterCombo][0] ) + mapArabicToHebrew[text[i+2]] + mapArabicToHebrew[ text[i+3] ] + mapArabicToHebrewDouble[twoLetterCombo][1];
						i=i+3;
					}else if( isNiqqudDoubleLetterGeresh( text, i, twoLetterCombo ) ){
						newText += getEndingLetter( text, i, mapArabicToHebrewDouble[twoLetterCombo][0] ) + mapArabicToHebrew[text[i+2]] + mapArabicToHebrewDouble[twoLetterCombo][1];
						i=i+2;
					}else{
						newText += mapArabicToHebrewDouble[twoLetterCombo];
						i++; // Skip next letter as it's part of a two-letter combo
					}
					continue;
				}
			}

			if( isDoubleNiqqudSingleLetterGeresh( text, i ) ){
				newText += getEndingLetter( text, i, mapArabicToHebrew[text[i]][0] ) + mapArabicToHebrew[text[i+1]] + mapArabicToHebrew[text[i+2]] + "'";
				i=i+2;
			}else if( isNiqqudSingleLetterGeresh( text, i ) ){
				newText += getEndingLetter( text, i, mapArabicToHebrew[text[i]][0] ) + mapArabicToHebrew[text[i+1]] + "'";
				i++;
			}else{

				newText += getEndingLetter( text, i, mapArabicToHebrew[text[i]] ) || text[i];
			}  
		}

		return replaceNewlinesWithBreaks(newText);
	}


	const updateOtherInputs = (sourceInput) => {    
		hebrewInput.textContent = convertText( sourceInput.value );
	};

	arabicInput.addEventListener('input', () => updateOtherInputs(arabicInput));
});