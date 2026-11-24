import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionPlaceholder from "./components/QuestionPlaceholder/QuestionPlaceholder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <HomePage />,
        children: [
          { index: true, element: <QuestionPlaceholder /> },
          { path: "questions/:id", element: <QuestionDetail /> },
        ],
      },
    ],
  },
]);
