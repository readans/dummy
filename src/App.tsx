import { Route, Switch } from "wouter"
import Users from "./users/pages/Users"
import Fallback from "./shared/pages/Fallback"
import Posts from "./posts/pages/Posts"

function App() {

  return (
    <>
      <Switch>
        <Route path={'/'} component={Users} />
        <Route path={'/posts'} component={Posts} />
        <Route>
          <Fallback title="No se encontró la página" description="No podemos encontrar la página que buscas." />
        </Route>
      </Switch>
    </>
  )
}

export default App
