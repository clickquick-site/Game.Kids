import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════
const DATA = {
  numbers: [
    { id: 1, emoji: "1️⃣", en: "One", fr: "Un", num: "1" },
    { id: 2, emoji: "2️⃣", en: "Two", fr: "Deux", num: "2" },
    { id: 3, emoji: "3️⃣", en: "Three", fr: "Trois", num: "3" },
    { id: 4, emoji: "4️⃣", en: "Four", fr: "Quatre", num: "4" },
    { id: 5, emoji: "5️⃣", en: "Five", fr: "Cinq", num: "5" },
    { id: 6, emoji: "6️⃣", en: "Six", fr: "Six", num: "6" },
    { id: 7, emoji: "7️⃣", en: "Seven", fr: "Sept", num: "7" },
    { id: 8, emoji: "8️⃣", en: "Eight", fr: "Huit", num: "8" },
    { id: 9, emoji: "9️⃣", en: "Nine", fr: "Neuf", num: "9" },
    { id: 10, emoji: "🔟", en: "Ten", fr: "Dix", num: "10" },
  ],
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l, i) => ({
    id: i + 1,
    emoji: l,
    en: l,
    fr: l,
    num: l,
    phonetic_en: l,
    phonetic_fr: {
      A:"Ah",B:"Bay",C:"Say",D:"Day",E:"Euh",F:"Eff",G:"Zhay",
      H:"Ash",I:"Ee",J:"Zhee",K:"Kah",L:"El",M:"Em",N:"En",
      O:"Oh",P:"Pay",Q:"Koo",R:"Err",S:"Ess",T:"Tay",U:"Oo",
      V:"Vay",W:"Dooblvay",X:"Eeks",Y:"Ee-grek",Z:"Zed"
    }[l],
  })),
  animals: [
    { id: 1, emoji: "🐶", en: "Dog", fr: "Chien" },
    { id: 2, emoji: "🐱", en: "Cat", fr: "Chat" },
    { id: 3, emoji: "🐘", en: "Elephant", fr: "Éléphant" },
    { id: 4, emoji: "🦁", en: "Lion", fr: "Lion" },
    { id: 5, emoji: "🐬", en: "Dolphin", fr: "Dauphin" },
    { id: 6, emoji: "🐦", en: "Bird", fr: "Oiseau" },
    { id: 7, emoji: "🐠", en: "Fish", fr: "Poisson" },
    { id: 8, emoji: "🐰", en: "Rabbit", fr: "Lapin" },
    { id: 9, emoji: "🐻", en: "Bear", fr: "Ours" },
    { id: 10, emoji: "🦊", en: "Fox", fr: "Renard" },
    { id: 11, emoji: "🐷", en: "Pig", fr: "Cochon" },
    { id: 12, emoji: "🦋", en: "Butterfly", fr: "Papillon" },
    { id: 13, emoji: "🐸", en: "Frog", fr: "Grenouille" },
    { id: 14, emoji: "🐧", en: "Penguin", fr: "Pingouin" },
    { id: 15, emoji: "🦒", en: "Giraffe", fr: "Girafe" },
  ],
  food: [
    { id: 1, emoji: "🍎", en: "Apple", fr: "Pomme" },
    { id: 2, emoji: "🍌", en: "Banana", fr: "Banane" },
    { id: 3, emoji: "🍊", en: "Orange", fr: "Orange" },
    { id: 4, emoji: "🍇", en: "Grapes", fr: "Raisin" },
    { id: 5, emoji: "🍓", en: "Strawberry", fr: "Fraise" },
    { id: 6, emoji: "🥕", en: "Carrot", fr: "Carotte" },
    { id: 7, emoji: "🥦", en: "Broccoli", fr: "Brocoli" },
    { id: 8, emoji: "🍅", en: "Tomato", fr: "Tomate" },
    { id: 9, emoji: "🥔", en: "Potato", fr: "Pomme de terre" },
    { id: 10, emoji: "🌽", en: "Corn", fr: "Maïs" },
    { id: 11, emoji: "🍋", en: "Lemon", fr: "Citron" },
    { id: 12, emoji: "🥝", en: "Kiwi", fr: "Kiwi" },
    { id: 13, emoji: "🍉", en: "Watermelon", fr: "Pastèque" },
    { id: 14, emoji: "🥑", en: "Avocado", fr: "Avocat" },
    { id: 15, emoji: "🍍", en: "Pineapple", fr: "Ananas" },
  ],
  family: [
    { id: 1, emoji: "👨", en: "Father", fr: "Père" },
    { id: 2, emoji: "👩", en: "Mother", fr: "Mère" },
    { id: 3, emoji: "👦", en: "Brother", fr: "Frère" },
    { id: 4, emoji: "👧", en: "Sister", fr: "Sœur" },
    { id: 5, emoji: "👨‍👩‍👦", en: "Uncle (maternal)", fr: "Oncle maternel" },
    { id: 6, emoji: "👩‍👧", en: "Aunt (maternal)", fr: "Tante maternelle" },
    { id: 7, emoji: "🤵", en: "Uncle (paternal)", fr: "Oncle paternel" },
    { id: 8, emoji: "👰", en: "Aunt (paternal)", fr: "Tante paternelle" },
    { id: 9, emoji: "👴", en: "Grandfather", fr: "Grand-père" },
    { id: 10, emoji: "👵", en: "Grandmother", fr: "Grand-mère" },
  ],
};

