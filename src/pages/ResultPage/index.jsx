
import { useEffect, useState } from "react"
import { Star, Sparkles, Home } from "lucide-react"
import { Link } from "react-router-dom"
import axios from "axios"

export const ResultsPage = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResults = async () => {
      try {
        const token = localStorage.getItem("access_token")
        const response = await axios.get("/recommendations", {
          baseURL: import.meta.env.VITE_API_URL,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setMovies(response.data.recommendations)
      } catch (error) {
        console.error({ getRecommendationsError: error })
      } finally {

        setLoading(false)
      }
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
      <div className="min-h-screen bg-linear-to-br from-violet-950  to-indigo-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-16 h-16 text-purple-300 animate-spin mx-auto" />
          <p className="text-2xl text-white font-semibold">Calculando suas recomendações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 to-violet-950 flex-col">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-indigo-400 " />
            SUAS RECOMENDAÇÕES!
            <Sparkles className="w-10 h-10 text-indigo-400 " />
          </h1>
          <p className="text-xl text-indigo-400 ">
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
                <img src={movie.posterUrl || "/placeholder.svg"} alt={movie.title} className="w-full h-64 object-contain" />
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
                  {movie.releaseDate.substring(0, 4)} • {movie.genre}
                </p>
                <p className="text-sm text-gray-400 line-clamp-3">{movie.overview}</p>
                {/* Rating Stars */}
                <div className="flex items-center gap-1">{renderStars(movie.voteAverage)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <div className="text-center pt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-violet-800 to-indigo-900 hover:from-violet-800 hover:to-indigo-900 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Home className="w-6 h-6" />
            Fazer Novo Quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
