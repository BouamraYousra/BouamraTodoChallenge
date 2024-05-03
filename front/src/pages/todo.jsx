import { Helmet } from 'react-helmet-async';

import { TodoView } from 'src/sections/todo/view';

// ----------------------------------------------------------------------

export default function TodoPage() {
  return (
    <>
      <Helmet>
        <title> Tasks Bouamra </title>
      </Helmet>

      <TodoView />

    </>
  );
}
