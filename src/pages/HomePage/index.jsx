import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const navigate = useNavigate()

    const handleStart = async () => {
        try {
            const response = await axios.post("/auth/session", {}, {
                baseURL: import.meta.env.VITE_API_URL
            })

            const token = response.data.accessToken

            localStorage.setItem("access_token", token)

            navigate("/questoes")
        } catch (error) {
            console.error({ handleStartError: error })
        }
    }

    return (
        <main className="min-h-dvh bg-linear-to-r from-stone-950 to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl text-center space-y-8">
                <header className="space-y-4">
                    <h1 className="text-6xl md:text-7xl text-neutral-50 font-bold tracking-tight">Cine Match</h1>
                    <h2 className="text-2xl md:text-3xl font-medium   text-indigo-300 ">
                        Escolher é difícil, assistir não precisa ser!
                    </h2>
                </header>

                <button onClick={handleStart}
                    className="inline-flex items-center px-8 py-4 bg-linear-to-r from-violet-600 to-violet-950 hover:scale-105 text-neutral-50 text-xl font-semibold rounded-lg shadow-lg shadow-violet-500 transform transition-all duration-300 hover:shadow-xl">
                    Começar Agora
                </button>

                <footer className="pt-12">
                    <p className="text-sm text-neutral-100">
                        &copy; Não dê Match no Tinder... Dê Match com a gente
                    </p>
                </footer>
            </div>
        </main>
    );

}

