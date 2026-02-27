export function DisplayWord({ word, date }) {
    const letters = word?.split('') ?? [];
    console.log('Displaying word:', word, 'on date:', date);
    return (
        <>
            <div className="flex space-x-1.5">
                {letters.map((letter, index) => (
                    <div
                        key={`${letter}-${index}`}
                        className="flex h-[16px] w-[16px] items-center justify-center bg-[#538d4e] text-sm font-wordle font-bold uppercase text-white animate-flip"
                        style={{ animationDelay: `${index * 0.25}s` }}
                    >
                        {letter}
                    </div>
                ))}
            </div>
        </>
    )
}
