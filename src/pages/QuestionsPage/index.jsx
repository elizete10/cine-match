import { useState } from "react"
import { useNavigate } from "react-router-dom"

const question = [
    {
        id: 1,
        question: "Qual o seu humo atual?",
        options: [
            { value: "feliz", label: "Feliz", emoji: "" },
            { value: "triste", label: "Triste", emoji: "" },
            { value: "animado", label: "Animado", emoji: "" },
            { value: "relaxado", label: "Relaxado", emoji: "" },
        ]
    },
    {
        id: 2,
        question: "Qual seu gênero preferido?",
        options: [
            { value: "acao", label: "Ação", emoji: "" },
            { value: "comedia", label: "Comédia", emoji: "" },
            { value: "drama", label: "Drama", emoji: "" },
            { value: "ficcao", label: "Ficção", emoji: "" },
            { value: "terror", label: "Terror", emoji: "" },
            { value: "romance", label: "Romance", emoji: "", },
        ]
    },
    {

        id: 3,
        question: "Qual época dos filmes você prefere?",
        options: [
            { value: "classico", label: "Clássicos (até1980)", emoji: "" },
            { value: "80s90s", label: "Anos 80/90", emoji: "" },
            { value: "2000s", label: "Anos 2000", emoji: "" },
            { value: "contemporaneos", label: "Contemporâneos (pós-2010)", emoji: "" },
        ],
    },
    {

        id: 4,
        question: "Qual seu idioma preferido?",
        options: [
            { value: "portugues", label: "br Português", emoji: "" },
            { value: "ingles", label: "us Ingles", emoji: "" },
            { value: "espanhol", label: "es Espanhol", emoji: "" },
            { value: "outros", label: "Outros", emoji: "" },
        ],
    },
]


export const QuestionsPage = () => {
    const navigation = useNavigate()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState

    const currentQuestion = questions[currentQuestionIndex]
    const selectedOption = answers[currentQuestion.id]
    const insLastQuestion = currentQuestionIndex === question.length - 1

    const handleSelectOption = () => {
        setAnswers({ ...answers, [currentQuestion.id]: value })
    }

    const hadleNext = () => {
        if (insLastQuestion) {
            localStorage.setItem("cinematch-aswers", JSON, Stringify(answers))
            Router.push("/resultado")
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const progressPercentage = ((currentQuestionIndex + 1) / question.length) * 100


    return (
        <div className="min-h-screen bg-gradient-to-bx from-purple-900 via-purple-800 to-blue-900 p-4 glex flex-col">
            <div className="max-w-4xl mx-auto w-full pt-8 pb-4">
                <div className="mb-4">
                    <p div className="text-white text-center font-semibold mb-2">
                        Pergunta {currentQuestionIndex + 1} de {question.length}
                    </p>
                    <div className="w-full bg-purple-950 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500 ease-out">
                            style = {{ width: '${progressPercentage}%' }}
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="max-w-4xl w-full space-y-8">
                        <div className="text-center space-y-4">
                            <h2 div className="text-3xl md:text-4xl font-bold text-white">Vamos conhecer sua preferência!</h2>
<p className="text-2xl md:text-3xl text-purple-300 font-semibold">{currentQuestion.question}</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
    {currentQuestion.options.map((option))} => (
        <button
        key={option.value}
        onClick={() => handleSelectOption(option.value)}
        className={'p-6 rounded-lg text-lg font-semibold transition-all duration-300 tranform
            hover:scale-105 $ {
                selectedOption === option.value
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl sacale-105"
   : "bg-white/10 text-white hover:bg-white/20 shadow-md houver:shadow-lg"         
            '}}
            >

            <span className="text-3xl mb-2 block">{option.emoji}</span>
            {option.label}
            </button>
    ))}
    </div>
    </div>
    </div>

    <div className="max-w-4xl mx-auto w-full py-8">
        <div className="flex justify-between items-center gap-4 px-4">
            <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300' ${
               currentQuestionIndex === 0
               ? "bg-gray-700 text-gray-500 cursor-not-allowed"
               : "bg-white/10 text-white hover:bg-white/20 shadow-md hover:shadow-lg" 
            }'}
>
<chevroLeft className="w-5 h-5" />
Anterior
</button>

<button
 onClick={handleNext}
            disabled={!selectedOption}
            className={'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300' ${
               !selectedOption
               ? "bg-gray-700 text-gray-500 cursor-not-allowed"
               : "bg-gradient-to-r from-purple-600 text-white hover:from-purple-700 hover: to-blue-700 shadow-lg hover:shadow-xl"
            }'}
            >
            {insLastQuestion ? "Ver Resultados" : "Próximo"}
            <chevronRight className="w-5 h-5"/>
            </button>
            </div>
            </div>
            </div>
        )
}
