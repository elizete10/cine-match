import { useState, useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const QuestionsPage = () => {
    const navigation = useNavigate()

    const token = localStorage.getItem("access_token")

    // Estado para o fluxo do questionário
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    // Estados de carregamento e erro
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(null) // Adicionado estado de erro de submissão

    // Estado para manter as respostas submetidas (ajuste para rastrear progresso)
    // O ideal é que o backend mantenha o controle, mas para UX, podemos armazenar localmente.
    const [submittedAnswers, setSubmittedAnswers] = useState({})

    // 1. Carregar Perguntas ao montar o componente
    useEffect(() => {
        setIsLoading(true)

        // Adicionando o token de autorização à requisição de GET, se necessário
        const config = token ? {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } : {}

        axios.get("/questions", {
            baseURL: import.meta.env.VITE_API_URL,
            ...config // Aplica as configurações de headers (se houver token)
        })
            .then(response => {
                console.log({ questionsLoaded: response.data.length })
                setQuestions(response.data)
            })
            .catch(error => {
                console.error({ getQuestionsError: error })
                // TODO: Adicionar tratamento de erro para o carregamento
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [token]) // Dependência do token para evitar aviso, embora só deva mudar no login/logout

    // Obter a pergunta atual de forma otimizada
    const question = useMemo(
        () => questions[currentQuestion],
        [questions, currentQuestion]
    )

    // Verificar se é a última pergunta
    const isLastQuestion = currentQuestion === questions.length - 1

    const handleAnswerSelect = (value) => {
        setSelectedAnswer(value)
    }

    // 2. Submeter Resposta
    const handleSubmitAnswer = async () => {
        if (selectedAnswer === null || !question || isSubmitting) return

        const questionId = question.id
        const answer = selectedAnswer

        setIsSubmitting(true)
        setSubmitError(null)

        try {
            // Requisição de submissão
            const response = await axios.post("/answers", {
                questionId,
                answer: [answer]
            }, {
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // Armazenar a resposta submetida (para desabilitar a opção se necessário)
            setSubmittedAnswers(prev => ({
                ...prev,
                [questionId]: answer
            }))

            if (isLastQuestion) {
                // Se for a última pergunta, navega para a tela de resultados
                navigation("/resultado")
            } else {
                // Se não for a última, avança para a próxima pergunta
                handleNextQuestion()
            }

        } catch (error) {
            console.error("Erro ao enviar resposta:", error)
            // Verificar se o erro é de autenticação ou de rede, por exemplo
            setSubmitError("⚠️ Erro ao enviar a resposta. Tente novamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Avançar para a próxima pergunta
    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null) // Limpa a seleção para a nova pergunta
        } else if (isLastQuestion) {
            // Se já está na última, chama o envio para ir para resultados (caso não tenha sido enviado)
            // Mas o fluxo correto é chamar handleSubmitAnswer, que decide se navega ou avança
            // Este bloco pode ser removido pois o handleSubmitAnswer já faz o controle
        }
    }

    // Voltar para a pergunta anterior
    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
            setSelectedAnswer(null) // Limpa a seleção ao voltar
        }
    }

    // Estado de carregamento
    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-amber-50">
                <p className="text-xl text-neutral-600">Carregando questões...</p>
            </main>
        )
    }

    // Caso não haja perguntas carregadas (ex.: erro na API)
    if (questions.length === 0) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone-950 to-purple-950">
                <p className="text-xl text-white">Nenhuma questão disponível.</p>
            </main>
        )
    }

    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

    return (
        <div className="min-h-screen bg-linear-to-br from-stone-950 to-purple-950 flex flex-col">
            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto w-full pt-8 pb-4 px-4">
                <div className="mb-4">
                    <p className="text-white text-center font-semibold mb-2">
                        Pergunta {currentQuestion + 1} de {questions.length}
                    </p>
                    <div className="w-full bg-purple-600 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-linear-to-r from-blue-800 h-full transition-all duration-500 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Container */}
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center space-y-4 px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Vamos conhecer suas preferências!</h2>
                        {/* Tratativa para question.text não ser undefined durante a renderização */}
                        <p className="text-2xl md:text-3xl text-indigo-300 font-medium">{question ? question.text : "..."}</p>
                    </div>

                    {/* Exibir erro de submissão, se houver */}
                    {submitError && (
                        <div className="text-center text-red-400 font-semibold p-4">
                            {submitError}
                        </div>
                    )}

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                        {question?.options?.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleAnswerSelect(option.value)}
                                disabled={isSubmitting} // Desabilita durante o envio
                                className={`p-6 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 
                                    ${selectedAnswer === option.value
                                    ? "bg-linear-to-r from-purple-600 to-blue-800 transition-colors text-white shadow-xl scale-105"
                                    : "bg-white/10 text-white hover:bg-white/20 shadow-md hover:shadow-lg"
                                    }`}
                            >
                                <span className="text-3xl mb-2 block">{option.emoji}</span>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="max-w-4xl mx-auto w-full py-8">
                <div className="flex justify-between items-center gap-4 px-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0 || isSubmitting}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 
                            ${currentQuestion === 0 || isSubmitting
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-white/10 text-white hover:bg-white/20 shadow-md hover:shadow-lg"
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Anterior
                    </button>

                    <button
                        // Ação unificada para Próximo (envia resposta e avança/finaliza)
                        onClick={handleSubmitAnswer} 
                        disabled={!selectedAnswer || isSubmitting}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 
                            ${!selectedAnswer || isSubmitting
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-linear-to-r from-blue-600 to-purple-800 text-white hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg hover:shadow-xl"
                            }`}
                    >
                        {isSubmitting ? (
                            "Enviando..."
                        ) : isLastQuestion ? (
                            "Ver Resultados" // Texto para a última pergunta
                        ) : (
                            "Próximo" // Texto para as demais perguntas
                        )}
                        {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    )
}