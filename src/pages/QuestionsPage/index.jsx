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
        setCurrentQuestionIndex (currentQuestionIndex - 1)
}
}

const progressPercentage = ((currentQuestionIndex + 1) / question.length) * 100


return (
    <div className="min">

    </div>
)
}
