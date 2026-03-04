export function DisplayWord({ word, date }) {
    const letters = word?.split('') ?? [];
    console.log('Displaying word:', word, 'on date:', date);
    return (
        <>
            <div className="flex space-x-1.5">
                {letters.map((letter, index) => (
                    <div
                        key={`${letter}-${index}`}
                        className="flex h-[32px] w-[32px] items-center justify-center bg-[#538d4e] text-base font-wordle font-bold uppercase text-white animate-flip"
                        style={{ animationDelay: `${index * 0.25}s` }}
                    >
                        {letter}
                    </div>
                ))}
            </div>
        </>
    )
}
