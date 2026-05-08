type MoodSelectorProps = {
  moods: string[];
  selectedMood: string;
  onSelect: (mood: string) => void;
};

export function MoodSelector({ moods, selectedMood, onSelect }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {moods.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => onSelect(mood)}
          className={`rounded-2xl border px-4 py-4 text-left transition ${
            mood === selectedMood ? 'border-sky-300 bg-sky-300/10' : 'border-white/10 bg-white/5'
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
