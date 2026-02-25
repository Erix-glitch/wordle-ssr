import { Nav } from '@/components/nav';
export default async function Page({ }) {
    return (
        <>
            <Nav />
            <main className="flex flex-col items-center justify-center min-h-screen text-auto text-center px-6 py-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm">
                    Wordle Art Maker
                </h1>
            </main>
        </>
    )
}
