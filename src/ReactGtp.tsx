import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/router/router";


export default function ReactGtp() {
  return (
    <RouterProvider router={router} />
  )
}
