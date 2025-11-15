import { Link } from "react-router-dom";

export const HomePage = () => {
    return (
        <main className="min-h-dvh bg-linear-to-r from-stone-800 to-stone-950 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl text-center space-y-8">
                <header className="space-y-4">
                    <h1 className="text-6xl md:text-7xl text-neutral-50 font-bold tracking-tight">Cine Match</h1>
                    <h2 className="text-2xl md:text-3xl font-medium text-violet-800">
                        Escolher é difícil, assistir não precisa ser!
                    </h2>
                </header>

                <Link to="/questoes"
                    className="inline-flex items-center px-8 py-4 bg-linear-to-r from-violet-600 to-violet-800 hover:scale-105 text-neutral-50 text-xl font-semibold rounded-lg shadow-lg shadow-violet-500 transform transition-all duration-300 hover:shadow-xl">
                    Começar Agora
                </Link>

                <footer className="pt-12">
                    <p className="text-sm text-neutral-100">
                        &copy; Não dê Match no Tinder... Dê Match com a gente
                    </p>
                </footer>
            </div>
        </main>
    );

}

