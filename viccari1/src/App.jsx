import { useEffect, useState } from "react"

const CACHE_EXPIRATION = 1000 * 60 * 60 // 1 hora em ms

function App() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cachedData = localStorage.getItem("reposCache")
    const cachedTimestamp = localStorage.getItem("reposCacheTimestamp")
    const now = Date.now()

    if (cachedData && cachedTimestamp && now - cachedTimestamp < CACHE_EXPIRATION) {
      setRepos(JSON.parse(cachedData))
      setLoading(false)
      return
    }

    fetch("https://api.github.com/users/Viccari1/repos?sort=updated")
      .then((res) => {
        console.log("Efetuando fetch dos repositórios...")
        if (!res.ok) throw new Error("Erro ao buscar repositórios")
        return res.json()
      })
      .then((data) => {
        const updatedData = data.map((repo) => ({
          ...repo,
          imagem:
            "https://raw.githubusercontent.com/Viccari1/" +
            repo.name +
            "/main/doc/img/telainicial.png",
        }))
        setRepos(updatedData)
        setLoading(false)

        localStorage.setItem("reposCache", JSON.stringify(updatedData))
        localStorage.setItem("reposCacheTimestamp", Date.now())
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen w-full bg-[#2a2c2e] text-gray-100">
      <div className="w-full px-6 md:px-12 py-10">
        {/* HERO */}
        <section className="bg-[#1f2123] rounded-xl p-10 text-center shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Andrey Viccari
          </h1>
          <p className="mt-2 text-xl text-gray-300">Programador Júnior</p>
          <p className="mt-6 max-w-3xl mx-auto text-gray-400">
            Seja bem-vindo ao meu portfólio. Aqui você encontrará informações sobre mim, minhas habilidades
            e alguns projetos que desenvolvi durante minha jornada na programação.
          </p>
        </section>

        {/* SOBRE / HABILIDADES / CONTATO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Sobre Mim
            </h2>
            <p className="mb-4">
              Olá, me chamo Andrey Viccari, e sou um programador em busca de conhecimento na área da tecnologia.
            </p>
            <p className="text-gray-300">
              Comecei a gostar dessa área depois de perceber que tudo pode ser criado do zero, com tempo e dedicação.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Habilidades
            </h2>
            <ul className="grid grid-cols-2 gap-y-2 text-gray-300">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>Bootstrap</li>
              <li>Python</li>
              <li>Django</li>
              <li>C#</li>
              <li>Windows Forms</li>
              <li>Git</li>
              <li>Aprendendo mais...</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Contato
            </h2>
            <p className="mb-2">Email:</p>
            <p className="text-blue-400 mb-4">viccariandrey@gmail.com</p>

            <p className="mb-1">GitHub:</p>
            <a
              href="https://github.com/Viccari1"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline block mb-4"
            >
              github.com/Viccari1
            </a>

            <p className="mb-1">LinkedIn:</p>
            <a
              href="https://www.linkedin.com/in/andrey-viccari-3a2356290/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline block"
            >
              linkedin.com/in/andrey-viccari
            </a>
          </div>
        </section>

        {/* PROJETOS - GITHUB API */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Projetos (GitHub)
          </h2>

          {loading && (
            <p className="text-center text-gray-400">Carregando projetos...</p>
          )}
          {error && (
            <p className="text-center text-red-400">
              Não foi possível carregar os repositórios.
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {repos
                .filter((repo) => !repo.fork)
                .slice(0, 6)
                .map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-[#1f2123] rounded-xl p-6 shadow-lg hover:scale-[1.02] transition"
                  >
                    <img
                      src={repo.imagem}
                      alt={`Imagem do projeto ${repo.name}`}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                    <p className="text-gray-300 mb-4">
                      {repo.description || "Sem descrição"}
                    </p>
                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                      <span>🧠 {repo.language || "N/A"}</span>
                      <span>⭐ {repo.stargazers_count}</span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Ver no GitHub →
                    </a>
                  </div>
                ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="text-center text-gray-500 mt-24">
          © 2025 — Andrey Viccari. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  )
}

export default App
