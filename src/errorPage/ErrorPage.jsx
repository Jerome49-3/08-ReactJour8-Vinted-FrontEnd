import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="boxErrorPage">
      <link
        href="https://fonts.cdnfonts.com/css/slugs-racer"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.cdnfonts.com/css/zebulon"
        rel="stylesheet"
      ></link>

      <h1 className="oops">Oops!</h1>
      <h1 className="oops2">Oops!</h1>
      <p className="sorry">Sorry, an unexpected error has occurred.</p>
      <p className="codeerror">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
