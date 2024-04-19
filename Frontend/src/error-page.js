import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="justify-center items-center flex flex-col gap-5 mt-20">
            <h1 className="font-bold text-4xl">Oops!</h1>
            <p className=" text-xl">Sorry, an unexpected error has occurred.</p>
            <p className="font-bold text-4xl">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}