const CATEGORIES = [
  { id: "numbers", labelEn: "Numbers", labelFr: "Chiffres", icon: "🔢", color: "#FF6B6B", bg: "#FFE5E5" },
  { id: "letters", labelEn: "Letters", labelFr: "Lettres", icon: "🔤", color: "#4ECDC4", bg: "#E5FFFE" },
  { id: "animals", labelEn: "Animals", labelFr: "Animaux", icon: "🦁", color: "#FFD93D", bg: "#FFF9E5" },
  { id: "food", labelEn: "Fruits & Veggies", labelFr: "Fruits & Légumes", icon: "🍎", color: "#6BCB77", bg: "#E5F9E8" },
  { id: "family", labelEn: "Family", labelFr: "Famille", icon: "👨‍👩‍👧‍👦", color: "#C77DFF", bg: "#F3E5FF" },
];

const THEMES = [
  { id: "rainbow", name: "🌈 Rainbow", primary: "#FF6B6B", secondary: "#4ECDC4", bg: "linear-gradient(135deg, #fff9f0 0%, #f0f8ff 100%)", card: "#ffffff" },
  { id: "ocean", name: "🌊 Ocean", primary: "#0077B6", secondary: "#00B4D8", bg: "linear-gradient(135deg, #e8f4fd 0%, #caf0f8 100%)", card: "#ffffff" },
  { id: "forest", name: "🌲 Forest", primary: "#2D6A4F", secondary: "#52B788", bg: "linear-gradient(135deg, #e9f5ee 0%, #d8f3dc 100%)", card: "#ffffff" },
  { id: "sunset", name: "🌅 Sunset", primary: "#E63946", secondary: "#FF9F1C", bg: "linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%)", card: "#ffffff" },
  { id: "night", name: "🌙 Night", primary: "#7B2FBE", secondary: "#E040FB", bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", card: "#2a2a4a" },
];

// ═══════════════════════════════════════════════
//  SPEECH
// ═══════════════════════════════════════════════
function speak(text, lang = "en", voiceGender = "female") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === "fr" ? "fr-FR" : "en-US";
  utter.rate = 0.85;
  utter.pitch = voiceGender === "female" ? 1.2 : 0.8;

  const voices = window.speechSynthesis.getVoices();
  const langCode = lang === "fr" ? "fr" : "en";
  const genderHint = voiceGender === "female" ? ["female", "woman", "girl", "f"] : ["male", "man", "boy", "m"];
  
  let chosen = voices.find(v =>
    v.lang.toLowerCase().startsWith(langCode) &&
    genderHint.some(h => v.name.toLowerCase().includes(h))
  );
  if (!chosen) chosen = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
  if (chosen) utter.voice = chosen;

  window.speechSynthesis.speak(utter);
}

