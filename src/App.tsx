import { Route, Switch } from "wouter"
import Users from "./users/pages/Users"
import Fallback from "./shared/pages/Fallback"
import Posts from "./posts/pages/Posts"
import Comments from "./comments/pages/Comments"

function App() {


  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white dark:bg-[#161616]"></div>

      <Switch>
        <Route path={'/'} component={Users} />
        <Route path={'/posts'} component={Posts} />
        <Route path={'/comments'} component={Comments} />
        <Route>
          <Fallback title="No se encontró la página" description="No podemos encontrar la página que buscas." />
        </Route>
      </Switch>

    </>
  )
}

export default App
