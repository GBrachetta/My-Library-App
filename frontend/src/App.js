import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AddBook from './pages/AddBook';
import AddComposer from './pages/AddComposer';
import Book from './pages/Book';
import Books from './pages/Books';
import Composer from './pages/Composer';
import Composers from './pages/Composers';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdateBook from './pages/UpdateBook';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col justify-between">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/verify-email/:verificationToken"
                element={<VerifyEmail />}
              />
              <Route path="/error" element={<Error />} />
              <Route path="/add-composer" element={<PrivateRoute />}>
                <Route path="/add-composer" element={<AddComposer />} />
              </Route>
              <Route path="/composers" element={<PrivateRoute />}>
                <Route path="/composers" element={<Composers />} />
              </Route>
              <Route path="/composers/:composerId" element={<PrivateRoute />}>
                <Route path="/composers/:composerId" element={<Composer />} />
              </Route>
              <Route path="/add-book" element={<PrivateRoute />}>
                <Route path="/add-book" element={<AddBook />} />
              </Route>
              <Route path="/books" element={<PrivateRoute />}>
                <Route path="/books" element={<Books />} />
              </Route>
              <Route path="/books/:bookId" element={<PrivateRoute />}>
                <Route path="/books/:bookId" element={<Book />} />
              </Route>
              <Route path="/books/update/:bookId" element={<PrivateRoute />}>
                <Route path="/books/update/:bookId" element={<UpdateBook />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <ToastContainer
        theme="colored"
        pauseOnFocusLoss={false}
        transition={Flip}
      />
    </>
  );
}

export default App;
