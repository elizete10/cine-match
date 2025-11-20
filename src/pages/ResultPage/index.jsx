
import { useEffect, useState } from "react"
import { Star, Sparkles, Home } from "lucide-react"
import { Link } from "react-router-dom"

const mockMovies = [
  {
    id: 1,
    title: "O Poderoso Chefão",
    year: 1972,
    genre: "Drama",
    description: "A história épica da família Corleone e do império do crime que se tornou uma dinastia.",
    affinity: 98,
    rating: 5,
    image: "/classic-mob-poster.png",
  },
  {
    id: 2,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    description: "Histórias interligadas de criminosos, boxeadores e duplas mortais em Los Angeles.",
    affinity: 95,
    rating: 5,
    image: "/pulp-fiction-poster.png",
  },
  {
    id: 3,
    title: "Clube da Luta",
    year: 1999,
    genre: "Drama",
    description: "Um funcionário de escritório insone e um fabricante de sabão formam um clube de luta clandestino.",
    affinity: 92,
    rating: 4.5,
    image: "/fight-club-poster.png",
  },
  {
    id: 4,
    title: "Matrix",
    year: 1999,
    genre: "Ficção Científica",
    description:
      "Um hacker descobre a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores.",
    affinity: 90,
    rating: 5,
    image: "/matrix-movie-poster.png",
  },
  {
    id: 5,
    title: "Interestelar",
    year: 2014,
    genre: "Ficção Científica",
    description:
      "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço para garantir a sobrevivência da humanidade.",
    affinity: 88,
    rating: 4.5,
    image: "/interstellar-movie-poster.jpg",
  },
  {
    id: 6,
    title: "A Origem",
    year: 2010,
    genre: "Ficção Científica",
    description:
      "Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos.",
    affinity: 87,
    rating: 4.5,
    image: "/inception-movie-poster.png",
  },
  {
    id: 7,
    title: "Coringa",
    year: 2019,
    genre: "Drama",
    description: "A história de origem do icônico vilão, um homem ignorado pela sociedade que se torna um criminoso.",
    affinity: 85,
    rating: 4,
    image: "/generic-clown-poster.png",
  },
  {
    id: 8,
    title: "Parasita",
    year: 2019,
    genre: "Thriller",
    description: "Ganância e discriminação de classe ameaçam a relação simbiótica recém-formada entre duas famílias.",
    affinity: 83,
    rating: 4.5,
    image: "/parasite-movie-poster.png",
  },
  {
    id: 9,
    title: "O Cavaleiro das Trevas",
    year: 2008,
    genre: "Ação",
    description: "Batman enfrenta o Coringa, um criminoso que quer mergulhar Gotham City no caos.",
    affinity: 82,
    rating: 5,
    image: "/dark-knight-poster.png",
  },
  {
    id: 10,
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    description: "A vida de um homem simples que testemunha e influencia eventos históricos importantes.",
    affinity: 80,
    rating: 4.5,
    image: "/forrest-gump-poster.png",
  },
]

export const ResultsPage = ()=> {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadResults = async () => {
      // In production, fetch from API using answers from localStorage
      const answers = localStorage.getItem("cinematch-answers")
      console.log("[v0] User answers:", answers)

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMovies(mockMovies)
      setLoading(false)
    }

    loadResults()
  }, [])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />)
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-500/50 text-yellow-500" />)
    }
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="w-5 h-5 text-gray-400" />)
    }

    return stars
  }

  const getAffinityColor = (affinity) => {
    if (affinity >= 85) return "bg-green-500"
    if (affinity >= 70) return "bg-blue-500"
    return "bg-yellow-500"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-950 via-purple-800 to-blue-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-purple-300 animate-spin mx-auto" />
          <p className="text-2xl text-white font-semibold">Calculando suas recomendações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 to-purple-800 flex-col">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-purple-300 " />
            SUAS RECOMENDAÇÕES!
            <Sparkles className="w-10 h-10 text-purple-300 " />
          </h1>
          <p className="text-xl text-indigo-300 ">
            Baseado nas suas preferências, aqui estão os filmes perfeitos para você...
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Movie Image */}
              <div className="relative">
                <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-64 object-cover" />
                {/* Affinity Badge */}
                <div
                  className={`absolute top-2 right-2 ${getAffinityColor(
                    movie.affinity,
                  )} text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg`}
                >
                  {movie.affinity}% Afinidade
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-bold text-white line-clamp-1">{movie.title}</h3>
                <p className="text-sm text-gray-300">
                  {movie.year} • {movie.genre}
                </p>
                <p className="text-sm text-gray-400 line-clamp-3">{movie.description}</p>
                {/* Rating Stars */}
                <div className="flex items-center gap-1">{renderStars(movie.rating)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <div className="text-center pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-800 to-blue-900 hover:from-purple-900 hover:to-blue-900 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-6 h-6" />
            Fazer Novo Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