// ═══════════════════════════════════════════════
//  STARS COMPONENT
// ═══════════════════════════════════════════════
function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3].map(i => (
        <span key={i} style={{ fontSize: 20, opacity: count >= i ? 1 : 0.25, filter: count >= i ? "drop-shadow(0 0 4px gold)" : "none", transition: "all 0.3s" }}>⭐</span>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════
//  CARD COMPONENT
// ═══════════════════════════════════════════════
function LearningCard({ item, lang, voiceGender, theme, categoryColor, isActive, onClick }) {
  const label = lang === "fr" ? item.fr : item.en;
  const isNight = theme.id === "night";

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? categoryColor : theme.card,
        borderRadius: 20,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        transform: isActive ? "scale(1.08)" : "scale(1)",
        boxShadow: isActive
          ? `0 8px 24px ${categoryColor}80`
          : isNight ? "0 4px 12px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        border: isActive ? `3px solid ${categoryColor}` : `3px solid ${isNight ? "#444" : "#f0f0f0"}`,
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div style={{ fontSize: 44, lineHeight: 1 }}>{item.emoji}</div>
      <div style={{
        fontSize: 18,
        fontWeight: 800,
        color: isActive ? "#fff" : isNight ? "#fff" : "#2d2d2d",
        fontFamily: "'Nunito', sans-serif",
        textAlign: "center",
        lineHeight: 1.2,
      }}>
        {item.num || label}
      </div>
      {item.num && (
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: isActive ? "rgba(255,255,255,0.9)" : categoryColor,
          fontFamily: "'Nunito', sans-serif",
        }}>
          {label}
        </div>
      )}
      <div style={{
        fontSize: 11,
        color: isActive ? "rgba(255,255,255,0.75)" : isNight ? "#aaa" : "#999",
        fontFamily: "'Nunito', sans-serif",
      }}>
        🔊 Tap to hear
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  QUIZ COMPONENT
// ═══════════════════════════════════════════════
function QuizMode({ category, lang, voiceGender, theme, onBack }) {
  const items = DATA[category];
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const catInfo = CATEGORIES.find(c => c.id === category);
  const isNight = theme.id === "night";

  function nextQuestion() {
    const idx = Math.floor(Math.random() * items.length);
    const correct = items[idx];
    setCurrent(correct);
    setSelected(null);

    const others = items.filter((_, i) => i !== idx);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const all = [...shuffled, correct].sort(() => Math.random() - 0.5);
    setOptions(all);

    // Speak the word
    setTimeout(() => {
      const word = lang === "fr" ? correct.fr : correct.en;
      speak(word, lang, voiceGender);
    }, 300);
  }

  useEffect(() => { nextQuestion(); }, []);

  function handleAnswer(item) {
    if (selected) return;
    setSelected(item);
    const isCorrect = item.id === current.id;
    const newTotal = total + 1;
    const newScore = isCorrect ? score + 1 : score;
    setTotal(newTotal);
    setScore(newScore);

    if (isCorrect) speak("Bravo!", lang, voiceGender);
    else speak(lang === "fr" ? current.fr : current.en, lang, voiceGender);

    if (newTotal >= 10) {
      setTimeout(() => setShowResult(true), 1200);
    } else {
      setTimeout(() => nextQuestion(), 1200);
    }
  }

  if (showResult) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ textAlign: "center", padding: 32 }}>
        <div style={{ fontSize: 80 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "🎉" : "💪"}</div>
        <div style={{ fontSize: 32, fontWeight: 900, color: catInfo.color, fontFamily: "'Nunito', sans-serif", marginTop: 16 }}>
          {pct >= 80 ? (lang === "fr" ? "Excellent!" : "Excellent!") : pct >= 60 ? (lang === "fr" ? "Bien fait!" : "Well done!") : (lang === "fr" ? "Continue!" : "Keep going!")}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: isNight ? "#fff" : "#555", fontFamily: "'Nunito', sans-serif", marginTop: 8 }}>
          {score} / {total} {lang === "fr" ? "bonnes réponses" : "correct answers"}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
          <button onClick={() => { setScore(0); setTotal(0); setShowResult(false); nextQuestion(); }}
            style={{ background: catInfo.color, color: "#fff", border: "none", borderRadius: 16, padding: "14px 28px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
            {lang === "fr" ? "🔄 Rejouer" : "🔄 Play Again"}
          </button>
          <button onClick={onBack}
            style={{ background: isNight ? "#444" : "#eee", color: isNight ? "#fff" : "#555", border: "none", borderRadius: 16, padding: "14px 28px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
            {lang === "fr" ? "← Retour" : "← Back"}
          </button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: isNight ? "#ccc" : "#666", fontFamily: "'Nunito', sans-serif" }}>
          {lang === "fr" ? "Question" : "Question"} {total + 1}/10
        </div>
        <div style={{ background: catInfo.color + "22", borderRadius: 20, padding: "6px 16px", fontSize: 15, fontWeight: 800, color: catInfo.color, fontFamily: "'Nunito', sans-serif" }}>
          ⭐ {score}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: isNight ? "#ddd" : "#555", fontFamily: "'Nunito', sans-serif", marginBottom: 12 }}>
          {lang === "fr" ? "Quelle image correspond à:" : "Which picture matches:"}
        </div>
        <div style={{
          background: catInfo.color,
          color: "#fff",
          borderRadius: 20,
          padding: "14px 32px",
          fontSize: 26,
          fontWeight: 900,
          fontFamily: "'Nunito', sans-serif",
          display: "inline-block",
          boxShadow: `0 6px 20px ${catInfo.color}60`,
        }}>
          {lang === "fr" ? current.fr : current.en}
        </div>
        <button onClick={() => speak(lang === "fr" ? current.fr : current.en, lang, voiceGender)}
          style={{ display: "block", margin: "12px auto 0", background: "transparent", border: "none", fontSize: 28, cursor: "pointer" }}>
          🔊
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {options.map(opt => {
          const isCorrect = opt.id === current.id;
          const isChosen = selected?.id === opt.id;
          let bg = theme.card;
          let border = isNight ? "3px solid #444" : "3px solid #eee";
          if (selected) {
            if (isCorrect) { bg = "#6BCB77"; border = "3px solid #4aa85c"; }
            else if (isChosen) { bg = "#FF6B6B"; border = "3px solid #d94f4f"; }
          }

          return (
            <div key={opt.id} onClick={() => handleAnswer(opt)}
              style={{
                background: bg,
                borderRadius: 18,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                cursor: selected ? "default" : "pointer",
                border,
                transition: "all 0.2s",
                transform: isChosen && selected ? "scale(0.96)" : "scale(1)",
              }}>
              <div style={{ fontSize: 42 }}>{opt.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: selected && (isCorrect || isChosen) ? "#fff" : isNight ? "#fff" : "#333", fontFamily: "'Nunito', sans-serif", textAlign: "center" }}>
                {opt.num || (lang === "fr" ? opt.fr : opt.en)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  CATEGORY VIEW
// ═══════════════════════════════════════════════
function CategoryView({ category, lang, voiceGender, theme, onBack }) {
  const [activeId, setActiveId] = useState(null);
  const [mode, setMode] = useState("learn"); // learn | quiz
  const items = DATA[category];
  const catInfo = CATEGORIES.find(c => c.id === category);
  const isNight = theme.id === "night";

  function handleCardClick(item) {
    setActiveId(item.id);
    const word = lang === "fr" ? item.fr : item.en;
    speak(word, lang, voiceGender);
  }

  if (mode === "quiz") {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 16px 0" }}>
          <button onClick={() => setMode("learn")}
            style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}>←</button>
          <div style={{ fontSize: 20, fontWeight: 900, color: isNight ? "#fff" : "#2d2d2d", fontFamily: "'Nunito', sans-serif" }}>
            {catInfo.icon} {lang === "fr" ? "Quiz" : "Quiz"}
          </div>
        </div>
        <QuizMode category={category} lang={lang} voiceGender={voiceGender} theme={theme} onBack={() => setMode("learn")} />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack}
            style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}>←</button>
          <div style={{ fontSize: 22, fontWeight: 900, color: isNight ? "#fff" : "#2d2d2d", fontFamily: "'Nunito', sans-serif" }}>
            {catInfo.icon} {lang === "fr" ? catInfo.labelFr : catInfo.labelEn}
          </div>
        </div>
        <button onClick={() => setMode("quiz")}
          style={{
            background: catInfo.color,
            color: "#fff",
            border: "none",
            borderRadius: 14,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: `0 4px 12px ${catInfo.color}50`,
          }}>
          🎮 {lang === "fr" ? "Quiz" : "Quiz"}
        </button>
      </div>

      <div style={{ padding: "12px 16px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
        {items.map(item => (
          <LearningCard
            key={item.id}
            item={item}
            lang={lang}
            voiceGender={voiceGender}
            theme={theme}
            categoryColor={catInfo.color}
            isActive={activeId === item.id}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>

      {activeId && (
        <div style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: catInfo.color,
          color: "#fff",
          borderRadius: 20,
          padding: "12px 24px",
          fontSize: 20,
          fontWeight: 900,
          fontFamily: "'Nunito', sans-serif",
          boxShadow: `0 8px 24px ${catInfo.color}70`,
          animation: "slideUp 0.3s ease",
          whiteSpace: "nowrap",
        }}>
          {(() => {
            const item = items.find(i => i.id === activeId);
            return `${item?.emoji} ${lang === "fr" ? item?.fr : item?.en}`;
          })()}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
//  SETTINGS VIEW
// ═══════════════════════════════════════════════
function SettingsView({ settings, onSave, onBack }) {
  const [local, setLocal] = useState(settings);
  const isNight = local.theme.id === "night";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 900, color: isNight ? "#fff" : "#2d2d2d", fontFamily: "'Nunito', sans-serif" }}>
          ⚙️ {local.lang === "fr" ? "Paramètres" : "Settings"}
        </div>
      </div>

      {/* Language */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: isNight ? "#ccc" : "#666", fontFamily: "'Nunito', sans-serif", marginBottom: 10 }}>
          🌍 {local.lang === "fr" ? "Langue" : "Language"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["en", "fr"].map(l => (
            <button key={l} onClick={() => setLocal(p => ({ ...p, lang: l }))}
              style={{
                flex: 1,
                background: local.lang === l ? "#4ECDC4" : isNight ? "#333" : "#f5f5f5",
                color: local.lang === l ? "#fff" : isNight ? "#ddd" : "#555",
                border: "none",
                borderRadius: 14,
                padding: "14px 0",
                fontSize: 18,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                transition: "all 0.2s",
              }}>
              {l === "en" ? "🇬🇧 English" : "🇫🇷 Français"}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Gender */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: isNight ? "#ccc" : "#666", fontFamily: "'Nunito', sans-serif", marginBottom: 10 }}>
          🎙️ {local.lang === "fr" ? "Voix" : "Voice"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[["female", "👩 " + (local.lang === "fr" ? "Femme" : "Female")], ["male", "👨 " + (local.lang === "fr" ? "Homme" : "Male")]].map(([v, label]) => (
            <button key={v} onClick={() => setLocal(p => ({ ...p, voiceGender: v }))}
              style={{
                flex: 1,
                background: local.voiceGender === v ? "#C77DFF" : isNight ? "#333" : "#f5f5f5",
                color: local.voiceGender === v ? "#fff" : isNight ? "#ddd" : "#555",
                border: "none",
                borderRadius: 14,
                padding: "14px 0",
                fontSize: 16,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                transition: "all 0.2s",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: isNight ? "#ccc" : "#666", fontFamily: "'Nunito', sans-serif", marginBottom: 10 }}>
          🎨 {local.lang === "fr" ? "Thème" : "Theme"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {THEMES.map(t => (
            <button key={t.id} onClick={() => setLocal(p => ({ ...p, theme: t }))}
              style={{
                background: local.theme.id === t.id ? t.primary : isNight ? "#333" : "#f5f5f5",
                color: local.theme.id === t.id ? "#fff" : isNight ? "#ddd" : "#555",
                border: local.theme.id === t.id ? `3px solid ${t.primary}` : "3px solid transparent",
                borderRadius: 14,
                padding: "12px 20px",
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                textAlign: "left",
                transition: "all 0.2s",
              }}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => onSave(local)}
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
          color: "#fff",
          border: "none",
          borderRadius: 18,
          padding: "16px 0",
          fontSize: 18,
          fontWeight: 900,
          cursor: "pointer",
          fontFamily: "'Nunito', sans-serif",
          boxShadow: "0 6px 20px rgba(255,107,107,0.4)",
        }}>
        ✅ {local.lang === "fr" ? "Enregistrer" : "Save"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  ABOUT VIEW
// ═══════════════════════════════════════════════
function AboutView({ lang, theme, onBack }) {
  const isNight = theme.id === "night";

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer" }}>←</button>
        <div style={{ fontSize: 22, fontWeight: 900, color: isNight ? "#fff" : "#2d2d2d", fontFamily: "'Nunito', sans-serif" }}>
          ℹ️ {lang === "fr" ? "À propos" : "About"}
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 72, marginBottom: 12 }}>🎓</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: theme.primary, fontFamily: "'Nunito', sans-serif" }}>
          KidLearn
        </div>
        <div style={{ fontSize: 14, color: isNight ? "#aaa" : "#888", fontFamily: "'Nunito', sans-serif", marginTop: 4 }}>
          v1.0.0
        </div>
      </div>

      {[
        { icon: "🎯", titleEn: "Purpose", titleFr: "Objectif", textEn: "An educational app for children to learn French and English through fun, interactive activities.", textFr: "Une application éducative pour enfants, pour apprendre le français et l'anglais de manière interactive et amusante." },
        { icon: "👶", titleEn: "Target Age", titleFr: "Âge cible", textEn: "Designed for children aged 3–8 years old.", textFr: "Conçue pour les enfants de 3 à 8 ans." },
        { icon: "🔊", titleEn: "Voice Support", titleFr: "Support vocal", textEn: "Uses your device's text-to-speech for pronunciation.", textFr: "Utilise la synthèse vocale de votre appareil pour la prononciation." },
        { icon: "🏆", titleEn: "Learning Method", titleFr: "Méthode", textEn: "Learn by exploring cards, then test knowledge with fun quizzes!", textFr: "Apprenez en explorant les cartes, puis testez vos connaissances avec des quiz amusants!" },
      ].map((item, i) => (
        <div key={i} style={{
          background: isNight ? "#2a2a4a" : "#f9f9f9",
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}>
          <div style={{ fontSize: 28 }}>{item.icon}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: isNight ? "#fff" : "#333", fontFamily: "'Nunito', sans-serif" }}>
              {lang === "fr" ? item.titleFr : item.titleEn}
            </div>
            <div style={{ fontSize: 13, color: isNight ? "#bbb" : "#666", fontFamily: "'Nunito', sans-serif", lineHeight: 1.5, marginTop: 4 }}>
              {lang === "fr" ? item.textFr : item.textEn}
            </div>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: isNight ? "#777" : "#bbb", fontFamily: "'Nunito', sans-serif" }}>
        Made with ❤️ for little learners
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  SPLASH / HOME VIEW
// ═══════════════════════════════════════════════
function SplashView({ onStart, onSettings, onAbout, settings }) {
  const { lang, theme } = settings;
  const isNight = theme.id === "night";
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setBounce(b => !b), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 88, marginBottom: 8, transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)", transform: bounce ? "scale(1.12) rotate(5deg)" : "scale(1) rotate(-3deg)" }}>
        🎓
      </div>
      <div style={{ fontSize: 38, fontWeight: 900, color: theme.primary, fontFamily: "'Nunito', sans-serif", letterSpacing: -1, marginBottom: 4 }}>
        KidLearn
      </div>
      <div style={{ fontSize: 15, color: isNight ? "#aaa" : "#888", fontFamily: "'Nunito', sans-serif", marginBottom: 40 }}>
        {lang === "fr" ? "Apprends le français et l'anglais! 🌍" : "Learn French & English! 🌍"}
      </div>

      <button onClick={onStart}
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          color: "#fff",
          border: "none",
          borderRadius: 24,
          padding: "18px 64px",
          fontSize: 22,
          fontWeight: 900,
          cursor: "pointer",
          fontFamily: "'Nunito', sans-serif",
          boxShadow: `0 8px 28px ${theme.primary}60`,
          marginBottom: 32,
          transform: "translateY(0)",
          transition: "transform 0.2s, box-shadow 0.2s",
          letterSpacing: 0.5,
        }}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${theme.primary}80`; }}
        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 28px ${theme.primary}60`; }}
      >
        🚀 {lang === "fr" ? "Commencer" : "Start"}
      </button>

      <div style={{ display: "flex", gap: 12 }}>
        {[
          { icon: "⚙️", label: lang === "fr" ? "Paramètres" : "Settings", action: onSettings },
          { icon: "ℹ️", label: lang === "fr" ? "À propos" : "About", action: onAbout },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action}
            style={{
              background: isNight ? "#2a2a4a" : "#f5f5f5",
              color: isNight ? "#ddd" : "#555",
              border: "none",
              borderRadius: 16,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "'Nunito', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 40, display: "flex", gap: 8 }}>
        {["🔢", "🔤", "🦁", "🍎", "👨‍👩‍👧‍👦"].map((e, i) => (
          <div key={i} style={{ fontSize: 28, opacity: 0.6, animation: `float ${1.5 + i * 0.2}s ease-in-out infinite alternate`, animationDelay: `${i * 0.15}s` }}>{e}</div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  MENU VIEW
// ═══════════════════════════════════════════════
function MenuView({ onSelect, lang, theme }) {
  const isNight = theme.id === "night";

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: isNight ? "#fff" : "#2d2d2d", fontFamily: "'Nunito', sans-serif" }}>
          {lang === "fr" ? "Que veux-tu apprendre?" : "What do you want to learn?"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => onSelect(cat.id)}
            style={{
              background: cat.bg,
              border: `3px solid ${cat.color}30`,
              borderRadius: 20,
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = `4px 0 16px ${cat.color}40`; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ fontSize: 42, minWidth: 50, textAlign: "center" }}>{cat.icon}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 19, fontWeight: 900, color: cat.color, fontFamily: "'Nunito', sans-serif" }}>
                {lang === "fr" ? cat.labelFr : cat.labelEn}
              </div>
              <div style={{ fontSize: 12, color: "#999", fontFamily: "'Nunito', sans-serif", marginTop: 2 }}>
                {DATA[cat.id].length} {lang === "fr" ? "éléments" : "items"}
              </div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 22, color: cat.color }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("splash"); // splash | menu | category | settings | about
  const [activeCategory, setActiveCategory] = useState(null);
  const [settings, setSettings] = useState({
    lang: "fr",
    voiceGender: "female",
    theme: THEMES[0],
  });

  // Load voices
  useEffect(() => {
    window.speechSynthesis?.getVoices();
    window.speechSynthesis?.addEventListener?.("voiceschanged", () => window.speechSynthesis?.getVoices());
  }, []);

  const { theme } = settings;
  const isNight = theme.id === "night";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; font-family: 'Nunito', sans-serif; }
        @keyframes float { from { transform: translateY(0); } to { transform: translateY(-10px); } }
        @keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: theme.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 0 40px",
      }}>
        <div style={{
          width: "100%",
          maxWidth: 480,
          minHeight: "100vh",
          background: isNight ? "rgba(26,26,46,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top Nav (non-splash) */}
          {view !== "splash" && view !== "settings" && view !== "about" && view !== "category" && (
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 16px",
              borderBottom: isNight ? "1px solid #333" : "1px solid #f0f0f0",
              gap: 10,
            }}>
              <button onClick={() => setView("splash")}
                style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>
                🏠
              </button>
              <div style={{ flex: 1, fontSize: 18, fontWeight: 900, color: isNight ? "#fff" : "#2d2d2d", fontFamily: "'Nunito', sans-serif" }}>
                KidLearn
              </div>
              <div style={{ fontSize: 22, cursor: "pointer" }} onClick={() => setView("settings")}>⚙️</div>
            </div>
          )}

          {/* Views */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {view === "splash" && (
              <SplashView
                settings={settings}
                onStart={() => setView("menu")}
                onSettings={() => setView("settings")}
                onAbout={() => setView("about")}
              />
            )}
            {view === "menu" && (
              <MenuView
                lang={settings.lang}
                theme={settings.theme}
                onSelect={cat => { setActiveCategory(cat); setView("category"); }}
              />
            )}
            {view === "category" && activeCategory && (
              <CategoryView
                category={activeCategory}
                lang={settings.lang}
                voiceGender={settings.voiceGender}
                theme={settings.theme}
                onBack={() => setView("menu")}
              />
            )}
            {view === "settings" && (
              <SettingsView
                settings={settings}
                onSave={s => { setSettings(s); setView("splash"); }}
                onBack={() => setView(view === "settings" ? "splash" : view)}
              />
            )}
            {view === "about" && (
              <AboutView
                lang={settings.lang}
                theme={settings.theme}
                onBack={() => setView("splash")}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
