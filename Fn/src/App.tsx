import { RouterProvider } from "react-router-dom";
import router from "./router/Router"; // path ตามไฟล์ router ของคุณ

function App() {
  return <RouterProvider router={router} />;
}

export default App;
