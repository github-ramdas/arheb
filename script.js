// Copyright arheb, 2024. Licenced under the GPL, version 2 or later.
// version 1.0.0

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
        "ً": "ן",   // Tanwin Fath - no direct equivalent in Niqqud
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
    

    
    const endings = [ ' ', '.' ];

    

    const mapArabicToHebrewDouble = {
    "ـٰ" : "א", 
    }



    
const convertText = ( text, singleLetterMappings, twoLetterMappings) => {
  let newText = '';
  
  for (let i = 0; i < text.length; i++) {
    console.log(text[i]);
      // Check for two-letter combination
      if ( i < text.length - 1) {
          const twoLetterCombo = text[i] + text[i + 1];
          if (twoLetterMappings[twoLetterCombo]) {
            if( i < text.length - 3 
              && twoLetterMappings[twoLetterCombo].includes("'") 
              && singleLetterMappings[text[i+2]]  
              && hebrewNiqqud.includes(singleLetterMappings[text[i+2]])
              && singleLetterMappings[text[i+3]]  
              && hebrewNiqqud.includes(singleLetterMappings[text[i+3]])){
              console.log('hi');
              newText += twoLetterMappings[twoLetterCombo][0]+singleLetterMappings[text[i+2]]+singleLetterMappings[text[i+3]]+twoLetterMappings[twoLetterCombo][1];
              i=i+3;
            }else if( i < text.length - 2 && twoLetterMappings[twoLetterCombo].includes("'") && singleLetterMappings[text[i+2]] && hebrewNiqqud.includes(singleLetterMappings[text[i+2]])){
                newText += twoLetterMappings[twoLetterCombo][0]+singleLetterMappings[text[i+2]]+twoLetterMappings[twoLetterCombo][1];
                i=i+2;
                console.log('double with geresh',twoLetterMappings[twoLetterCombo][0]+singleLetterMappings[text[i+2]]+twoLetterMappings[twoLetterCombo][1] )
            }else{
              newText += twoLetterMappings[twoLetterCombo];
              console.log('double',twoLetterMappings[twoLetterCombo]);
              i++; // Skip next letter as it's part of a two-letter combo
            }
            continue;
              
          }
      }

      if( singleLetterMappings[text[i]] 
        && i < text.length - 2 
        && singleLetterMappings[text[i]].includes("'") 
        && singleLetterMappings[text[i+1]] 
        && hebrewNiqqud.includes(singleLetterMappings[text[i+1]])
        && hebrewNiqqud.includes(singleLetterMappings[text[i+2]])
        ){
        newText += singleLetterMappings[text[i]][0] + singleLetterMappings[text[i+1]] + singleLetterMappings[text[i+2]] + "'";
        i=i+2;
        console.log('single with geresh', singleLetterMappings[text[i]] || text[i]);
      }else if( singleLetterMappings[text[i]] && i < text.length - 1 && singleLetterMappings[text[i]].includes("'") && singleLetterMappings[text[i+1]] && hebrewNiqqud.includes(singleLetterMappings[text[i+1]])){
        newText += singleLetterMappings[text[i]][0] + singleLetterMappings[text[i+1]] + "'";
        i++;
        console.log('single with geresh', singleLetterMappings[text[i]] || text[i]);
      }else{
        newText += singleLetterMappings[text[i]] || text[i];
        console.log('single',singleLetterMappings[text[i]] || text[i]);
      }  
  }

  return newText;
}
    
  
    const updateOtherInputs = (sourceInput) => {    
        hebrewInput.textContent = convertText(sourceInput.value, mapArabicToHebrew, mapArabicToHebrewDouble);
    };

    arabicInput.addEventListener('input', () => updateOtherInputs(arabicInput));
});